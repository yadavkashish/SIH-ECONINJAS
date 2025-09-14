import { Link } from "react-router-dom";

export default function BuyDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-10">Buy Options</h1>
      <div className="flex gap-12">
        
        {/* Bulk Waste */}
        <Link to="/buy/bulk">
          <div className="w-64 h-48 bg-yellow-100 border border-yellow-400 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition p-6">
            <h2 className="text-xl font-semibold text-yellow-800">Bulk Waste</h2>
            <p className="text-sm text-yellow-700 mt-2 text-center">
              Buy industrial-level waste materials for reuse.
            </p>
          </div>
        </Link>

        {/* Finished Items */}
        <Link to="/buy/finished">
          <div className="w-64 h-48 bg-purple-100 border border-purple-400 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition p-6">
            <h2 className="text-xl font-semibold text-purple-800">Finished Items</h2>
            <p className="text-sm text-purple-700 mt-2 text-center">
              Buy eco-friendly finished products made from recycled waste.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
