export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}
        className="flex items-center justify-between h-14"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            G
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "var(--text-primary)",
              letterSpacing: "-0.5px",
            }}
          >
            GoPratle
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "var(--text-secondary)",
            background: "var(--bg-base)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "4px 12px",
          }}
        >
          Post a Requirement
        </div>
      </div>
    </header>
  );
}
