export default function CirclesPage() {
  const circles = [
    {
      name: "Tech Innovators",
      description: "A community for technology enthusiasts",
      category: "Technology",
      color: "#dbeafe",
    },
    {
      name: "Sustainable Living",
      description: "Learn eco-friendly living tips",
      category: "Environment",
      color: "#dcfce7",
    },
    {
      name: "Creative Writers",
      description: "Support for aspiring writers",
      category: "Arts & Culture",
      color: "#f3e8ff",
    },
    {
      name: "Fitness Accountability",
      description: "Stay motivated on your fitness journey",
      category: "Health",
      color: "#fef2f2",
    },
    {
      name: "Entrepreneur Network",
      description: "Connect with business owners",
      category: "Business",
      color: "#fffbeb",
    },
    {
      name: "Language Exchange",
      description: "Practice with native speakers",
      category: "Education",
      color: "#eef2ff",
    },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
            Browse Circles
          </h1>
          <p style={{ color: "#6b7280" }}>Find and join communities that match your interests</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {circles.map((circle, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
                {circle.name}
              </h3>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>{circle.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    background: circle.color,
                    color: "#374151",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "9999px",
                  }}
                >
                  {circle.category}
                </span>
                <button
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  Join Circle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
