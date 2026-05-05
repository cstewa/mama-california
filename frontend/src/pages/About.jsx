import './About.css'

const TEAM = [
  { name: "Julie Scelfo", role: "Founder, MAMA National", bio: "Former New York Times staff writer, media ecologist, and mother of three. Julie founded MAMA to bring parents together against media addiction." },
  { name: "California Chapter Leaders", role: "Across the State", bio: "Dedicated parent volunteers leading local chapters from Santa Monica to San Francisco, organizing events and growing the movement." },
]

const VALUES = [
  { title: "Parent Education", body: "Helping parents understand the profound role of media and technology in shaping children's social, emotional, and academic health." },
  { title: "Phone-Free Schools", body: "Ensuring school hours remain free for real-life interactions and other forms of learning—because kids deserve a break from their screens." },
  { title: "Advocating for Safeguards", body: "Promoting policies at the state level that allow kids to grow up with basic privacy protections, without being relentlessly targeted by hidden algorithms that exploit their emotions for profit." },
]

export default function About() {
  return (
    <main>
      <div className="page-hero">
        <div className="container">
          <h1>About MAMA California</h1>
          <p>Mothers Against Media Addiction—fighting for California's children.</p>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container about-mission">
          <div className="about-mission__text fade-up">
            <span className="badge">Our Mission</span>
            <h2>Protecting Children from Addictive Technology</h2>
            <p>
              MAMA California is part of the national Mothers Against Media Addiction movement—a grassroots
              coalition of parents, grandparents, aunts, uncles and allies who believe that real-life experiences
              and human connection belong at the heart of a healthy childhood.
            </p>
            <p>
              Like Mothers Against Drunk Driving transformed how America treats drunk driving, we are transforming
              how society treats addictive technology designed to exploit children's developing brains. We are
              taking this fight into our homes, our schools, our communities, and the California state legislature.
            </p>
          </div>
          <div className="about-mission__box">
            <div className="mission-box">
              <h3>MAMA is a registered 501(c)3 nonprofit</h3>
              <p>National headquarters: New York, NY</p>
              <p>California chapter: serving communities across the state</p>
              <a href="https://wearemama.org" target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{marginTop: '20px'}}>
                Visit MAMA National →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--gray">
        <div className="container">
          <h2 className="section-title center">What We Do</h2>
          <div className="grid-3">
            {VALUES.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-card__line" />
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Leadership</h2>
          <div className="grid-2">
            {TEAM.map(m => (
              <div key={m.name} className="card team-card">
                <div className="team-card__avatar">{m.name.charAt(0)}</div>
                <div>
                  <h3>{m.name}</h3>
                  <p className="team-card__role">{m.role}</p>
                  <p className="team-card__bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
