import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminResetPassword } from '../api'
import './admin.css'

export default function AdminForgotPassword() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await adminResetPassword(form)
      localStorage.setItem('mama_token', res.data.token)
      navigate('/admin/events')
    } catch (err) {
      const status = err.response?.status
      if (status === 403) {
        setError("This email isn't authorized for admin access.")
      } else if (status === 404) {
        setError("No account found with that email. Try /admin/signup instead.")
      } else {
        const msgs = err.response?.data?.errors?.join(', ') || err.response?.data?.error || 'Reset failed.'
        setError(msgs)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1>Reset Password</h1>
        <p>Enter your admin email and a new password.</p>

        {error && <div className="admin-alert admin-alert--error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field" style={{ marginBottom: 14 }}>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={change} required autoFocus />
          </div>
          <div className="admin-field" style={{ marginBottom: 24 }}>
            <label>New Password</label>
            <input name="password" type="password" value={form.password} onChange={change} required minLength={8} />
          </div>
          <button type="submit" className="btn-admin btn-admin--primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Resetting…' : 'Set New Password'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center', color: '#666' }}>
          <Link to="/admin/login" style={{ color: '#1a1a2e', fontWeight: 600 }}>Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
