"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";

export default function FastingCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [hasClicked, setHasClicked] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchCount = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch("/api/fasting", { cache: 'no-store' });
            const data = await res.json();
            if (data.count) setCount(data.count);
        } catch (e) {
            console.error("Failed to fetch count", e);
            setCount((prev) => prev || 1250);
        } finally {
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };

    useEffect(() => {
        fetchCount();

        const storedDate = localStorage.getItem("fastingDate");
        const today = new Date().toDateString();

        if (storedDate === today) {
            setHasClicked(true);
        }
    }, []);

    const handleClick = async () => {
        if (hasClicked) return;

        const newCount = (count || 1250) + 1;
        setCount(newCount);
        setHasClicked(true);
        setShowCelebration(true);

        const today = new Date().toDateString();
        localStorage.setItem("fastingDate", today);

        setTimeout(() => setShowCelebration(false), 2000);

        try {
            await fetch("/api/fasting", { method: "POST" });
        } catch (error) {
            console.error("Failed to sync count", error);
        }
    };

    if (count === null) return null;

    return (
        <div className="flex justify-center w-full z-20 my-1 relative">
            <div className={`group relative flex items-center gap-2 px-3 py-1 rounded-full font-bold text-[10px] sm:text-xs transition-all duration-300 ${hasClicked
                    ? "bg-emerald-900/40 text-emerald-400/80 border border-emerald-800/50"
                    : "bg-gradient-to-r from-amber-500/10 to-transparent text-amber-400 border border-amber-400/30"
                }`}>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick}
                    disabled={hasClicked}
                    className="flex items-center gap-1.5 outline-none"
                >
                    <div className="relative flex items-center justify-center">
                        <Heart
                            className={`w-3 h-3 ${hasClicked ? "fill-emerald-400" : "fill-amber-400/80 animate-pulse"}`}
                        />
                        <AnimatePresence>
                            {showCelebration && (
                                <motion.div
                                    initial={{ opacity: 1, scale: 0.5, y: 0 }}
                                    animate={{ opacity: 0, scale: 2, y: -15 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute pointer-events-none"
                                >
                                    <span className="text-sm">❤️</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <span>{hasClicked ? "Qabul bo'lsin!" : "Qabul bo'lsin!"}</span>
                </motion.button>

                <span className="opacity-30">|</span>

                <div className="flex items-center gap-1">
                    <motion.span
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`font-black ${hasClicked ? "text-emerald-400" : "text-amber-400"} drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]`}
                    >
                        {count.toLocaleString()}
                    </motion.span>
                    <span className="font-normal opacity-70">kishi</span>
                </div>

                <div className="w-px h-3 bg-white/10 mx-0.5"></div>

                <button
                    onClick={fetchCount}
                    disabled={isRefreshing}
                    className="p-1 hover:bg-white/5 rounded-full transition-colors"
                >
                    <RefreshCw className={`w-3 h-3 text-white/50 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>
            </div>
        </div>
    );
}
