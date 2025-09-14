import React, { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

export default function MunicipalDashboard({ adminToken, city }) {
  const [summary, setSummary] = useState(null);
  const [wards, setWards] = useState([]);
  const [pendingApps, setPendingApps] = useState([]);
  const [topChampions, setTopChampions] = useState([]);
  const [fullscreenTable, setFullscreenTable] = useState(null);
  const [reviewApp, setReviewApp] = useState(null); // selected app for review modal

  // Fetch Dashboard Summary
  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/dashboard/summary?city=${city}`,
          { headers: { "x-admin-token": adminToken } }
        );
        if (!res.ok) {
          console.error("Error fetching summary:", await res.text());
          return;
        }
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Network error fetching summary:", err);
      }
    }
    fetchSummary();
  }, [city, adminToken]);

  // Fetch Ward Data
  useEffect(() => {
    async function fetchWards() {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/wards?city=${city}`,
        { headers: { "x-admin-token": adminToken } }
      );
      const data = await res.json();
      setWards(data.wards || []);
    }
    fetchWards();
  }, [city, adminToken]);

  // Fetch Pending Applications
  useEffect(() => {
    async function fetchPendingApps() {
      const res = await fetch(
        `http://localhost:5000/api/applications/pending?city=${city}`,
        { headers: { "x-admin-token": adminToken } }
      );
      const data = await res.json();
      setPendingApps(data.pending || []);
    }
    fetchPendingApps();
  }, [city, adminToken]);

  // Fetch Top Champions
  useEffect(() => {
    async function fetchTopChampions() {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/top-champions?city=${city}`,
        { headers: { "x-admin-token": adminToken } }
      );
      const data = await res.json();
      setTopChampions(data.top || []);
    }
    fetchTopChampions();
  }, [city, adminToken]);

  const handleAction = async (id, action) => {
    await fetch(`http://localhost:5000/api/applications/${id}/${action}`, {
      method: "POST",
      headers: { "x-admin-token": adminToken },
    });
    setPendingApps(pendingApps.filter((app) => app._id !== id));
  };

  if (!summary)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );

  // Ward Table (scrollable)
  const WardTable = () => (
    <div className="overflow-x-auto max-h-72 overflow-y-scroll relative">
      <Maximize2
        className="absolute top-2 right-2 text-green-600 cursor-pointer hover:text-green-800 transition"
        size={20}
        onClick={() => setFullscreenTable("pending")}
        title="Expand Table"
      />
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-green-100 text-gray-700 sticky top-0">
          <tr>
            <th className="p-2 border">Ward No.</th>
            <th className="p-2 border">Locality</th>
            <th className="p-2 border">Champions</th>
            <th className="p-2 border">Pending Requests</th>
            <th className="p-2 border">Reports Submitted</th>
            <th className="p-2 border">Complaints Resolved</th>
          </tr>
        </thead>
        <tbody>
          {wards.map((w) => (
            <tr
              key={w.wardNumber}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="p-2 border text-center">{w.wardNumber}</td>
              <td className="p-2 border">{w.locality}</td>
              <td className="p-2 border text-center">{w.champions}</td>
              <td className="p-2 border text-center">{w.pendingRequests}</td>
              <td className="p-2 border text-center">{w.reportsSubmitted}</td>
              <td className="p-2 border text-center">
                {w.complaintsResolved}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Pending Applications Table
  const PendingTable = () => (
    <div className="overflow-x-auto relative">
      <Maximize2
        className="absolute top-2 right-2 text-green-600 cursor-pointer hover:text-green-800 transition"
        size={20}
        onClick={() => setFullscreenTable("pending")}
        title="Expand Table"
      />
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Ward</th>
            <th className="p-2 border">NGO/RWA</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingApps.map((app) => (
            <tr key={app._id} className="hover:bg-gray-50 transition-colors">
              <td className="p-2 border">{app.fullName}</td>
              <td className="p-2 border text-center">{app.age}</td>
              <td className="p-2 border">{`${app.address.house}, ${app.address.locality}`}</td>
              <td className="p-2 border text-center">
                {app.address.selectedWard}
              </td>
              <td className="p-2 border">{app.ngoName || "No"}</td>
              <td className="p-2 border flex gap-2 justify-center">
                <button
                  onClick={() => setReviewApp(app)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Review
                </button>
                <button
                  onClick={() => handleAction(app._id, "approve")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(app._id, "reject")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Champions Table
  const ChampionsTable = () => (
    <div className="overflow-x-auto relative">
      <Maximize2
        className="absolute top-2 right-2 text-green-600 cursor-pointer hover:text-green-800 transition"
        size={20}
        onClick={() => setFullscreenTable("champions")}
        title="Expand Table"
      />
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Ward</th>
            <th className="p-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {topChampions.map((c) => (
            <tr key={c._id} className="hover:bg-gray-50 transition-colors">
              <td className="p-2 border">{c.fullName}</td>
              <td className="p-2 border text-center">
                {c.address.selectedWard}
              </td>
              <td className="p-2 border text-center">{c.points || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans space-y-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🌱 {city} Municipal Dashboard
      </h1>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Total Wards
          </h2>
          <p className="text-2xl font-bold text-green-600">
            {summary.totalWards}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Total Applications
          </h2>
          <p className="text-2xl font-bold text-green-600">
            {summary.totalApplications}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Status</h2>
          <p className="text-gray-700">
            ✅ Approved: {summary.approved} | ⏳ Pending: {summary.pending} | ❌
            Rejected: {summary.rejected}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            City Segregation %
          </h2>
          <p className="text-2xl font-bold text-blue-600">
            {summary.citySegregationPercent}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Complaints Resolved %
          </h2>
          <p className="text-2xl font-bold text-purple-600">
            {summary.complaintsResolvedPercent}%
          </p>
        </div>
      </section>

      {/* Tables */}
      <section className="space-y-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ward-Level Committees
          </h2>
          <WardTable />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Pending Green Champion Applications
          </h2>
          <PendingTable />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Top Green Champions
          </h2>
          <ChampionsTable />
        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullscreenTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-full overflow-auto p-6 relative">
            <X
              onClick={() => setFullscreenTable(null)}
              className="absolute right-1 top-1 w-6 h-6 text-red-600 cursor-pointer hover:text-red-800 transition"
              title="Close"
            />
            {fullscreenTable === "wards" && <WardTable />}
            {fullscreenTable === "pending" && <PendingTable />}
            {fullscreenTable === "champions" && <ChampionsTable />}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-full overflow-auto p-6 relative">
            <X
              onClick={() => setReviewApp(null)}
              className="absolute right-1 top-1 w-6 h-6 text-red-600 cursor-pointer hover:text-red-800 transition"
              title="Close"
            />
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Review Application
            </h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Name:</strong> {reviewApp.fullName}
              </p>
              <p>
                <strong>Age:</strong> {reviewApp.age}
              </p>
              <p>
                <strong>Gender:</strong> {reviewApp.gender}
              </p>
              <p>
                <strong>Email:</strong> {reviewApp.email || "N/A"}
              </p>
              <p>
                <strong>Mobile:</strong> {reviewApp.mobile || "N/A"}
              </p>
              <p>
                <strong>NGO/RWA:</strong> {reviewApp.ngoName || "N/A"}
              </p>
              <p className="col-span-2">
                <strong>Address:</strong>{" "}
                {`${reviewApp.address.house}, ${reviewApp.address.locality}, Ward ${reviewApp.address.selectedWard}`}
              </p>
              <p className="col-span-2">
                <strong>Additional Notes:</strong> {reviewApp.notes || "None"}
              </p>
            </div>
            <div className="mt-6 flex gap-4 justify-end">
              <button
                onClick={() => handleAction(reviewApp._id, "approve")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(reviewApp._id, "reject")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
