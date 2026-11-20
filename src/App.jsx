import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Solutions from './pages/Solutions.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function IndustriesRedirect() {
  const { hash } = useLocation()
  return <Navigate to={`/projects${hash}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="solutions" element={<Solutions />} />
        {/* Old Industries links (and #anchors) now land on Projects. */}
        <Route path="industries" element={<IndustriesRedirect />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
