/**
 * ============================================================================
 * LOCAL RAG KNOWLEDGE BASE (knowledge.js)
 * ============================================================================
 * Students: Add your custom articles, school rules, product info, or study guides
 * here. The chatbot will automatically search these documents and inject the
 * most relevant ones into the prompt when a user asks a matching question!
 * ============================================================================
 */

const KNOWLEDGE_BASE = [
    {
        id: "doc-01",
        title: "About This Chatbot Template",
        keywords: ["template", "creator", "author", "ramadhirra", "architecture", "project", "who made"],
        content: `This Gemini Chatbot Template was architected and created by Ramadhirra Azzahra Putri, S.T. It is designed as a clean, modular, industry-standard starter kit for 10th-grade students to build and deploy custom AI assistants on GitHub Pages. It supports custom system prompts, hyperparameter tuning (Temperature, Top-P, Top-K), sliding context windows, and client-side Retrieval-Augmented Generation (RAG).`
    },
    {
        id: "doc-02",
        title: "How to Customize Your Bot",
        keywords: ["customize", "edit", "change", "config", "temperature", "system prompt", "cards", "rag"],
        content: `Students can customize the bot by editing two files:
1. config.js: Change the botName, introCards, systemPrompt, contextWindowLimit, and generationConfig (temperature, topP, topK).
2. knowledge.js: Add custom text chunks to the KNOWLEDGE_BASE array so the bot can answer specific questions about your chosen topic.`
    },
    {
        id: "doc-03",
        title: "API Key Security on GitHub Pages",
        keywords: ["api key", "security", "github pages", "expose", "localstorage", "proxy", "safe"],
        content: `Never hardcode an API key directly inside JavaScript files pushed to a public GitHub repository. This template protects keys by storing the user's Gemini API key exclusively inside their own browser's localStorage, or by connecting to a serverless proxy endpoint configured in config.js.`
    }
];

Object.freeze(KNOWLEDGE_BASE);
