import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const RATE_LIMIT = new Map<string, number>();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "AIzaSyDoptg5glfOrDQdTZW678oruaAt9Zxo15M");

const systemPrompt = `
You are Krushna Rajendra Hangargekar's AI assistant. Respond professionally and helpfully based on this info:

Name: Krushna Rajendra Hangargekar
Role: AI Developer | Computer Engineering Undergraduate | Full-Stack Web Developer
Location: Pune, India
Email: krushnahangargekar25@gmail.com
Phone: +91 8263987740
LinkedIn: linkedin.com/in/krushna-hangargekar-12b975332

Summary: B.Tech Computer Engineering student (2024-present) at Zeal College. Junior AI Intern at Gadget Dash (Jan 2026-present). Web Developer Intern at TechLeaper (Jun-Jul 2024).

Skills: C, C++, Python, PHP, JS/TS, React, HTML/CSS, AI APIs, Supabase, Git, etc.

Projects: AI integrations, Tic Tac Toe (C++/SFML), PHP-MySQL CRUD, Client websites.

Provide accurate info only. Be concise and helpful.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: systemPrompt,
});

export const handler: Handler = async (event) => {
  const ip = event.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();

  if (RATE_LIMIT.has(ip) && (now - (RATE_LIMIT.get(ip) || 0)) < 5000) {
    return {
      statusCode: 429,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Too many requests. Slow down." }),
    };
  }

  RATE_LIMIT.set(ip, now);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        body: JSON.stringify({ error: "Invalid or missing message" }),
      };
    }

    const result = await model.generateContent(message);

    const response = result.response;
    const text = response.text();

    if (!text) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        body: JSON.stringify({ error: "No response from AI" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        reply: text,
      }),
    };
  } catch (error) {
    console.error("Error in AI chat:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
