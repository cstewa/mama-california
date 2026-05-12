import { useState, useEffect } from 'react'
import { getResources } from '../api'
import './Resources.css'

const TYPE_ICONS = { study: '📊', article: '📰', video: '🎬', guide: '📋', book: '📚', stat: '📈' }
const TOPIC_LABELS = {
  addiction: 'Addiction',
  legislation: 'Legislation',
  mental_health: 'Mental Health',
  parenting: 'Parenting',
  litigation: 'Litigation',
  ai_safety: 'AI Safety',
}

const MOCK_RESOURCES = [
  { id: 7, title: "School Board Speech Templates", resource_type: "guide", topic: "legislation", source: "Screen Free Childhood US", url: "https://docs.google.com/document/d/1Pdq896LEqNW27XaN2taJwJO8PzYcjYwPbnF16WFaV3w/edit", description: "Ready-to-use speech templates for parents who want to speak at school board meetings in support of phone-free school policies. Courtesy of Screen Free Childhood US.", featured: true },
]

export default function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState('')

  useEffect(() => {
    getResources({ topic: topic || undefined })
      .then(res => {
        const data = res.data
        if (data && data.length > 0) {
          setResources(data)
        } else {
          let filtered = MOCK_RESOURCES
          if (topic) filtered = filtered.filter(r => r.topic === topic)
          setResources(filtered)
        }
      })
      .catch(() => {
        let filtered = MOCK_RESOURCES
        if (topic) filtered = filtered.filter(r => r.topic === topic)
        setResources(filtered)
      })
      .finally(() => setLoading(false))
  }, [topic])

  return (
    <main>
      <div className="page-hero">
        <div className="container">
          <h1>Resources</h1>
          <p>Research, guides, and tools to educate yourself and take action.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="resources-filters">
            <select value={topic} onChange={e => setTopic(e.target.value)}>
              <option value="">All Topics</option>
              {Object.entries(TOPIC_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="loading">Loading resources…</div>
          ) : resources.length === 0 ? (
            <div className="empty-state">
              <h3>No resources found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="resources-grid grid-3">
              {resources.map(r => (
                <div key={r.id} className={`resource-card card ${r.featured ? 'resource-card--featured' : ''}`}>
                  <div className="resource-card__header">
                    <span className="resource-card__icon">{TYPE_ICONS[r.resource_type] || '📄'}</span>
                    <div>
                      {r.topic && <span className="badge">{TOPIC_LABELS[r.topic] || r.topic}</span>}
                    </div>
                  </div>
                  <div className="resource-card__body">
                    <h3>{r.title}</h3>
                    {(r.author || r.source) && (
                      <p className="resource-card__byline">{r.author || r.source}</p>
                    )}
                    {r.description && <p className="resource-card__desc">{r.description}</p>}
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="resource-card__link">
                        Read more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
