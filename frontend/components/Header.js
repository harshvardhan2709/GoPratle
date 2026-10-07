import Link from "next/link";

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
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
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
        </Link>

        {/* Links */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-secondary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center"
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "white",
              background: "var(--accent)",
              border: "1px solid var(--accent)",
              borderRadius: "6px",
              padding: "6px 14px",
              textDecoration: "none",
            }}
          >
            Post a Requirement
          </Link>
        </div>
      </div>
    </header>
  );
}
