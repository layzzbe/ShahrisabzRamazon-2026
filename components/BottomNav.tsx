"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, HandHelping, Landmark, BookOpen, Calendar } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Bosh Sahifa", icon: Home },
        { href: "/taqvim", label: "Taqvim", icon: Calendar },
        { href: "/duolar", label: "Duolar", icon: HandHelping },
        { href: "/masjidlar", label: "Masjidlar", icon: Landmark },
        { href: "/maqolalar", label: "Maqolalar", icon: BookOpen },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-emerald-950/90 backdrop-blur-lg border-t border-emerald-800 z-50 pb-safe">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? "text-gold-500" : "text-emerald-400 hover:text-emerald-200"
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
