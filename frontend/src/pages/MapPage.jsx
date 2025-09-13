import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [history, setHistory] = useState([]);
  const ws = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  // Connect WebSocket
  ws.current = new WebSocket(`${API_URL.replace(/^http/, "ws")}/ws`);

  ws.current.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setCurrentLocation([data.lat, data.lng]);
    setHistory((prev) => [...prev, [data.lat, data.lng]]);
  };

  ws.current.onopen = () => console.log("WebSocket connected");
  ws.current.onclose = () => console.log("WebSocket disconnected");

  // Fetch initial location history from backend
  fetch(`${API_URL}/api/locations/history`)
    .then((res) => res.json())
    .then((data) => {
      const coords = data.map((loc) => [loc.lat, loc.lng]);
      setHistory(coords);
      if (coords.length > 0) setCurrentLocation(coords[0]);
    });

  return () => ws.current.close();
}, []);


  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <MapContainer
        center={currentLocation || [28.7041, 77.1025]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentLocation && <Marker position={currentLocation} />}
        {history.length > 1 && <Polyline positions={history} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapPage;