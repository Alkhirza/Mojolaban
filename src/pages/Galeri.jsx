import { useState, useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { galeri, kategoriGaleri } from '../data/galeri'
import { ImageOff } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Galeri() {
  const [filter, setFilter] = useState('Semua')
  const gridRef   = useRef(null)
  const filterRef = useRef(null)

  const filtered = filter === 'Semua' ? galeri : galeri.filter((g) => g.kategori === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gal-pill', { scale: 0.8, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: filterRef.current, start: 'top 90%', toggleActions: 'play none none none' } })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.from('.gal-item', {
      scale: 0.88, opacity: 0, duration: 0.45, stagger: 0.06, ease: 'back.out(1.4)', clearProps: 'all',
    })
  }, [filter])

  return (
    <div>
      <PageHeader
        title="Galeri"
        subtitle="Dokumentasi kegiatan dan potensi wilayah Kecamatan Mojolaban"
        breadcrumbs={[{ label: 'Galeri' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle title="Foto Kegiatan & Wilayah" />

        {/* Filter */}
        <div ref={filterRef} className="flex gap-2 flex-wrap mb-8">
          {kategoriGaleri.map((kat) => (
            <button
              key={kat}
              onClick={() => setFilter(kat)}
              className={`gal-pill px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === kat
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-900'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="gal-item card-lift bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center px-4">
                    <ImageOff size={32} className="text-blue-300 mx-auto mb-2" />
                    <p className="text-xs text-blue-400">Foto belum tersedia</p>
                  </div>
                )}
              </div>
              <div className="p-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{item.kategori}</span>
                <p className="text-sm font-semibold text-gray-900 mt-1.5 line-clamp-1">{item.judul}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Belum ada foto di kategori ini</p>
          </div>
        )}

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-700">
          <p className="font-semibold mb-1">Catatan Galeri</p>
          <p>Foto-foto akan ditambahkan setelah tersedia dokumentasi resmi dari kegiatan kecamatan.</p>
        </div>
      </div>
    </div>
  )
}
