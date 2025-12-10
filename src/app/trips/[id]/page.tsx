'use client';

import { useTrips } from "@/hooks/useTrips";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, Calendar, Clock, Flame, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Dynamically import Map with no SSR to avoid window issues
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-3xl" />
});

export default function TripDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { trips, loading } = useTrips();

    const trip = useMemo(() => trips.find((t) => t.id === id), [trips, id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-orange-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
    </div>;

    if (!trip) {
        return (
            <div className="flex justify-center min-h-screen bg-neutral-200 dark:bg-neutral-900 py-8">
                <div className="w-full max-w-md mx-auto min-h-[850px] bg-white dark:bg-black text-foreground flex flex-col items-center justify-center rounded-[3rem] border-8 border-neutral-900 dark:border-neutral-800 overflow-hidden shadow-2xl relative">
                    <h2 className="text-xl font-bold">Trip not found</h2>
                    <button onClick={() => router.back()} className="text-orange-500 mt-4">Go Back</button>
                </div>
            </div>
        );
    }

    // Calculate generic coords if not present (Square around a center point for demo)
    const defaultCoords = [
        { lat: 18.5204, lng: 73.8567 },
        { lat: 18.5210, lng: 73.8580 },
        { lat: 18.5220, lng: 73.8585 },
        { lat: 18.5230, lng: 73.8560 },
        { lat: 18.5204, lng: 73.8567 }
    ];

    const coordinates = trip.coordinates || defaultCoords;

    return (
        <div className="flex justify-center min-h-screen bg-neutral-200 dark:bg-neutral-900 py-8">
            <div className="w-full max-w-md mx-auto min-h-[850px] bg-white dark:bg-black text-foreground relative pb-8 rounded-[3rem] border-8 border-neutral-900 dark:border-neutral-800 overflow-hidden shadow-2xl">
                {/* Header */}
                <header className="p-6 flex justify-between items-center z-10 relative bg-gradient-to-b from-white/80 to-transparent dark:from-black/80">
                    <button onClick={() => router.back()} className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:scale-105 transition-transform"><ChevronLeft size={24} /></button>
                    <span className="font-bold">Trip Details</span>
                    <button className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:scale-105 transition-transform"><MoreHorizontal size={24} /></button>
                </header>

                {/* Map Section */}
                <div className="h-[400px] w-full -mt-20 z-0 relative">
                    <Map coordinates={coordinates} />
                </div>

                {/* Stats Sheet */}
                <div className="bg-white dark:bg-zinc-900 rounded-t-[2.5rem] -mt-8 relative z-10 p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] min-h-[500px]">
                    <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" />

                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">{trip.name || "Cycling Activity"}</h1>
                            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                                <MapPin size={14} /> Pune, India
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 mb-1">{new Date(trip.date).toDateString()}</p>
                            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-xs font-bold inline-block">
                                {trip.distance} km
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 mb-2 text-gray-500">
                                <Flame size={18} className="text-orange-500" />
                                <span className="text-xs">Calories</span>
                            </div>
                            <p className="text-xl font-bold">{trip.calories} <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
                        </div>
                        <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 mb-2 text-gray-500">
                                <Clock size={18} className="text-blue-500" />
                                <span className="text-xs">Duration</span>
                            </div>
                            <p className="text-xl font-bold">{(trip.duration / (1000 * 60)).toFixed(0)} <span className="text-sm font-normal text-muted-foreground">min</span></p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold">Splits / Segments</h3>
                        {/* Placeholder for splits */}
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-zinc-800">
                            <span className="text-gray-500">1 km</span>
                            <span className="font-mono">3:45</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-zinc-800">
                            <span className="text-gray-500">2 km</span>
                            <span className="font-mono">3:50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
