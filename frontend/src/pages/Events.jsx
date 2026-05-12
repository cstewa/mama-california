import { useState, useEffect } from 'react'
import { getEvents } from '../api'
import './Events.css'

const TYPE_LABELS = {
  speaker: 'Speaker Event',
  tabling: 'Tabling',
  screening: 'Film Screening',
  rally: 'Rally',
  workshop: 'Workshop',
}

function EventCard({ event }) {
  const start = new Date(event.starts_at)
  const month = start.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day   = start.getDate()
  const time  = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="event-card card">
      <div className="event-card__date">
        <span className="event-card__month">{month}</span>
        <span className="event-card__day">{day}</span>
      </div>
      <div className="event-card__body">
        {event.event_type && (
          <span className="badge">{TYPE_LABELS[event.event_type] || event.event_type}</span>
        )}
        <h3>{event.title}</h3>
        <div className="event-card__meta">
          <span>🕐 {time}</span>
          {event.location_name && <span>📍 {event.location_name}, {event.city}</span>}
          {event.is_virtual && <span className="virtual-tag">Virtual</span>}
        </div>
        {event.description && <p className="event-card__desc">{event.description}</p>}
        <div className="event-card__actions">
          {event.rsvp_url && (
            <a href={event.rsvp_url} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              RSVP
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const MOCK_EVENTS = [
  { id: 1, title: "Santa Monica Farmers Market Tabling", event_type: "tabling", starts_at: new Date(Date.now() + 14 * 86400000).toISOString(), location_name: "Santa Monica Farmers Market", city: "Santa Monica", description: "Join us at the Wednesday market! We'll be sharing information about screen addiction and how to get involved with MAMA California.", is_virtual: false },
  { id: 2, title: "Speaker Series: Kids, Screens & Mental Health", event_type: "speaker", starts_at: new Date(Date.now() + 21 * 86400000).toISOString(), location_name: "Santa Monica Public Library", city: "Santa Monica", description: "An evening with leading experts on the mental health crisis facing our children. Learn what the research says and what you can do.", rsvp_url: "#", is_virtual: false },
  { id: 3, title: "Can't Look Away Screening", event_type: "screening", starts_at: new Date(Date.now() + 35 * 86400000).toISOString(), location_name: "Laemmle Monica Film Center", city: "Santa Monica", description: "A powerful documentary followed by community discussion. Light refreshments will be served. Bring a friend!", is_virtual: false },
]

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data))
      .catch(() => setEvents(MOCK_EVENTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <div className="page-hero">
        <div className="container">
          <h1>Upcoming Events</h1>
          <p>Join us in person and online to build the movement for California's children.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="events-header">
            <p className="events-note">
              Want to host an event? <a href="/get-involved#join">Get in touch</a>.
            </p>
          </div>

          {loading ? (
            <div className="loading">Loading events…</div>
          ) : events.length === 0 ? (
            <div className="empty-state">
              <h3>No upcoming events</h3>
              <p>Check back soon — we're always organizing.</p>
            </div>
          ) : (
            <div className="events-list">
              {events.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
