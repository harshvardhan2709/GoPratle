"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Step1Basics from "../../../../components/Step1Basics";
import Step2Category from "../../../../components/Step2Category";
import Step3Additional from "../../../../components/Step3Additional";

function EditRequirementContent() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`);
        if (!res.ok) throw new Error("Failed to fetch requirement");
        const data = await res.json();
        const req = data.data;
        
        // Flatten the data for the form
        const details = req[`${req.category}Details`] || {};
        
        setFormData({
          eventName: req.eventName || "",
          eventType: req.eventType || "",
          startDate: req.startDate ? req.startDate.split("T")[0] : "",
          endDate: req.endDate ? req.endDate.split("T")[0] : "",
          location: req.location || "",
          venue: req.venue || "",
          category: req.category || "",
          status: req.status || "Open",
          ...details
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRequirement();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.eventName) newErrors.eventName = "Event Name is required";
    if (!formData.eventType) newErrors.eventType = "Event Type is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End Date cannot be before Start Date";
    }

    if (formData.category === "planner") {
      if (!formData.planningExperience) newErrors.planningExperience = "Required";
      if (!formData.eventScale) newErrors.eventScale = "Required";
      if (!formData.servicesRequired) newErrors.servicesRequired = "Required";
    } else if (formData.category === "performer") {
      if (!formData.performerType) newErrors.performerType = "Required";
      if (!formData.genre) newErrors.genre = "Required";
      if (!formData.numberOfPerformers) newErrors.numberOfPerformers = "Required";
      if (!formData.performanceDuration) newErrors.performanceDuration = "Required";
    } else if (formData.category === "crew") {
      if (!formData.crewRole) newErrors.crewRole = "Required";
      if (!formData.numberOfCrewMembers) newErrors.numberOfCrewMembers = "Required";
      if (!formData.experienceLevel) newErrors.experienceLevel = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
        window.scrollTo(0, 0);
        return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      router.push(`/requirements/${id}`);
    } catch (err) {
      alert(err.message);
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}><Header /><main style={{ padding: "40px", textAlign: "center" }}>Loading...</main></div>;
  if (error) return <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}><Header /><main style={{ padding: "40px", textAlign: "center", color: "var(--error)" }}>{error}</main></div>;
  if (!formData) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Header />
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Edit Requirement</h1>
        
        <div style={{ background: "var(--bg-surface)", padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: "24px" }}>
          
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", outline: "none", cursor: "pointer", fontSize: "15px" }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>Event Basics</h2>
          <Step1Basics formData={formData} setFormData={setFormData} errors={errors} />
          
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", marginTop: "32px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>Category Details</h2>
          <Step2Category formData={formData} setFormData={setFormData} errors={errors} />
          
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", marginTop: "32px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>Additional Information</h2>
          <Step3Additional formData={formData} setFormData={setFormData} errors={errors} />

        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => router.back()} 
            style={{ padding: "12px 24px", border: "1px solid var(--border)", background: "transparent", borderRadius: "var(--radius-sm)", fontWeight: "600", cursor: "pointer" }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            onClick={handleUpdate}
            style={{ padding: "12px 24px", border: "none", background: "var(--accent)", color: "white", borderRadius: "var(--radius-sm)", fontWeight: "600", cursor: "pointer", flex: 1 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}

import { Suspense } from "react";
export default function EditRequirement() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <EditRequirementContent />
    </Suspense>
  );
}
