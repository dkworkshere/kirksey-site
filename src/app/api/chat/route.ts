import OpenAI from "openai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // fast execution

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { messages = [] } = await req.json();
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: messages.length ? messages : [{ role: "user", content: "Hello" }],
    });

    const text =
      (resp as any).output_text ??
      (Array.isArray((resp as any).output)
        ? (resp as any).output.map((p:any)=>p?.content?.[0]?.text?.value || "").join("\n")
        : "");

    return new Response(JSON.stringify({ ok: true, text }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || "Server error" }),
      { status: 500 }
    );
  }
}
