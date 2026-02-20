import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { verifyTurnstile } from "nextjs-turnstile";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { counter: number, token: string };
    const { counter, token } = body;

    // verify cloudflare turnstile token
    const isValid = await verifyTurnstile(token);
    if (!isValid) {
      return NextResponse.json({ error: "Bots not allowed" }, { status: 403 });
    }

    // verify the number
    if (
      typeof counter !== "number" ||
      !Number.isInteger(counter) ||
      counter <= 0 ||
      counter > 10
    ) {
      return NextResponse.json(
        { error: "counter must be an integer between 1 and 10" },
        { status: 400 }
      );
    }

    // get previous count
    const { env } = await getCloudflareContext();
    const raw = await env.COUNTER_KV.get("counter");
    let current = 0;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        current = Number(parsed.value ?? parsed);
      } catch {
        current = Number(raw);
      }
    }

    // update count 
    const newValue = (current || 0) + counter;
    await env.COUNTER_KV.put("counter", String(newValue));

    return NextResponse.json(
      { success: true, counter: newValue },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
