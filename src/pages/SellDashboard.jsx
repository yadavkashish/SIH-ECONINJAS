import { Link } from "react-router-dom";

export default function SellDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-10">Sell Options</h1>
      <div className="flex gap-12">
        
        {/* Sell Bulk Waste */}
        <Link to="/sell/bulk">
          <div className="w-64 h-48 bg-red-100 border border-red-400 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition p-6">
            <h2 className="text-xl font-semibold text-red-800">Bulk Waste</h2>
            <p className="text-sm text-red-700 mt-2 text-center">
              Sell industrial bulk waste that can be reused.
            </p>
          </div>
        </Link>

        {/* Sell Finished Items */}
        <Link to="/sell/finished">
          <div className="w-64 h-48 bg-indigo-100 border border-indigo-400 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition p-6">
            <h2 className="text-xl font-semibold text-indigo-800">Finished Items</h2>
            <p className="text-sm text-indigo-700 mt-2 text-center">
              Sell eco-products or small recyclable items.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

