import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, X, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const goToGreenChampions = () => {
    // 👉 You can add conditions/checks here before redirecting
    navigate("/green-champions");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/api/participants/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setParticipant(data.participant || data);
        setFormData(data.participant || data);
      } catch (err) {
        console.error("❌ Error fetching participant:", err);
        setMessage("❌ Failed to fetch account details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        import.meta.env.VITE_API_URL + "/api/participants/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setParticipant(data.participant || data);
      setEditing(false);
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-8">Loading your account...</p>
    );
  }

  if (!participant) {
    return (
      <p className="text-center text-red-500 mt-8">
        {message || "No participant data found"}
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        {/* Profile Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <User className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Account
        </h2>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Name:</span>
            <span>{participant.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">City:</span>
            <span>{participant.city}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Pincode:</span>
            <span>{participant.pincode}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Mobile:</span>
            <span>{participant.mobileNumber}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Role:</span>
            <span>{participant.role}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">NGO Member:</span>
            <span>{participant.ngoMember ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Email:</span>
            <span>{participant.userId?.email || "Not available"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Edit Profile
          </button>

          {/* Green Champions Option */}
          <button
            onClick={goToGreenChampions}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            <Leaf className="h-5 w-5" />
            Join Green Champions
          </button>

          {/* <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button> */}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setEditing(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                placeholder="City"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode || ""}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full border p-2 rounded"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
