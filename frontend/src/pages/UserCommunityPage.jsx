// src/pages/CommunityPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Users, AlertCircle, Calendar } from "lucide-react";

export default function UserCommunityPage() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    async function fetchCommunity() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/communities/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch community");
        const data = await res.json();
        setCommunity(data.community);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCommunity();
  }, [id]);

  if (!community)
    return <div className="p-6 text-center text-gray-700">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            {community.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Ward #{community.wardNumber} - {community.locality}
          </p>
        </div>
        <div className="w-full md:w-1/3 h-48 md:h-40 rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={[community.latitude, community.longitude]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[community.latitude, community.longitude]}>
              <Popup>{community.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Users size={24} />}
          title="Members"
          value={community.membersCount}
          color="blue"
        />
        <StatCard
          icon={<AlertCircle size={24} />}
          title="Complaints Resolved"
          value={`${community.resolvedPercent}%`}
          color="green"
        />
        <StatCard
          icon={<AlertCircle size={24} />}
          title="Pending Requests"
          value={community.pendingRequests}
          color="yellow"
        />
        <StatCard
          icon={<Calendar size={24} />}
          title="Events"
          value={community.eventsCount}
          color="purple"
        />
      </div>

      {/* Members Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Community Champions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Ward</th>
                <th className="p-2 border">Points</th>
              </tr>
            </thead>
            <tbody>
              {community.champions.map((c) => (
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
      </div>

      {/* Complaints Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Complaints / Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Complaint</th>
                <th className="p-2 border">Submitted By</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {community.complaints.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 border">{c.title}</td>
                  <td className="p-2 border">{c.submittedBy}</td>
                  <td className="p-2 border">{c.status}</td>
                  <td className="p-2 border">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Events / Initiatives
        </h2>
        <div className="space-y-3">
          {community.events.map((e) => (
            <div
              key={e._id}
              className="border p-3 rounded-lg hover:shadow transition"
            >
              <h3 className="font-semibold text-gray-800">{e.title}</h3>
              <p className="text-gray-600 text-sm">
                Date: {new Date(e.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">Organizer: {e.organizer}</p>
              <p className="text-gray-600 text-sm">Location: {e.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable StatCard
function StatCard({ icon, title, value, color }) {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition`}
    >
      <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-700 font-medium">{title}</p>
        <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
      </div>
    </div>
  );
}
