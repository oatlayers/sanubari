"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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

export default function PropertyMap({ address }) {
  const [position, setPosition] = useState(null);
  const [icon, setIcon] = useState(null);
  // keep a ref to the leaflet object if needed later:
  const [leafletObj, setLeafletObj] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // dynamic-import Leaflet (only on client)
      const leafletModule = await import("leaflet");
      const L = leafletModule.default || leafletModule;

      // Small inline SVG pin (avoids server-only react-dom/server)
      const svgPin = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             width="30" height="30" fill="none" stroke="red" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 21s-6.5-4.5-6.5-10A6.5 6.5 0 1 1 18.5 11c0 5.5-6.5 10-6.5 10z"/>
          <circle cx="12" cy="11" r="2.5" fill="red" stroke="none"/>
        </svg>
      `;

      const customIcon = L.divIcon({
        html: svgPin,
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      if (mounted) {
        setIcon(customIcon);
        setLeafletObj(L);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Geocode (unchanged)
  useEffect(() => {
    let mounted = true;
    async function fetchCoordinates() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address + ", Indonesia",
          )}`,
        );
        const data = await res.json();
        if (mounted && data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.error("Error fetching coordinates:", err);
      }
    }
    if (address) fetchCoordinates();
    return () => {
      mounted = false;
    };
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
