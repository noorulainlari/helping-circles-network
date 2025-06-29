export default function HomePage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2563eb", fontSize: "2rem", marginBottom: "1rem" }}>🤝 Helping Circles Network</h1>
      <p style={{ color: "#6b7280", fontSize: "1.125rem", marginBottom: "2rem" }}>Welcome to our community platform!</p>

      <div
        style={{
          background: "#f0f9ff",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1f2937" }}>
          Connect, Support, and Grow Together
        </h2>
        <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
          Join meaningful helping circles where people support each other's goals, share resources, and build lasting
          connections.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            background: "#dbeafe",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>10,000+ Members</h3>
        </div>

        <div
          style={{
            background: "#f3e8ff",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>❤️</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>500+ Circles</h3>
        </div>

        <div
          style={{
            background: "#dcfce7",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🌍</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>50+ Countries</h3>
        </div>
      </div>

      <footer
        style={{
          marginTop: "4rem",
          padding: "2rem",
          background: "#111827",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>🤝 Helping Circles</h3>
        <p style={{ color: "#9ca3af", margin: 0 }}>Building meaningful connections and supportive communities.</p>
      </footer>
    </div>
  )
}
