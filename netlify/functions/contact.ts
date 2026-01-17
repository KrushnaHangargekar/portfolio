import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { Resend } from 'resend';

const supabaseUrl = process.env.SUPABASE_URL || "https://wpoqhnmmppkgtroiitmz.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
}

const supabase = createClient(supabaseUrl, supabaseKey || "");

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      } as Record<string, string>,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      } as Record<string, string>,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}") as ContactFormData;
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        } as Record<string, string>,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        } as Record<string, string>,
        body: JSON.stringify({ error: "Invalid email format" }),
      };
    }

    // Optional: Insert into Supabase (non-blocking)
    supabase.from("contacts").insert([
      {
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      },
    ]).then(({ data, error }) => {
      if (error) console.error("Supabase error:", error);
      else console.log("Supabase insert success:", data);
    });

    // Send email notification (non-blocking)
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'krushnahangargekar25@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    }).then(() => {
      console.log("Email sent successfully");
    }).catch((emailError) => {
      console.error('Failed to send email:', emailError);
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify({
        success: true,
        message: "Contact form submitted successfully",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

export { handler };
