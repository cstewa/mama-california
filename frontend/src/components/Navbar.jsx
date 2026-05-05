import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { to: '/about',       label: 'About' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/resources',   label: 'Resources' },
  { to: '/events',      label: 'Events' },
  { to: '/news',        label: 'News' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img src="/mama-logo.png" alt="MAMA" className="navbar__logo-img" />
          <span className="navbar__logo-sub">California</span>
        </Link>

        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/get-involved#join" className="btn btn--primary navbar__cta" onClick={() => setOpen(false)}>
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  )
}
