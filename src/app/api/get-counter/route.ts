import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const { env } = await getCloudflareContext();
  const raw = await env.COUNTER_KV.get("counter");
  let counter = 0;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      counter = Number(parsed.value ?? parsed);
    } catch {
      counter = Number(raw);
    }
  }
  return Response.json({ counter: counter || 0 });
}
