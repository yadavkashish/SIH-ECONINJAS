import { useState } from "react";
import axios from "axios";

function Complaints() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Get user location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
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
      formData.append("description", description);
      formData.append("image", image);
      if (location.lat && location.lon) {
        formData.append("latitude", location.lat);
        formData.append("longitude", location.lon);
      }

      const res = await axios.post("http://localhost:5000/api/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("✅ Complaint submitted successfully!");
      console.log("Response:", res.data);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Submit a Complaint</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border rounded-lg p-3"
            rows="3"
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
                className="mt-3 rounded-lg shadow-md max-h-48 object-cover"
              />
            )}
          </div>

          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Get My Location
          </button>
          {location.lat && (
            <p className="text-sm text-gray-600">
              📍 Latitude: {location.lat}, Longitude: {location.lon}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>

        {status && <p className="mt-4 text-center font-medium">{status}</p>}
      </div>
    </div>
  );
}

export default Complaints;
