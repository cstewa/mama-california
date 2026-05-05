import { useState, useEffect } from 'react'
import { getNews } from '../api'
import './News.css'

const CAT_LABELS = { press: 'Press', blog: 'Blog', litigation: 'Litigation', legislation: 'Legislation' }
const CAT_COLORS = { litigation: '#7B2D8B', legislation: '#1A5E8A', press: '#2D6A2D', blog: '#8A5A1A' }

const MOCK_NEWS = [
  { id: 1, title: "Meta Seeks to Block Data on Social Media Use and Mental Health in Child Safety Trial", summary: "In a major ongoing trial, Meta has attempted to exclude evidence linking its platforms to mental health harms in minors.", source_name: "Ars Technica", source_url: "https://arstechnica.com/tech-policy/2026/01/meta-wants-to-block-data-about-social-media-use-mental-health-in-child-safety-trial/", category: "litigation", published_date: "2026-01-15", featured: true },
  { id: 2, title: "US Appeals Court Skeptical of Meta's Bid to Cut Off Social Media Cases", summary: "A federal appeals court signaled doubt about social media companies' efforts to dismiss thousands of lawsuits alleging harm to minors.", source_name: "Reuters", source_url: "https://www.reuters.com/legal/litigation/us-appeals-court-appears-skeptical-meta-social-media-companies-bid-cut-off-2026-01-06/", category: "litigation", published_date: "2026-01-06" },
  { id: 3, title: "High Stakes as Country's First Social Media Addiction Trial Nears and Snap Settles", summary: "Snap settles as the landmark social media addiction trial approaches, signaling a potential shift in industry accountability.", source_name: "AEI", source_url: "https://ctse.aei.org/high-stakes-as-countrys-first-social-media-addiction-trial-nears-and-snap-settles/", category: "litigation", published_date: "2026-01-10", featured: true },
  { id: 4, title: "Nearly a Third of Kids Can't Use Books When Starting School", summary: "New research shows many young children try to swipe physical books like touchscreens, reflecting the depth of screen immersion from infancy.", source_name: "Sky News", source_url: "https://news.sky.com/story/nearly-a-third-of-kids-cant-use-books-when-starting-school-and-try-to-swipe-them-like-phones-13497398", category: "press", published_date: "2026-01-20" },
]

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getNews()
      .then(res => setNews(res.data))
      .catch(() => setNews(MOCK_NEWS))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter ? news.filter(n => n.category === filter) : news

  return (
    <main>
      <div className="page-hero">
        <div className="container">
          <h1>In the News</h1>
          <p>Coverage of the fight against media addiction and the latest in child safety policy.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="news-filters">
            <button className={`filter-btn ${!filter ? 'active' : ''}`} onClick={() => setFilter('')}>All</button>
            {Object.entries(CAT_LABELS).map(([v, l]) => (
              <button key={v} className={`filter-btn ${filter === v ? 'active' : ''}`} onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>

          {loading ? (
            <div className="loading">Loading news…</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state"><h3>No articles found</h3></div>
          ) : (
            <div className="news-list">
              {filtered.map(item => (
                <article key={item.id} className={`news-item ${item.featured ? 'news-item--featured' : ''}`}>
                  <div className="news-item__meta">
                    {item.category && (
                      <span className="news-item__cat" style={{ background: CAT_COLORS[item.category] + '18', color: CAT_COLORS[item.category] }}>
                        {CAT_LABELS[item.category]}
                      </span>
                    )}
                    {item.published_date && (
                      <span className="news-item__date">
                        {new Date(item.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {item.source_name && <span className="news-item__source">{item.source_name}</span>}
                  </div>
                  <h2>
                    {item.source_url ? (
                      <a href={item.source_url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    ) : item.title}
                  </h2>
                  {item.summary && <p>{item.summary}</p>}
                  {item.source_url && (
                    <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="news-item__readmore">
                      Read full article →
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
