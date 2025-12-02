/**
 * js/main.js
 * Main entry point for the application. Handles form submission and coordinates
 * between the UI and API modules using a class structure.
 */

import { getGroundedContent } from './api.js';
// UPDATED: Import appendStreamChunk and rename renderResponse to renderSources
import { updateUI, renderSources, appendStreamChunk } from './ui.js';

class AppController {
    // --- Constructor: Initialize references and bind events ---
    constructor() {
        // UI element references are now properties of the class instance
        this.form = document.getElementById('ai-form');
        this.queryInput = document.getElementById('user-query');
        this.systemPromptInput = document.getElementById('system-prompt-input');
        
        // Attach main event listener and bind 'this' to the class instance
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    // --- Core Logic: Event Handler ---
    async handleFormSubmit(e) {
        e.preventDefault();
        // Access references via 'this'
        const query = this.queryInput.value.trim();
        // Get the system prompt text
        const systemPrompt = this.systemPromptInput.value.trim();

        if (!query) return;

        updateUI('loading');

        try {
            // UPDATED: Call API with the required onChunk callback for streaming
            // The API function (getGroundedContent) will stream the text back using appendStreamChunk,
            // and then return the final sources object once the stream is complete.
            const result = await getGroundedContent(
                query, 
                systemPrompt, 
                appendStreamChunk // Pass the UI function as the stream handler
            );
            
            // Once streaming is done, render the final sources
            renderSources(result);
            updateUI('loaded'); // Mark UI state as loaded/complete
        } catch (error) {
            console.error("Query failed:", error);
            // Pass only the error message to the UI for display
            updateUI('error', error.message);
        }
    }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial state setup (managed by UI module)
    updateUI('ready'); 
    
    // Start the application by creating an instance of the controller
    new AppController();
});
