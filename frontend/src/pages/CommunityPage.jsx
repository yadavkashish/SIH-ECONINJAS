// src/pages/CommunityPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewPostForm({ communityId, onPosted }) {
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const submit = async () => {
    if (!content.trim()) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/communities/${communityId}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content })
    });
    setContent("");
    onPosted();
  };
  return (
    <div className="mb-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        placeholder="Write an announcement or post..."
      ></textarea>
      <div className="flex justify-end mt-2">
        <button onClick={submit} className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg font-medium">
          Post
        </button>
      </div>
    </div>
  );
}

function NewTaskForm({ communityId, onCreated }) {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState(0);
  const [deadline, setDeadline] = useState("");
  const token = localStorage.getItem("token");
  const submit = async () => {
    if (!title.trim()) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/communities/${communityId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, points, deadline })
    });
    setTitle(""); setPoints(0); setDeadline("");
    onCreated();
  };
  return (
    <div className="mb-4">
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <div className="flex gap-2">
        <input
          type="number"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={points}
          onChange={e => setPoints(e.target.value)}
          placeholder="Points"
        />
        <input
          type="date"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
        <button
          onClick={submit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/communities/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    setData(json);
  };

  useEffect(() => { load(); }, [id]);

  if (!data) return <div className="p-6 text-gray-600">Loading...</div>;

  const { community, posts, tasks, complaints } = data;
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">{community.name}</h1>
        <span className="mt-2 md:mt-0 text-gray-500 text-lg">Ward #{community.wardNumber}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Announcements / Posts */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Announcements / Posts</h2>
            <NewPostForm communityId={id} onPosted={load} />
            <div className="space-y-3">
              {posts.map(p => (
                <div key={p._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500">{p.author?.name || "Unknown"} • {new Date(p.createdAt).toLocaleString()}</div>
                  <div className="mt-2 text-gray-700">{p.content}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Tasks</h2>
            <NewTaskForm communityId={id} onCreated={load} />
            <div className="space-y-3">
              {tasks.map(t => (
                <div key={t._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-800">{t.title}</div>
                    {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
                    <div className="text-xs text-gray-500 mt-1">Points: {t.points} • Status: <span className="capitalize">{t.status}</span></div>
                  </div>
                  <div className="text-sm text-gray-500">{t.assignedTo?.map(a => a.name).join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Members */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-700">Members ({community.members.length})</h3>
            <ul className="mt-3 space-y-2">
              {community.members.map(m => (
                <li key={m.user._id} className="text-gray-600 flex justify-between">
                  {m.user.name} <span className="text-sm text-gray-400">({m.role})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complaints */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-700">Complaints</h3>
            <div className="mt-3 space-y-3">
              {complaints.map(c => (
                <div key={c._id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-400">{c.raisedBy?.name || "User"}</div>
                  <div className="text-gray-700">{c.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{c.status}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
