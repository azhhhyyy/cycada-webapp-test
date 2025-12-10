'use client';

import { useTrips } from "@/hooks/useTrips";
import { StatCard } from "./StatCard";
import { TripList } from "./TripList";
import { ActivityChart } from "./ActivityChart";
import { Flame, Timer, MapPin, TrendingUp, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/ThemeToggle";
import { timeAgo } from "@/utils/time";



export function Dashboard() {
    const { trips, loading } = useTrips();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-orange-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
        </div>;
    }

    // Calculate generic totals
    const totalCalories = trips.reduce((acc, trip) => acc + trip.calories, 0);

    return (
        <div className="pb-24 max-w-md mx-auto min-h-[850px] bg-gray-50 dark:bg-black text-foreground overflow-hidden shadow-2xl relative font-sans rounded-[3rem] border-8 border-neutral-900 dark:border-neutral-800">
            {/* Header */}
            <header className="px-6 py-6 flex justify-between items-center sticky top-0 z-30 bg-gray-50 dark:bg-black transition-colors">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Good Morning!</p>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">Azhaan Shaikh</h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-3"
                >
                    <ThemeToggle />
                    <button className="p-2.5 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 hover:scale-110 active:scale-95 transition-all"><Settings size={20} className="text-gray-600 dark:text-gray-300" /></button>
                </motion.div>
            </header>

            <main className="px-6 space-y-8">
                {/* Hero Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                    className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-zinc-900 p-6 rounded-[2rem] relative overflow-hidden border border-orange-100 dark:border-orange-900/30 shadow-[0_8px_30px_rgb(255,107,0,0.12)]"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -ml-5 -mb-5 pointer-events-none"></div>

                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <span className="bg-white/80 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-orange-100 dark:border-orange-500/20">New Challenge 🔥</span>
                            <div className="mt-4">
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">{totalCalories.toLocaleString()}</h2>
                                <p className="text-sm font-medium text-gray-400 mt-1">Total Calories Burned</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-4 text-white shadow-xl shadow-orange-500/30 transform rotate-6 hover:rotate-12 transition-transform duration-500">
                            <Flame size={32} fill="currentColor" className="drop-shadow-md" />
                        </div>
                    </div>
                </motion.div>

                {/* Latest Activity Preview */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Route</h3>
                    </div>
                    <div className="bg-gray-100 dark:bg-zinc-800 h-48 rounded-[2rem] relative overflow-hidden flex items-end p-4 group cursor-pointer border border-transparent hover:border-orange-200 dark:hover:border-zinc-700 transition-all">
                        {/* Abstract map pattern */}
                        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-black/40 pointer-events-none" />

                        <div className="relative z-10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl w-full flex justify-between items-center shadow-lg border border-white/20 dark:border-white/5 transition-transform group-hover:scale-[1.02]">
                            <div className="flex gap-4 items-center">
                                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-2xl p-2.5 text-orange-600 dark:text-orange-400">
                                    <TrendingUp size={22} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">Today Cycling</p>
                                    <p className="font-bold text-xl text-gray-900 dark:text-white">{trips[0]?.distance || 0} km</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium bg-gray-50 dark:bg-zinc-800 px-2 py-1 rounded-lg">{trips[0] ? timeAgo(trips[0].date) : ""}</span>
                        </div>
                    </div>
                </motion.section>

                {/* Today Activities Stats Grid */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <StatCard
                            label="Calory Burnt"
                            value={trips[0]?.calories || 0}
                            unit="kcal"
                            icon={Flame}
                            color="orange"
                            trend="+4.5%"
                            className="bg-white dark:bg-zinc-900 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none"
                        />
                        <div className="flex flex-col gap-4">
                            <StatCard
                                label="Distance"
                                value={trips[0]?.distance || 0}
                                unit="km"
                                icon={MapPin}
                                color="red"
                                className="bg-white dark:bg-zinc-900 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none"
                            />
                            <StatCard
                                label="Time"
                                value={(trips[0]?.duration / (1000 * 60)).toFixed(0) || 0}
                                unit="min"
                                icon={Timer}
                                color="orange"
                                className="bg-white dark:bg-zinc-900 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none"
                            />
                        </div>
                    </motion.div>
                </section>

                <section>
                    <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Activity Chart</h3>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-gray-100 dark:border-zinc-800"
                    >
                        <ActivityChart trips={trips} />
                    </motion.div>
                </section>

                <TripList trips={trips} />
            </main>
        </div>
    );
}
