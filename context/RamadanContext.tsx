"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { initialRamadanData, RamadanDay } from "@/data/ramadanData";

interface RamadanContextType {
    ramadanData: RamadanDay[];
    updateDay: (id: number, sahar: string, iftar: string) => void;
    resetData: () => void;
}

const RamadanContext = createContext<RamadanContextType | undefined>(undefined);

export const RamadanProvider = ({ children }: { children: React.ReactNode }) => {
    // Strictly use initialRamadanData as the single source of truth
    const [ramadanData, setRamadanData] = useState<RamadanDay[]>(initialRamadanData);

    // No localStorage reading/writing to prevent stale data issues.
    // Admin updates will only persist in memory for the current session.

    const updateDay = (id: number, sahar: string, iftar: string) => {
        setRamadanData((prev) => {
            const newData = prev.map((day) => (day.id === id ? { ...day, sahar, iftar } : day));
            return newData;
        });
    };

    const resetData = () => {
        setRamadanData(initialRamadanData);
    };

    return (
        <RamadanContext.Provider value={{ ramadanData, updateDay, resetData }}>
            {children}
        </RamadanContext.Provider>
    );
};

export const useRamadan = () => {
    const context = useContext(RamadanContext);
    if (context === undefined) {
        throw new Error("useRamadan must be used within a RamadanProvider");
    }
    return context;
};
