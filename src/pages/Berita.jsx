import { useState, useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { berita } from '../data/berita'
import NewsCard from '../components/NewsCard'
import { Search } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const kategoriList = ['Semua', ...new Set(berita.map((b) => b.kategori))]

export default function Berita() {
  const [filter, setFilter]   = useState('Semua')
  const [search, setSearch]   = useState('')
  const filterRef = useRef(null)
  const gridRef   = useRef(null)

  const filtered = berita.filter((b) => {
    const matchKat    = filter === 'Semua' || b.kategori === filter
    const matchSearch = b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.ringkasan.toLowerCase().includes(search.toLowerCase())
    return matchKat && matchSearch
  })

  // Animate filter bar entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.filter-pill', { y: -15, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: filterRef.current, start: 'top 90%', toggleActions: 'play none none none' } })
    })
    return () => ctx.revert()
  }, [])

  // Re-animate grid when filter changes
  useEffect(() => {
    if (!gridRef.current) return
    gsap.from('.news-item', { y: 30, opacity: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out', clearProps: 'all' })
  }, [filter, search])

  return (
    <div>
      <PageHeader
        title="Berita & Pengumuman"
        subtitle="Informasi dan berita terkini seputar kegiatan Kecamatan Mojolaban"
        breadcrumbs={[{ label: 'Berita' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle title="Berita Terbaru" />

        {/* Filter & Pencarian */}
        <div ref={filterRef} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setFilter(kat)}
                className={`filter-pill px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === kat
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Berita tidak ditemukan</p>
            <p className="text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="news-item">
                <NewsCard berita={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
