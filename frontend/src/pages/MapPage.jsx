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

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fly map to coordinates
const FlyToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 15);
  }, [coords, map]);
  return null;
};

// Animated marker
const AnimatedMarker = ({ position }) => {
  const markerRef = useRef(null);
  useEffect(() => {
    if (markerRef.current) markerRef.current.setLatLng(position);
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
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    let receivedWS = false;

    const searchKIET = async () => {
      try {
        const results = await provider.search({ query: "KIET Ghaziabad" });
        if (results.length > 0) {
          const { y, x } = results[0];
          const coords = [y, x];
          setCurrentLocation(coords);
          console.log("📍 Fallback: Centered on KIET Ghaziabad");
        } else {
          console.error("❌ KIET Ghaziabad not found via search");
        }
      } catch (err) {
        console.error("❌ Search failed:", err);
      }
    };

    // 1️⃣ Try WebSocket first
    if (import.meta.env.VITE_WS_URL) {
      ws.current = new WebSocket(import.meta.env.VITE_WS_URL);

      ws.current.onopen = () => console.log("✅ WS Connected");

      ws.current.onmessage = (event) => {
        try {
          const { lat, lng } = JSON.parse(event.data);
          if (lat !== undefined && lng !== undefined) {
            receivedWS = true;
            const coords = [lat, lng];
            setCurrentLocation(coords);
            setHistory((prev) => [...prev.slice(-99), coords]);
          }
        } catch (err) {
          console.error("❌ WS message parse error:", event.data);
        }
      };

      ws.current.onclose = () => console.log("❌ WS Closed");
      ws.current.onerror = () => console.error("❌ WS Error, falling back to GPS/Search");
    }

    // 2️⃣ Fallback: browser geolocation or hidden search
    const fallback = setTimeout(() => {
      if (!receivedWS && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = [pos.coords.latitude, pos.coords.longitude];
            setCurrentLocation(coords);
            console.log("📍 Using browser geolocation");
          },
          () => {
            searchKIET(); // hidden fallback search
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else if (!receivedWS) {
        searchKIET(); // hidden fallback search
      }
    }, 2000);

    return () => {
      ws.current?.close();
      clearTimeout(fallback);
    };
  }, []);

  // Manual search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const results = await provider.search({ query: searchQuery });
      if (results.length > 0) {
        const { y, x } = results[0];
        setSearchResult([y, x]);
      } else {
        alert("No results found");
      }
    } catch (err) {
      console.error("❌ Search error:", err);
    }
  };

  return (
    <div style={{ height: "85vh", width: "100%", position: "relative" }}>
      {/* Search bar */}
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
          center={currentLocation}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <AnimatedMarker position={currentLocation} />
          {history.length > 1 && <Polyline positions={history} color="blue" />}
          {searchResult && <FlyToLocation coords={searchResult} />}
          {searchResult && (
            <Marker position={searchResult}>
              <Popup>🔍 Search Result</Popup>
            </Marker>
          )}
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
          ⏳ Waiting for coordinates...
        </div>
      )}

      {/* Coordinates overlay */}
      {currentLocation && (
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
      )}
    </div>
  );
};

export default MapPage;
