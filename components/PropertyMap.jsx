"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// For rendering custom React components as Leaflet icons
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

export default function PropertyMap({ address }) {
  const [position, setPosition] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // Create a custom Lucide-based icon for Leaflet
    const iconMarkup = renderToStaticMarkup(<MapPin size={30} color="red" />);
    const customIcon = L.divIcon({
      html: iconMarkup,
      className: "", // Remove default styling
      iconSize: [30, 30],
      iconAnchor: [15, 30], // Position so tip points to location
    });
    setIcon(customIcon);
  }, []);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}, Indonesia`,
        );
        const data = await res.json();
        if (data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.error("Error fetching coordinates:", err);
      }
    }
    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  if (!position || !icon)
    return <p className="text-center text-gray-600">Loading map...</p>;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position} icon={icon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}
