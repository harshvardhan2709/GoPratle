/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";

export default function Dashboard() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchRequirements = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements`);
      if (!res.ok) throw new Error("Failed to fetch requirements");
      const data = await res.json();
      setRequirements(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this requirement?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setRequirements((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Error deleting requirement");
    }
  };

  const filtered = requirements.filter((req) => {
    const matchesSearch = req.eventName.toLowerCase().includes(search.toLowerCase()) || 
                          req.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || req.category === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Header />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div className="flex justify-between items-center mb-8">
          <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Requirements Dashboard</h1>
          <Link href="/" style={{ padding: "8px 16px", background: "var(--accent)", color: "white", borderRadius: "var(--radius-sm)", fontWeight: "500", textDecoration: "none" }}>
            Create Requirement
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search events or locations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", flex: 1, outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", outline: "none", cursor: "pointer" }}>
            <option>All</option>
            <option>Planner</option>
            <option>Performer</option>
            <option>Crew</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", outline: "none", cursor: "pointer" }}>
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading requirements...</div>
        ) : error ? (
          <div style={{ color: "var(--error)", padding: "20px", background: "#fee2e2", borderRadius: "var(--radius-md)" }}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "var(--bg-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "16px" }}>No requirements found.</p>
            <Link href="/" style={{ color: "var(--border-focus)", fontWeight: "500", textDecoration: "none" }}>Create a new one</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((req) => (
              <div key={req._id} style={{ background: "var(--bg-surface)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{req.eventName}</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    {new Date(req.startDate).toLocaleDateString()} • {req.location} • <span style={{ textTransform: "capitalize" }}>{req.category}</span>
                  </p>
                  <span style={{ 
                    fontSize: "12px", 
                    padding: "4px 10px", 
                    background: req.status === "Open" ? "var(--success)" : req.status === "Completed" ? "#3b82f6" : req.status === "Cancelled" ? "var(--error)" : "var(--warning)", 
                    color: "white", 
                    borderRadius: "12px",
                    fontWeight: "600"
                  }}>
                    {req.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/requirements/${req._id}`} style={{ padding: "6px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--text-primary)", fontSize: "14px", fontWeight: "500" }}>
                    View
                  </Link>
                  <Link href={`/requirements/${req._id}/edit`} style={{ padding: "6px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--text-primary)", fontSize: "14px", fontWeight: "500" }}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(req._id)} style={{ padding: "6px 16px", border: "1px solid var(--error)", color: "var(--error)", background: "transparent", borderRadius: "var(--radius-sm)", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
