export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export async function fetchWards({ city, pin, locality }) {
  const q = new URLSearchParams();
  if (city) q.append('city', city);
  if (pin) q.append('pin', pin);
  if (locality) q.append('locality', locality);
  const res = await fetch(`${API_BASE}/wards?${q.toString()}`);
  return res.json();
}

export async function submitApplication(payload) {
  try {
    const token = localStorage.getItem("token"); // get token from storage
    const res = await fetch("http://localhost:5000/api/greenChampion/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send the token
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error submitting application:", error);
    return null;
  }
}


export async function fetchPendingApplications(city, adminToken) {
  const url = `${API_BASE}/greenChampion/pending?city=${encodeURIComponent(city)}`;
  const res = await fetch(url, { headers: { 'x-admin-token': adminToken }});
  return res.json();
}

export async function approveApplication(id, adminToken) {
  const res = await fetch(`${API_BASE}/greenChampion/${id}/approve`, {
    method: 'POST',
    headers: { 'x-admin-token': adminToken }
  });
  return res.json();
}

export async function rejectApplication(id, adminToken) {
  const res = await fetch(`${API_BASE}/greenChampion/${id}/reject`, {
    method: 'POST',
    headers: { 'x-admin-token': adminToken }
  });
  return res.json();
}

// ✅ Check if user already applied
export async function checkApplicationStatus() {
  try {
    const token = localStorage.getItem("token"); // get the token
    const res = await fetch("http://localhost:5000/api/greenChampion/my", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include the token here
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error checking status:", error);
    return null;
  }
}


