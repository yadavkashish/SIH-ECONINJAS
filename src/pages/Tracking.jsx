import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Tracking() {
  const [locations, setLocations] = useState([]);
   const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`${API_URL}/api/locations`);
      const data = await res.json();
      setLocations(data);
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 3000); // update every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[20, 78]} zoom={5} style={{ height: "500px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <Marker key={loc.deviceId} position={[loc.latitude, loc.longitude]}>
          <Popup>{`Device: ${loc.deviceId}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Tracking;
