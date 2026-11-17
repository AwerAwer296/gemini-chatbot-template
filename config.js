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
    botAvatar: "🧑‍🌾",
    userAvatar: "🗣",
    welcomeHeading: "Hello! How can I help you today?",
    welcomeSubtext: "Select a starter prompt below or type your own question to begin.",

    introCards: [
        {
            icon: "🌾",
            title: "Tanya masalah tani ke agra",
            description: "asisten pintar untuk berkonsultasi seputar hama, pemupukan, dan teknik bercocok tanam.",
            prompt: "halo Agra, bagaimana cara mengatasi hama wereng pada tanaman padi secara efektif?"
        },
        {
            icon: "🐛",
            title: "solusi hama & penyakit",
            description: "atasi serangan wereng, ulat, atau jamur pada tanaman.",
            prompt: "bagaimana cara mengatasi hama wereng pada tanaman padi?"
        },
        {
            icon: "🧪",
            title: "Tips pemupukan",
            description: "Tanya takaran dan waktu terbaik untuk memupuk tanaman.",
            prompt: "Kapan waktu terbaik untuk memberikan pupuk pada tanaman cabai?"
        },
        {
            icon: "💦",
            title: "Teknik irigasi & tanah",
            description: "Konsultasi soal penyiraman dan kesuburan tanah.",
            prompt: "Bagaimana ciri-ciri tanah yang kekurangan unsur hara?"
        }
    ],

    // ------------------------------------------------------------------------
    // 2. SECURITY & ENDPOINT SETTINGS
    // ------------------------------------------------------------------------
    // PROXY_URL forces the app to route requests through your Netlify backend
    authMode: "PROXY_URL", 
    // Replace this with your actual Netlify function URL once deployed
    proxyEndpoint: "https://agrachatbotai.netlify.app/.netlify/functions/gemini-proxy", 
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
    systemPrompt: `Kamu adalah agra, asisten visual cerdas yang ahli di bidang pertanian, agronomi, dan perawatan tanaman. Target penggunamu adalah petani lokal indonesia.
    Aturan dan karakteristik: 
    1. Identitas: Namamu Agra. Kamu ramah, sabar, dan sangat memahami dunia pertanian layaknya penyuluh pertanian lapangan yang berpengalaman. Sapa pengguna dengan sebutan akrab seperti "Kawan tani", "Pak tani", atau "Bu tani".
    2. Keahlian utama: memberikan solusi praktis untuk mengatasi hama dan penyakit tanaman, teknik pemupukan (organik/kimia), Pemilihan bibit unggul, jadwal tanam, serta pengolahan tanah yang baik.
    3. Gaya bahasa: gunakan bahasa indonesia yang santai, mudah dipahami, membumi, dan hindari istilah ilmiah yang terlalu rumit tanpa penjelasan sederhana.
    4. Format jawaban: berikan solusi yang jelas, sistematis (gunakan poin-poin jika perlu), dan bisa langsung dipraktikan di lahan pertanian.
    5. Batasan: jika pengguna bertanya diluar topik pertanian, perkebunan, atau perikanan darat, arahkan kembali pembicaraan dengan sopan ke topik seputar pertanian`,

    ragInjectionTemplate: `Use the following [REFERENCE DOCUMENTS] to answer the user's question accurately. If the documents are not relevant to the question, rely on your general knowledge without mentioning the documents explicitly.`
};

Object.freeze(BOT_CONFIG);
Object.freeze(BOT_CONFIG.generationConfig);
Object.freeze(BOT_CONFIG.ragConfig);
