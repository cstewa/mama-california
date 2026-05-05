import { useState } from 'react'
import { submitContact } from '../api'
import './GetInvolved.css'


export default function GetInvolved() {
  const [form, setForm] = useState({ name: '', email: '', city: '', interest_type: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', city: '', interest_type: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <main className="get-involved">
      <div className="page-hero">
        <div className="container">
          <h1>Get Involved</h1>
          <p>There's a place for you in this movement, whatever time and skills you have to offer.</p>
        </div>
      </div>

      {/* Chapters */}
      <section className="section section--gray" id="find-chapter">
        <div className="container">
          <h2 className="section-title">California Chapters</h2>
          <p className="section-intro">
            MAMA California chapters are organizing in communities across the state. Each chapter is led by
            a dedicated parent volunteer who hosts events, builds relationships with local schools, and
            spearheads advocacy for state level legislation.
          </p>
          <div className="chapters-list">
            {[
              { city: "West LA", signUp: "https://forms.gle/JW39bgwsVeTKHsvy9" },
              { city: "Costa Mesa", signUp: "https://forms.gle/SqL7BWj25m2c5v3H9" },
              { city: "Fresno", signUp: "https://forms.gle/nk46LtSGmw5659196" },
              { city: "Peninsula", signUp: "https://forms.gle/xgiymc7r53FQbZS68" },
              { city: "Conejo Valley", signUp: "https://forms.gle/NCESaKJXwbdn1gfQ8" },
              { city: "Eagle Rock (Los Angeles East Side)", signUp: "https://forms.gle/iYr8HeFB3uqMjGtg6" },
              { city: "Marin County", signUp: "https://forms.gle/Br5UWbSTwuaFv9dC7" },
              { city: "San Francisco", signUp: "https://forms.gle/fBBB766FRCeJ4hsw8" },
              { city: "Davis", signUp: "https://forms.gle/cAfJQ4ibLgx1gPg3A" },
            ].map(c => (
              <div key={c.city} className="chapter-pill">
                <strong>{c.city}</strong>
                <a href={c.signUp} target="_blank" rel="noopener noreferrer" className="chapter-pill__signup">Join</a>
              </div>
            ))}
          </div>
          <p style={{marginTop: '28px'}}>
            <a href="https://wearemama.org/start-a-mama-chapter/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Start a Chapter in Your City</a>
          </p>
        </div>
      </section>

      {/* EveryAction callout */}
      <section className="section" id="contact-legislators">
        <div className="container legislator-cta">
          <div>
            <span className="badge">Take Action Now</span>
            <h2>Contact Your California Legislators</h2>
            <p>
              Protecting kids from addictive technology requires legislation. Use EveryAction
              to send a message directly to your state representative in minutes. Make your voice heard.
            </p>
            <a href="https://wearemama.org/get-involved" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{marginTop: '20px'}}>
              Contact Legislators via EveryAction →
            </a>
          </div>
          <div className="legislator-stats">
            <div className="leg-stat"><span>AB 272</span><small>Phone-free schools bill</small></div>
            <div className="leg-stat"><span>SB 976</span><small>Social media age verification</small></div>
            <div className="leg-stat"><span>AB 1814</span><small>Kids social media protection</small></div>
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="section section--gray" id="join">
        <div className="container join-section">
          <div className="join-section__text">
            <span className="badge">Join Us</span>
            <h2>Connect With MAMA California</h2>
            <p>
              Fill out the form and we'll connect you with the right people and opportunities in your area.
              Whether you have an hour a month or a full weekend, there's a role for you.
            </p>
            <div className="join-ctas">
              <p className="join-ctas__label">Get started right away</p>
              <div className="join-ctas__buttons">
                <a
                  href="https://mobilize.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary join-cta"
                >
                  RSVP to events on Mobilize
                  <span className="join-cta__arrow" aria-hidden>→</span>
                </a>
                <a
                  href="https://wearemama.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline join-cta"
                >
                  Join MAMA National
                  <span className="join-cta__arrow" aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          <form className="join-form" onSubmit={handleSubmit}>
            {status === 'success' && (
              <div className="form-success">
                ✓ Thank you! We'll be in touch soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-error">
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>First & Last Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@email.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="Santa Monica" />
              </div>
              <div className="form-group">
                <label>I'm interested in</label>
                <select name="interest_type" value={form.interest_type} onChange={handleChange}>
                  <option value="">Select one…</option>
                  <option value="volunteer">Volunteering locally</option>
                  <option value="chapter_leader">Starting/leading a chapter</option>
                  <option value="speaker">Speaking or presenting</option>
                  <option value="media">Media inquiry</option>
                  <option value="other">Newsletter / staying informed</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message (optional)</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about yourself or any questions you have…" />
            </div>

            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
