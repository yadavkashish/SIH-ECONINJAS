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
    // Determine protocol (wss for https, ws for http)
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";

    // Use backend URL from env; remove protocol to get host
    const wsHost =
      import.meta.env.VITE_API_URL?.replace(/^https?:\/\//, "") ||
      "localhost:5000";

    // Connect to backend WS
    ws.current = new WebSocket(`${wsProtocol}://${wsHost}/ws`);

    ws.current.onopen = () => console.log("✅ WS Connected to backend");

    ws.current.onmessage = (event) => {
      try {
        const { lat, lng } = JSON.parse(event.data);
        if (lat !== undefined && lng !== undefined) {
          const coords = [lat, lng];
          setCurrentLocation(coords);
          setHistory((prev) => [...prev.slice(-99), coords]);
        }
      } catch (err) {
        console.error("❌ Failed to parse WS message:", event.data);
      }
    };

    ws.current.onclose = () => console.log("❌ WS Closed");
    ws.current.onerror = (err) => console.error("❌ WS Error", err);

    // Fetch initial history from backend
    fetch(`${import.meta.env.VITE_API_URL}/api/locations`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const coords = data
          .map((loc) =>
            loc.lat !== undefined && loc.lng !== undefined
              ? [loc.lat, loc.lng]
              : null
          )
          .filter((c) => c !== null);
        setHistory(coords);
        if (coords.length > 0) setCurrentLocation(coords[0]);
      })
      .catch((err) => console.error("❌ Failed to fetch history:", err));

    return () => ws.current?.close();
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
      {currentLocation ? (
        <MapContainer
          center={currentLocation} // ✅ No default fallback
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Live GPS Marker */}
          <AnimatedMarker position={currentLocation} />

          {/* Path history */}
          {history.length > 1 && <Polyline positions={history} color="blue" />}

          {/* Fly to searched location */}
          {searchResult && <FlyToLocation coords={searchResult} />}
          {searchResult && (
            <Marker position={searchResult}>
              <Popup>🔍 Search Result</Popup>
            </Marker>
          )}

          {/* Fly to GPS automatically */}
          <FlyToLocation coords={currentLocation} />
        </MapContainer>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: "#555",
          }}
        >
          ⏳ Waiting for GPS location from device...
        </div>
      )}

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
          📍 Lat: {currentLocation[0].toFixed(5)}, Lng:{" "}
          {currentLocation[1].toFixed(5)}
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
