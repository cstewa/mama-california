import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom'
import AdminEvents from './AdminEvents'
import AdminResources from './AdminResources'
import './admin.css'

function AdminNav() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('mama_token')
    navigate('/admin/login')
  }
  return (
    <nav className="admin-nav">
      <span className="admin-nav__brand">MAMA Admin</span>
      <div className="admin-nav__links">
        <NavLink to="/admin/events">Events</NavLink>
        <NavLink to="/admin/resources">Resources</NavLink>
        <button className="btn-logout" onClick={logout}>Log out</button>
      </div>
    </nav>
  )
}

function RequireAuth({ children }) {
  const token = localStorage.getItem('mama_token')
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function AdminApp() {
  return (
    <RequireAuth>
      <div className="admin-app">
        <AdminNav />
        <div className="admin-main">
          <Routes>
            <Route index element={<Navigate to="events" replace />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="resources" element={<AdminResources />} />
          </Routes>
        </div>
      </div>
    </RequireAuth>
  )
}
