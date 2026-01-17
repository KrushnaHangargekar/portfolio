import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const RATE_LIMIT = new Map<string, number>();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `
You are Krushna Rajendra Hangargekar's AI assistant. Respond professionally and helpfully based on this info:

Name: Krushna Rajendra Hangargekar
Role: AI Developer | Computer Engineering Undergraduate | Full-Stack Web Developer
Location: Pune, India
Email: krushnahangargekar25@gmail.com
Phone: +91 8263987740
LinkedIn: linkedin.com/in/krushna-hangargekar-12b975332

Summary: B.Tech Computer Engineering student (2024-present) at Zeal College of Engineering and Research, Pune. Junior AI Intern at Gadget Dash, Pune (2026-present). Web Developer Intern at TechLeaper Systems Pvt. Ltd. (2024).

Skills: C++, SFML, Python, JavaScript, HTML5, CSS3, AI APIs, Web Development, Responsive Design, UI/UX.

Projects:
- Nalgirkar Brand Website: Developed a professional brand website during TechLeaper internship, featuring responsive design, modern UI/UX, and optimized performance.
- TechMantra Website: Created an engaging website during TechLeaper internship, implementing clean design principles and interactive elements.
- AI Product Development: Integrated AI features into production web applications using API-based AI responses and backend logic, focusing on performance and reliability.
- Tic Tac Toe Game: Developed a graphical desktop game in C++ using SFML, implementing game logic, window management, and event-driven input.

Provide accurate info only. Be concise and helpful.
`;

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

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent([systemPrompt, message]);

    const text = result.response.text();

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
