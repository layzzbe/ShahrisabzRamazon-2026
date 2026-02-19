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
            // Allow 0 as valid count
            if (typeof data.count === 'number') setCount(data.count);
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

    const handleClick = async () => {
        if (hasClicked) return;

        const newCount = (count || 0) + 1;
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

    if (count === null) return <div className="h-10"></div>; // Placeholder to avoid layout shift

    return (
        <div className="flex flex-col items-center gap-2 z-20 my-1 relative w-full">
            {/* Main Button */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                disabled={hasClicked}
                className={`group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg ${hasClicked
                    ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/50 cursor-default"
                    : "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border border-amber-400/30 hover:bg-amber-500/30"
                    }`}
            >
                <div className="relative flex items-center justify-center">
                    <Heart
                        className={`w-4 h-4 ${hasClicked ? "fill-emerald-400 stroke-emerald-400" : "fill-amber-400/20 stroke-amber-400 animate-pulse"}`}
                    />
                    <AnimatePresence>
                        {showCelebration && (
                            <motion.div
                                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                                animate={{ opacity: 0, scale: 2.5, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute pointer-events-none"
                            >
                                <span className="text-xl">❤️</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <span>{hasClicked ? "Qabul bo'lsin!" : "Men ham ro'zadorman"}</span>
            </motion.button>

            {/* Subtext with Count */}
            <div className="flex items-center gap-2 text-[10px] text-emerald-200/60 font-medium tracking-wide bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <span>Bugun Shahrisabz bo'ylab <strong className="text-gold-400 text-xs mx-0.5">{count.toLocaleString()}</strong> kishi biz bilan</span>
                <button
                    onClick={fetchCount}
                    disabled={isRefreshing}
                    className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
                >
                    <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>
            </div>
        </div>
    );
}
