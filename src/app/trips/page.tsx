'use client';

import { useTrips } from "@/hooks/useTrips";
import { TripList } from "@/components/TripList";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AllTripsPage() {
    const { trips, loading } = useTrips();
    const router = useRouter();

    if (loading) return <div className="min-h-screen flex items-center justify-center text-orange-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
    </div>;

    return (
        <div className="flex justify-center min-h-screen bg-neutral-200 dark:bg-neutral-900 py-8">
            <div className="w-full max-w-md mx-auto min-h-[850px] bg-white dark:bg-black text-foreground pb-8 rounded-[3rem] border-8 border-neutral-900 dark:border-neutral-800 overflow-hidden shadow-2xl relative">
                <header className="p-6 flex items-center gap-4 bg-white dark:bg-black sticky top-0 z-10 border-b border-gray-100 dark:border-zinc-800">
                    <button onClick={() => router.back()} className="p-2 rounded-full border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"><ChevronLeft size={24} /></button>
                    <h1 className="text-xl font-bold">All Activities</h1>
                </header>
                <div className="px-6 mt-4">
                    <TripList trips={trips} />
                </div>
            </div>
        </div>
    );
}
