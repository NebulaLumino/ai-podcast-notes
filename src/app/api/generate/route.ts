import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "", baseURL: "https://api.deepseek.com/v1" }); }

export async function POST(req: NextRequest) {
  try {
    const { episodeTitle, guest, topics, duration, style } = await req.json();
    const prompt = `Create comprehensive podcast notes:\nEpisode Title: ${episodeTitle || "Episode title"}\nGuest: ${guest || "Guest name and bio"}\nTopics Covered: ${topics || "Key discussion points"}\nDuration: ${duration || "45 minutes"}\nStyle: ${style || "Conversational and informative"}\n\nProvide: Episode summary (2-3 paragraphs), key timestamps with topics, memorable quotes (3-5), guest bio, shownotes, and suggested social media clips with captions.`;
    const completion = await getClient().chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.6 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
