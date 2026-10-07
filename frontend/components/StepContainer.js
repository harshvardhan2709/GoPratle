export default function StepContainer({ title, subtitle, children }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        boxShadow: "var(--shadow-card)",
        marginBottom: "16px",
      }}
    >
      {/* Step heading */}
      {(title || subtitle) && (
        <div style={{ marginBottom: "12px" }}>
          {title && (
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                margin: "6px 0 0",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
