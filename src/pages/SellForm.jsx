import { useState } from "react";

export default function SellForm({ category }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "waste_uploads"); // ✅ preset
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhvcxh4re/image/upload", // ✅ cloud name
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    setForm((prev) => ({ ...prev, imageUrl: result.secure_url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { ...form, category });
    // Send to your backend (form + form.imageUrl)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Sell {category}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded-lg"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full p-2 border rounded-lg"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded-lg"
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded-lg border"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
