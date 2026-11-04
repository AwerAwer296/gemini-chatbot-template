// netlify/functions/gemini-proxy.js

exports.handler = async function (event, context) {
  // CORS Headers are strictly required for cross-origin requests
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS Preflight request from the browser
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }

  // Ensure only POST is allowed for actual traffic
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  // Retrieve key from Netlify Environment Variables
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: "API Key not configured on the server." }) 
    };
  }

  try {
    const body = JSON.parse(event.body);
    const model = body.model || "gemini-2.5-flash";
    
    // Construct the exact payload Google expects
    const googlePayload = {
      system_instruction: body.system_instruction,
      contents: body.contents,
      generationConfig: body.generationConfig
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(googlePayload)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || "Error from Google API" })
      };
    }

    // Extract text block safely
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return {
      statusCode: 200,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error: " + error.message })
    };
  }
};
