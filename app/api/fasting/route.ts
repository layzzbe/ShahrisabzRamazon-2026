import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await kv.get("fasting_count");
        return NextResponse.json({ count: count || 1250 });
    } catch (error) {
        return NextResponse.json({ count: 1250 }, { status: 500 });
    }
}

export async function POST() {
    try {
        const count = await kv.incr("fasting_count");
        return NextResponse.json({ count });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
    }
}
