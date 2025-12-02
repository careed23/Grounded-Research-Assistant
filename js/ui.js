/**
 * js/ui.js
 * Handles all DOM manipulation for the application state and response rendering.
 */

// --- UI Element References ---
const submitButton = document.getElementById('submit-button');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');
const responseTitle = document.getElementById('response-title');
const aiOutput = document.getElementById('ai-output');
const aiText = document.getElementById('ai-text');
const sourcesArea = document.getElementById('sources-area');
const sourceList = document.getElementById('source-list');

// --- UI State Management ---

/**
 * Updates the UI based on the application state.
 * @param {'loading'|'error'|'loaded'|'ready'} state 
 * @param {string} [message] - Optional message for error state.
 */
export const updateUI = (state, message = '') => {
    // 1. Reset all dynamic content and states
    errorMessage.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
    aiOutput.classList.add('hidden');
    responseTitle.classList.add('hidden');
    submitButton.disabled = false;
    
    // 2. Apply state-specific changes
    if (state === 'loading') {
        loadingIndicator.classList.remove('hidden');
        submitButton.disabled = true;
        
        // IMPORTANT: Clear the text output area when loading starts
        aiText.textContent = ''; 
        sourceList.innerHTML = '';
        sourcesArea.classList.add('hidden');
    } else if (state === 'error') {
        errorMessage.textContent = `Error: ${message}. Please check your query or try again later.`;
        errorMessage.classList.remove('hidden');
    } else if (state === 'loaded') {
        responseTitle.classList.remove('hidden');
        aiOutput.classList.remove('hidden');
    }
    // 'ready' state is implicit: everything reset, input available.
};

// --- Streaming Text Renderer (NEW) ---

/**
 * Appends a new chunk of text received from the streaming API.
 * @param {string} chunk - The text chunk to append.
 */
export const appendStreamChunk = (chunk) => {
    // Ensure the output area is visible right before the first chunk arrives
    if (aiOutput.classList.contains('hidden')) {
        updateUI('loaded');
    }
    // Append the text chunk to the output element
    aiText.textContent += chunk;
};


// --- Final Response Rendering (Sources Only) ---

/**
 * Renders the final source citations after the stream is complete.
 * @param {{sources: Array<{uri: string, title: string}>}} data 
 */
export const renderSources = (data) => {
    const { sources } = data;
    
    // Render Sources
    sourceList.innerHTML = ''; // Clear previous sources
    
    if (sources.length > 0) {
        sourcesArea.classList.remove('hidden');
        sources.forEach((source, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'text-sm text-gray-600 hover:text-blue-700';
            listItem.innerHTML = `<a href="${source.uri}" target="_blank" class="flex items-start">
                                    <span class="mr-1 text-blue-500 font-semibold">${index + 1}.</span> 
                                    <span class="truncate">${source.title}</span>
                                  </a>`;
            sourceList.appendChild(listItem);
        });
    } else {
        sourcesArea.classList.add('hidden');
    }
};
