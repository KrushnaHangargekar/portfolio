import { Handler } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message || typeof message !== "string") {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid or missing message" }) };
    }

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    if (!response.content || response.content.length === 0) {
      return { statusCode: 500, body: JSON.stringify({ error: "No response from AI" }) };
    }

    const content = response.content[0];
    if (content.type !== "text") {
      return { statusCode: 500, body: JSON.stringify({ error: "Unexpected response type" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: content.text,
      }),
    };
  } catch (error) {
    console.error("Error in AI chat:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
