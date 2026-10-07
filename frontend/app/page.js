"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProgressIndicator from "@/components/ProgressIndicator";
import StepContainer from "@/components/StepContainer";
import NavigationButtons from "@/components/NavigationButtons";
import Step1Basics from "@/components/Step1Basics";
import Step2Category from "@/components/Step2Category";
import Step3Additional from "@/components/Step3Additional";
import Step4Review from "@/components/Step4Review";

const STEP_META = [
  { title: "Event Basics", subtitle: "Tell us about your event." },
  { title: "Category Details", subtitle: "Provide details for your chosen category." },
  { title: "Additional Details", subtitle: "Budget and special requirements." },
  { title: "Review", subtitle: "Review everything before submitting." },
];

const INITIAL_FORM_STATE = {
  eventName: "",
  eventType: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "",
  planningExperience: "",
  eventScale: "",
  servicesRequired: "",
  performerType: "",
  genre: "",
  numberOfPerformers: "",
  performanceDuration: "",
  crewRole: "",
  numberOfCrewMembers: "",
  experienceLevel: "",
  budget: "",
  numberOfEvents: "",
  technicalRequirements: "",
  workingHours: "",
  requiredSkills: "",
  specialRequirements: "",
};

export default function RequirementWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const totalSteps = 4;

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.eventName.trim()) newErrors.eventName = "Event Name is required";
    if (!formData.eventType.trim()) newErrors.eventType = "Event Type is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = "End Date cannot be before Start Date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (formData.category === "planner") {
      if (!formData.planningExperience) newErrors.planningExperience = "Planning Experience is required";
      if (!formData.eventScale) newErrors.eventScale = "Event Scale is required";
      if (!formData.servicesRequired.trim()) newErrors.servicesRequired = "Services Required is required";
    }

    if (formData.category === "performer") {
      if (!formData.performerType.trim()) newErrors.performerType = "Performer Type is required";
      if (!formData.genre.trim()) newErrors.genre = "Genre is required";
      if (!formData.numberOfPerformers || Number(formData.numberOfPerformers) < 1) {
        newErrors.numberOfPerformers = "Must be at least 1";
      }
      if (!formData.performanceDuration.trim()) newErrors.performanceDuration = "Performance Duration is required";
    }

    if (formData.category === "crew") {
      if (!formData.crewRole.trim()) newErrors.crewRole = "Crew Role is required";
      if (!formData.numberOfCrewMembers || Number(formData.numberOfCrewMembers) < 1) {
        newErrors.numberOfCrewMembers = "Must be at least 1";
      }
      if (!formData.experienceLevel) newErrors.experienceLevel = "Experience Level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (formData.category === "planner") {
      if (!formData.numberOfEvents || Number(formData.numberOfEvents) < 1) {
        newErrors.numberOfEvents = "Must be at least 1";
      }
    }

    if (formData.category === "performer") {
      if (!formData.technicalRequirements.trim()) newErrors.technicalRequirements = "Technical Requirements are required";
    }

    if (formData.category === "crew") {
      if (!formData.workingHours.trim()) newErrors.workingHours = "Working Hours are required";
      if (!formData.requiredSkills.trim()) newErrors.requiredSkills = "Required Skills are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRequirement = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    // The backend expects a flat payload for all fields.
    // It will internally map them to the correct nested structure in Mongoose.
    const payload = {
      eventName: formData.eventName,
      eventType: formData.eventType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      venue: formData.venue || undefined,
      category: formData.category,
      budget: formData.budget || undefined,
      specialRequirements: formData.specialRequirements || undefined,
      
      // Planner fields
      planningExperience: formData.planningExperience,
      eventScale: formData.eventScale,
      servicesRequired: formData.servicesRequired,
      numberOfEvents: formData.numberOfEvents ? Number(formData.numberOfEvents) : undefined,
      
      // Performer fields
      performerType: formData.performerType,
      genre: formData.genre,
      numberOfPerformers: formData.numberOfPerformers ? Number(formData.numberOfPerformers) : undefined,
      performanceDuration: formData.performanceDuration,
      technicalRequirements: formData.technicalRequirements,
      
      // Crew fields
      crewRole: formData.crewRole,
      numberOfCrewMembers: formData.numberOfCrewMembers ? Number(formData.numberOfCrewMembers) : undefined,
      experienceLevel: formData.experienceLevel,
      workingHours: formData.workingHours,
      requiredSkills: formData.requiredSkills,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit requirement");
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    
    if (currentStep === 2) {
      if (!validateStep2()) return;
    }

    if (currentStep === 3) {
      if (!validateStep3()) return;
    }

    if (currentStep === 4) {
      // Final submit
      submitRequirement();
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setCurrentStep(1);
    setSubmitError(null);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        <Header />
        <main style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ 
            width: "64px", height: "64px", background: "var(--success)", 
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", color: "white" 
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>
            Requirement Submitted!
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "32px" }}>
            Your event requirement has been successfully posted. Planners and professionals will reach out to you shortly.
          </p>
          <button 
            onClick={handleReset}
            style={{
              padding: "10px 24px", background: "var(--accent)", color: "white",
              borderRadius: "var(--radius-sm)", border: "none", fontWeight: "600", cursor: "pointer"
            }}
          >
            Post Another Requirement
          </button>
        </main>
      </div>
    );
  }

  const meta = STEP_META[currentStep - 1];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Header />

      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "16px 24px 24px",
        }}
      >
        {/* Page heading */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "14px" }}>
            Find the perfect planner, performer or crew for your event in minutes.
          </p>
        </div>

        {/* Progress bar */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Submit Error */}
        {submitError && (
          <div style={{ 
            background: "#fef2f2", color: "var(--error)", padding: "12px 16px", 
            borderRadius: "var(--radius-sm)", border: "1px solid #fecaca", marginBottom: "16px",
            fontSize: "14px", fontWeight: "500"
          }}>
            Error: {submitError}
          </div>
        )}

        {/* Step card */}
        <StepContainer title={meta.title} subtitle={meta.subtitle}>
          {currentStep === 1 && (
            <Step1Basics formData={formData} setFormData={setFormData} errors={errors} />
          )}
          {currentStep === 2 && (
            <Step2Category formData={formData} setFormData={setFormData} errors={errors} />
          )}
          {currentStep === 3 && (
            <Step3Additional formData={formData} setFormData={setFormData} errors={errors} />
          )}
          {currentStep === 4 && (
            <Step4Review formData={formData} />
          )}
        </StepContainer>

        {/* Navigation */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={handleBack}
          onNext={handleNext}
          nextLabel={currentStep === totalSteps ? "Submit Requirement" : "Next"}
          isLoading={isSubmitting}
        />
      </main>
    </div>
  );
}
