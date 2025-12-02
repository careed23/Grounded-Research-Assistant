<div align="center">
<h1 style="font-size: 2.5rem; font-weight: 800; color: #1e40af; text-shadow: 2px 2px 4px rgba(30, 64, 175, 0.4); margin-bottom: 0.5rem; letter-spacing: 0.05em;">
🌟 GROUNDED AI RESEARCH ASSISTANT 🤖
</h1>
<p style="font-size: 1.25rem; font-weight: 600; color: #3b82f6;">
Production-Ready Generative AI with RAG Principles
</p>

<!-- SHIELDS -->
<p style="margin-top: 1rem;">
[![Built With HTML5](https://img.shields.io/badge/Built_With-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Built With JavaScript](https://img.shields.io/badge/Built_With-JavaScript_ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Styling Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Powered By Gemini API](https://img.shields.io/badge/Powered_By-Gemini_API-007FFF?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/models/gemini)
[![Containerized with Docker](https://img.shields.io/badge/Deployment-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
</p>


</div>

<div style="background-color: #e0f2f1; padding: 10px; border-left: 4px solid #14b8a6; border-radius: 4px; margin-bottom: 15px;">
<h2 style="font-size: 1.5rem; font-weight: 700; color: #0f766e; margin: 0;">
🌟 Features
</h2>
</div>

Real-Time Grounding: Utilizes Google Search as a grounding tool to generate answers based on up-to-date, external information.

Response Streaming: Implements API streaming for fast, character-by-character output, improving user experience.

Advanced Prompt Management: Allows the user to dynamically adjust the AI's persona and output style via a configurable System Prompt.

Modular Architecture: Separates application logic into distinct modules (api.js, ui.js, main.js) using ES6 classes for maintainability and scalability.

Robustness: Includes exponential backoff for API calls to handle network resilience.

<div style="background-color: #e0f7fa; padding: 10px; border-left: 4px solid #06b6d4; border-radius: 4px; margin-bottom: 15px;">
<h2 style="font-size: 1.5rem; font-weight: 700; color: #0891b2; margin: 0;">
🛠️ Technology Stack
</h2>
</div>

Frontend: HTML5, Tailwind CSS (for modern, responsive UI).

Controller: Class-based ES6 JavaScript (js/main.js).

API/Backend: Google Gemini API (gemini-2.5-flash-preview-09-2025) using the generateContentStream endpoint.

<div style="background-color: #f3e8ff; padding: 10px; border-left: 4px solid #a855f7; border-radius: 4px; margin-bottom: 15px;">
<h2 style="font-size: 1.5rem; font-weight: 700; color: #9333ea; margin: 0;">
🚀 Setup and Usage (Local Development)
</h2>
</div>

This is a pure client-side application. To run it locally:

Clone the repository:

git clone [YOUR_REPO_URL]
cd Grounded-AI-Assistant


Run Locally: Simply open index.html in your web browser. Since the application is running in a sandbox environment (like Canvas), the API key is handled automatically.

<div style="background-color: #fee2e2; padding: 10px; border-left: 4px solid #ef4444; border-radius: 4px; margin-bottom: 15px;">
<h2 style="font-size: 1.5rem; font-weight: 700; color: #dc2626; margin: 0;">
📐 Architecture Diagram
</h2>
</div>

The system follows a standard modular client-side pattern: The web browser client (Frontend) requests content from an Nginx Docker container. The client's JavaScript then calls the Gemini API endpoint, which uses the Google Search tool to augment the generation, returning streamed, grounded responses.




<div style="background-color: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; border-radius: 4px; margin-bottom: 15px;">
<h2 style="font-size: 1.5rem; font-weight: 700; color: #d97706; margin: 0;">
📦 MLOps & Deployment (Production Readiness)
</h2>
</div>

This project is built for production using containerization to ensure reliable deployment across cloud environments.

Containerization: The Dockerfile packages the application for easy deployment using Nginx.

Deployment Strategy: Refer to the deployment.md file for CI/CD pipeline and cloud deployment steps.

<div style="background-color: #d1fae5; padding: 10px; border-left: 4px solid #10b981; border-radius: 4px; margin-bottom: 15px;">
<h2 style="font-size: 1.5rem; font-weight: 700; color: #059669; margin: 0;">
🎯 Demonstrated Skills for Hiring Managers
</h2>
</div>

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
