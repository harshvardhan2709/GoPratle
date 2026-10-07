export default function NavigationButtons({
  currentStep,
  totalSteps = 4,
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
  isLoading = false,
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ marginTop: "8px" }}
    >
      {/* Back button — hidden on step 1 */}
      <div>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg-surface)",
              color: "var(--text-secondary)",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-focus)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12l7 7M5 12l7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Step counter + Next button */}
      <div className="flex items-center gap-4">
        <span
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            fontWeight: "500",
          }}
        >
          Step {currentStep} of {totalSteps}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 24px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid transparent",
            background:
              nextDisabled || isLoading
                ? "var(--text-muted)"
                : "var(--accent)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: nextDisabled || isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
            boxShadow: "var(--shadow-sm)",
          }}
          onMouseEnter={(e) => {
            if (!nextDisabled && !isLoading) {
              e.currentTarget.style.background = "var(--accent-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (!nextDisabled && !isLoading) {
              e.currentTarget.style.background = "var(--accent)";
            }
          }}
        >
          {isLoading ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ animation: "spin 1s linear infinite" }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="31.4"
                  strokeDashoffset="10"
                  strokeLinecap="round"
                />
              </svg>
              Processing...
            </>
          ) : (
            <>
              {nextLabel}
              {nextLabel === "Next" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M14 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
