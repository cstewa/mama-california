import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import GetInvolved from './pages/GetInvolved'
import Resources from './pages/Resources'
import Events from './pages/Events'
import News from './pages/News'
import AdminLogin from './admin/AdminLogin'
import AdminApp from './admin/AdminApp'
import './index.css'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — no public nav/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public site */}
        <Route path="*" element={
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/"             element={<Home />} />
              <Route path="/about"        element={<About />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/resources"    element={<Resources />} />
              <Route path="/events"       element={<Events />} />
              <Route path="/news"         element={<News />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}
