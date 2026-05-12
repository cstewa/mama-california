import { useState, useEffect } from 'react'
import api from '../api'

const EVENT_TYPES = ['tabling', 'speaker', 'screening', 'rally', 'workshop']
const TYPE_LABELS = { speaker: 'Speaker Event', tabling: 'Tabling', screening: 'Film Screening', rally: 'Rally', workshop: 'Workshop' }

const BLANK = {
  title: '', description: '', event_type: '', starts_at: '', ends_at: '',
  location_name: '', address: '', city: '', is_virtual: false,
  virtual_link: '', rsvp_url: '', published: false, capacity: '',
}

const toLocal = (iso) => iso ? iso.slice(0, 16) : ''
const fmt = (iso) => iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = no form, 'new' or event object
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/admin/events')
      .then(r => setEvents(r.data))
      .catch(() => setAlert({ type: 'error', msg: 'Failed to load events.' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setForm(BLANK)
    setEditing('new')
    setAlert(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openEdit = (event) => {
    setForm({ ...event, starts_at: toLocal(event.starts_at), ends_at: toLocal(event.ends_at), capacity: event.capacity || '' })
    setEditing(event)
    setAlert(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancel = () => { setEditing(null); setAlert(null) }

  const change = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setAlert(null)
    try {
      if (editing === 'new') {
        await api.post('/admin/events', form)
        setAlert({ type: 'success', msg: 'Event created.' })
      } else {
        await api.put(`/admin/events/${editing.id}`, form)
        setAlert({ type: 'success', msg: 'Event updated.' })
      }
      setEditing(null)
      load()
    } catch (err) {
      const msgs = err.response?.data?.errors?.join(', ') || 'Save failed.'
      setAlert({ type: 'error', msg: msgs })
    } finally {
      setSaving(false)
    }
  }

  const destroy = async (event) => {
    if (!confirm(`Delete "${event.title}"?`)) return
    try {
      await api.delete(`/admin/events/${event.id}`)
      load()
    } catch {
      setAlert({ type: 'error', msg: 'Delete failed.' })
    }
  }

  return (
    <div>
      <div className="admin-section-header">
        <h1>Events</h1>
        {!editing && <button className="btn-admin btn-admin--new" onClick={openNew}>+ New Event</button>}
      </div>

      {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}

      {editing && (
        <div className="admin-form-panel">
          <h2>{editing === 'new' ? 'New Event' : `Edit: ${editing.title}`}</h2>
          <form onSubmit={save}>
            <div className="admin-form-grid">
              <div className="admin-field full">
                <label>Title *</label>
                <input name="title" value={form.title} onChange={change} required />
              </div>
              <div className="admin-field">
                <label>Event Type</label>
                <select name="event_type" value={form.event_type} onChange={change}>
                  <option value="">— select —</option>
                  {EVENT_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label>City</label>
                <input name="city" value={form.city} onChange={change} placeholder="Santa Monica" />
              </div>
              <div className="admin-field">
                <label>Start Date & Time *</label>
                <input name="starts_at" type="datetime-local" value={form.starts_at} onChange={change} required />
              </div>
              <div className="admin-field">
                <label>End Date & Time</label>
                <input name="ends_at" type="datetime-local" value={form.ends_at} onChange={change} />
              </div>
              <div className="admin-field">
                <label>Location Name</label>
                <input name="location_name" value={form.location_name} onChange={change} placeholder="Santa Monica Library" />
              </div>
              <div className="admin-field">
                <label>Address</label>
                <input name="address" value={form.address} onChange={change} placeholder="601 Santa Monica Blvd" />
              </div>
              <div className="admin-field">
                <label>RSVP URL</label>
                <input name="rsvp_url" value={form.rsvp_url} onChange={change} placeholder="https://…" />
              </div>
              <div className="admin-field">
                <label>Capacity</label>
                <input name="capacity" type="number" value={form.capacity} onChange={change} placeholder="100" />
              </div>
              <div className="admin-field full">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={change} rows={3} />
              </div>
              <div className="admin-field admin-field--checkbox">
                <input name="is_virtual" type="checkbox" checked={form.is_virtual} onChange={change} id="is_virtual" />
                <label htmlFor="is_virtual">Virtual event</label>
              </div>
              {form.is_virtual && (
                <div className="admin-field">
                  <label>Virtual Link</label>
                  <input name="virtual_link" value={form.virtual_link} onChange={change} placeholder="https://zoom.us/…" />
                </div>
              )}
              <div className="admin-field admin-field--checkbox">
                <input name="published" type="checkbox" checked={form.published} onChange={change} id="published" />
                <label htmlFor="published">Published (visible on site)</label>
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="btn-admin btn-admin--primary" disabled={saving}>
                {saving ? 'Saving…' : editing === 'new' ? 'Create Event' : 'Save Changes'}
              </button>
              <button type="button" className="btn-admin btn-admin--outline" onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-empty">Loading…</div>
        ) : events.length === 0 ? (
          <div className="admin-empty">No events yet. Click "+ New Event" to add one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>City</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev.id}>
                  <td><strong>{ev.title}</strong></td>
                  <td>{TYPE_LABELS[ev.event_type] || ev.event_type || '—'}</td>
                  <td>{fmt(ev.starts_at)}</td>
                  <td>{ev.city || '—'}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${ev.published ? 'green' : 'gray'}`}>
                      {ev.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn-admin btn-admin--outline" onClick={() => openEdit(ev)}>Edit</button>
                      <button className="btn-admin btn-admin--danger" onClick={() => destroy(ev)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
