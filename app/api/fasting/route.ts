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

        // Fetch both keys in parallel
        const [daily, total] = await Promise.all([
            kv.get<number>(key),
            kv.get<number>("fasting_count_total")
        ]);

        return NextResponse.json({
            daily: daily || 0,
            total: total || 1250 // Start total from a base if empty, or 0
        }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error("KV GET Error:", error);
        return NextResponse.json({ daily: 0, total: 1250 }, { status: 500 });
    }
}

export async function POST() {
    try {
        const key = getDateKey();

        // Increment both keys in parallel
        const [daily, total] = await Promise.all([
            kv.incr(key),
            kv.incr("fasting_count_total")
        ]);

        return NextResponse.json({ daily, total });
    } catch (error) {
        console.error("KV POST Error:", error);
        return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
    }
}
