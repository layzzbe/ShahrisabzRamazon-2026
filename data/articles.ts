export interface Article {
    id: string;
    title: string;
    content: string;
}

export const ARTICLES: Article[] = [
    {
        id: "niyat",
        title: "Ro'za tutish niyati",
        content: "Ro'za tutish niyati dildan qilinadi. Saharlik paytida: «Navaytu an asuma sovma shahri ramazona minal fajri ilal maghribi, xolisan lillahi ta'ala. Allohu akbar» deb niyat qilinadi. Ma'nosi: «Ramazon oyining ro'zasini subhdan to kun botguncha tutmoqni niyat qildim. Xolis Alloh uchun. Alloh buyukdir.»",
    },
    {
        id: "buzadigan",
        title: "Ro'zani buzadigan amallar",
        content: "Qasddan yeyish va ichish, jinsiy yaqinlik qilish, ozuqa bo'ladigan narsalarni yutish ro'zani buzadi. Shuningdek, og'iz to'ldirib qusish, huqna (klizma) qilish kabi holatlar ham ro'zani ochib yuboradi. Agar unutib yeb-ichib qo'ysa, ro'za ochilmaydi, eslashi bilan darhol to'xtatish kerak.",
    },
    {
        id: "fitr",
        title: "Fitr sadaqasi haqida",
        content: "Fitr sadaqasi Ramazon hayitidan oldin berilishi vojib bo'lgan sadaqadir. U kambag'al va miskinlarga beriladi, to ular ham bayram kunida xursand bo'lishsin. Fitr sadaqasi miqdori har yili O'zbekiston Musulmonlari idorasi tomonidan belgilanadi (odatda bug'doy, arpa, mayiz yoki xurmo qiymatida).",
    },
];
