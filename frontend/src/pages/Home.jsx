import { Link } from 'react-router-dom'
import './Home.css'

const STATS = [
  { number: "237", label: "Average daily notifications for most teens" },
  { number: "10", label: "Age most teens first encounter pornography online" },
  { number: "3M+", label: "Youth experiencing severe major depression" },
  { number: "95%", label: "Of teens 13-17 use social media" },
  { number: "3+", label: "Hours/day of social media doubles mental health risk" },
  { number: "#1", label: "Cause of death ages 10-14 is suicide" },
]

const WHY_JOIN = [
  { icon: "📣", title: "Speak Up", body: "Join a speaker series, table at local events, and connect with your community on what's at stake for our kids." },
  { icon: "🏛️", title: "Contact Legislators", body: "We make it easy to reach your state representatives and push for stronger child safety legislation in California." },
  { icon: "👩‍👩‍👧", title: "Build Community", body: "Join your local chapter, meet like-minded parents, and organize together for change in your district." },
]

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero__content container">
          <p className="hero__eyebrow">MAMA California</p>
          <h1 className="hero__headline">
            Screens are stealing a generation's<em> joy & well-being.</em>
          </h1>
          <p className="hero__sub">
            California parents are fighting back. Join a grassroots movement protecting children from media addiction—one community at a time.
          </p>
          <div className="hero__actions">
            <Link to="/get-involved" className="btn btn--white">Get Involved</Link>
            <Link to="/about" className="btn btn--outline-white">Our Mission</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--gray">
        <div className="container">
          <h2 className="section-title center">Our Kids' Lives Are on the Line</h2>
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-card__number">{s.number}</div>
                <div className="stat-card__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="section">
        <div className="container about-strip">
          <div className="about-strip__text">
            <span className="badge">Who We Are</span>
            <h2>A Movement for Parents, Founded by Parents</h2>
            <p>
              Like Mothers Against Drunk Driving, we are standing up to a massive public health threat
              and making change in our homes, our communities, and across California. MAMA brings parents
              and allies together who see firsthand the effects social media and addictive technologies
              are having on children.
            </p>
            <Link to="/about" className="btn btn--outline">Learn More About MAMA</Link>
          </div>
          <div className="about-strip__quote">
            <blockquote>
              "A mother's love for her child… knows no law, no pity. It dares all things and crushes down remorselessly all that stands in its path."
              <cite>— Agatha Christie</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="section section--gray">
        <div className="container">
          <h2 className="section-title center">How You Can Help</h2>
          <div className="grid-3">
            {WHY_JOIN.map(w => (
              <div key={w.title} className="card why-card">
                <div className="why-card__icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready to take action?</h2>
            <p>Join parents across California fighting to protect our children's futures.</p>
          </div>
          <div className="cta-banner__btns">
            <Link to="/get-involved" className="btn btn--white">Join Us</Link>
            <Link to="/events" className="btn btn--outline-white">See Events</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
