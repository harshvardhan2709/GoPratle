"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProgressIndicator from "@/components/ProgressIndicator";
import StepContainer from "@/components/StepContainer";
import NavigationButtons from "@/components/NavigationButtons";

// Mock placeholder steps — replaced one by one in upcoming phases
const STEP_META = [
  { title: "Event Basics", subtitle: "Tell us about your event." },
  { title: "Category Details", subtitle: "Provide details for your chosen category." },
  { title: "Additional Details", subtitle: "Budget and special requirements." },
  { title: "Review", subtitle: "Review everything before submitting." },
];

function MockStepContent({ step }) {
  return (
    <div
      style={{
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed var(--border)",
        borderRadius: "var(--radius-md)",
        color: "var(--text-muted)",
        fontSize: "14px",
      }}
    >
      Step {step} content will be implemented here.
    </div>
  );
}

export default function RequirementWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const meta = STEP_META[currentStep - 1];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Header />

      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "24px 24px 40px",
        }}
      >
        {/* Page heading */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "var(--text-primary)",
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
            }}
          >
            Post a Requirement
          </h1>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "15px" }}>
            Find the perfect planner, performer or crew for your event in minutes.
          </p>
        </div>

        {/* Progress bar */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Step card */}
        <StepContainer title={meta.title} subtitle={meta.subtitle}>
          <MockStepContent step={currentStep} />
        </StepContainer>

        {/* Navigation */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={handleBack}
          onNext={handleNext}
          nextLabel={currentStep === totalSteps ? "Submit Requirement" : "Next"}
        />
      </main>
    </div>
  );
}
