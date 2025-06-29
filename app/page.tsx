"use client"

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)" }}>
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
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", margin: 0 }}>🤝 Helping Circles</h1>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
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
                fontSize: "0.875rem",
              }}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
          Helping Circles Network
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#6b7280",
            marginBottom: "2rem",
            maxWidth: "48rem",
            margin: "0 auto 2rem auto",
            lineHeight: "1.6",
          }}
        >
          Welcome to our community platform!
        </p>

        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
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
            lineHeight: "1.6",
          }}
        >
          Join meaningful helping circles where people support each other's goals, share resources, and build lasting
          connections. Create positive change in your community and beyond.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "4rem",
            flexWrap: "wrap",
          }}
        >
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
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            🚀 Start Your Circle
          </button>
          <button
            style={{
              background: "transparent",
              color: "#374151",
              padding: "0.75rem 2rem",
              border: "2px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "1.125rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f9fafb"
              e.currentTarget.style.borderColor = "#9ca3af"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.borderColor = "#d1d5db"
            }}
          >
            🔍 Browse Circles
          </button>
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginTop: "4rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                fontSize: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              👥
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>10,000+</h3>
            <p style={{ color: "#6b7280", margin: 0 }}>Active Members</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                fontSize: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              ❤️
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>500+</h3>
            <p style={{ color: "#6b7280", margin: 0 }}>Active Circles</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto",
                fontSize: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              🌍
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>50+</h3>
            <p style={{ color: "#6b7280", margin: 0 }}>Countries</p>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginTop: "6rem" }}>
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "3rem",
            }}
          >
            How It Works
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #f3f4f6",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                Discover
              </h4>
              <p style={{ color: "#6b7280", margin: 0 }}>Find circles that match your interests and goals</p>
            </div>

            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #f3f4f6",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🤝</div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                Connect
              </h4>
              <p style={{ color: "#6b7280", margin: 0 }}>Join circles or create your own community</p>
            </div>

            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #f3f4f6",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>Grow</h4>
              <p style={{ color: "#6b7280", margin: 0 }}>Support each other and achieve your goals together</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "white", padding: "3rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>🤝 Helping Circles</h3>
              <p style={{ color: "#9ca3af", marginBottom: "1rem", lineHeight: "1.6" }}>
                Building meaningful connections and supportive communities where people help each other grow and thrive.
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
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #374151",
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
