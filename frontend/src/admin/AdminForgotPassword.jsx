import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../api'
import './admin.css'

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await requestPasswordReset({ email })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1>Forgot Password</h1>

        {sent ? (
          <>
            <p>If an admin account exists for <strong>{email}</strong>, a reset link is on its way. Check your inbox.</p>
            <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center', color: '#666' }}>
              <Link to="/admin/login" style={{ color: '#1a1a2e', fontWeight: 600 }}>Back to sign in</Link>
            </p>
          </>
        ) : (
          <>
            <p>Enter your admin email. We'll send you a link to reset your password.</p>

            {error && <div className="admin-alert admin-alert--error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="admin-field" style={{ marginBottom: 24 }}>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
              </div>
              <button type="submit" className="btn-admin btn-admin--primary" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center', color: '#666' }}>
              <Link to="/admin/login" style={{ color: '#1a1a2e', fontWeight: 600 }}>Back to sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
