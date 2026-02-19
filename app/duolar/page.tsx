import { DUAS } from "@/data/duas";
import DuaCard from "@/components/DuaCard";

export default function DuolarPage() {
    return (
        <main className="min-h-screen pb-24 px-4 pt-8 bg-emerald-950 text-emerald-50">
            <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-serif text-gold-500 mb-2">Duo va Niyatlar</h1>
                    <p className="text-emerald-200/80 text-sm">
                        Ramazon oyida o'qiladigan muhim duolar
                    </p>
                </header>

                <div className="space-y-6">
                    {DUAS.map((dua) => (
                        <DuaCard key={dua.id} dua={dua} />
                    ))}
                </div>
            </div>
        </main>
    );
}
