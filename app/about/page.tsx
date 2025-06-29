export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      {/* Header */}
      <header style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: "1rem 0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", margin: 0 }}>🤝 Helping Circles</h1>
          </a>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="/" style={{ color: "#6b7280", textDecoration: "none" }}>
              Home
            </a>
            <a href="/circles" style={{ color: "#6b7280", textDecoration: "none" }}>
              Circles
            </a>
          </nav>
        </div>
      </header>

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
            marginBottom: "3rem",
            textAlign: "center",
            lineHeight: "1.6",
          }}
        >
          We believe in the power of community and mutual support to create positive change in the world.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          <div
            style={{
              background: "#f9fafb",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid #f3f4f6",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
              Our Mission
            </h2>
            <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6" }}>
              To connect people who want to help each other grow, learn, and make a positive impact in their communities
              and beyond.
            </p>
          </div>

          <div
            style={{
              background: "#f9fafb",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid #f3f4f6",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌟</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
              Our Vision
            </h2>
            <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6" }}>
              A world where everyone has access to supportive communities that help them achieve their goals and
              contribute to the greater good.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
            Ready to Join?
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
            Start your journey with Helping Circles today and connect with amazing people.
          </p>
          <a href="/circles">
            <button
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                color: "white",
                padding: "0.75rem 2rem",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1.125rem",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              Browse Circles
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
