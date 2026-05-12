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
  { id: 1, title: "Demystifying Social Media Addiction Litigation", resource_type: "article", topic: "litigation", source: "AEI", url: "https://www.aei.org/technology-and-innovation/demystifying-social-media-addiction-litigation/", description: "A comprehensive overview of the legal landscape around social media addiction claims.", featured: true },
  { id: 2, title: "The Anxious Generation", resource_type: "book", topic: "mental_health", author: "Jonathan Haidt", description: "The definitive book on how smartphones and social media have rewired childhood and triggered a mental health crisis.", featured: true },
  { id: 3, title: "Why Wait Until 13 to Give Your Child a Phone", resource_type: "guide", topic: "parenting", description: "Evidence-based guidance for parents on the right age to introduce smartphones.", featured: true },
  { id: 4, title: "Parent-Child Phone Contract Template", resource_type: "guide", topic: "parenting", description: "A customizable contract you can use with your child when introducing a smartphone." },
  { id: 5, title: "AI Emotional Reliance in Gen Z", resource_type: "study", topic: "ai_safety", url: "https://arxiv.org/abs/2512.15117", description: "Research on conversational AI models fostering emotional dependence, with 1 in 3 Gen Z users reporting intimate relationships with AI." },
  { id: 6, title: "High Stakes as Country's First Social Media Addiction Trial Nears", resource_type: "article", topic: "litigation", url: "https://ctse.aei.org/high-stakes-as-countrys-first-social-media-addiction-trial-nears-and-snap-settles/", source: "AEI", description: "Coverage of the landmark social media addiction trial and Snap's settlement." },
  { id: 7, title: "School Board Speech Templates", resource_type: "guide", topic: "legislation", source: "Screen Free Childhood US", url: "https://docs.google.com/document/d/1Pdq896LEqNW27XaN2taJwJO8PzYcjYwPbnF16WFaV3w/edit", description: "Ready-to-use speech templates for parents who want to speak at school board meetings in support of phone-free school policies. Courtesy of Screen Free Childhood US.", featured: true },
]

export default function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    getResources({ topic: topic || undefined, type: type || undefined })
      .then(res => setResources(res.data))
      .catch(() => {
        let filtered = MOCK_RESOURCES
        if (topic) filtered = filtered.filter(r => r.topic === topic)
        if (type) filtered = filtered.filter(r => r.resource_type === type)
        setResources(filtered)
      })
      .finally(() => setLoading(false))
  }, [topic, type])

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
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">All Types</option>
              {Object.keys(TYPE_ICONS).map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
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

      {/* Contribute */}
      <section className="section section--gray">
        <div className="container resources-contribute">
          <h2>Know a Resource We Should Add?</h2>
          <p>We're always looking for high-quality studies, articles, and guides to share with California parents.</p>
          <a href="/get-involved" className="btn btn--outline">Suggest a Resource</a>
        </div>
      </section>
    </main>
  )
}
