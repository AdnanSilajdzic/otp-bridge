/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your Worker in action
 * - Run `npm run deploy` to publish your Worker
 *
 * Bind resources to your Worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(req) {
		const url = new URL(req.url);
		url.pathname = '/__scheduled';
		url.searchParams.append('cron', '* * * * *');
		return new Response(`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`);
	},

	// The scheduled handler is invoked at the interval set in our wrangler.jsonc's
	// [[triggers]] configuration.
	async scheduled(event, env, ctx): Promise<void> {

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

		const today = new Date().toISOString().slice(0, 10);

		// Insert only if not exists
		await env.OTP_BRIDGE_DB.prepare(`
		INSERT OR IGNORE INTO counter_history (date, value)
		VALUES (?, ?)
	`).bind(today, current).run();

	}

} satisfies ExportedHandler<Env>;
