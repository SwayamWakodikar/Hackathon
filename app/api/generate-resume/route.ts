import { NextResponse } from "next/server";
import { resumePrompt } from "@/lib/prompts";
import appconfig from "@/dotenv";

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = resumePrompt(body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${appconfig.OLMO_THINK_API}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "allenai/olmo-3-32b-think:free",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
    }),
  });

  const data = await response.json();
  
  return NextResponse.json({
    resume: data.choices[0].message.content,
  });
}
