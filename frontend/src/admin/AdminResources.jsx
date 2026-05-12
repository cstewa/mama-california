import { useState, useEffect } from 'react'
import api from '../api'

const TYPES  = ['study', 'article', 'video', 'guide', 'book', 'stat']
const TOPICS = ['addiction', 'legislation', 'mental_health', 'parenting', 'litigation', 'ai_safety']
const TOPIC_LABELS = { addiction: 'Addiction', legislation: 'Legislation', mental_health: 'Mental Health', parenting: 'Parenting', litigation: 'Litigation', ai_safety: 'AI Safety' }

const BLANK = {
  title: '', description: '', resource_type: '', topic: '',
  url: '', author: '', source: '', featured: false, published: true,
}

export default function AdminResources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/admin/resources')
      .then(r => setResources(r.data))
      .catch(() => setAlert({ type: 'error', msg: 'Failed to load resources.' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setForm(BLANK)
    setEditing('new')
    setAlert(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openEdit = (resource) => {
    setForm({ ...resource })
    setEditing(resource)
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
        await api.post('/admin/resources', form)
        setAlert({ type: 'success', msg: 'Resource created.' })
      } else {
        await api.put(`/admin/resources/${editing.id}`, form)
        setAlert({ type: 'success', msg: 'Resource updated.' })
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

  const destroy = async (resource) => {
    if (!confirm(`Delete "${resource.title}"?`)) return
    try {
      await api.delete(`/admin/resources/${resource.id}`)
      load()
    } catch {
      setAlert({ type: 'error', msg: 'Delete failed.' })
    }
  }

  return (
    <div>
      <div className="admin-section-header">
        <h1>Resources</h1>
        {!editing && <button className="btn-admin btn-admin--new" onClick={openNew}>+ New Resource</button>}
      </div>

      {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}

      {editing && (
        <div className="admin-form-panel">
          <h2>{editing === 'new' ? 'New Resource' : `Edit: ${editing.title}`}</h2>
          <form onSubmit={save}>
            <div className="admin-form-grid">
              <div className="admin-field full">
                <label>Title *</label>
                <input name="title" value={form.title} onChange={change} required />
              </div>
              <div className="admin-field">
                <label>Type</label>
                <select name="resource_type" value={form.resource_type} onChange={change}>
                  <option value="">— select —</option>
                  {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label>Topic</label>
                <select name="topic" value={form.topic} onChange={change}>
                  <option value="">— select —</option>
                  {TOPICS.map(t => <option key={t} value={t}>{TOPIC_LABELS[t]}</option>)}
                </select>
              </div>
              <div className="admin-field full">
                <label>URL</label>
                <input name="url" value={form.url} onChange={change} placeholder="https://…" />
              </div>
              <div className="admin-field">
                <label>Author</label>
                <input name="author" value={form.author} onChange={change} placeholder="Jonathan Haidt" />
              </div>
              <div className="admin-field">
                <label>Source / Publisher</label>
                <input name="source" value={form.source} onChange={change} placeholder="NYT, Pew Research…" />
              </div>
              <div className="admin-field full">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={change} rows={3} />
              </div>
              <div className="admin-field admin-field--checkbox">
                <input name="featured" type="checkbox" checked={form.featured} onChange={change} id="r_featured" />
                <label htmlFor="r_featured">Featured (highlighted card)</label>
              </div>
              <div className="admin-field admin-field--checkbox">
                <input name="published" type="checkbox" checked={form.published} onChange={change} id="r_published" />
                <label htmlFor="r_published">Published (visible on site)</label>
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="btn-admin btn-admin--primary" disabled={saving}>
                {saving ? 'Saving…' : editing === 'new' ? 'Create Resource' : 'Save Changes'}
              </button>
              <button type="button" className="btn-admin btn-admin--outline" onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-empty">Loading…</div>
        ) : resources.length === 0 ? (
          <div className="admin-empty">No resources yet. Click "+ New Resource" to add one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Topic</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.title}</strong>
                    {r.featured && <span className="admin-badge admin-badge--green" style={{ marginLeft: 8 }}>Featured</span>}
                  </td>
                  <td>{r.resource_type || '—'}</td>
                  <td>{TOPIC_LABELS[r.topic] || r.topic || '—'}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${r.published ? 'green' : 'gray'}`}>
                      {r.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn-admin btn-admin--outline" onClick={() => openEdit(r)}>Edit</button>
                      <button className="btn-admin btn-admin--danger" onClick={() => destroy(r)}>Delete</button>
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
