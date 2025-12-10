import { Trip } from "@/hooks/useTrips";
import { Bike, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface TripListProps {
    trips: Trip[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function TripList({ trips }: TripListProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-transparent">
                <h3 className="text-lg font-bold">Latest Activities</h3>
                <Link href="/trips" className="text-sm text-orange-500 hover:underline">See all</Link>
            </div>
            <motion.div
                className="space-y-3"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {trips.map((trip) => (
                    <motion.div variants={item} key={trip.id}>
                        <Link href={`/trips/${trip.id}`} className="block group">
                            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-full group-hover:bg-orange-100 transition-colors">
                                        <Bike className="text-orange-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100">{trip.name || "Cycling Session"}</h4>
                                        <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(trip.date).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{trip.distance} km</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg">{trip.calories} <span className="text-xs font-normal text-muted-foreground">kcal</span></span>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
                {trips.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No activities yet.</p>
                )}
            </motion.div>
        </div>
    );
}
