import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminSignup } from '../api'
import './admin.css'

export default function AdminSignup() {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await adminSignup(form)
      localStorage.setItem('mama_token', res.data.token)
      navigate('/admin/events')
    } catch (err) {
      const status = err.response?.status
      if (status === 403) {
        setError("This email isn't authorized to create an admin account. Ask the site owner to add you to the allowlist.")
      } else {
        const msgs = err.response?.data?.errors?.join(', ') || err.response?.data?.error || 'Signup failed.'
        setError(msgs)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1>Create Admin Account</h1>
        <p>Sign up with an authorized email to manage events and resources.</p>

        {error && <div className="admin-alert admin-alert--error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid" style={{ marginBottom: 14 }}>
            <div className="admin-field">
              <label>First Name</label>
              <input name="first_name" value={form.first_name} onChange={change} required />
            </div>
            <div className="admin-field">
              <label>Last Name</label>
              <input name="last_name" value={form.last_name} onChange={change} required />
            </div>
          </div>
          <div className="admin-field" style={{ marginBottom: 14 }}>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={change} required />
          </div>
          <div className="admin-field" style={{ marginBottom: 24 }}>
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={change} required minLength={8} />
          </div>
          <button type="submit" className="btn-admin btn-admin--primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating account…' : 'Create Admin Account'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center', color: '#666' }}>
          Already have an account? <Link to="/admin/login" style={{ color: '#1a1a2e', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
