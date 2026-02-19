import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { RamadanProvider } from "@/context/RamadanContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "Shahrisabz Ramazon Taqvimi 2026",
    description: "Shahrisabz shahri uchun aniq Ramazon taqvimi, saharlik va iftorlik vaqtlari, duolar va masjidlar ro'yxati.",
    openGraph: {
        title: "Shahrisabz Ramazon Taqvimi 2026",
        description: "Shahrisabz shahri uchun aniq Ramazon taqvimi, saharlik va iftorlik vaqtlari.",
        url: "https://shahrisabz-ramazon.vercel.app",
        siteName: "Shahrisabz Ramazon",
        images: [
            {
                url: "/opengraph-image.png", // Assuming default or auto-generated
                width: 1200,
                height: 630,
            },
        ],
        locale: "uz_UZ",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} bg-emerald-950 text-white font-sans`}>
                <RamadanProvider>
                    {children}
                    <BottomNav />
                </RamadanProvider>
            </body>
        </html>
    );
}
