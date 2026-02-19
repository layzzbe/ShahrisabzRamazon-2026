import {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    Madhab,
} from "adhan";

export interface PrayerTimeData {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
}

const SHAHRISABZ_COORDINATES = new Coordinates(39.0591, 66.8341);

export function getPrayerTimes(date: Date): PrayerTimeData {
    const params = CalculationMethod.MuslimWorldLeague();
    params.madhab = Madhab.Hanafi;

    const prayerTimes = new PrayerTimes(SHAHRISABZ_COORDINATES, date, params);

    return {
        fajr: prayerTimes.fajr,
        sunrise: prayerTimes.sunrise,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
    };
}

export function getNextPrayer(date: Date): { name: string; time: Date } | null {
    const params = CalculationMethod.MuslimWorldLeague();
    params.madhab = Madhab.Hanafi;

    const prayerTimes = new PrayerTimes(SHAHRISABZ_COORDINATES, date, params);
    const next = prayerTimes.nextPrayer();

    if (next === "none") {
        // Check tomorrow's Fajr
        const tomorrow = new Date(date);
        tomorrow.setDate(date.getDate() + 1);
        const tomorrowTimes = new PrayerTimes(SHAHRISABZ_COORDINATES, tomorrow, params);
        return { name: "fajr", time: tomorrowTimes.fajr };
    }

    const time = prayerTimes.timeForPrayer(next);
    if (!time) return null;

    return { name: next, time };
}
