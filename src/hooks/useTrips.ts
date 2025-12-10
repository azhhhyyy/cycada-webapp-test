import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export interface Trip {
    id: string;
    name?: string;
    distance: number; // in km
    calories: number;
    duration: number; // in minutes
    date: string; // ISO string
    coordinates?: Array<{ lat: number; lng: number }>; // For map
}

export function useTrips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ideally, we would fetch based on authenticated user ID
        // const userId = auth.currentUser?.uid;
        // const tripsRef = ref(db, `users/${userId}/trips`);

        // For now, we'll assume a global 'trips' node or just return mock data if envs are missing
        const database = db;
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !database) {
            console.warn("Firebase API Key or DB not found. Using mock data.");
            setTrips(MOCK_TRIPS);
            setLoading(false);
            return;
        }

        const tripsRef = ref(database, "trips");

        const unsubscribe = onValue(tripsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tripList = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key,
                    ...value,
                }));
                setTrips(tripList);
            } else {
                setTrips(MOCK_TRIPS); // Fallback to mock data if empty
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching trips:", error);
            setTrips(MOCK_TRIPS); // Fallback on error
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { trips, loading };
}

const MOCK_TRIPS: Trip[] = [
    {
        id: "1",
        name: "Morning Ride",
        distance: 7.8,
        calories: 120,
        duration: 45 * 60 * 1000, // 45 min in ms
        date: new Date().toISOString(),
        coordinates: [
            { lat: 18.5204, lng: 73.8567 },
            { lat: 18.5210, lng: 73.8580 },
            { lat: 18.5220, lng: 73.8590 },
            // ... more points
        ]
    },
    {
        id: "2",
        name: "Evening Commute",
        distance: 12.5,
        calories: 350,
        duration: 60 * 60 * 1000, // 60 min in ms
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
    {
        id: "3",
        name: "Weekend Long Ride",
        distance: 35.8,
        calories: 850,
        duration: 120 * 60 * 1000, // 120 min in ms
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    }
];
