export default function HomePage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2563eb", fontSize: "32px", marginBottom: "16px" }}>🤝 Helping Circles Network</h1>
      <p style={{ color: "#6b7280", fontSize: "18px", marginBottom: "32px" }}>Welcome to our community platform!</p>

      <div
        style={{
          background: "#f0f9ff",
          padding: "32px",
          borderRadius: "8px",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#1f2937" }}>
          Connect, Support, and Grow Together
        </h2>
        <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
          Join meaningful helping circles where people support each other, share resources, and build lasting
          connections.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            background: "#dbeafe",
            padding: "24px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>👥</div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>10,000+ Members</h3>
        </div>

        <div
          style={{
            background: "#f3e8ff",
            padding: "24px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>❤️</div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>500+ Circles</h3>
        </div>

        <div
          style={{
            background: "#dcfce7",
            padding: "24px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌍</div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>50+ Countries</h3>
        </div>
      </div>

      <div
        style={{
          marginTop: "64px",
          padding: "32px",
          background: "#111827",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>🤝 Helping Circles</h3>
        <p style={{ color: "#9ca3af", margin: 0 }}>
          Building meaningful connections and supportive communities where people help each other grow and thrive.
        </p>
      </div>
    </div>
  )
}
