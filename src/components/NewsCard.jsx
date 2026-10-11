import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NewsCard({ berita }) {
  const ref = useRef(null)

  const tanggalFormatted = new Date(berita.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 40, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="card-lift bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
    >
      {/* Gambar placeholder */}
      <div className="h-44 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
        {berita.gambar ? (
          <img
            src={berita.gambar}
            alt={berita.judul}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-blue-400 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-2">
              <Tag size={20} className="text-blue-600" />
            </div>
            <p className="text-xs text-blue-500">Foto belum tersedia</p>
          </div>
        )}
      </div>

      {/* Konten */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2 flex-wrap">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {berita.kategori}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {tanggalFormatted}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
          {berita.judul}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {berita.ringkasan}
        </p>

        <Link
          to="/berita"
          className="inline-flex items-center gap-1.5 text-blue-700 text-sm font-medium hover:gap-3 transition-all duration-200"
        >
          Selengkapnya
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
