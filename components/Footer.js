import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🤝</span>
              <span className="logo-text">Helping Circles</span>
            </div>
            <p className="footer-description">
              Building meaningful connections and supportive communities where people help each other grow and thrive.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                🐦
              </a>
              <a href="#" className="social-link">
                📘
              </a>
              <a href="#" className="social-link">
                💼
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li>
                <Link href="/circles">Browse Circles</Link>
              </li>
              <li>
                <Link href="/create">Create Circle</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/resources">Resources</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Helping Circles Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
