import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ParticipantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    mobileNumber: "",
    role: "Normal User",
    ngoMember: false,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/participants",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Form submitted successfully!");
      setFormData({
        name: "",
        city: "",
        pincode: "",
        mobileNumber: "",
        role: "Normal User",
        ngoMember: false,
      });

      navigate("/profile");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error submitting form");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-green-50 pt-12 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl"
        onSubmit={handleSubmit} // ✅ Attach submit here
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Citizen Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="10-digit number"
              required
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
              required
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="text-gray-700 font-medium mb-2 md:mb-0">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-4 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option>Normal User</option>
            <option>Municipal Worker</option>
            <option>Industrialist</option>
          </select>
        </div>

        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            name="ngoMember"
            checked={formData.ngoMember}
            onChange={handleChange}
            className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-400 rounded"
          />
          <label className="ml-3 text-gray-700 text-sm">
            Part of NGO/Club related to waste management?
          </label>
        </div>

        <button
          type="submit" // ✅ Just keep type submit, no onSubmit
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Submit
        </button>

        {message && (
          <p
            className={`mt-6 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ParticipantForm;
