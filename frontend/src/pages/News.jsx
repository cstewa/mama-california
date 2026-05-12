import './News.css'

const NEWSLETTERS = [
  {
    name: 'Catch Us Up',
    description: 'Written by a MAMA CA Chapter Lead — curated news on tech, kids, and policy.',
    url: 'https://catchusup.substack.com/',
    label: 'Substack',
  },
  {
    name: 'Tech Oversight Dispatch',
    description: 'Policy-focused coverage of technology regulation and accountability.',
    url: 'https://dispatch.techoversight.org/',
    label: 'Newsletter',
  },
  {
    name: 'Tech Policy Press',
    description: 'Independent journalism on the intersection of technology and public policy.',
    url: 'https://www.techpolicy.press/',
    label: 'Publication',
  },
]

const PODCASTS = [
  {
    name: 'Hard Fork',
    description: 'NYT reporters Kevin Roose and Casey Newton break down the biggest stories in tech.',
    url: 'https://podcasts.apple.com/us/podcast/hard-fork/id1528594034',
    label: 'Apple Podcasts',
  },
  {
    name: 'Scrolling 2 Death',
    description: 'Conversations about social media, youth mental health, and what we can do about it.',
    url: 'https://www.scrolling2death.com/',
    label: 'Podcast',
  },
  {
    name: 'Your Undivided Attention',
    description: 'The Center for Humane Technology explores how to reclaim our minds from technology.',
    url: 'https://www.humanetech.com/podcast',
    label: 'Podcast',
  },
]

export default function News() {
  return (
    <main>
      <div className="page-hero">
        <div className="container">
          <h1>Stay Informed</h1>
          <p>The newsletters and podcasts we follow to keep up with what's happening.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="stay-informed">
            <div className="stay-informed__group">
              <h3 className="stay-informed__heading">Newsletters &amp; Publications</h3>
              <div className="source-list">
                {NEWSLETTERS.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="source-card">
                    <div className="source-card__top">
                      <span className="source-card__name">{s.name}</span>
                      <span className="source-card__label">{s.label}</span>
                    </div>
                    <p className="source-card__desc">{s.description}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="stay-informed__group">
              <h3 className="stay-informed__heading">Podcasts</h3>
              <div className="source-list">
                {PODCASTS.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="source-card">
                    <div className="source-card__top">
                      <span className="source-card__name">{s.name}</span>
                      <span className="source-card__label">{s.label}</span>
                    </div>
                    <p className="source-card__desc">{s.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
