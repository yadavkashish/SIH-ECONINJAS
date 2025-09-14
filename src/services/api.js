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
  const res = await fetch(`${API_BASE}/applications/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchPendingApplications(city, adminToken) {
  const url = `${API_BASE}/applications/pending?city=${encodeURIComponent(city)}`;
  const res = await fetch(url, { headers: { 'x-admin-token': adminToken }});
  return res.json();
}

export async function approveApplication(id, adminToken) {
  const res = await fetch(`${API_BASE}/applications/${id}/approve`, {
    method: 'POST',
    headers: { 'x-admin-token': adminToken }
  });
  return res.json();
}

export async function rejectApplication(id, adminToken) {
  const res = await fetch(`${API_BASE}/applications/${id}/reject`, {
    method: 'POST',
    headers: { 'x-admin-token': adminToken }
  });
  return res.json();
}
