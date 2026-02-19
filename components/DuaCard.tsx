"use client";

import { motion } from "framer-motion";
import { Dua } from "@/data/duas";

interface DuaCardProps {
    dua: Dua;
}

export default function DuaCard({ dua }: DuaCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-emerald-800/20 backdrop-blur-md border border-emerald-700/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-gold-500/20" />

            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-serif text-gold-400 border-b border-gold-500/20 pb-2">
                        {dua.title}
                    </h3>
                </div>

                <div className="space-y-4 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/50">
                    <p className="text-2xl font-arabic text-right text-emerald-100 leading-loose" dir="rtl">
                        {dua.content.arabic_text}
                    </p>
                    <p className="text-sm text-emerald-400/80 font-mono text-right">
                        {dua.content.arabic_transliteration}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm mt-4">
                    <div className="space-y-1">
                        <span className="text-xs uppercase text-emerald-500 font-bold tracking-wider">O'zbekcha (Lotin)</span>
                        <p className="text-emerald-200 italic leading-relaxed">
                            {dua.content.uzbek_latin}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs uppercase text-emerald-500 font-bold tracking-wider">Ўзбекча (Кирилл)</span>
                        <p className="text-emerald-200 italic leading-relaxed">
                            {dua.content.uzbek_cyrillic}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
