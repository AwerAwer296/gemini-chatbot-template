/**
 * ============================================================================
 * ADMIN CONFIGURATION FILE (config.js)
 * ============================================================================
 */

const BOT_CONFIG = {
    // ------------------------------------------------------------------------
    // 1. BRANDING & UI SETTINGS
    // ------------------------------------------------------------------------
    botName: "Agra",
    botSubtitle: "Powered by Google Gemini • Custom Knowledge Base",
    botAvatar: "🤖",
    userAvatar: "🧑‍💻",
    welcomeHeading: "Hello! How can I help you today?",
    welcomeSubtext: "Select a starter prompt below or type your own question to begin.",

    introCards: [
        {
            icon: "📚",
            title: "Explain a Concept",
            description: "Break down complex topics into simple, everyday terms.",
            prompt: "Can you explain how artificial intelligence works in simple terms?"
        },
        {
            icon: "⚡",
            title: "Check Knowledge Base",
            description: "Ask questions about our custom internal documents.",
            prompt: "What information do you have in your official knowledge base?"
        },
        {
            icon: "💡",
            title: "Brainstorm Ideas",
            description: "Generate creative project ideas and structured outlines.",
            prompt: "Give me 3 creative science fair project ideas involving robotics."
        },
        {
            icon: "🛠️",
            title: "Debug & Troubleshoot",
            description: "Step-by-step assistance for solving technical problems.",
            prompt: "How should I approach debugging a program that isn't working as expected?"
        }
    ],

    // ------------------------------------------------------------------------
    // 2. SECURITY & ENDPOINT SETTINGS
    // ------------------------------------------------------------------------
    // PROXY_URL forces the app to route requests through your Netlify backend
    authMode: "PROXY_URL", 
    // Replace this with your actual Netlify function URL once deployed
    proxyEndpoint: "https://your-site.netlify.app/.netlify/functions/gemini-proxy", 
    modelName: "gemini-3.5-flash-lite",

    // ------------------------------------------------------------------------
    // 3. ADVANCED GENERATION PARAMETERS
    // ------------------------------------------------------------------------
    generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        topK: 32,
        maxOutputTokens: 1024,
    },

    // ------------------------------------------------------------------------
    // 4. CONVERSATION MEMORY & RAG SETTINGS
    // ------------------------------------------------------------------------
    contextWindowLimit: 10,

    ragConfig: {
        enabled: true,
        topKChunks: 2,
        minRelevanceScore: 0.12
    },

    // ------------------------------------------------------------------------
    // 5. SYSTEM PROMPT & GUARDRAILS
    // ------------------------------------------------------------------------
    systemPrompt: `You are Nexus, a helpful, accurate, and friendly AI assistant created for a school project.
Follow these core rules at all times:
1. Tone & Style: Be clear, encouraging, concise, and structured. Use bullet points or bold text for readability.
2. Grounded Answers: When "[REFERENCE DOCUMENTS]" are provided with the user's message, prioritize those facts above all else.
3. Honesty: If you do not know the answer, state clearly what you know and do not fabricate facts.
4. Safety: Refuse to generate harmful, inappropriate, or academic-dishonesty content.`,

    ragInjectionTemplate: `Use the following [REFERENCE DOCUMENTS] to answer the user's question accurately. If the documents are not relevant to the question, rely on your general knowledge without mentioning the documents explicitly.`
};

Object.freeze(BOT_CONFIG);
Object.freeze(BOT_CONFIG.generationConfig);
Object.freeze(BOT_CONFIG.ragConfig);
