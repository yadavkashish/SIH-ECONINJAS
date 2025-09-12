import React, { useEffect, useState } from 'react';

export default function CityOverview({ adminToken, city }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch(`http://localhost:5000/api/dashboard/summary?city=${city}`, {
        headers: { 'x-admin-token': adminToken }
      });
      const data = await res.json();
      setSummary(data);
    }
    fetchSummary();
  }, [city, adminToken]);

  if (!summary) return <div>Loading summary...</div>;

  return (
    <div>
      <h3>{city} — Dashboard Overview</h3>
      <ul>
        <li>Total Wards: {summary.totalWards}</li>
        <li>Total Applications: {summary.totalApplications}</li>
        <li>Approved: {summary.approved} | Pending: {summary.pending} | Rejected: {summary.rejected}</li>
        <li>City Segregation %: {summary.citySegregationPercent}%</li>
        <li>Complaints Resolved: {summary.complaintsResolvedPercent}%</li>
      </ul>
    </div>
  );
}
