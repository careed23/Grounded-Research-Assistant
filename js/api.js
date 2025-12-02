/**
 * js/api.js
 * Handles all communication with the Gemini API, including streaming and response parsing.
 */

// --- Configuration ---
const apiKey = ""; // API key is provided by the canvas environment
// NOTE: Use the streaming endpoint for real-time output
const model = 'gemini-2.5-flash-preview-09-2025';
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContentStream?key=${apiKey}`; 

// --- Helper Functions (fetchWithRetry is modified for streaming error handling) ---

/**
 * Implements exponential backoff for API retries.
 * For streaming, this handles initial connection failures, but stream failures must be handled inside the main function.
 * @param {function} fn - The function to execute (the fetch call).
 * @param {number} maxRetries - Maximum number of retries.
 */
const fetchWithRetry = async (fn, maxRetries = 5) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries - 1) {
                throw error;
            }
            // Exponential backoff: 2^attempt * 1000 ms
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// --- Main API Call Function (UPDATED FOR STREAMING) ---

/**
 * Calls the Gemini API streaming endpoint with Google Search grounding enabled.
 * It streams the text chunks via the onChunk callback and returns the final sources.
 * * @param {string} query - The user's research query.
 * @param {string} systemPrompt - The instruction defining the model's persona.
 * @param {function(string): void} onChunk - Callback function called with each new text chunk.
 * @returns {Promise<{sources: Array<{uri: string, title: string}>}>}
 */
export const getGroundedContent = async (query, systemPrompt, onChunk) => {
    // Determine the actual system instruction to use
    const effectiveSystemPrompt = systemPrompt || "You are a helpful assistant.";

    const payload = {
        contents: [{ parts: [{ text: query }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: { parts: [{ text: effectiveSystemPrompt }] },
    };

    const response = await fetchWithRetry(() => 
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
    );

    if (!response.ok) {
        const errorBody = await response.json();
        console.error("API Error Response:", errorBody);
        throw new Error(`API returned status ${response.status}: ${errorBody.error?.message || 'Unknown API Error'}`);
    }

    // Process the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let sources = [];
    let done = false;

    // Stream processing loop
    while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        if (value) {
            const chunk = decoder.decode(value, { stream: true });
            
            // Streaming API responses are JSON objects separated by newlines
            const jsonStrings = chunk.trim().split('\n');

            for (const jsonString of jsonStrings) {
                try {
                    const result = JSON.parse(jsonString.trim());
                    const candidate = result.candidates?.[0];

                    if (candidate) {
                        // 1. Stream Text
                        const textChunk = candidate.content?.parts?.[0]?.text || '';
                        if (textChunk) {
                            onChunk(textChunk);
                        }

                        // 2. Aggregate Grounding Metadata from the last chunk
                        const groundingMetadata = candidate.groundingMetadata;
                        if (groundingMetadata && groundingMetadata.groundingAttributions) {
                            // Sources are usually sent only in the final chunk, 
                            // but we process them here just in case they appear earlier.
                            sources = groundingMetadata.groundingAttributions
                                .map(attribution => ({
                                    uri: attribution.web?.uri,
                                    title: attribution.web?.title,
                                }))
                                .filter(source => source.uri && source.title);
                            
                            // Important: Deduplicate sources by URI before returning
                            sources = sources.filter((value, index, self) => 
                                index === self.findIndex((t) => t.uri === value.uri)
                            );
                        }
                    }
                } catch (e) {
                    console.warn("Failed to parse JSON chunk or chunk was empty:", e, jsonString);
                    // Continue loop, some chunks might just be incomplete or empty
                }
            }
        }
    }

    // Return the final aggregated sources
    return { sources };
};
