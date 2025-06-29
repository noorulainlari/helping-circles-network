export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)" }}>
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
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", margin: 0 }}>Helping Circles</h1>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="/about" style={{ color: "#6b7280", textDecoration: "none" }}>
              About
            </a>
            <a href="/circles" style={{ color: "#6b7280", textDecoration: "none" }}>
              Circles
            </a>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1rem", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "1.5rem",
            lineHeight: "1.2",
          }}
        >
          Connect, Support, and <span style={{ color: "#2563eb" }}>Grow Together</span>
        </h2>

        <p
          style={{
            fontSize: "1.25rem",
            color: "#6b7280",
            marginBottom: "2rem",
            maxWidth: "48rem",
            margin: "0 auto 2rem auto",
          }}
        >
          Join meaningful helping circles where people support each other's goals, share resources, and build lasting
          connections.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          <button
            style={{
              background: "#2563eb",
              color: "white",
              padding: "0.75rem 2rem",
              border: "none",
              borderRadius: "0.375rem",
              fontSize: "1.125rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Start Your Circle
          </button>
          <button
            style={{
              background: "transparent",
              color: "#374151",
              padding: "0.75rem 2rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              fontSize: "1.125rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Browse Circles
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#dbeafe",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                fontSize: "1.5rem",
              }}
            >
              👥
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
              10,000+ Members
            </h3>
            <p style={{ color: "#6b7280", margin: 0 }}>Active community members</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#f3e8ff",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                fontSize: "1.5rem",
              }}
            >
              ❤️
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
              500+ Circles
            </h3>
            <p style={{ color: "#6b7280", margin: 0 }}>Active helping circles</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#dcfce7",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                fontSize: "1.5rem",
              }}
            >
              🌍
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
              50+ Countries
            </h3>
            <p style={{ color: "#6b7280", margin: 0 }}>Global community reach</p>
          </div>
        </div>
      </main>

      <footer style={{ background: "#111827", color: "white", padding: "3rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Helping Circles</h3>
              <p style={{ color: "#9ca3af", marginBottom: "1rem" }}>
                Building meaningful connections and supportive communities.
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Platform</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#9ca3af" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a href="/circles" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Browse Circles
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a href="/create" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Create Circle
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a href="/events" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Company</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#9ca3af" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a href="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    About
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Contact
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a href="/privacy" style={{ color: "#9ca3af", textDecoration: "none" }}>
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #374151",
              marginTop: "2rem",
              paddingTop: "2rem",
              textAlign: "center",
              color: "#9ca3af",
            }}
          >
            <p style={{ margin: 0 }}>&copy; 2024 Helping Circles Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
