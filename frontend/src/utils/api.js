import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // use .env value
});

// Attach token automatically if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export async function fetchWards({ city, pin, locality }) {
  try {
    const { data } = await API.get("/wards", {
      params: { city, pin, locality },
    });
    return data;
  } catch (err) {
    console.error("Error fetching wards:", err);
    return null;
  }
}

// ✅ Submit Green Champion application
export async function submitApplication(payload) {
  try {
    const { data } = await API.post("/greenchampions/apply", payload);
    return data;
  } catch (err) {
    console.error("Error submitting application:", err);
    return null;
  }
}

// ✅ (Optional) Check if user already applied
export async function checkApplicationStatus() {
  try {
    const { data } = await API.get("/greenchampions/my"); // backend needs to support this
    return data;
  } catch (err) {
    console.error("Error checking status:", err);
    return null;
  }
}

export default API;
