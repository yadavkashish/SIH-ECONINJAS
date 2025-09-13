// src/pages/Communities.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/api/communities?city=Ghaziabad`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setCommunities(data.communities || []);
        setFiltered(data.communities || []);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const filteredList = communities.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.wardNumber.toString().includes(q)
    );
    setFiltered(filteredList);
  }, [search, communities]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Communities in Ghaziabad</h1>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or ward number..."
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm w-full sm:w-80"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center mt-8 text-lg">No communities found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(c => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-6 flex flex-col justify-between"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-green-950 rounded-full p-3 mr-4">
                  <Users size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{c.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{c.city}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-green-900 bg-blue-100 px-4 py-1 rounded-full">
                  Ward #{c.wardNumber}
                </span>
                <Link
                  to={`/community/${c._id}`}
                  className="bg-green-950 hover:bg-green-900 transition text-white font-medium px-5 py-2 rounded-full"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
