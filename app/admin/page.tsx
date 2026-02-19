"use client";

import { useState } from "react";
import { useRamadan } from "@/context/RamadanContext";
import { Lock, User, Save, RefreshCw } from "lucide-react";

export default function AdminPage() {
    const { ramadanData, updateDay, resetData } = useRamadan();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login === "admin" && password === "12345") {
            setIsLoggedIn(true);
            setError("");
        } else {
            setError("Login yoki parol noto'g'ri!");
        }
    };

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-emerald-950 text-emerald-50 px-4">
                <div className="w-full max-w-sm p-8 bg-emerald-900/50 backdrop-blur-md rounded-2xl border border-emerald-700/50 shadow-xl">
                    <h1 className="text-2xl font-serif text-gold-500 mb-6 text-center">Admin Kirish</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase text-emerald-400 font-bold mb-1">Login</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-emerald-600" size={18} />
                                <input
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg pl-10 pr-4 py-2 text-emerald-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                                    placeholder="admin"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-emerald-400 font-bold mb-1">Parol</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 text-emerald-600" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-emerald-950/50 border border-emerald-700 rounded-lg pl-10 pr-4 py-2 text-emerald-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                                    placeholder="•••••"
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 bg-gold-500 text-emerald-950 font-bold rounded-lg hover:bg-gold-400 transition-colors mt-4"
                        >
                            Kirish
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-10 px-4 bg-emerald-950 text-emerald-50 pb-24">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-gold-500">Admin Panel</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                if (confirm("Haqiqatan ham barcha ma'lumotlarni qayta tiklamoqchimisiz?")) {
                                    resetData();
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-red-900/50 text-red-200 rounded hover:bg-red-900 transition-colors border border-red-800"
                        >
                            <RefreshCw size={16} /> Reset
                        </button>
                        <button
                            onClick={() => setIsLoggedIn(false)}
                            className="px-4 py-2 bg-emerald-800 text-emerald-100 rounded hover:bg-emerald-700 transition-colors"
                        >
                            Chiqish
                        </button>
                    </div>
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
                                    <th className="p-4 font-serif text-right">Amal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-800/50">
                                {ramadanData.map((day) => (
                                    <DataRow key={day.id} day={day} onSave={updateDay} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

function DataRow({ day, onSave }: { day: any; onSave: any }) {
    const [sahar, setSahar] = useState(day.sahar);
    const [iftar, setIftar] = useState(day.iftar);
    const [isDirty, setIsDirty] = useState(false);

    const handleSave = () => {
        onSave(day.id, sahar, iftar);
        setIsDirty(false);
    };

    return (
        <tr className="hover:bg-emerald-800/30 text-emerald-100 transition-colors">
            <td className="p-4">{day.id}</td>
            <td className="p-4 font-medium">{day.date}</td>
            <td className="p-4">
                <input
                    type="time"
                    value={sahar}
                    onChange={(e) => {
                        setSahar(e.target.value);
                        setIsDirty(true);
                    }}
                    className="bg-emerald-950/50 border border-emerald-700 rounded px-2 py-1 text-white w-24 focus:outline-none focus:border-gold-500"
                />
            </td>
            <td className="p-4">
                <input
                    type="time"
                    value={iftar}
                    onChange={(e) => {
                        setIftar(e.target.value);
                        setIsDirty(true);
                    }}
                    className="bg-emerald-950/50 border border-emerald-700 rounded px-2 py-1 text-white w-24 focus:outline-none focus:border-gold-500"
                />
            </td>
            <td className="p-4 text-right">
                {isDirty && (
                    <button
                        onClick={handleSave}
                        className="p-2 bg-gold-500 text-emerald-950 rounded hover:bg-gold-400 transition-colors"
                        title="Saqlash"
                    >
                        <Save size={16} />
                    </button>
                )}
            </td>
        </tr>
    );
}
