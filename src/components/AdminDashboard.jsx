import React, { useEffect, useState } from "react";
import { fetchPendingApplications, approveApplication, rejectApplication } from "../services/api";

// ✅ Top-level export
export const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || "change-me-to-a-secure-token";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const CITY = "Ghaziabad";

  const load = async () => {
    setLoading(true);
    const res = await fetchPendingApplications(CITY, ADMIN_TOKEN);
    if (res && res.pending) setPending(res.pending);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    await approveApplication(id, ADMIN_TOKEN);
    load();
  };

  const handleReject = async (id) => {
    await rejectApplication(id, ADMIN_TOKEN);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        🌱 Municipal Dashboard — Ghaziabad
      </h1>

      {loading && (
        <div className="text-gray-500 mb-4">Loading applications...</div>
      )}

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Pending Applications
        </h2>

        {pending.length === 0 ? (
          <div className="text-gray-500">No pending applications</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Mobile</th>
                  <th className="py-2 px-4 text-left">Locality</th>
                  <th className="py-2 px-4 text-left">PIN</th>
                  <th className="py-2 px-4 text-left">Suggested Ward</th>
                  <th className="py-2 px-4 text-left">Selected Ward</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-2 px-4">{p.fullName}</td>
                    <td className="py-2 px-4">{p.mobile}</td>
                    <td className="py-2 px-4">{p.address?.locality}</td>
                    <td className="py-2 px-4">{p.address?.pin}</td>
                    <td className="py-2 px-4">{p.address?.suggestedWard}</td>
                    <td className="py-2 px-4">{p.address?.selectedWard}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md font-semibold transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(p._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md font-semibold transition-colors"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
