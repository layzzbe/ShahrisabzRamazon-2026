import { LucideIcon } from "lucide-react";

interface PrayerCardProps {
    name: string;
    time: string;
    icon: LucideIcon;
    isNext?: boolean;
}

export default function PrayerCard({ name, time, icon: Icon, isNext }: PrayerCardProps) {
    return (
        <div
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isNext
                    ? "bg-emerald-700 border-gold-500 shadow-lg scale-105"
                    : "bg-emerald-800/30 border-emerald-700/50 hover:bg-emerald-800/50"
                }`}
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isNext ? "bg-gold-500 text-emerald-900" : "bg-emerald-900 text-emerald-400"}`}>
                    <Icon size={20} />
                </div>
                <span className={`font-medium ${isNext ? "text-white" : "text-emerald-100"}`}>{name}</span>
            </div>
            <span className={`font-mono text-lg ${isNext ? "text-gold-400 font-bold" : "text-emerald-200"}`}>{time}</span>
        </div>
    );
}
