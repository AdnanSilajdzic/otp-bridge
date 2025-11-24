import axios from "axios";

export async function GET() {
  let value = 0;

  let response = await axios.get(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_ID}/values/${process.env.KV_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    }
  );
  value = response.data.value;
  return Response.json({ counter: Number(value) });
}
