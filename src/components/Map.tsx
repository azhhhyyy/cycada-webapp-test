'use client';

import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix Leaflet's default icon issue
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    coordinates: Array<{ lat: number; lng: number }>;
}

export default function Map({ coordinates }: MapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-full w-full bg-gray-200 animate-pulse rounded-3xl" />;
    }

    if (!coordinates || coordinates.length === 0) {
        return <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-3xl text-gray-500">No GPS Data</div>;
    }

    const center = coordinates[0];

    return (
        <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="h-full w-full rounded-3xl z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={coordinates} color="#FF6B00" weight={5} />
            <Marker position={coordinates[0]}>
                <Popup>Start Point</Popup>
            </Marker>
            <Marker position={coordinates[coordinates.length - 1]}>
                <Popup>End Point</Popup>
            </Marker>
        </MapContainer>
    );
}
