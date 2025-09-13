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
      const token = localStorage.getItem("token"); // JWT from login

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
    <form
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Waste Management Registration
      </h2>

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="block mb-2">
        City:
        <input
          type="text"
          name="city"
          className="w-full border p-2 rounded"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </label>

      <label className="block mb-2">
        Pincode:
        <input
          type="text"
          name="pincode"
          className="w-full border p-2 rounded"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </label>

      <label className="block mb-2">
        Mobile Number:
        <input
          type="text"
          name="mobileNumber"
          className="w-full border p-2 rounded"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label className="block mb-2">
        Role:
        <select
          name="role"
          className="w-full border p-2 rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option>Normal User</option>
          <option>Municipal Worker</option>
          <option>Industrialist</option>
        </select>
      </label>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="ngoMember"
          checked={formData.ngoMember}
          onChange={handleChange}
          className="mr-2"
        />
        Are you part of any NGO/Club related to waste management?
      </label>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default ParticipantForm;
