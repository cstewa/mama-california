import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api'
import './admin.css'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await login(form)
      if (!res.data.member?.is_admin) {
        setError('This account does not have admin access.')
        return
      }
      localStorage.setItem('mama_token', res.data.token)
      navigate('/admin/events')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1>MAMA Admin</h1>
        <p>Sign in to manage events and resources.</p>

        {error && <div className="admin-alert admin-alert--error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field" style={{ marginBottom: 14 }}>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              autoFocus
            />
          </div>
          <div className="admin-field" style={{ marginBottom: 24 }}>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="btn-admin btn-admin--primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center', color: '#666' }}>
          Need an account? <Link to="/admin/signup" style={{ color: '#1a1a2e', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
