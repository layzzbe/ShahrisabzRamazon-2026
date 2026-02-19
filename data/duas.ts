export interface Dua {
    id: string;
    title: string;
    labels: {
        arabic: string;
        uzbek_latin: string;
        uzbek_cyrillic: string;
    };
    content: {
        arabic_text: string;
        arabic_transliteration: string;
        uzbek_latin: string;
        uzbek_cyrillic: string;
    };
}

export const DUAS: Dua[] = [
    {
        id: "suhoor",
        title: "Saharlik Duosi (Niyat)",
        labels: {
            arabic: "دعاء السحور",
            uzbek_latin: "Saharlik Duosi",
            uzbek_cyrillic: "Саҳарлик Дуоси",
        },
        content: {
            arabic_text: "نَوَيْتُ أَنْ أَصُومَ صَوْمَ شَهْرِ رَمَضَانَ مِنَ الْفَجْرِ إِلَى الْمَغْرِبِ، خَالِصًا لِلهِ تَعَالَى أَللهُ أَكْبَرُ",
            arabic_transliteration: "Navaytu an asuma sovma shahri ramazona minal fajri ilal maghribi, xolisan lillahi ta'ala. Allohu akbar.",
            uzbek_latin: "Ramazon oyining ro‘zasini subhdan to kun botguncha tutmoqni niyat qildim. Xolis Alloh uchun. Alloh buyukdir.",
            uzbek_cyrillic: "Рамазон ойининг рўзасини субҳдан то кун ботгунча тутмоқни ният қилдим. Холис Аллоҳ учун. Аллоҳ буюкдир.",
        },
    },
    {
        id: "iftar",
        title: "Iftorlik Duosi",
        labels: {
            arabic: "دعاء الإفطار",
            uzbek_latin: "Iftorlik Duosi",
            uzbek_cyrillic: "Ифторлик Дуоси",
        },
        content: {
            arabic_text: "اَللَّهُمَّ لَكَ صُمْتُ وَ بِكَ آمَنْتُ وَ عَلَيْكَ تَوَكَّلْتُ وَ عَلَى رِزْقِكَ أَفْطَرْتُ، يَا غَفَّارُ اغْفِرْ لِي مَا قَدَّمْتُ وَ مَا أَخَّرْتُ",
            arabic_transliteration: "Allohumma laka sumtu va bika amantu va alayka tavakkaltu va 'ala rizqika aftartu, ya ghaffaru aghfir li ma qoddamtu va ma axxortu.",
            uzbek_latin: "Ey Allohim, ushbu ro‘zamni Sen uchun tutdim va Senga iymon keltirdim va Senga tavakkal qildim va bergan rizqing bilan iftor qildim. Ey gunohlarni afv qilguvchi Zot, mening avvalgi va keyingi gunohlarimni mag‘firat qilgin.",
            uzbek_cyrillic: "Эй Аллоҳим, ушбу рўзамни Сен учун тутдим ва Сенга иймон келтирдим ва Сенга таваккал қилдим ва берган ризқинг билан ифтор қилдим. Эй гуноҳларни афв қилгувчи Зот, менинг аввалги ва кейинги гуноҳларимни мағфират қилгин.",
        },
    },
];
