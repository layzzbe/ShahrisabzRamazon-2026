"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";

import confetti from "canvas-confetti";

export default function FastingCounter() {
    const [counts, setCounts] = useState<{ daily: number; total: number } | null>(null);
    const [hasClicked, setHasClicked] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchCount = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch("/api/fasting", { cache: 'no-store' });
            const data = await res.json();
            if (typeof data.daily === 'number' && typeof data.total === 'number') {
                setCounts({ daily: data.daily, total: data.total });
            }
        } catch (e) {
            console.error("Failed to fetch count", e);
        } finally {
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };

    useEffect(() => {
        fetchCount();

        const storedDate = localStorage.getItem("fastingDate");
        // Ensure client-side date matches the "daily" logic (User's local time)
        const today = new Date().toDateString();

        if (storedDate === today) {
            setHasClicked(true);
        }
    }, []);

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    const handleClick = async () => {
        if (hasClicked) return;

        // Optimistic update
        setCounts(prev => prev ? { daily: prev.daily + 1, total: prev.total + 1 } : { daily: 1, total: 1 });
        setHasClicked(true);
        setShowCelebration(true);
        triggerConfetti();

        const today = new Date().toDateString();
        localStorage.setItem("fastingDate", today);

        setTimeout(() => setShowCelebration(false), 2000);

        try {
            await fetch("/api/fasting", { method: "POST" });
        } catch (error) {
            console.error("Failed to sync count", error);
        }
    };

    if (counts === null) return <div className="h-16"></div>; // Compacted placeholder

    return (
        <div className="flex flex-col items-center gap-2 z-20 my-1 relative w-full">
            {/* Main Button */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                disabled={hasClicked}
                className={`group relative flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-xl overflow-hidden ${hasClicked
                    ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/50 cursor-default"
                    : "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border border-amber-400/30 hover:bg-amber-500/30"
                    }`}
            >
                {/* Shine effect */}
                {!hasClicked && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                )}

                <div className="relative flex items-center justify-center z-20">
                    <Heart
                        className={`w-5 h-5 ${hasClicked ? "fill-emerald-400 stroke-emerald-400" : "fill-amber-400/20 stroke-amber-400 animate-pulse"}`}
                    />
                    <AnimatePresence>
                        {showCelebration && (
                            <motion.div
                                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                                animate={{ opacity: 0, scale: 2.5, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute pointer-events-none"
                            >
                                <span className="text-2xl">❤️</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <span className="z-20">{hasClicked ? "Qabul bo'lsin!" : "Men ham ro'zadorman"}</span>
            </motion.button>

            {/* Counts Display */}
            <div className="flex flex-col items-center gap-1">
                {/* Daily Count */}
                <div className="flex items-center gap-2 text-xs text-emerald-100/90 font-medium tracking-wide bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/5 shadow-sm">
                    <span>
                        Bugun: <strong className="text-gold-400 text-sm mx-1 drop-shadow-sm">{counts.daily.toLocaleString()}</strong> kishi
                    </span>
                    <button
                        onClick={fetchCount}
                        disabled={isRefreshing}
                        className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    </button>
                </div>

                {/* Total Count - Improved Visibility */}
                <span className="text-[11px] sm:text-xs text-amber-400/80 font-mono tracking-widest uppercase font-semibold drop-shadow-sm">
                    Jami: {counts.total.toLocaleString()}
                </span>
            </div>
        </div>
    );
}
