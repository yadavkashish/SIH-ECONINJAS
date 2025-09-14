import { Link } from "react-router-dom";
import { ShoppingBag, Upload } from "lucide-react";

export default function BuySellPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-10">Choose an Option</h1>
      <div className="flex gap-12">
        {/* Buy Card */}
        <Link to="/buy">
          <div className="w-64 h-48 bg-green-100 border border-green-400 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition p-6">
            <ShoppingBag className="w-10 h-10 text-green-700 mb-3" />
            <h2 className="text-xl font-semibold text-green-800">Buy Products</h2>
            <p className="text-sm text-green-700 mt-2 text-center">
              Explore eco-friendly products made from recycled materials.
            </p>
          </div>
        </Link>

        {/* Sell Card */}
        <Link to="/sell">
          <div className="w-64 h-48 bg-blue-100 border border-blue-400 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition p-6">
            <Upload className="w-10 h-10 text-blue-700 mb-3" />
            <h2 className="text-xl font-semibold text-blue-800">Sell Items</h2>
            <p className="text-sm text-blue-700 mt-2 text-center">
              List your waste or products for recycling and reuse.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
