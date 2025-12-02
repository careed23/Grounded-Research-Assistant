<div align="center">

🌟 Grounded AI Research Assistant 🤖

This project demonstrates a modern, full-stack approach to implementing a Generative AI application, specifically focusing on Retrieval-Augmented Generation (RAG) principles to ensure outputs are factual and grounded in real-time web data.

<!-- SHIELDS -->

</div>

The application showcases proficiency in: modular JavaScript architecture, class-based development (OOP), asynchronous streaming, prompt engineering, and API integration with robustness (retry logic).

🌟 Features

Real-Time Grounding: Utilizes Google Search as a grounding tool to generate answers based on up-to-date, external information.

Response Streaming: Implements API streaming for fast, character-by-character output, improving user experience.

Advanced Prompt Management: Allows the user to dynamically adjust the AI's persona and output style via a configurable System Prompt.

Modular Architecture: Separates application logic into distinct modules (api.js, ui.js, main.js) using ES6 classes for maintainability and scalability.

Robustness: Includes exponential backoff for API calls to handle network resilience.

🛠️ Technology Stack

Frontend: HTML5, Tailwind CSS (for modern, responsive UI).

Controller: Class-based ES6 JavaScript (js/main.js).

API/Backend: Google Gemini API (gemini-2.5-flash-preview-09-2025) using the generateContentStream endpoint.

🚀 Setup and Usage (Local Development)

This is a pure client-side application. To run it locally:

Clone the repository:

git clone [YOUR_REPO_URL]
cd Grounded-AI-Assistant



Run Locally: Simply open index.html in your web browser. Since the application is running in a sandbox environment (like Canvas), the API key is handled automatically.

📐 Architecture Diagram

The system follows a standard modular client-side pattern: The web browser client (Frontend) requests content from an Nginx Docker container. The client's JavaScript then calls the Gemini API endpoint, which uses the Google Search tool to augment the generation, returning streamed, grounded responses.

📦 MLOps & Deployment (Production Readiness)

This project is built for production using containerization to ensure reliable deployment across cloud environments.

Containerization: The Dockerfile packages the application for easy deployment using Nginx.

Deployment Strategy: Refer to the deployment.md file for CI/CD pipeline and cloud deployment steps.

🎯 Demonstrated Skills for Hiring Managers

Skill Category

Demonstrated In

Value Proposition

Generative AI / LLMs

Using systemInstruction, RAG implementation via search grounding, and streaming.

Can build reliable, factual, and modern LLM applications.

Software Engineering

Modular file structure (js/), Class-based controller (AppController), ES6 imports/exports.

Writes clean, scalable, and maintainable production code.

Robustness / MLOps Prep

fetchWithRetry logic in api.js, Dockerfile, and CI/CD documentation.

Ensures the application is resilient to failures and handles deployment gracefully at scale.

Front-End Development

Tailwind CSS for responsiveness, asynchronous UI updates (appendStreamChunk).

Capable of delivering excellent user experience (UX).
