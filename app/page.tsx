export default function HomePage() {
  return (
    <div css={styles.container}>
      <h1 css={styles.header}>Helping Circles Network</h1>
      <p css={styles.paragraph}>Welcome to our community platform!</p>

      <header css={styles.headerSection}>
        <div css={styles.headerContainer}>
          <h1 css={styles.logo}>Helping Circles</h1>
          <nav css={styles.nav}>
            <a href="/about" css={styles.navLink}>
              About
            </a>
            <a href="/circles" css={styles.navLink}>
              Circles
            </a>
            <button css={styles.button}>Get Started</button>
          </nav>
        </div>
      </header>

      <main css={styles.mainSection}>
        <h2 css={styles.mainHeading}>
          Connect, Support, and <span css={styles.highlight}>Grow Together</span>
        </h2>

        <p css={styles.mainParagraph}>
          Join meaningful helping circles where people support each other's goals, share resources, and build lasting
          connections.
        </p>

        <div css={styles.buttonContainer}>
          <button css={styles.primaryButton}>Start Your Circle</button>
          <button css={styles.secondaryButton}>Browse Circles</button>
        </div>

        <div css={styles.statsGrid}>
          <div css={styles.statItem}>
            <div css={styles.statIcon}>👥</div>
            <h3 css={styles.statHeading}>10,000+ Members</h3>
            <p css={styles.statText}>Active community members</p>
          </div>

          <div css={styles.statItem}>
            <div css={styles.statIcon}>❤️</div>
            <h3 css={styles.statHeading}>500+ Circles</h3>
            <p css={styles.statText}>Active helping circles</p>
          </div>

          <div css={styles.statItem}>
            <div css={styles.statIcon}>🌍</div>
            <h3 css={styles.statHeading}>50+ Countries</h3>
            <p css={styles.statText}>Global community reach</p>
          </div>
        </div>
      </main>

      <footer css={styles.footerSection}>
        <div css={styles.footerContainer}>
          <div css={styles.footerGrid}>
            <div css={styles.footerItem}>
              <h3 css={styles.footerHeading}>Helping Circles</h3>
              <p css={styles.footerText}>Building meaningful connections and supportive communities.</p>
            </div>

            <div css={styles.footerItem}>
              <h4 css={styles.footerSubHeading}>Platform</h4>
              <ul css={styles.footerList}>
                <li css={styles.footerListItem}>
                  <a href="/circles" css={styles.footerLink}>
                    Browse Circles
                  </a>
                </li>
                <li css={styles.footerListItem}>
                  <a href="/create" css={styles.footerLink}>
                    Create Circle
                  </a>
                </li>
                <li css={styles.footerListItem}>
                  <a href="/events" css={styles.footerLink}>
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div css={styles.footerItem}>
              <h4 css={styles.footerSubHeading}>Company</h4>
              <ul css={styles.footerList}>
                <li css={styles.footerListItem}>
                  <a href="/about" css={styles.footerLink}>
                    About
                  </a>
                </li>
                <li css={styles.footerListItem}>
                  <a href="/contact" css={styles.footerLink}>
                    Contact
                  </a>
                </li>
                <li css={styles.footerListItem}>
                  <a href="/privacy" css={styles.footerLink}>
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div css={styles.footerBottom}>
            <p css={styles.footerCopyright}>&copy; 2024 Helping Circles Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    color: "#2563eb",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  paragraph: {
    color: "#6b7280",
    fontSize: "1.125rem",
  },
  headerSection: {
    background: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "1rem 0",
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  navLink: {
    color: "#6b7280",
    textDecoration: "none",
  },
  button: {
    background: "#2563eb",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
  },
  mainSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 1rem",
    textAlign: "center",
  },
  mainHeading: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
  },
  highlight: {
    color: "#2563eb",
  },
  mainParagraph: {
    fontSize: "1.25rem",
    color: "#6b7280",
    marginBottom: "2rem",
    maxWidth: "48rem",
    margin: "0 auto 2rem auto",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  primaryButton: {
    background: "#2563eb",
    color: "white",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1.125rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  secondaryButton: {
    background: "transparent",
    color: "#374151",
    padding: "0.75rem 2rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "1.125rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  statItem: {
    textAlign: "center",
  },
  statIcon: {
    background: "#dbeafe",
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem auto",
    fontSize: "1.5rem",
  },
  statHeading: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#1f2937",
  },
  statText: {
    color: "#6b7280",
    margin: 0,
  },
  footerSection: {
    background: "#111827",
    color: "white",
    padding: "3rem 0",
  },
  footerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  footerItem: {
    // Individual footer item styles
  },
  footerHeading: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  footerText: {
    color: "#9ca3af",
    marginBottom: "1rem",
  },
  footerSubHeading: {
    fontWeight: "600",
    marginBottom: "1rem",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#9ca3af",
  },
  footerListItem: {
    marginBottom: "0.5rem",
  },
  footerLink: {
    color: "#9ca3af",
    textDecoration: "none",
  },
  footerBottom: {
    borderTop: "1px solid #374151",
    marginTop: "2rem",
    paddingTop: "2rem",
    textAlign: "center",
    color: "#9ca3af",
  },
  footerCopyright: {
    margin: 0,
  },
}
