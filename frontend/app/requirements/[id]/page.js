"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";

function RequirementDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const [requirement, setRequirement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`);
        if (!res.ok) throw new Error("Failed to fetch requirement details");
        const data = await res.json();
        setRequirement(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRequirement();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this requirement?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/dashboard");
    } catch (err) {
      alert("Error deleting requirement");
    }
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}><Header /><main style={{ padding: "40px", textAlign: "center" }}>Loading...</main></div>;
  if (error) return <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}><Header /><main style={{ padding: "40px", textAlign: "center", color: "var(--error)" }}>{error}</main></div>;
  if (!requirement) return null;

  const renderCategoryDetails = () => {
    const details = requirement[`${requirement.category}Details`];
    if (!details) return <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>No category-specific details provided.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {Object.entries(details).map(([key, value]) => {
          if (value === undefined || value === null || value === "") return null;
          // Format key: "planningExperience" -> "Planning Experience"
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          return (
            <div key={key} style={{ padding: "12px", background: "var(--bg-base)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
              <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>{formattedKey}</span>
              <span style={{ fontWeight: "500", textTransform: "capitalize" }}>{value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Header />
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        
        <div className="mb-6">
          <Link href="/dashboard" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ background: "var(--bg-surface)", padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>{requirement.eventName}</h1>
              <span style={{ 
                fontSize: "13px", 
                padding: "4px 10px", 
                background: requirement.status === "Open" ? "var(--success)" : requirement.status === "Completed" ? "#3b82f6" : requirement.status === "Cancelled" ? "var(--error)" : "var(--warning)", 
                color: "white", 
                borderRadius: "12px",
                fontWeight: "600"
              }}>
                {requirement.status}
              </span>
            </div>
            <div className="flex gap-2">
              <Link href={`/requirements/${id}/edit`} style={{ padding: "8px 16px", background: "var(--accent)", color: "white", borderRadius: "var(--radius-sm)", fontWeight: "500", textDecoration: "none" }}>
                Edit
              </Link>
              <button onClick={handleDelete} style={{ padding: "8px 16px", border: "1px solid var(--error)", color: "var(--error)", background: "transparent", borderRadius: "var(--radius-sm)", fontWeight: "500", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px" }}>Event Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Event Type</span>
                <span style={{ fontWeight: "500" }}>{requirement.eventType}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Category</span>
                <span style={{ fontWeight: "500", textTransform: "capitalize" }}>{requirement.category}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Start Date</span>
                <span style={{ fontWeight: "500" }}>{new Date(requirement.startDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>End Date</span>
                <span style={{ fontWeight: "500" }}>{new Date(requirement.endDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Location</span>
                <span style={{ fontWeight: "500" }}>{requirement.location}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Venue</span>
                <span style={{ fontWeight: "500" }}>{requirement.venue || "Not specified"}</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px", textTransform: "capitalize" }}>
              {requirement.category} Details
            </h2>
            {renderCategoryDetails()}
          </div>

          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "600", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px" }}>Metadata</h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Created: {new Date(requirement.createdAt).toLocaleString()}</p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Last Updated: {new Date(requirement.updatedAt).toLocaleString()}</p>
          </div>
          
        </div>
      </main>
    </div>
  );
}

import { Suspense } from "react";
export default function RequirementDetails() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <RequirementDetailsContent />
    </Suspense>
  );
}
