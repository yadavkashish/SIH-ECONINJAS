import React, { useEffect, useState } from "react";
import { fetchWards, submitApplication } from "../services/api";

export default function CitizenForm() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    idNumber: "",
    houseNo: "",
    street: "",
    locality: "",
    pin: "",
    city: "Ghaziabad",
    ngoIsPart: false,
    ngoName: "",
    occupation: "",
    declaration: true,
    selectedWard: "",
  });

  const [wardsOptions, setWardsOptions] = useState([]);
  const [suggestedWard, setSuggestedWard] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function suggestWard() {
      if (!form.city) return;
      const data = await fetchWards({ city: form.city, pin: form.pin, locality: form.locality });
      if (data) {
        setWardsOptions(data.wards || []);
        setSuggestedWard(data.suggestedWard || null);
        if (!form.selectedWard && data.suggestedWard) {
          setForm((f) => ({ ...f, selectedWard: data.suggestedWard }));
        }
      }
    }
    suggestWard();
  }, [form.city, form.pin, form.locality]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName: form.fullName,
      age: Number(form.age || 0),
      gender: form.gender,
      mobile: form.mobile,
      email: form.email,
      idNumber: form.idNumber,
      address: {
        houseNo: form.houseNo,
        street: form.street,
        locality: form.locality,
        pin: form.pin,
        city: form.city,
        suggestedWard: suggestedWard || null,
        selectedWard: form.selectedWard || null,
      },
      ngo: { isPart: form.ngoIsPart, name: form.ngoName },
      occupation: form.occupation,
      declaration: form.declaration,
    };

    const resp = await submitApplication(payload);
    if (resp && resp.id) {
      setMessage(`✅ Application submitted successfully. ID: ${resp.id}`);
      setForm({
        fullName: "",
        age: "",
        gender: "",
        mobile: "",
        email: "",
        idNumber: "",
        houseNo: "",
        street: "",
        locality: "",
        pin: "",
        city: "Ghaziabad",
        ngoIsPart: false,
        ngoName: "",
        occupation: "",
        declaration: true,
        selectedWard: "",
      });
      setSuggestedWard(null);
    } else {
      setMessage("❌ Failed to submit. Try again.");
    }
  };

  // Styles
  const container = { maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "'Segoe UI', sans-serif" };
  const card = { background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: 20 };
  const fieldGroup = { display: "flex", flexWrap: "wrap", gap: 16 };
  const field = { flex: "1 1 250px", display: "flex", flexDirection: "column" };
  const label = { marginBottom: 6, fontWeight: 600, color: "#333" };
  const input = { padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 };
  const button = { padding: "10px 20px", fontSize: 16, fontWeight: 600, background: "#28a745", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginTop: 10 };
  const messageStyle = { padding: 12, borderRadius: 8, marginBottom: 20, fontWeight: 500 };

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center", marginBottom: 24, color: "#2c7a7b" }}>🌱 Green Champion Application</h1>

      {message && (
        <div style={{ ...messageStyle, background: message.startsWith("✅") ? "#d4edda" : "#f8d7da", color: message.startsWith("✅") ? "#155724" : "#721c24" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Personal Info */}
        <div style={card}>
          <h2 style={{ marginBottom: 16, color: "#2b6cb0" }}>Personal Information</h2>
          <div style={fieldGroup}>
            <div style={field}>
              <label style={label}>Full Name*</label>
              <input style={input} name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div style={field}>
              <label style={label}>Age</label>
              <input style={input} name="age" type="number" value={form.age} onChange={handleChange} placeholder="30" />
            </div>
            <div style={field}>
              <label style={label}>Gender</label>
              <select style={input} name="gender" value={form.gender} onChange={handleChange}>
                <option value="">--Select--</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div style={field}>
              <label style={label}>Mobile*</label>
              <input style={input} name="mobile" value={form.mobile} onChange={handleChange} placeholder="9876543210" required />
            </div>
            <div style={field}>
              <label style={label}>Email</label>
              <input style={input} name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={card}>
          <h2 style={{ marginBottom: 16, color: "#2b6cb0" }}>Address</h2>
          <div style={fieldGroup}>
            <div style={field}>
              <label style={label}>House No / Street</label>
              <input style={input} name="houseNo" value={form.houseNo} onChange={handleChange} placeholder="123, MG Road" />
            </div>
            <div style={field}>
              <label style={label}>Locality / Colony</label>
              <input style={input} name="locality" value={form.locality} onChange={handleChange} placeholder="Raj Nagar" />
            </div>
            <div style={field}>
              <label style={label}>PIN Code</label>
              <input style={input} name="pin" value={form.pin} onChange={handleChange} placeholder="201002" />
            </div>
            <div style={field}>
              <label style={label}>City</label>
              <select style={input} name="city" value={form.city} onChange={handleChange}>
                <option>Ghaziabad</option>
              </select>
            </div>
            <div style={field}>
              <label style={label}>Suggested Ward</label>
              <input style={{ ...input, fontWeight: "bold", background: "#f0f8ff" }} readOnly value={suggestedWard || ""} />
            </div>
            <div style={field}>
              <label style={label}>Select Ward</label>
              <select style={input} name="selectedWard" value={form.selectedWard || ""} onChange={handleChange}>
                <option value="">-- Select ward --</option>
                {wardsOptions.map((w) => (
                  <option key={w.wardNumber} value={w.wardNumber}>
                    {`Ward ${w.wardNumber} — ${w.name || ""}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Background */}
        <div style={card}>
          <h2 style={{ marginBottom: 16, color: "#2b6cb0" }}>Background</h2>
          <div style={fieldGroup}>
            <div style={field}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" name="ngoIsPart" checked={form.ngoIsPart} onChange={handleChange} />
                Part of NGO/RWA?
              </label>
            </div>
            {form.ngoIsPart && (
              <div style={field}>
                <label style={label}>NGO/RWA Name</label>
                <input style={input} name="ngoName" value={form.ngoName} onChange={handleChange} placeholder="XYZ NGO" />
              </div>
            )}
            <div style={field}>
              <label style={label}>Occupation</label>
              <input style={input} name="occupation" value={form.occupation} onChange={handleChange} placeholder="Teacher" />
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div style={card}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" name="declaration" checked={form.declaration} onChange={handleChange} />
            I agree to volunteer as a Green Champion and follow municipal guidelines.
          </label>
        </div>

        <button type="submit" style={button}>
          Apply
        </button>
      </form>
    </div>
  );
}
