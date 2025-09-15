// src/pages/Communities.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Search } from "lucide-react";

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/api/communities?city=Ghaziabad`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCommunities(data.communities || []);
        setFiltered(data.communities || []);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const filteredList = communities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.wardNumber.toString().includes(q)
    );
    setFiltered(filteredList);
  }, [search, communities]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-900">
          Communities in Ghaziabad
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Discover, search, and join your local community.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ward number..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Communities Grid */}
      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center mt-12 text-lg">
          No communities found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c) => (
            <div
              key={c._id}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-6 flex flex-col justify-between border border-gray-100"
            >
              {/* Community Info */}
              <div className="flex items-center mb-6">
                <div className="bg-green-100 text-green-700 rounded-full p-3 mr-4 shadow-sm">
                  <Users size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {c.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{c.city}</p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-semibold text-green-800 bg-green-100 px-4 py-1.5 rounded-full shadow-sm">
                  Ward #{c.wardNumber}
                </span>
                <Link
                  to={`/community/${c._id}`}
                  className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-5 py-2.5 rounded-xl shadow-md"
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
