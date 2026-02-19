"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
    targetDate: Date;
    eventLabel: string;
}

export default function Countdown({ targetDate, eventLabel }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
    }>({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-emerald-800/50 backdrop-blur-sm rounded-2xl border border-gold-500/20 shadow-xl">
            <h2 className="text-2xl font-serif text-gold-500">{eventLabel}</h2>
            <div className="flex space-x-4 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col">
                        <motion.span
                            key={value}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-4xl font-bold font-mono text-white"
                        >
                            {value.toString().padStart(2, "0")}
                        </motion.span>
                        <span className="text-xs uppercase text-emerald-200">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
