
<div align="center">

# 🚀 Gemini AI Chatbot Starter

### Serverless Proxy · Custom RAG · GitHub Pages

**A modular, customizable, and secure AI chatbot starter template powered by Google Gemini.**

[🇬🇧 English](#-english) · [🇮🇩 Bahasa Indonesia](#-bahasa-indonesia)

<br>

[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Backend](https://img.shields.io/badge/Backend-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Hosting](https://img.shields.io/badge/Hosting-GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

<br>

[✨ Features](#-english) · [🛠️ Tech Stack](#-tech-stack) · [📖 Setup Guide](#-step-by-step-setup-guide) · [⚙️ Customization](#step-4-customize-your-bot)

<br>

**Created by Ramadhirra Azzahra Putri, S.T.**

</div>

---

<a id="-english"></a>

# 🇬🇧 English

A clean, modular, and secure chatbot template powered by the **Google Gemini API**. Designed for students, educators, developers, and hackathon participants who want to fork, customize, and deploy their own AI chatbot without exposing sensitive API keys.

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Secure API Handling
Uses a Netlify Serverless Proxy to keep your Gemini API key on the backend instead of exposing it in public frontend code.

</td>
<td width="50%">

### 📚 Built-in Local RAG
Add your own documents, knowledge, PDFs, or school regulations through `knowledge.js`. The chatbot retrieves relevant information when answering questions.

</td>
</tr>
<tr>
<td width="50%">

### ⚙️ Admin Configuration
Customize `temperature`, `topP`, `systemPrompt`, bot identity, and introductory cards through `config.js`.

</td>
<td width="50%">

### 💾 Automatic Chat History
Conversations are saved locally in the browser, with an export feature for downloading chat history.

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Modern UI/UX
Glassmorphism-inspired interface, smooth animations, and built-in Dark/Light mode switching.

</td>
<td width="50%">

### 🚀 Easy Deployment
Deploy the frontend using GitHub Pages and connect it to a Netlify serverless backend.

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

| Component | Technology |
|:---:|:---|
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) |
| **AI Engine** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white) |
| **Deployment** | ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white) |

</div>

## 📖 Step-by-Step Setup Guide

<details open>
<summary><b>Step 1 — Fork and Prepare the Frontend</b></summary>

1. Click the **Fork** button at the top-right of this repository.
2. Navigate to your forked repository's **Settings → Pages**.
3. Under **Build and deployment**, configure:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.
5. Wait approximately 1–2 minutes for GitHub Pages to deploy your website.

</details>

<details>
<summary><b>Step 2 — Set Up the Secure Netlify Backend</b></summary>

Since public GitHub repositories should never contain secret API keys, Netlify will act as a secure serverless proxy.

1. Create a free account at [Netlify](https://app.netlify.com/).
2. Select **Add new site → Import an existing project**.
3. Connect your GitHub account.
4. Select your forked repository.
5. Leave the build settings empty (unless your project configuration requires otherwise) and deploy the site.
6. Once deployed, navigate to **Site configuration → Environment variables**.
7. Add the following environment variable:

   | Key | Value |
   |---|---|
   | `GEMINI_API_KEY` | Your actual Gemini API key from [Google AI Studio](https://aistudio.google.com/) |

8. Navigate to **Deploys → Trigger deploy → Deploy site** to apply the new environment variable.
9. Copy your Netlify site URL.

Example:

```text
https://my-proxy-site.netlify.app
```

</details>

<details>
<summary><b>Step 3 — Connect the Frontend to the Backend</b></summary>

1. Return to your GitHub repository.
2. Open `config.js`.
3. Locate the `proxyEndpoint` configuration.
4. Update the configuration with your Netlify deployment URL:

```javascript
authMode: "PROXY_URL",

proxyEndpoint:
  "https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/gemini-proxy",

modelName: "gemini-3.5-flash-lite", // or gemini-3-flash
```

5. Commit your changes.
6. Wait for GitHub Pages to update.

Your chatbot should now be connected to the serverless backend!

</details>

<details>
<summary><b>Step 4 — Customize Your Bot</b></summary>

**Customize the chatbot personality**

Open `config.js` and modify:

- `botName`
- `welcomeHeading`
- `introCards`
- `systemPrompt`
- `temperature`
- `topP`

**Add your own knowledge base**

Open `knowledge.js` and add your custom text or paragraphs to the `KNOWLEDGE_BASE` array.

The chatbot can then retrieve relevant information from your custom knowledge base when responding to users.

</details>

---

<div align="center">

### 🌍 Switch Language

[🇮🇩 Read in Bahasa Indonesia ↓](#-bahasa-indonesia)

[⬆ Back to Top](#-gemini-ai-chatbot-starter)

</div>

---

<a id="-bahasa-indonesia"></a>

# 🇮🇩 Bahasa Indonesia

Template chatbot yang modular, mudah dikustomisasi, dan aman, ditenagai oleh **Google Gemini API**.

Dirancang untuk siswa, guru, developer, dan peserta hackathon yang ingin membuat, memodifikasi, serta men-deploy chatbot AI mereka sendiri tanpa membocorkan API key yang bersifat rahasia.

## ✨ Fitur Utama

<table>
<tr>
<td width="50%">

### 🔐 Keamanan API Key
Menggunakan Netlify Serverless Proxy untuk menjaga API key Gemini tetap berada di backend, bukan di kode frontend publik.

</td>
<td width="50%">

### 📚 Local RAG Bawaan
Tambahkan dokumen, PDF, basis pengetahuan, atau peraturan sekolah melalui `knowledge.js`. Chatbot akan mengambil informasi yang relevan untuk menjawab pertanyaan pengguna.

</td>
</tr>
<tr>
<td width="50%">

### ⚙️ Konfigurasi Admin
Kustomisasi `temperature`, `topP`, `systemPrompt`, identitas bot, dan kartu intro melalui `config.js`.

</td>
<td width="50%">

### 💾 Riwayat Percakapan
Percakapan disimpan secara lokal di browser dan dilengkapi fitur ekspor untuk mengunduh riwayat chat.

</td>
</tr>
<tr>
<td width="50%">

### 🎨 UI/UX Modern
Antarmuka bergaya glassmorphism, animasi yang halus, serta fitur pergantian mode Gelap/Terang.

</td>
<td width="50%">

### 🚀 Deployment Mudah
Deploy frontend menggunakan GitHub Pages dan hubungkan dengan backend serverless Netlify.

</td>
</tr>
</table>

## 🛠️ Teknologi yang Digunakan

<div align="center">

| Komponen | Teknologi |
|:---:|:---|
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) |
| **AI Engine** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white) |
| **Deployment** | ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white) |

</div>

## 📖 Panduan Instalasi Lengkap

<details open>
<summary><b>Langkah 1 — Fork dan Siapkan Frontend</b></summary>

1. Klik tombol **Fork** di pojok kanan atas repositori ini.
2. Buka **Settings → Pages** pada repositori hasil fork.
3. Pada bagian **Build and deployment**, atur:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Klik **Save**.
5. Tunggu sekitar 1–2 menit hingga GitHub Pages selesai melakukan deployment.

</details>

<details>
<summary><b>Langkah 2 — Siapkan Backend Netlify yang Aman</b></summary>

Karena API key tidak boleh disimpan di repositori GitHub publik, kita akan menggunakan Netlify sebagai serverless proxy.

1. Buat akun gratis di [Netlify](https://app.netlify.com/).
2. Pilih **Add new site → Import an existing project**.
3. Hubungkan akun GitHub Anda.
4. Pilih repositori yang telah di-fork.
5. Biarkan pengaturan build kosong (kecuali konfigurasi proyek Anda memerlukannya), lalu deploy situs.
6. Setelah deployment selesai, buka **Site configuration → Environment variables**.
7. Tambahkan variabel berikut:

   | Key | Value |
   |---|---|
   | `GEMINI_API_KEY` | API key Gemini asli dari [Google AI Studio](https://aistudio.google.com/) |

8. Buka **Deploys → Trigger deploy → Deploy site** untuk menerapkan environment variable baru.
9. Salin URL situs Netlify Anda.

Contoh:

```text
https://situs-proxy-saya.netlify.app
```

</details>

<details>
<summary><b>Langkah 3 — Hubungkan Frontend ke Backend</b></summary>

1. Kembali ke repositori GitHub Anda.
2. Buka file `config.js`.
3. Cari konfigurasi `proxyEndpoint`.
4. Perbarui konfigurasi tersebut menggunakan URL Netlify Anda:

```javascript
authMode: "PROXY_URL",

proxyEndpoint:
  "https://SITUS-NETLIFY-ANDA.netlify.app/.netlify/functions/gemini-proxy",

modelName: "gemini-3.5-flash-lite", // atau gemini-3-flash
```

5. Commit perubahan.
6. Tunggu hingga GitHub Pages selesai diperbarui.

Chatbot Anda kini seharusnya sudah terhubung dengan backend serverless!

</details>

<details>
<summary><b>Langkah 4 — Kustomisasi Chatbot</b></summary>

**Kustomisasi kepribadian chatbot**

Buka `config.js` dan ubah:

- `botName`
- `welcomeHeading`
- `introCards`
- `systemPrompt`
- `temperature`
- `topP`

**Tambahkan basis pengetahuan sendiri**

Buka `knowledge.js` dan tambahkan teks atau paragraf khusus ke dalam array `KNOWLEDGE_BASE`.

Chatbot kemudian dapat mengambil informasi relevan dari basis pengetahuan tersebut ketika menjawab pertanyaan pengguna.

</details>

---

<div align="center">

### 🌍 Language Navigation

[🇬🇧 Back to English ↑](#-english)

[⬆ Kembali ke Atas](#-gemini-ai-chatbot-starter)

<br>

**Made with ❤️ by Ramadhirra Azzahra Putri, S.T.**

</div>
