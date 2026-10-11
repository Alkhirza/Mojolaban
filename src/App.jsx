import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profil from './pages/Profil'
import Pemerintahan from './pages/Pemerintahan'
import Wilayah from './pages/Wilayah'
import WilayahDetail from './pages/WilayahDetail'
import Statistik from './pages/Statistik'
import Layanan from './pages/Layanan'
import Berita from './pages/Berita'
import Galeri from './pages/Galeri'
import Kontak from './pages/Kontak'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/pemerintahan" element={<Pemerintahan />} />
          <Route path="/wilayah" element={<Wilayah />} />
          <Route path="/wilayah/:slug" element={<WilayahDetail />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
