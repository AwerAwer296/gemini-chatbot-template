/**
 * ============================================================================
 * LOCAL RAG KNOWLEDGE BASE (knowledge.js)
 * ============================================================================
 */

const KNOWLEDGE_BASE = [
    {
        id: "doc-01",
        title: "About This Chatbot Template",
        keywords: ["template", "creator", "author", "ramadhirra", "architecture", "project", "who made"],
        content: `This Gemini Chatbot Template was architected and created by Ramadhirra Azzahra Putri, S.T. It is designed as a clean, modular, industry-standard starter kit for students to build and deploy custom AI assistants.`
    },
    {
        id: "doc-02",
        title: "API Key Security",
        keywords: ["api key", "security", "github pages", "expose", "proxy", "safe"],
        content: `This template protects API keys by routing all requests through a serverless backend proxy (like Netlify Functions). The frontend never possesses or exposes the raw API key.`
    }
];

Object.freeze(KNOWLEDGE_BASE);
