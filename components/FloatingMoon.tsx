"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";

export default function FloatingMoon() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute top-10 right-4 md:right-10 z-0 pointer-events-none"
        >
            <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full" />

                <Moon
                    className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] w-16 h-16 md:w-32 md:h-32"
                    fill="currentColor"
                    fillOpacity={0.2}
                />
            </motion.div>
        </motion.div>
    );
}
