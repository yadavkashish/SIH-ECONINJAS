import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// ✅ Function to fetch recycling centers from Overpass API
async function fetchRecyclingCenters(lat, lon, radius = 5000) {
  const query = `
    [out:json];
    node(around:${radius},${lat},${lon})["amenity"="recycling"];
    out;
  `;

  const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

  const res = await fetch(url);
  const data = await res.json();

  console.log("Overpass raw response:", data); // 👈 debug

  return data.elements.map(el => ({
    id: el.id,
    name: el.tags?.name || "Unnamed Recycling Center",
    lat: el.lat,
    lon: el.lon,
  }));
}

export default function MapPage() {
  const [routeInfo, setRouteInfo] = useState(null);
  const [centers, setCenters] = useState([]); // ✅ store recycling centers
  const [mapInstance, setMapInstance] = useState(null); // keep map reference

  useEffect(() => {
    // Prevent "Map container is already initialized"
    const container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }

    // Init map (default: Delhi)
    const map = L.map("map").setView([28.6139, 77.209], 12);
    setMapInstance(map);

    // Tile layer (OSM free)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Search bar
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: true,
      autoClose: true,
      keepResult: true,
    });
    map.addControl(searchControl);

    // ✅ Move search bar to top-left
    const searchContainer = document.querySelector(
      ".leaflet-control-geosearch"
    );
    if (searchContainer) {
      searchContainer.classList.add("absolute", "top-4", "left-4", "z-[2000]");
    }

    // Routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(28.6315, 77.2167), // Connaught Place
        L.latLng(28.5355, 77.391), // Noida
      ],
      routeWhileDragging: true,
      showAlternatives: true,
      createMarker: (i, wp) => {
        return L.marker(wp.latLng, { draggable: true });
      },
    });

    routingControl.addTo(map);

    // Move routing panel into sidebar
    const routingContainer = document.querySelector("#routing-panel");
    if (routingContainer) {
      routingContainer.appendChild(routingControl.getContainer());
    }

    // Listen for route found → extract distance & time
    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];
      const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
      const durationMin = Math.round(route.summary.totalTime / 60);
      setRouteInfo({ distance: distanceKm, duration: durationMin });
    });

    // ✅ Fetch recycling centers for initial location (Delhi)
    fetchRecyclingCenters(28.6139, 77.209).then((data) => {
      setCenters(data);
      data.forEach((c) => {
        L.marker([c.lat, c.lon])
          .addTo(map)
          .bindPopup(`<b>${c.name}</b><br/>♻️ Recycling Center`);
      });
    });

    // ✅ When user searches a location → fetch recycling centers near that place
    map.on("geosearch/showlocation", async (result) => {
      const { y: lat, x: lon } = result.location;

      // Clear old markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && !layer._icon.classList.contains("leaflet-routing-icon")) {
          map.removeLayer(layer);
        }
      });

      // Fetch new centers
      const newCenters = await fetchRecyclingCenters(lat, lon);
      setCenters(newCenters);

      newCenters.forEach((c) => {
        L.marker([c.lat, c.lon])
          .addTo(map)
          .bindPopup(`<b>${c.name}</b><br/>♻️ Recycling Center`);
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex">
      {/* Sidebar Dashboard */}
      <div className="w-96 bg-white shadow-2xl p-6 z-[1000] flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Nearby Recycling Centers</h2>

        {/* ✅ Dynamic list from Overpass API */}
        <ul className="space-y-3 text-gray-700">
          {centers.length > 0 ? (
            centers.map((c) => <li key={c.id}>♻️ {c.name}</li>)
          ) : (
            <li className="text-gray-500">Loading centers...</li>
          )}
        </ul>

        <button
          onClick={() => alert("Custom action (e.g., navigate)")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Navigate to Selected
        </button>

        {/* Route Info Summary */}
        {routeInfo && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-sm text-green-900">
            <h3 className="font-semibold text-lg mb-2">Route Summary</h3>
            <p>🛣 Distance: {routeInfo.distance} km</p>
            <p>⏱ Time: {routeInfo.duration} mins</p>
          </div>
        )}

        {/* Routing Panel Container */}
        <div
          id="routing-panel"
          className="mt-6 border-t pt-4 text-sm text-gray-700"
        >
          <h3 className="font-semibold mb-2">Step-by-step Directions</h3>
          {/* Routing control UI will be injected here */}
        </div>
      </div>

      {/* Map */}
      <div id="map" className="flex-1 h-full"></div>

      {/* Close button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="absolute top-4 right-4 z-[1000] bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700"
      >
        ✕ Close
      </button>
    </div>
  );
}
