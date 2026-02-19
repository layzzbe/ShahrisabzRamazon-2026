import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = 'edge'; // Optional: Use Edge Runtime for speed

export async function GET() {
    try {
        // Force no-store to prevent caching of the count
        const count = await kv.get<number>("fasting_count");
        return NextResponse.json({ count: count || 1250 }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error("KV GET Error:", error);
        return NextResponse.json({ count: 1250 }, { status: 500 });
    }
}

export async function POST() {
    try {
        const count = await kv.incr("fasting_count");
        return NextResponse.json({ count });
    } catch (error) {
        console.error("KV POST Error:", error);
        return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
    }
}
