import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * PageHeader – banner di bagian atas setiap halaman (kecuali Beranda)
 */
export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ph-breadcrumb', { y: -10, opacity: 0, duration: 0.4, ease: 'power2.out' })
      gsap.from('.ph-title',      { y: 30,  opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 })
      gsap.from('.ph-subtitle',   { y: 20,  opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.25 })
    }, ref)
    return () => ctx.revert()
  }, [title])

  return (
    <div
      ref={ref}
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-4 overflow-hidden relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {breadcrumbs.length > 0 && (
          <nav className="ph-breadcrumb flex items-center gap-1.5 text-blue-200 text-sm mb-4 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={14} />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="ph-title text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="ph-subtitle mt-2 text-blue-200 text-base md:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
