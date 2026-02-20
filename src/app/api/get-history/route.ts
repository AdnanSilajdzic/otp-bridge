import { getCloudflareContext } from "@opennextjs/cloudflare";

const KV_KEY = "counter_history_cache";

function secondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setUTCDate(midnight.getUTCDate() + 1);
    midnight.setUTCHours(0, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

export async function GET() {
    const { env } = await getCloudflareContext();

    const cached = await env.COUNTER_KV.get(KV_KEY);
    if (cached) {
        return Response.json({ history: JSON.parse(cached) });
    }

    const { results } = await env.OTP_BRIDGE_DB.prepare('SELECT * FROM counter_history').run();

    await env.COUNTER_KV.put(KV_KEY, JSON.stringify(results), {
        expirationTtl: secondsUntilMidnight(),
    });

    return Response.json({ history: results });
}
