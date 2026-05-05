import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-text">MAMA</span>
              <span className="footer__logo-sub">California</span>
            </div>
            <p className="footer__tagline">
              A grassroots movement of parents protecting children from media addiction—across California and beyond.
            </p>
            <p className="footer__501">
              Part of Mothers Against Media Addiction, a registered 501(c)3 nonprofit.
            </p>
          </div>

          <div className="footer__col">
            <h4>Navigate</h4>
            <Link to="/about">About</Link>
            <Link to="/get-involved">Get Involved</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/events">Events</Link>
            <Link to="/news">News</Link>
          </div>

          <div className="footer__col">
            <h4>Take Action</h4>
            <a href="https://wearemama.org" target="_blank" rel="noopener noreferrer">MAMA National</a>
            <Link to="/get-involved#contact-legislators">Contact Legislators</Link>
            <Link to="/events">Upcoming Events</Link>
            <Link to="/get-involved#start-chapter">Start a Chapter</Link>
          </div>

          <div className="footer__col">
            <h4>Connect</h4>
            <a href="https://www.instagram.com/_wearemama/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/company/wearemama/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:california@mama-california.org">Email Us</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} MAMA California · mama-california.org</p>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
