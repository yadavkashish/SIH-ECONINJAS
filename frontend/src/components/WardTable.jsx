import React, { useEffect, useState } from 'react';

export default function WardTable({ adminToken, city }) {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    async function fetchWards() {
      const res = await fetch(`http://localhost:5000/api/dashboard/wards?city=${city}`, {
        headers: { 'x-admin-token': adminToken }
      });
      const data = await res.json();
      setWards(data.wards);
    }
    fetchWards();
  }, [city, adminToken]);

  return (
    <div>
      <h3>Ward-Level Committees</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Ward No.</th>
            <th>Locality</th>
            <th>Champions</th>
            <th>Pending Requests</th>
            <th>Reports Submitted</th>
            <th>Complaints Resolved</th>
          </tr>
        </thead>
        <tbody>
          {wards.map(w => (
            <tr key={w.wardNumber}>
              <td>{w.wardNumber}</td>
              <td>{w.locality}</td>
              <td>{w.champions}</td>
              <td>{w.pendingRequests}</td>
              <td>{w.reportsSubmitted}</td>
              <td>{w.complaintsResolved}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
