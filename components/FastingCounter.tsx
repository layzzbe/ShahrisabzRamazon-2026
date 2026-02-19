"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function FastingCounter() {
    const [count, setCount] = useState(1250);
    const [hasClicked, setHasClicked] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        // Load state from local storage
        const storedDate = localStorage.getItem("fastingDate");
        const today = new Date().toDateString();

        // Simple mock logic: if we have a stored count, use it. 
        // Otherwise start at 1250.
        const storedCount = localStorage.getItem("fastingCount");
        if (storedCount) {
            setCount(parseInt(storedCount));
        }

        if (storedDate === today) {
            setHasClicked(true);
        }
    }, []);

    const handleClick = () => {
        if (hasClicked) return;

        const newCount = count + 1;
        setCount(newCount);
        setHasClicked(true);
        setShowCelebration(true);

        const today = new Date().toDateString();
        localStorage.setItem("fastingCount", newCount.toString());
        localStorage.setItem("fastingDate", today);

        setTimeout(() => setShowCelebration(false), 2000);
    };

    return (
        <div className="flex flex-col items-center space-y-4 my-8 w-full z-20 relative">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                disabled={hasClicked}
                className={`group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 w-full sm:w-auto ${hasClicked
                        ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800 cursor-default"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 border border-amber-400/50"
                    }`}
            >
                <Heart
                    className={`w-6 h-6 ${hasClicked ? "fill-emerald-400" : "fill-white animate-pulse"}`}
                />
                <span>{hasClicked ? "Qabul bo'lsin!" : "Men ham ro'zadorman"}</span>

                {/* Celebration Effect */}
                <AnimatePresence>
                    {showCelebration && (
                        <motion.div
                            initial={{ opacity: 1, scale: 0.5, y: 0 }}
                            animate={{ opacity: 0, scale: 2, y: -50 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <span className="text-4xl">❤️</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <div className="text-center space-y-1">
                <p className="text-emerald-200/80 text-sm font-medium">
                    Bugun Shahrisabz bo'ylab
                </p>
                <div className="flex items-center justify-center gap-2">
                    <motion.div
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    >
                        {count.toLocaleString()}
                    </motion.div>
                    <span className="text-emerald-200/80 text-sm font-medium">kishi biz bilan</span>
                </div>
            </div>
        </div>
    );
}
