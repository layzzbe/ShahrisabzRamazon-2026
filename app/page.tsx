"use client";

import { useEffect, useState } from "react";
import { useRamadan } from "@/context/RamadanContext";
import { Sunrise, Moon, Landmark, Share2 } from "lucide-react";
import FloatingMoon from "@/components/FloatingMoon";

const uzbekDays = ['YAKSHANBA', 'DUSHANBA', 'SESHANBA', 'CHORSHANBA', 'PAYSHANBA', 'JUMA', 'SHANBA'];

export default function Home() {
    const { ramadanData } = useRamadan();
    // Use proper type instead of any
    const [currentDay, setCurrentDay] = useState<typeof ramadanData[0] | null>(null);
    const [timeLeft, setTimeLeft] = useState("");
    const [progress, setProgress] = useState(0);
    const [currentTimeStr, setCurrentTimeStr] = useState("");
    const [currentDateStr, setCurrentDateStr] = useState("");

    // Moved uzbekDays outside component to avoid recreation

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Logic to find current Ramadan day based on date
            // For demo, we default to the first day or based on date match
            // Note: In a real app with 2026 dates, we need to mock "now" or handle the year correctly.
            // Since it's 2026 data, exact matching might fail if testing in 2025 without override.
            // For this implementation, we'll try to match by "Day-Month" string or default to first day.
            const month = now.toLocaleDateString("uz-UZ", { month: "long" });
            const day = now.getDate();
            const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
            const todayString = `${day}-${capitalize(month)}`;

            const foundDay = ramadanData.find((d) => d.date === todayString) || ramadanData[0];
            setCurrentDay(foundDay);

            if (!foundDay) return;

            // Parse Sahar and Iftar times for today (assuming 2026 year for calculation context)
            // This part is tricky if "now" is 2025. We might need to project "now" to 2026 for relative calc?
            // Or just assume the times are for "today" whatever year it is.
            // Let's assume the times apply to the current date.

            const [saharHour, saharMinute] = foundDay.sahar.split(":").map(Number);
            const [iftarHour, iftarMinute] = foundDay.iftar.split(":").map(Number);

            const saharTime = new Date(now);
            saharTime.setHours(saharHour, saharMinute, 0);

            const iftarTime = new Date(now);
            iftarTime.setHours(iftarHour, iftarMinute, 0);

            // Progress Bar Logic
            // 0% at Sahar, 100% at Iftar
            const totalDuration = iftarTime.getTime() - saharTime.getTime();
            const elapsed = now.getTime() - saharTime.getTime();
            const p = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
            setProgress(p);

            // Countdown Logic
            let target = iftarTime;
            let label = "IFTORGACHA";

            if (now < saharTime) {
                target = saharTime;
                label = "SAHARLIKGACHA";
            } else if (now > iftarTime) {
                // Tomorrow Sahar (approx logic for demo)
                target = new Date(saharTime);
                target.setDate(target.getDate() + 1);
                label = "SAHARLIKGACHA";
            }

            const diff = target.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft("00:00:00");
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${label}: ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
            setCurrentTimeStr(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));

            // Format Date: 19-FEVRAL, PAYSHANBA
            const dayName = uzbekDays[now.getDay()];
            setCurrentDateStr(`${foundDay.date.toUpperCase()}, ${dayName}`);
        };

        const timer = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(timer);
    }, [ramadanData]);

    if (!currentDay) return <div className="text-center p-10">Yuklanmoqda...</div>;

    return (
        <main className="min-h-screen bg-emerald-950 text-white pb-24 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />

            <FloatingMoon />

            <div className="max-w-md mx-auto px-6 py-8 relative z-10 flex flex-col h-full">
                {/* Header */}
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-black tracking-widest text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
                        <Landmark className="text-gold-400 w-10 h-10" />
                        SHAHRISABZ
                    </h1>
                    <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
                        <span className="text-emerald-100 font-bold tracking-widest text-sm">
                            RAMAZON, {currentDay.id}-KUN
                        </span>
                    </div>
                </header>

                {/* Main Cards */}
                <div className="grid grid-cols-2 gap-4 mb-20">
                    {/* Saharlik Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center aspect-square shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-emerald-200 text-xs font-bold tracking-wider mb-2 uppercase">Saharlik</span>
                        <div className="text-4xl font-black text-white mb-2">{currentDay.sahar}</div>
                        <Sunrise className="text-gold-400 w-8 h-8 opacity-80" />
                    </div>

                    {/* Iftorlik Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center aspect-square shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-emerald-200 text-xs font-bold tracking-wider mb-2 uppercase">Iftorlik</span>
                        <div className="text-4xl font-black text-white mb-2">{currentDay.iftar}</div>
                        <Moon className="text-gold-400 w-8 h-8 opacity-80" />
                    </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="mb-16 relative w-full px-2">
                    {/* Time & Date Display - Centered absolutely relative to the bar container */}
                    <div className="absolute -top-10 left-0 right-0 flex justify-center z-20">
                        <span className="text-gold-400 font-mono font-bold text-2xl drop-shadow-md">
                            {currentTimeStr}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-bold text-xs tracking-wider">TONG</span>
                        <div className="flex-1 h-5 bg-emerald-950/80 border border-emerald-800/50 rounded-full relative p-0.5 shadow-inner">
                            <div
                                className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Glowing tip */}
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px] rounded-full" />
                            </div>
                        </div>
                        <span className="text-emerald-400 font-bold text-xs tracking-wider">SHOM</span>
                    </div>

                    <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                        <span className="text-emerald-200/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                            {currentDateStr}
                        </span>
                    </div>
                </div>

                {/* Big Countdown */}
                <div className="text-center mt-auto">
                    <h2 className="text-3xl font-black text-gold-400 tracking-wider font-mono drop-shadow-md mb-8">
                        {timeLeft}
                    </h2>

                    <div className="w-full">
                        <a
                            href="https://t.me/share/url?url=https://shahrisabz-ramazon.vercel.app&text=Shahrisabz%20uchun%20Ramazon%20taqvimi%202026!%20Saharlik%20va%20Iftorlik%20vaqtlari."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-[#229ED9] hover:bg-[#1e8dbf] text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                        >
                            <Share2 size={20} />
                            Telegramda Ulashish
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
