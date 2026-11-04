/**
 * ============================================================================
 * ADMIN CONFIGURATION FILE (config.js)
 * ============================================================================
 * Students: Edit the values below to customize your chatbot's personality,
 * AI parameters, and starter cards. Do NOT put your raw API key in this file!
 * ============================================================================
 */

const BOT_CONFIG = {
    // ------------------------------------------------------------------------
    // 1. BRANDING & UI SETTINGS (Visible to users)
    // ------------------------------------------------------------------------
    botName: "Nexus AI Assistant",
    botSubtitle: "Powered by Google Gemini • Custom Knowledge Base",
    botAvatar: "🤖", // Emoji or URL to an image (e.g., "./assets/avatar.png")
    userAvatar: "🧑‍💻",
    welcomeHeading: "Hello! How can I help you today?",
    welcomeSubtext: "Select a starter prompt below or type your own question to begin.",

    // Starter cards displayed on the empty chat screen.
    // Students can edit these to match their specific chatbot topic.
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
    // 2. SECURITY & ENDPOINT SETTINGS (Hidden from UI)
    // ------------------------------------------------------------------------
    // Mode "LOCAL_KEY": Prompts user for a Gemini API Key and saves it in browser localStorage.
    // Mode "PROXY_URL": Uses a serverless backend URL (Netlify/Cloudflare/Vercel) so no key is needed on frontend.
    authMode: "LOCAL_KEY", 
    proxyEndpoint: "https://your-serverless-proxy.example.com/api/chat", // Only used if authMode === "PROXY_URL"
    modelName: "gemini-2.5-flash", // Recommended default model

    // ------------------------------------------------------------------------
    // 3. ADVANCED GENERATION PARAMETERS (Admin Only - Hidden from UI)
    // ------------------------------------------------------------------------
    generationConfig: {
        temperature: 0.7,       // 0.0 = strict/focused, 1.0 = balanced, 2.0 = very creative
        topP: 0.95,             // Nucleus sampling probability threshold (0.0 to 1.0)
        topK: 40,               // Limits token pool to top K most likely tokens
        maxOutputTokens: 1024,  // Maximum length of the bot's reply
    },

    // ------------------------------------------------------------------------
    // 4. CONVERSATION MEMORY & RAG SETTINGS (Admin Only - Hidden from UI)
    // ------------------------------------------------------------------------
    // Maximum number of past messages (user + bot turns) sent to the API.
    // Prevents hitting token limits and keeps responses fast.
    contextWindowLimit: 10,

    // Retrieval-Augmented Generation (RAG) Settings
    ragConfig: {
        enabled: true,          // Set to false to disable local document search
        topKChunks: 2,          // Number of most relevant document chunks to inject per query
        minRelevanceScore: 0.12 // Minimum keyword overlap score required to inject a document
    },

    // ------------------------------------------------------------------------
    // 5. SYSTEM PROMPT & GUARDRAILS (Admin Only - Hidden from UI)
    // ------------------------------------------------------------------------
    systemPrompt: `You are Nexus, a helpful, accurate, and friendly AI assistant created for a school project.
Follow these core rules at all times:
1. Tone & Style: Be clear, encouraging, concise, and structured. Use bullet points or bold text for readability.
2. Grounded Answers: When "[REFERENCE DOCUMENTS]" are provided with the user's message, prioritize those facts above all else.
3. Honesty: If you do not know the answer or if the reference documents do not contain specific internal details asked by the user, state clearly what you know and do not fabricate facts.
4. Safety: Refuse to generate harmful, inappropriate, or academic-dishonesty content.`,

    // Hidden instruction appended when RAG documents are found
    ragInjectionTemplate: `Use the following [REFERENCE DOCUMENTS] to answer the user's question accurately. If the documents are not relevant to the question, rely on your general knowledge without mentioning the documents explicitly.`
};

// Freeze configuration so it cannot be tampered with via the browser console at runtime
Object.freeze(BOT_CONFIG);
Object.freeze(BOT_CONFIG.generationConfig);
Object.freeze(BOT_CONFIG.ragConfig);
