"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const DUAS = [
    {
        id: "saharlik",
        title: "Saharlik Duosi (Niyat)",
        arabic: "Навайту ан асума совма шаҳри рамазона минал фажри илал мағриби, холисан лиллаҳи таъала. Аллоҳу акбар.",
        uzbek: "Ramazon oyining ro‘zasini subhdan to kun botguncha tutmoqni niyat qildim. Xolis Alloh uchun. Alloh buyukdir.",
    },
    {
        id: "iftorlik",
        title: "Iftorlik Duosi",
        arabic: "Аллоҳумма лака сумту ва бика аманту ва алайка таваккалту ва ъала ризқика афтарту, фағфирли йа ғаффару ма қоддамту ва ма аххорту.",
        uzbek: "Ey Allohim, ushbu ro‘zamni Sen uchun tutdim va Senga iymon keltirdim va Senga tavakkal qildim va bergan rizqing bilan iftor qildim. Ey gunohlarni afv qilguvchi Zot, mening avvalgi va keyingi gunohlarimni mag‘firat qilgin.",
    },
];

export default function DuasAccordion() {
    const [openId, setOpenId] = useState<string | null>("saharlik");

    return (
        <div className="space-y-4">
            {DUAS.map((dua) => (
                <div
                    key={dua.id}
                    className="border border-emerald-700/50 rounded-xl overflow-hidden bg-emerald-800/20"
                >
                    <button
                        onClick={() => setOpenId(openId === dua.id ? null : dua.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-800/40 transition-colors"
                    >
                        <span className="font-serif text-lg text-emerald-100">{dua.title}</span>
                        <ChevronDown
                            className={`text-gold-500 transition-transform ${openId === dua.id ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    <AnimatePresence>
                        {openId === dua.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-emerald-700/30"
                            >
                                <div className="p-4 space-y-4 bg-emerald-900/40">
                                    <p className="text-xl font-arabic text-right text-gold-400 leading-loose">
                                        {dua.arabic}
                                    </p>
                                    <p className="text-emerald-200 italic">{dua.uzbek}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
