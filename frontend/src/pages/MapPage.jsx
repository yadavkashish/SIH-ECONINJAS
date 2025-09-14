import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Component to smoothly fly map to new coords
const FlyToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 15);
    }
  }, [coords, map]);
  return null;
};

// ✅ Animated marker (updates smoothly)
const AnimatedMarker = ({ position }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  return (
    <Marker ref={markerRef} position={position}>
      <Popup>
        📍 Lat: {position[0]}, Lng: {position[1]}
      </Popup>
    </Marker>
  );
};

const MapPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const ws = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const provider = new OpenStreetMapProvider();

  // Helper to normalize lat/lng keys
  const getCoords = (obj) => {
    const lat = obj.lat ?? obj.latitude ?? null;
    const lng = obj.lng ?? obj.longitude ?? null;
    return lat != null && lng != null ? [lat, lng] : null;
  };

  useEffect(() => {
    ws.current = new WebSocket(`${API_URL.replace(/^http/, "ws")}/ws`);

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const coords = getCoords(data);
        if (coords) {
          setCurrentLocation(coords);
          setHistory((prev) => [...prev.slice(-99), coords]);
        }
      } catch (err) {
        console.error("❌ Failed to parse WS message:", event.data);
      }
    };

    fetch(`${API_URL}/api/locations/history`)
      .then((res) => res.json())
      .then((data) => {
        const coords = data.map((loc) => getCoords(loc)).filter((c) => c !== null);
        setHistory(coords);
        if (coords.length > 0) setCurrentLocation(coords[coords.length - 1]);
      })
      .catch((err) => console.error("❌ Failed to fetch history:", err));

    return () => ws.current.close();
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const results = await provider.search({ query: searchQuery });
    if (results.length > 0) {
      const { y, x } = results[0];
      setSearchResult([y, x]);
    } else {
      alert("No results found");
    }
  };

  return (
    <div style={{ height: "85vh", width: "100%", position: "relative" }}>
      {/* 🔍 Search bar */}
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "white",
          padding: "6px 10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          width: "260px",
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search a place..."
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "6px 8px",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 10px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Go
        </button>
      </form>

      {/* Map */}
      <MapContainer
        center={currentLocation || [28.7041, 77.1025]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Live GPS Marker */}
        {currentLocation && <AnimatedMarker position={currentLocation} />}

        {/* Path history */}
        {history.length > 1 && <Polyline positions={history} color="blue" />}

        {/* Fly to searched location */}
        {searchResult && <FlyToLocation coords={searchResult} />}
        {searchResult && <Marker position={searchResult}><Popup>🔍 Search Result</Popup></Marker>}

        {/* Fly to GPS automatically */}
        {currentLocation && <FlyToLocation coords={currentLocation} />}
      </MapContainer>

      {/* Coordinates overlay */}
      {currentLocation ? (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          📍 Lat: {currentLocation[0].toFixed(5)}, Lng: {currentLocation[1].toFixed(5)}
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          ⏳ Waiting for location...
        </div>
      )}
    </div>
  );
};

export default MapPage;
