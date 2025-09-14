import { useState, useEffect } from "react";
import { Package, Recycle } from "lucide-react";

export default function SellPage() {
  const [sellType, setSellType] = useState("");

  useEffect(() => {
    setSellType(""); // reset when page mounts
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-8 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Sell Your Item</h1>

      {!sellType ? (
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setSellType("product")}
            className="w-40 h-40 bg-green-100 rounded-xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition"
          >
            <Package className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-green-800">Product</span>
          </button>

          <button
            onClick={() => setSellType("waste")}
            className="w-40 h-40 bg-blue-100 rounded-xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition"
          >
            <Recycle className="w-8 h-8 text-blue-700 mb-2" />
            <span className="font-semibold text-blue-800">Waste</span>
          </button>
        </div>
      ) : (
        <form className="space-y-5 mt-6">
          <input
            type="text"
            placeholder="Item Name"
            className="w-full border p-3 rounded-lg"
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            required
          ></textarea>

          {sellType === "product" && (
            <input
              type="number"
              placeholder="Price (₹)"
              className="w-full border p-3 rounded-lg"
              required
            />
          )}

          <input
            type="text"
            placeholder="Quantity / Weight"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input type="file" className="w-full border p-3 rounded-lg" />
          <input
            type="text"
            placeholder="Contact Info"
            className="w-full border p-3 rounded-lg"
            required
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
