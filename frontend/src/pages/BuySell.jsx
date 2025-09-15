import { Link } from "react-router-dom";
import { ShoppingBag, Upload } from "lucide-react";

export default function BuySellPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-gradient-to-b from-green-50 to-green-100 px-4">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 text-center">
        Choose an Option
      </h1>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {/* Buy Card */}
        <Link to="/buy">
          <div className="w-72 h-60 md:w-80 md:h-64 bg-green-100 border border-green-300 rounded-3xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6">
            <ShoppingBag className="w-12 h-12 text-green-700 mb-4" />
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Buy Products
            </h2>
            <p className="text-sm text-green-700 text-center">
              Explore eco-friendly products made from recycled materials.
            </p>
          </div>
        </Link>

        {/* Sell Card */}
        <Link to="/sell">
          <div className="w-72 h-60 md:w-80 md:h-64 bg-blue-100 border border-blue-300 rounded-3xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6">
            <Upload className="w-12 h-12 text-blue-700 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Sell Items
            </h2>
            <p className="text-sm text-blue-700 text-center">
              List your waste or products for recycling and reuse.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
