"use client";

import { useEffect, useState } from "react";
import { useRamadan } from "@/context/RamadanContext";
import { formatUzbekDate } from "@/lib/date-utils";
import { Calendar as CalendarIcon } from "lucide-react";

export default function TaqvimPage() {
    const { ramadanData } = useRamadan();
    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        // Logic to match "19-Fevral" format from data
        const now = new Date();
        const month = now.toLocaleDateString("uz-UZ", { month: "long" });
        const day = now.getDate();
        const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
        const todayString = `${day}-${capitalize(month)}`;
        setCurrentDate(todayString);
    }, []);

    return (
        <main className="min-h-screen pb-24 px-4 pt-8 bg-emerald-950 text-emerald-50">
            <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-serif text-gold-500 mb-2 flex items-center justify-center gap-2">
                        <CalendarIcon className="w-8 h-8" />
                        Ramazon Taqvimi
                    </h1>
                    <p className="text-emerald-200/80 text-sm">
                        Shahrisabz shahri uchun 30 kunlik taqvim (2026)
                    </p>
                </header>

                <div className="bg-emerald-900/30 rounded-xl border border-emerald-800 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-emerald-900/80 text-gold-400 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-serif">Kun</th>
                                    <th className="p-4 font-serif">Sana</th>
                                    <th className="p-4 font-serif">Saharlik</th>
                                    <th className="p-4 font-serif">Iftorlik</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-800/50">
                                {ramadanData.map((day) => {
                                    const isToday = day.date === currentDate;
                                    return (
                                        <tr
                                            key={day.id}
                                            className={`transition-colors text-sm sm:text-base ${isToday
                                                    ? "bg-emerald-800/80 text-white font-medium shadow-inner"
                                                    : "hover:bg-emerald-800/30 text-emerald-100"
                                                }`}
                                        >
                                            <td className="p-4">{day.id}</td>
                                            <td className="p-4 whitespace-nowrap">{day.date}</td>
                                            <td className="p-4 font-bold text-gold-300/90 tracking-wide">
                                                {day.sahar}
                                            </td>
                                            <td className="p-4 font-bold text-gold-300/90 tracking-wide">
                                                {day.iftar}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
