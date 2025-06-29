export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          About Helping Circles
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            color: "#6b7280",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          We believe in the power of community and mutual support to create positive change.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          <div style={{ background: "#f9fafb", padding: "1.5rem", borderRadius: "0.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
              Our Mission
            </h2>
            <p style={{ color: "#6b7280", margin: 0 }}>
              To connect people who want to help each other grow, learn, and make a positive impact.
            </p>
          </div>

          <div style={{ background: "#f9fafb", padding: "1.5rem", borderRadius: "0.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
              Our Vision
            </h2>
            <p style={{ color: "#6b7280", margin: 0 }}>
              A world where everyone has access to supportive communities that help them thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
