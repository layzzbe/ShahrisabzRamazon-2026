"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Share, MoreVertical } from "lucide-react";

interface InstallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f2e22] border border-emerald-800/50 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 relative shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Smartphone className="text-gold-400 w-6 h-6" />
                                    Ilova qilib o'rnatish
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Instructions */}
                            <div className="space-y-6">
                                {/* iOS */}
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-emerald-300 font-semibold">
                                        <span className="text-lg">🍎</span> iPhone (Safari)
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Pastdagi <span className="inline-flex items-center bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-300 mx-1"><Share className="w-3 h-3 mr-1" /> Ulashish</span> tugmasini bosing va ro'yxatdan
                                        <strong className="text-white mx-1">"Ekranga qo'shish"</strong>
                                        (Add to Home Screen) ni tanlang.
                                    </p>
                                </div>

                                {/* Android */}
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-emerald-300 font-semibold">
                                        <span className="text-lg">🤖</span> Android (Chrome)
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Yuqoridagi <span className="inline-flex items-center bg-white/10 px-1.5 py-0.5 rounded text-gray-300 mx-1"><MoreVertical className="w-3 h-3" /></span> 3 ta nuqtani bosing va menyudan
                                        <strong className="text-white mx-1">"Ekranga qo'shish"</strong>
                                        (Add to Home screen) ni tanlang.
                                    </p>
                                </div>
                            </div>

                            {/* Close Action */}
                            <button
                                onClick={onClose}
                                className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
                            >
                                Tushunarli
                            </button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
