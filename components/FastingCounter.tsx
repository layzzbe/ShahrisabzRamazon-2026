"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function FastingCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [hasClicked, setHasClicked] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        // Fetch initial count from API
        fetch("/api/fasting")
            .then((res) => res.json())
            .then((data) => {
                if (data.count) setCount(data.count);
            })
            .catch(() => setCount(1250)); // Fallback

        // Check local storage for daily click limit
        const storedDate = localStorage.getItem("fastingDate");
        const today = new Date().toDateString();

        if (storedDate === today) {
            setHasClicked(true);
        }
    }, []);

    const handleClick = async () => {
        if (hasClicked) return;

        // Optimistic UI update
        setCount((prev) => (prev ? prev + 1 : 1251));
        setHasClicked(true);
        setShowCelebration(true);

        const today = new Date().toDateString();
        localStorage.setItem("fastingDate", today);

        setTimeout(() => setShowCelebration(false), 2000);

        // Sync with API
        try {
            await fetch("/api/fasting", { method: "POST" });
        } catch (error) {
            console.error("Failed to update count", error);
        }
    };

    if (count === null) return null; // Wait for initial load

    return (
        <div className="flex justify-center w-full z-20 my-4 relative">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                disabled={hasClicked}
                className={`group relative flex items-center gap-3 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${hasClicked
                        ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800 cursor-default"
                        : "bg-gradient-to-r from-amber-500/10 to-transparent text-amber-400 border border-amber-400/50 hover:bg-amber-500/20"
                    }`}
            >
                <div className="relative">
                    <Heart
                        className={`w-4 h-4 ${hasClicked ? "fill-emerald-400" : "fill-amber-400 animate-pulse"}`}
                    />
                    {/* Celebration Effect */}
                    <AnimatePresence>
                        {showCelebration && (
                            <motion.div
                                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                                animate={{ opacity: 0, scale: 2, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <span className="text-xl">❤️</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-1.5">
                    <span>{hasClicked ? "Qabul bo'lsin!" : "Men ham ro'zadorman:"}</span>
                    <motion.span
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-black text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
                    >
                        {count.toLocaleString()}
                    </motion.span>
                </div>
            </motion.button>
        </div>
    );
}
