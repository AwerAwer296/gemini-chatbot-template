/**
 * ============================================================================
 * LOCAL RAG KNOWLEDGE BASE (knowledge.js)
 * ============================================================================
 */

const KNOWLEDGE_BASE = [
    {
        id: "doc-01",
        title: "mengenali jenis hama wereng",
        keywords: ["hama", "wereng"],
        content: `Kenali jenis wereng: Wereng Cokelat (Nilaparvata lugens) paling merusak karena menghisap cairan batang, memicu gejala hopperburn (tanaman menguning lalu mengering seperti terbakar), serta menularkan virus kerdil rumput dan kerdil hampa. Ada juga Wereng Punggung Putih (Sogatella furcifera) dan Wereng Hijau (Nephotettix virescens)..`
    },
    {
        id: "doc-02",
        title: "API Key Security",
        keywords: ["api key", "security", "github pages", "expose", "proxy", "safe"],
        content: `This template protects API keys by routing all requests through a serverless backend proxy (like Netlify Functions). The frontend never possesses or exposes the raw API key.`
    }
];

Object.freeze(KNOWLEDGE_BASE);
