const STEPS = [
  { number: 1, label: "Event Basics" },
  { number: 2, label: "Category Details" },
  { number: 3, label: "Additional Details" },
  { number: 4, label: "Review" },
];

export default function ProgressIndicator({ currentStep }) {
  return (
    <div className="w-full" style={{ marginBottom: "20px" }}>
      {/* Step row */}
      <div className="flex items-center justify-between" style={{ position: "relative" }}>
        {/* Connector line behind steps */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px",
            height: "2px",
            background: "var(--border)",
            zIndex: 0,
          }}
        />
        {/* Active connector — grows with progress */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            height: "2px",
            width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            background: "var(--accent)",
            transition: "width 0.3s ease",
            zIndex: 1,
          }}
        />

        {STEPS.map((step) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-2"
              style={{ zIndex: 2, flex: 1 }}
            >
              {/* Circle */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  background: isDone || isActive ? "var(--accent)" : "var(--bg-card)",
                  color: isDone || isActive ? "#fff" : "var(--text-muted)",
                  border: isDone || isActive
                    ? `2px solid var(--accent)`
                    : "2px solid var(--border)",
                }}
              >
                {isDone ? (
                  /* Checkmark */
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: isActive ? "600" : "400",
                  color: isActive
                    ? "var(--text-primary)"
                    : isDone
                    ? "var(--text-secondary)"
                    : "var(--text-muted)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s ease",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
