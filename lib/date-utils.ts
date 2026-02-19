export const MONTHS_UZ = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
];

export const WEEKDAYS_UZ = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
];

export function formatUzbekDate(date: Date, includeWeekday: boolean = false): string {
    const day = date.getDate();
    const month = MONTHS_UZ[date.getMonth()];
    const year = date.getFullYear();

    if (includeWeekday) {
        const weekday = WEEKDAYS_UZ[date.getDay()];
        return `${day}-${month} ${year}, ${weekday}`;
    }

    return `${day}-${month}`;
}
