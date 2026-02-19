"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, HandHelping, Landmark, BookOpen, Calendar, Download } from "lucide-react";
import { useState } from "react";
import InstallModal from "./InstallModal";

export default function BottomNav() {
    const pathname = usePathname();
    const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

    const links = [
        { href: "/", label: "Asosiy", icon: Home },
        { href: "/taqvim", label: "Taqvim", icon: Calendar },
        { href: "/duolar", label: "Duolar", icon: HandHelping },
        { href: "/masjidlar", label: "Masjidlar", icon: Landmark },
        { href: "/maqolalar", label: "Maqolalar", icon: BookOpen },
    ];

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-emerald-950/90 backdrop-blur-lg border-t border-emerald-800 z-50 pb-safe">
                <div className="grid grid-cols-6 gap-1 items-center h-16 w-full max-w-md mx-auto px-1">
                    {links.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-colors ${isActive ? "text-gold-500" : "text-emerald-400 hover:text-emerald-200"
                                    }`}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[9px] font-medium truncate w-full text-center">{label}</span>
                            </Link>
                        );
                    })}

                    {/* Install App Button */}
                    <button
                        onClick={() => setIsInstallModalOpen(true)}
                        className="flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-colors text-emerald-400 hover:text-emerald-200 focus:outline-none"
                    >
                        <Download size={20} strokeWidth={2} />
                        <span className="text-[9px] font-medium truncate w-full text-center">O'rnatish</span>
                    </button>
                </div>
            </nav>

            <InstallModal
                isOpen={isInstallModalOpen}
                onClose={() => setIsInstallModalOpen(false)}
            />
        </>
    );
}
