import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
    const { env } = await getCloudflareContext();
    let { results } = await env.OTP_BRIDGE_DB.prepare('SELECT * FROM counter_history').run();
    return Response.json({ history: results });
}
