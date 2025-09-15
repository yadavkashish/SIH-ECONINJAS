import { useState } from "react";
import axios from "axios";

function Complaints() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        console.error(err);
        alert("Failed to get location");
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !image) {
      alert("Please enter description and upload an image.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");

      formData.append("description", description);
      formData.append("image", image);
      if (location.lat && location.lon) {
        formData.append("latitude", location.lat);
        formData.append("longitude", location.lon);
      }

      const res = await axios.post(`${API_URL}/api/complaints`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus("✅ Complaint submitted successfully!");
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Axios error:", err);
      if (err.response) {
        console.log("Server responded with:", err.response.data);
        setStatus(
          "❌ " + (err.response.data.error || "Failed to submit complaint")
        );
      } else {
        setStatus("❌ " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start pt-12 justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Submit a Complaint
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            className="w-full border rounded-xl p-4 text-lg"
            rows="5"
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-xl shadow-md max-h-64 object-cover"
              />
            )}
          </div>
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl"
          >
            Get My Location
          </button>
          {location.lat && (
            <p className="text-sm text-gray-600 mt-2">
              📍 Latitude: {location.lat}, Longitude: {location.lon}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
        {status && (
          <p className="mt-6 text-center font-medium text-lg">{status}</p>
        )}
      </div>
    </div>
  );
}

export default Complaints;
