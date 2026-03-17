import { NextRequest, NextResponse } from "next/server";
import { CLIENT_CONFIG } from "@/config/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, answers } = body as { email: string; answers: Record<string, string> };

  try {
    await fetch(CLIENT_CONFIG.webhook.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        answers,
        timestamp: new Date().toISOString(),
        source: CLIENT_CONFIG.brand.name,
      }),
    });
  } catch {
    // Webhook failure is non-fatal
  }

  return NextResponse.json({ success: true });
}
