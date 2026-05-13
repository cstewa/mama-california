import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminResetPassword } from '../api'
import './admin.css'

export default function AdminResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await adminResetPassword({ token, password })
      localStorage.setItem('mama_token', res.data.token)
      navigate('/admin/events')
    } catch (err) {
      const msg = err.response?.data?.errors?.join(', ') || err.response?.data?.error || 'Reset failed.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1>Set New Password</h1>
        <p>Enter a new password for your admin account.</p>

        {error && <div className="admin-alert admin-alert--error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field" style={{ marginBottom: 24 }}>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              autoFocus
            />
          </div>
          <button type="submit" className="btn-admin btn-admin--primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Saving…' : 'Set Password & Sign In'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center', color: '#666' }}>
          <Link to="/admin/login" style={{ color: '#1a1a2e', fontWeight: 600 }}>Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
