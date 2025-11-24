import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // get counter from request
    const body = (await request.json()) as { counter: number };
    const { counter } = body;

    // validation
    if (
      typeof counter !== "number" ||
      !Number.isInteger(counter) ||
      counter <= 0 ||
      counter > 10
    ) {
      return NextResponse.json(
        { error: "counter must be an integer greater than 0 and less than 10" },
        { status: 400 }
      );
    }

    // get current value of counter
    let response = await axios.get(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_ID}/values/${process.env.KV_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        },
      }
    );
    let value = response.data.value;

    // update value
    let newValue = Number(value) + counter;
    let updateResponse = await axios.put(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_ID}/values/${process.env.KV_KEY}`,
      { value: newValue },
      { headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}` } }
    );

    if (updateResponse.status === 200) {
      return NextResponse.json(
        { success: true, counter: newValue },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, counter: value || 0 },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
