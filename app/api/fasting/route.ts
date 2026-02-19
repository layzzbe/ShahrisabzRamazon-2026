import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = 'edge';

const getDateKey = () => {
    // Uzbekistan time (UTC+5)
    // We use a simple approach: verify offset or just use a standard ISO date string shifted by 5 hours.
    // Or simpler: Vercel Edge supports timeZone in toLocaleDateString if the env supports it.
    // Let's rely on toLocaleDateString with timeZone.
    try {
        const date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Tashkent" });
        return `fasting_count:${date}`;
    } catch (e) {
        // Fallback if timezone fails
        const date = new Date().toISOString().split('T')[0];
        return `fasting_count:${date}`;
    }
};

export async function GET() {
    try {
        const key = getDateKey();
        const count = await kv.get<number>(key);
        // Default to a realistic starting number for the first day if 0, or just 0.
        // For visual appeal, maybe 0 is bad? But "daily reset" implies 0.
        // User said "starts from 0 automatically".
        return NextResponse.json({ count: count || 0 }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error("KV GET Error:", error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}

export async function POST() {
    try {
        const key = getDateKey();
        const count = await kv.incr(key);
        return NextResponse.json({ count });
    } catch (error) {
        console.error("KV POST Error:", error);
        return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
    }
}
