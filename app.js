/**
 * ============================================================================
 * CORE APPLICATION ENGINE (app.js)
 * ============================================================================
 */

const STORAGE_KEY_THEME = "GEMINI_STUDENT_TEMPLATE_THEME";
const STORAGE_KEY_HISTORY = "GEMINI_CHAT_HISTORY";

let conversationHistory = [];
let isGenerating = false;

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
    btnExportChat: document.getElementById("btn-export-chat"),
    btnClearChat: document.getElementById("btn-clear-chat")
};

function initApp() {
    document.title = BOT_CONFIG.botName;
    dom.headerAvatar.textContent = BOT_CONFIG.botAvatar;
    dom.heroAvatar.textContent = BOT_CONFIG.botAvatar;
    dom.headerTitle.textContent = BOT_CONFIG.botName;
    dom.headerSubtitle.textContent = BOT_CONFIG.botSubtitle;
    dom.welcomeHeading.textContent = BOT_CONFIG.welcomeHeading;
    dom.welcomeSubtext.textContent = BOT_CONFIG.welcomeSubtext;

    renderIntroCards();

    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || "dark";
    setTheme(savedTheme);

    loadHistoryFromLocal();
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

function retrieveRelevantDocuments(query) {
    if (!BOT_CONFIG.ragConfig.enabled || typeof KNOWLEDGE_BASE === "undefined") return "";

    const cleanTokens = query.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(w => w.length > 2);
    if (cleanTokens.length === 0) return "";

    const scoredDocs = KNOWLEDGE_BASE.map((doc) => {
        const haystack = `${doc.title} ${doc.keywords.join(" ")} ${doc.content}`.toLowerCase();
        let matchScore = 0;
        cleanTokens.forEach((token) => {
            if (doc.keywords.some(kw => kw.toLowerCase().includes(token))) matchScore += 0.35;
            else if (haystack.includes(token)) matchScore += 0.15;
        });
        return { doc, score: matchScore / Math.sqrt(cleanTokens.length) };
    });

    const relevant = scoredDocs
        .filter(item => item.score >= BOT_CONFIG.ragConfig.minRelevanceScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, BOT_CONFIG.ragConfig.topKChunks);

    if (relevant.length === 0) return "";
    const formattedChunks = relevant.map(item => `--- Document: ${item.doc.title} ---\n${item.doc.content}`).join("\n\n");
    return `[REFERENCE DOCUMENTS]\n${formattedChunks}\n[/REFERENCE DOCUMENTS]\n\n${BOT_CONFIG.ragInjectionTemplate}\n\n`;
}

async function handleSendMessage(e) {
    if (e) e.preventDefault();
    if (isGenerating) return;

    const rawText = dom.userInput.value.trim();
    if (!rawText) return;

    dom.welcomeScreen.classList.add("hidden");
    dom.userInput.value = "";
    dom.userInput.style.height = "auto";

    appendMessageUI("user", rawText);

    const ragContext = retrieveRelevantDocuments(rawText);
    const augmentedPrompt = ragContext ? `${ragContext}User Question: ${rawText}` : rawText;

    const maxTurns = Math.max(2, BOT_CONFIG.contextWindowLimit);
    const recentHistory = conversationHistory.slice(-maxTurns);
    const contentsPayload = [...recentHistory, { role: "user", parts: [{ text: augmentedPrompt }] }];

    isGenerating = true;
    dom.btnSend.disabled = true;
    const typingRow = appendTypingIndicator();

    try {
        const botReplyText = await callProxyAPI(contentsPayload);
        
        conversationHistory.push({ role: "user", parts: [{ text: rawText }] });
        conversationHistory.push({ role: "model", parts: [{ text: botReplyText }] });
        saveHistoryToLocal();

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

async function callProxyAPI(contents) {
    const requestBody = {
        system_instruction: { parts: [{ text: BOT_CONFIG.systemPrompt }] },
        contents: contents,
        generationConfig: BOT_CONFIG.generationConfig,
        model: BOT_CONFIG.modelName
    };

    const endpoint = BOT_CONFIG.proxyEndpoint;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || `HTTP ${response.status} Error`);
    
    const candidateText = data.text;
    if (!candidateText) throw new Error("No response text returned from proxy.");
    
    return candidateText;
}

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

function renderMarkdown(rawText) {
    let html = escapeHTML(rawText);
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => `<pre><code class="language-${lang || "plaintext"}">${code.trim()}</code></pre>`);
    html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/^(?:[-*])\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");
    return html.split(/\n{2,}/).map(para => {
        if (para.startsWith("<pre>") || para.startsWith("<ul>")) return para;
        return `<p>${para.replace(/\n/g, "<br>")}</p>`;
    }).join("");
}

function saveHistoryToLocal() {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(conversationHistory));
}

function loadHistoryFromLocal() {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (saved) {
        try {
            conversationHistory = JSON.parse(saved);
            if (conversationHistory.length > 0) {
                dom.welcomeScreen.classList.add("hidden");
                conversationHistory.forEach(msg => {
                    appendMessageUI(msg.role === "user" ? "user" : "bot", msg.parts[0].text);
                });
            }
        } catch (e) {
            console.error("Failed to parse local history.", e);
        }
    }
}

function exportChatHistory() {
    if (conversationHistory.length === 0) return alert("No chat history to export.");
    let textOutput = `Chat Export - ${BOT_CONFIG.botName}\nDate: ${new Date().toLocaleString()}\n\n`;
    
    conversationHistory.forEach(msg => {
        const sender = msg.role === "user" ? "User" : "Bot";
        textOutput += `[${sender}]:\n${msg.parts[0].text}\n\n`;
    });

    const blob = new Blob([textOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-history.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    dom.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function attachEventListeners() {
    dom.chatForm.addEventListener("submit", handleSendMessage);

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

    dom.btnThemeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
    });

    dom.btnExportChat.addEventListener("click", exportChatHistory);

    dom.btnClearChat.addEventListener("click", () => {
        conversationHistory = [];
        localStorage.removeItem(STORAGE_KEY_HISTORY);
        dom.messagesContainer.innerHTML = "";
        dom.welcomeScreen.classList.remove("hidden");
    });
}

document.addEventListener("DOMContentLoaded", initApp);
