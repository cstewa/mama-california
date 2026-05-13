import { useState, useEffect } from 'react'
import { getEvents } from '../api'
import EventsCalendar from '../components/EventsCalendar'
import './Events.css'

const TYPE_LABELS = {
  speaker: 'Speaker Event',
  tabling: 'Tabling',
  screening: 'Film Screening',
  rally: 'Rally',
  workshop: 'Workshop',
}

function EventModal({ event, onClose }) {
  if (!event) return null
  const start = new Date(event.starts_at)
  const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const timeStr = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="event-modal-backdrop" onClick={onClose}>
      <div className="event-modal" onClick={e => e.stopPropagation()}>
        <button className="event-modal__close" onClick={onClose} aria-label="Close">×</button>
        {event.event_type && <span className="badge">{TYPE_LABELS[event.event_type] || event.event_type}</span>}
        <h3>{event.title}</h3>
        <div className="event-modal__date">{dateStr} · {timeStr}</div>
        <div className="event-modal__meta">
          {event.location_name && (
            <div>📍 {event.location_name}{event.city ? `, ${event.city}` : ''}</div>
          )}
          {event.is_virtual && <div>💻 Virtual event</div>}
        </div>
        {event.description && <p className="event-modal__desc">{event.description}</p>}
        {event.rsvp_url && (
          <a href={event.rsvp_url} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            RSVP →
          </a>
        )}
        {event.is_virtual && event.virtual_link && (
          <a href={event.virtual_link} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Join Event →
          </a>
        )}
      </div>
    </div>
  )
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data || []))
      .catch(() => setEvents([]))
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
          ) : (
            <EventsCalendar events={events} onSelectEvent={setSelected} />
          )}
        </div>
      </section>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
