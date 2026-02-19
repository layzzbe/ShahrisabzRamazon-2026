export interface RamadanDay {
    id: number;
    date: string; // e.g., "19-Fevral"
    sahar: string; // e.g., "05:50"
    iftar: string; // e.g., "18:14"
}

export const initialRamadanData: RamadanDay[] = [
    { id: 1, date: "19-Fevral", sahar: "06:03", iftar: "18:19" },
    { id: 2, date: "20-Fevral", sahar: "06:02", iftar: "18:20" },
    { id: 3, date: "21-Fevral", sahar: "06:00", iftar: "18:22" },
    { id: 4, date: "22-Fevral", sahar: "05:59", iftar: "18:23" },
    { id: 5, date: "23-Fevral", sahar: "05:58", iftar: "18:24" },
    { id: 6, date: "24-Fevral", sahar: "05:57", iftar: "18:25" },
    { id: 7, date: "25-Fevral", sahar: "05:56", iftar: "18:26" },
    { id: 8, date: "26-Fevral", sahar: "05:55", iftar: "18:27" },
    { id: 9, date: "27-Fevral", sahar: "05:53", iftar: "18:28" },
    { id: 10, date: "28-Fevral", sahar: "05:52", iftar: "18:29" },
    { id: 11, date: "1-Mart", sahar: "05:50", iftar: "18:30" },
    { id: 12, date: "2-Mart", sahar: "05:49", iftar: "18:31" },
    { id: 13, date: "3-Mart", sahar: "05:48", iftar: "18:32" },
    { id: 14, date: "4-Mart", sahar: "05:46", iftar: "18:33" },
    { id: 15, date: "5-Mart", sahar: "05:45", iftar: "18:34" },
    { id: 16, date: "6-Mart", sahar: "05:43", iftar: "18:35" },
    { id: 17, date: "7-Mart", sahar: "05:42", iftar: "18:36" },
    { id: 18, date: "8-Mart", sahar: "05:40", iftar: "18:37" },
    { id: 19, date: "9-Mart", sahar: "05:38", iftar: "18:38" },
    { id: 20, date: "10-Mart", sahar: "05:37", iftar: "18:39" },
    { id: 21, date: "11-Mart", sahar: "05:36", iftar: "18:40" },
    { id: 22, date: "12-Mart", sahar: "05:34", iftar: "18:41" },
    { id: 23, date: "13-Mart", sahar: "05:32", iftar: "18:42" },
    { id: 24, date: "14-Mart", sahar: "05:31", iftar: "18:43" },
    { id: 25, date: "15-Mart", sahar: "05:29", iftar: "18:44" },
    { id: 26, date: "16-Mart", sahar: "05:28", iftar: "18:45" },
    { id: 27, date: "17-Mart", sahar: "05:27", iftar: "18:46" },
    { id: 28, date: "18-Mart", sahar: "05:25", iftar: "18:47" },
    { id: 29, date: "19-Mart", sahar: "05:23", iftar: "18:48" },
    { id: 30, date: "20-Mart", sahar: "05:21", iftar: "18:49" },
];