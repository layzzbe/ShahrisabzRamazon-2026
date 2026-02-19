"use client";

import { useEffect, useState } from "react";
import { useRamadan } from "@/context/RamadanContext";
import { Sunrise, Moon, Landmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import FastingCounter from "@/components/FastingCounter";

const uzbekDays = ['YAKSHANBA', 'DUSHANBA', 'SESHANBA', 'CHORSHANBA', 'PAYSHANBA', 'JUMA', 'SHANBA'];

export default function Home() {
    const { ramadanData } = useRamadan();
    // Use proper type instead of any
    const [currentDay, setCurrentDay] = useState<typeof ramadanData[0] | null>(null);
    const [countdownTime, setCountdownTime] = useState("");
    const [countdownLabel, setCountdownLabel] = useState("");
    const [progress, setProgress] = useState(0);
    const [currentTimeStr, setCurrentTimeStr] = useState("");
    const [currentDateStr, setCurrentDateStr] = useState("");
    const [shareCount, setShareCount] = useState<number | null>(null);

    useEffect(() => {
        // Fetch count for share button
        fetch("/api/fasting", { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                // Compatible with both old {count} and new {daily, total}
                if (typeof data.daily === 'number') setShareCount(data.daily);
                else if (typeof data.count === 'number') setShareCount(data.count);
            })
            .catch(err => console.error(err));

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
            const [saharHour, saharMinute] = foundDay.sahar.split(":").map(Number);
            const [iftarHour, iftarMinute] = foundDay.iftar.split(":").map(Number);

            const saharTime = new Date(now);
            saharTime.setHours(saharHour, saharMinute, 0);

            const iftarTime = new Date(now);
            iftarTime.setHours(iftarHour, iftarMinute, 0);

            // Progress Bar Logic
            const totalDuration = iftarTime.getTime() - saharTime.getTime();
            const elapsed = now.getTime() - saharTime.getTime();
            const p = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
            setProgress(p);

            // Countdown Logic
            let target = iftarTime;
            let labelVal = "IFTORGACHA";

            if (now < saharTime) {
                target = saharTime;
                labelVal = "SAHARLIKGACHA";
            } else if (now > iftarTime) {
                target = new Date(saharTime);
                target.setDate(target.getDate() + 1);
                labelVal = "SAHARLIKGACHA";
            }

            const diff = target.getTime() - now.getTime();
            if (diff <= 0) {
                setCountdownTime("00:00:00");
                setCountdownLabel(labelVal);
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdownTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
            setCountdownLabel(labelVal);

            setCurrentTimeStr(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));

            const dayName = uzbekDays[now.getDay()];
            setCurrentDateStr(`${foundDay.date.toUpperCase()}, ${dayName}`);
        };

        const timer = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(timer);
    }, [ramadanData]);

    if (!currentDay) return <div className="text-center p-10">Yuklanmoqda...</div>;

    return (
        <main className="min-h-screen bg-emerald-950 text-white pb-10 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-md mx-auto px-5 py-6 relative z-10 flex flex-col h-full">
                {/* Header */}
                <header className="text-center mb-6">
                    <h1 className="text-2xl font-black tracking-widest text-white mb-2 drop-shadow-lg flex items-center justify-center gap-2">
                        {/* Animated Neon Moon Icon */}
                        <motion.div
                            animate={{
                                y: [-2, 2, -2],
                                scale: [1, 1.05, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative flex items-center justify-center w-8 h-8"
                        >
                            <div className="absolute inset-0 bg-amber-400/30 blur-lg rounded-full" />
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                            >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M19 3v4" />
                                <path d="M21 5h-4" />
                            </svg>
                        </motion.div>
                        SHAHRISABZ
                    </h1>
                    <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1">
                        <span className="text-emerald-100 font-bold tracking-widest text-xs">
                            RAMAZON, {currentDay.id}-KUN
                        </span>
                    </div>
                </header>

                {/* Main Cards */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Saharlik Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 flex flex-col items-center justify-center aspect-square shadow-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-emerald-200 text-xs font-bold tracking-wider mb-1 uppercase">Saharlik</span>
                        <div className="text-4xl sm:text-5xl font-black text-white mb-2">{currentDay.sahar}</div>
                        <Sunrise className="text-gold-400 w-8 h-8 opacity-80" />
                    </div>

                    {/* Iftorlik Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 flex flex-col items-center justify-center aspect-square shadow-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-emerald-200 text-xs font-bold tracking-wider mb-1 uppercase">Iftorlik</span>
                        <div className="text-4xl sm:text-5xl font-black text-white mb-2">{currentDay.iftar}</div>
                        <Moon className="text-gold-400 w-8 h-8 opacity-80" />
                    </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="mb-6 relative w-full px-1">
                    {/* Time & Date Display */}
                    <div className="flex justify-center mb-3 mt-1 relative z-20">
                        <span className="text-gold-400 font-mono font-bold text-xl drop-shadow-md">
                            {currentTimeStr}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold text-[10px] tracking-wider">TONG</span>
                        <div className="flex-1 h-3 bg-emerald-950/80 border border-emerald-800/50 rounded-full relative p-0.5 shadow-inner">
                            <div
                                className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Glowing tip */}
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px] rounded-full" />
                            </div>
                        </div>
                        <span className="text-emerald-400 font-bold text-[10px] tracking-wider">SHOM</span>
                    </div>

                    <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
                        <span className="text-emerald-200/60 text-[9px] font-bold tracking-[0.2em] uppercase">
                            {currentDateStr}
                        </span>
                    </div>
                </div>

                {/* Big Countdown */}
                <div className="text-center mt-auto pb-4">
                    <div className="flex flex-col items-center justify-center mb-3">
                        <span className="text-xs sm:text-sm font-bold text-emerald-300 tracking-[0.2em] font-mono opacity-80 mb-0.5">
                            {countdownLabel}
                        </span>
                        <span className="text-5xl sm:text-6xl font-black text-gold-400 tracking-wider font-mono drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                            {countdownTime}
                        </span>
                    </div>

                    <div className="mb-4">
                        <FastingCounter />
                    </div>

                    <div className="w-full">
                        <a
                            href={`https://t.me/share/url?url=https://shahrisabz-ramazon.vercel.app&text=🌙 Shahrisabz Ramazon Taqvimi 2026.%0A%0ABugun biz bilan birga ${shareCount ? shareCount.toLocaleString() : "1,250+"} kishi ro'za tutmoqda! Siz ham qo'shiling:`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-[#229ED9] hover:bg-[#1e8dbf] text-white font-bold text-base rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                        >
                            <Share2 size={20} />
                            Telegramda Ulashish
                        </a>
                    </div>

                    {/* Creator Credit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-4 mb-1 text-center"
                    >
                        <a
                            href="https://www.instagram.com/layzz.be/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-amber-400/40 hover:text-amber-400/80 transition-colors font-mono tracking-widest uppercase"
                        >
                            Dasturchi: @layzzbe
                        </a>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

