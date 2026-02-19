import { MapPin, Navigation } from "lucide-react";

const MOSQUES = [
    {
        id: 1,
        name: "Ko'k Gumbaz Masjidi",
        address: "Shahrisabz sh., Ipak Yo'li ko'chasi",
        coords: "39.0545,66.8288"
    },
    {
        id: 2,
        name: "Hazrati Imom Masjidi",
        address: "Shahrisabz sh., Amir Temur xiyoboni",
        coords: "39.0502,66.8301"
    },
    {
        id: 3,
        name: "Malik Ashtar Masjidi",
        address: "Shahrisabz t., Kesh mahallasi",
        coords: "39.0621,66.8412"
    }
];

export default function MosqueList() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOSQUES.map((mosque) => (
                <div key={mosque.id} className="p-4 rounded-xl bg-emerald-800/30 border border-emerald-700/50 hover:border-gold-500/50 transition-colors group">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <h3 className="font-serif text-lg text-emerald-50">{mosque.name}</h3>
                            <div className="flex items-center text-sm text-emerald-300 space-x-1">
                                <MapPin size={14} />
                                <span>{mosque.address}</span>
                            </div>
                        </div>
                    </div>
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${mosque.coords}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center w-full py-2 px-4 rounded-lg bg-emerald-700/50 text-gold-400 hover:bg-gold-500 hover:text-emerald-900 transition-colors font-medium text-sm gap-2"
                    >
                        <Navigation size={16} />
                        Get Directions
                    </a>
                </div>
            ))}
            <div className="mt-8 col-span-1 sm:col-span-2 lg:col-span-3 rounded-xl overflow-hidden border border-gold-500/50 shadow-lg h-[300px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3086.299596637841!2d66.8266453153578!3d39.05448997954674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4ce5f1b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sKok%20Gumbaz%20Mosque!5e0!3m2!1sen!2s!4v1676640000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>
        </div>
    );
}
