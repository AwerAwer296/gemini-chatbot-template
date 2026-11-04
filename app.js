/**
 * ============================================================================
 * CORE APPLICATION ENGINE (app.js)
 * ============================================================================
 * Handles UI rendering, localStorage API key security, client-side TF-IDF RAG
 * retrieval, sliding context window management, and Gemini REST API calls.
 * ============================================================================
 */

const STORAGE_KEY_API = "GEMINI_STUDENT_TEMPLATE_API_KEY";
const STORAGE_KEY_THEME = "GEMINI_STUDENT_TEMPLATE_THEME";

// Runtime conversation memory (stores { role: "user" | "model", parts: [{ text }] })
let conversationHistory = [];
let isGenerating = false;

// DOM Elements
const dom = {
    headerAvatar: document.getElementById("header-avatar"),
    headerTitle: document.getElementById("header-title"),
    headerSubtitle: document.getElementById("header-subtitle"),
    heroAvatar: document.getElementById("hero-avatar"),
    welcomeHeading: document.getElementById("welcome-heading"),
    welcomeSubtext: document.getElementById("welcome-subtext"),
    introCardsGrid: document.getElementById("intro-cards-grid"),
    welcomeScreen: document.getElementById("welcome-screen"),
    messagesContainer: document.getElementById("messages-container"),
    chatViewport: document.getElementById("chat-viewport"),
    chatForm: document.getElementById("chat-form"),
    userInput: document.getElementById("user-input"),
    btnSend: document.getElementById("btn-send"),
    btnThemeToggle: document.getElementById("btn-theme-toggle"),
    themeIcon: document.getElementById("theme-icon"),
    btnApiKey: document.getElementById("btn-api-key"),
    btnClearChat: document.getElementById("btn-clear-chat"),
    apiModal: document.getElementById("api-modal"),
    apiKeyInput: document.getElementById("api-key-input"),
    btnSaveKey: document.getElementById("btn-save-key"),
    btnRemoveKey: document.getElementById("btn-remove-key"),
    btnCloseModal: document.getElementById("btn-close-modal")
};

/* ==========================================================================
   1. INITIALIZATION & UI HYDRATION FROM CONFIG.JS
   ========================================================================== */
function initApp() {
    // Populate branding from BOT_CONFIG
    document.title = BOT_CONFIG.botName;
    dom.headerAvatar.textContent = BOT_CONFIG.botAvatar;
    dom.heroAvatar.textContent = BOT_CONFIG.botAvatar;
    dom.headerTitle.textContent = BOT_CONFIG.botName;
    dom.headerSubtitle.textContent = BOT_CONFIG.botSubtitle;
    dom.welcomeHeading.textContent = BOT_CONFIG.welcomeHeading;
    dom.welcomeSubtext.textContent = BOT_CONFIG.welcomeSubtext;

    // Render starter Intro Cards
    renderIntroCards();

    // Load saved theme preference
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || "dark";
    setTheme(savedTheme);

    // Hide API Key button if using Serverless Proxy mode
    if (BOT_CONFIG.authMode === "PROXY_URL") {
        dom.btnApiKey.classList.add("hidden");
    } else if (!getStoredApiKey()) {
        // Prompt for API key on first visit in LOCAL_KEY mode
        openApiModal();
    }

    attachEventListeners();
}

function renderIntroCards() {
    dom.introCardsGrid.innerHTML = "";
    BOT_CONFIG.introCards.forEach((card) => {
        const cardEl = document.createElement("button");
        cardEl.type = "button";
        cardEl.className = "intro-card";
        cardEl.innerHTML = `
            <div class="intro-card-header">
                <span>${escapeHTML(card.icon)}</span>
                <span>${escapeHTML(card.title)}</span>
            </div>
            <p class="intro-card-desc">${escapeHTML(card.description)}</p>
        `;
        cardEl.addEventListener("click", () => {
            dom.userInput.value = card.prompt;
            handleSendMessage();
        });
        dom.introCardsGrid.appendChild(cardEl);
    });
}

/* ==========================================================================
   2. SIMPLE DOCUMENT RAG ENGINE (TF-IDF / KEYWORD OVERLAP)
   ========================================================================== */
/**
 * Searches KNOWLEDGE_BASE in knowledge.js for chunks matching the user's query.
 * @param {string} query - The user's input question.
 * @returns {string} Formatted reference context block, or empty string if none match.
 */
function retrieveRelevantDocuments(query) {
    if (!BOT_CONFIG.ragConfig.enabled || typeof KNOWLEDGE_BASE === "undefined") {
        return "";
    }

    const cleanTokens = query
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 2);

    if (cleanTokens.length === 0) return "";

    const scoredDocs = KNOWLEDGE_BASE.map((doc) => {
        const haystack = `${doc.title} ${doc.keywords.join(" ")} ${doc.content}`.toLowerCase();
        let matchScore = 0;

        cleanTokens.forEach((token) => {
            if (doc.keywords.some((kw) => kw.toLowerCase().includes(token))) {
                matchScore += 0.35; // High weight for explicit keyword hit
            } else if (haystack.includes(token)) {
                matchScore += 0.15; // Standard weight for content hit
            }
        });

        // Normalize slightly by token count
        const normalizedScore = matchScore / Math.sqrt(cleanTokens.length);
        return { doc, score: normalizedScore };
    });

    const relevant = scoredDocs
        .filter((item) => item.score >= BOT_CONFIG.ragConfig.minRelevanceScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, BOT_CONFIG.ragConfig.topKChunks);

    if (relevant.length === 0) return "";

    const formattedChunks = relevant
        .map((item) => `--- Document: ${item.doc.title} ---\n${item.doc.content}`)
        .join("\n\n");

    return `[REFERENCE DOCUMENTS]\n${formattedChunks}\n[/REFERENCE DOCUMENTS]\n\n${BOT_CONFIG.ragInjectionTemplate}\n\n`;
}

/* ==========================================================================
   3. GEMINI API INTEGRATION & CONTEXT WINDOW MANAGEMENT
   ========================================================================== */
async function handleSendMessage(e) {
    if (e) e.preventDefault();
    if (isGenerating) return;

    const rawText = dom.userInput.value.trim();
    if (!rawText) return;

    // Verify API key if in LOCAL_KEY mode
    const apiKey = getStoredApiKey();
    if (BOT_CONFIG.authMode === "LOCAL_KEY" && !apiKey) {
        openApiModal();
        return;
    }

    // Hide welcome screen once conversation starts
    dom.welcomeScreen.classList.add("hidden");

    // Clear input and reset height
    dom.userInput.value = "";
    dom.userInput.style.height = "auto";

    // 1. Render User Message in UI
    appendMessageUI("user", rawText);

    // 2. Run Local RAG Search
    const ragContext = retrieveRelevantDocuments(rawText);
    const augmentedPrompt = ragContext ? `${ragContext}User Question: ${rawText}` : rawText;

    // 3. Enforce Sliding Context Window Limit from config.js
    const maxTurns = Math.max(2, BOT_CONFIG.contextWindowLimit);
    const recentHistory = conversationHistory.slice(-maxTurns);

    // Build payload contents array
    const contentsPayload = [
        ...recentHistory,
        { role: "user", parts: [{ text: augmentedPrompt }] }
    ];

    // 4. Show Bot Typing Indicator
    isGenerating = true;
    dom.btnSend.disabled = true;
    const typingRow = appendTypingIndicator();

    try {
        const botReplyText = await callGeminiAPI(contentsPayload, apiKey);

        // Save clean un-augmented user text + bot response into sliding memory
        conversationHistory.push({ role: "user", parts: [{ text: rawText }] });
        conversationHistory.push({ role: "model", parts: [{ text: botReplyText }] });

        typingRow.remove();
        appendMessageUI("bot", botReplyText);
    } catch (error) {
        typingRow.remove();
        appendMessageUI("bot", `⚠️ **Connection Error:** ${error.message}`);
    } finally {
        isGenerating = false;
        dom.btnSend.disabled = false;
        dom.userInput.focus();
    }
}

async function callGeminiAPI(contents, apiKey) {
    const requestBody = {
        system_instruction: {
            parts: [{ text: BOT_CONFIG.systemPrompt }]
        },
        contents: contents,
        generationConfig: {
            temperature: BOT_CONFIG.generationConfig.temperature,
            topP: BOT_CONFIG.generationConfig.topP,
            topK: BOT_CONFIG.generationConfig.topK,
            maxOutputTokens: BOT_CONFIG.generationConfig.maxOutputTokens
        }
    };

    const endpoint =
        BOT_CONFIG.authMode === "PROXY_URL"
            ? BOT_CONFIG.proxyEndpoint
            : `https://generativelanguage.googleapis.com/v1beta/models/${BOT_CONFIG.modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
        const errMessage = data?.error?.message || `HTTP ${response.status} Error`;
        throw new Error(errMessage);
    }

    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
        throw new Error("No response text returned from Gemini. Check safety filters or token limits.");
    }

    return candidateText;
}

/* ==========================================================================
   4. UI RENDERING & SAFE MARKDOWN PARSER
   ========================================================================== */
function appendMessageUI(sender, text) {
    const row = document.createElement("div");
    row.className = `message-row ${sender}`;

    const avatar = sender === "user" ? BOT_CONFIG.userAvatar : BOT_CONFIG.botAvatar;
    const formattedContent = sender === "user" ? escapeHTML(text).replace(/\n/g, "<br>") : renderMarkdown(text);

    row.innerHTML = `
        <div class="msg-avatar">${escapeHTML(avatar)}</div>
        <div class="msg-bubble">${formattedContent}</div>
    `;

    dom.messagesContainer.appendChild(row);
    scrollToBottom();
}

function appendTypingIndicator() {
    const row = document.createElement("div");
    row.className = "message-row bot";
    row.innerHTML = `
        <div class="msg-avatar">${escapeHTML(BOT_CONFIG.botAvatar)}</div>
        <div class="msg-bubble">
            <div class="typing-indicator" aria-label="AI is thinking">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;
    dom.messagesContainer.appendChild(row);
    scrollToBottom();
    return row;
}

function scrollToBottom() {
    dom.chatViewport.scrollTop = dom.chatViewport.scrollHeight;
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Lightweight, XSS-safe Markdown renderer for code blocks, bold, italics, and lists.
 */
function renderMarkdown(rawText) {
    let html = escapeHTML(rawText);

    // 1. Fenced Code Blocks (```lang ... ```)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="language-${lang || "plaintext"}">${code.trim()}</code></pre>`;
    });

    // 2. Inline Code (`code`)
    html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");

    // 3. Bold (**text**) and Italic (*text*)
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    // 4. Bullet lists (- item or * item)
    html = html.replace(/^(?:[-*])\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    // 5. Paragraphs & Line Breaks
    return html
        .split(/\n{2,}/)
        .map((para) => {
            if (para.startsWith("<pre>") || para.startsWith("<ul>")) return para;
            return `<p>${para.replace(/\n/g, "<br>")}</p>`;
        })
        .join("");
}

/* ==========================================================================
   5. EVENT LISTENERS, THEME & API KEY MODAL MANAGEMENT
   ========================================================================== */
function getStoredApiKey() {
    return localStorage.getItem(STORAGE_KEY_API) || "";
}

function openApiModal() {
    dom.apiKeyInput.value = getStoredApiKey();
    dom.apiModal.classList.remove("hidden");
    dom.apiKeyInput.focus();
}

function closeApiModal() {
    dom.apiModal.classList.add("hidden");
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    dom.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function attachEventListeners() {
    // Form submission
    dom.chatForm.addEventListener("submit", handleSendMessage);

    // Enter to send, Shift+Enter for newline, auto-resize textarea
    dom.userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    dom.userInput.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = `${Math.min(this.scrollHeight, 140)}px`;
    });

    // Theme toggle
    dom.btnThemeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
    });

    // Clear conversation
    dom.btnClearChat.addEventListener("click", () => {
        conversationHistory = [];
        dom.messagesContainer.innerHTML = "";
        dom.welcomeScreen.classList.remove("hidden");
    });

    // API Key Modal controls
    dom.btnApiKey.addEventListener("click", openApiModal);
    dom.btnCloseModal.addEventListener("click", closeApiModal);

    dom.btnSaveKey.addEventListener("click", () => {
        const key = dom.apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem(STORAGE_KEY_API, key);
            closeApiModal();
        }
    });

    dom.btnRemoveKey.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEY_API);
        dom.apiKeyInput.value = "";
    });
}

// Launch app when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
