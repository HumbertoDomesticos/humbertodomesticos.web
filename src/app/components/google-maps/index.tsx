"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrigir ícones padrão do Leaflet no React (sem mexer em _getIconUrl)
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const center = {
    lat: -22.31439,
    lng: -48.54817,
};


export function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);

    const markerRef = useRef<L.Marker>(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90}>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <span onClick={toggleDraggable} style={{ cursor: "pointer" }}>
                    {draggable
                        ? "O marcador está arrastável"
                        : "Clique aqui para tornar o marcador arrastável"}
                </span>
            </Popup>
        </Marker>
    );
}

export default function MapPage() {
    return (
        <MapContainer center={center} zoom={16} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <Link href="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
        </MapContainer>
    );
}
