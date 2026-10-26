import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Users, MapPin, Award, Building2, ArrowRight } from 'lucide-react'
import NewsCard from '../components/NewsCard'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import { berita } from '../data/berita'
import { layanan } from '../data/layanan'

import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroStats = [
  { icon: <Users size={24} />, value: '15', label: 'Desa' },
  { icon: <Users size={24} />, value: '93.349', label: 'Penduduk (2025)' },
  { icon: <MapPin size={24} />, value: '163 / 548', label: 'RW / RT (2025)' },
  { icon: <Building2 size={24} />, value: '32.126', label: 'Kepala Keluarga (2025)' },
]

export default function Home() {
  const beritaTerbaru = berita.slice(0, 3)
  const layananUnggulan = layanan.slice(0, 6)

  // Refs for GSAP
  const heroRef = useRef(null)
  const statsRef = useRef(null)

  const layananRef = useRef(null)
  const beritaRef = useRef(null)
  const petaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.5 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.7 }, '-=0.2')
        .from('.hero-desc', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-btns', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')

      // ── Stats stagger ─────────────────────────
      gsap.from('.stat-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })



      // ── Layanan cards stagger ─────────────────
      gsap.from('.layanan-card', {
        y: 40, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: layananRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      })

      // ── Berita cards stagger ──────────────────
      gsap.from('.berita-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: beritaRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      })

      // ── Peta fade in ─────────────────────────
      gsap.from('.peta-box', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: petaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden"
      >
        {/* Subtle background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="hero-badge text-blue-300 text-sm font-medium uppercase tracking-widest mb-3">
              Pemerintah Kecamatan Mojolaban
            </p>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Melayani dengan{' '}
              <span className="text-shine">Sepenuh Hati</span>
            </h1>
            <p className="hero-desc text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Website resmi Kecamatan Mojolaban, Kabupaten Sukoharjo. Temukan informasi
              profil, pemerintahan, layanan publik, dan data wilayah di sini.
            </p>
            <div className="hero-btns flex flex-col sm:flex-row gap-3">
              <Link
                to="/layanan"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-blue-950 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Lihat Layanan Publik
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/profil"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Profil Kecamatan
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40L1440 40L1440 10C1200 35 960 0 720 20C480 40 240 5 0 25L0 40Z" fill="white" fillOpacity="0.06" />
          </svg>
        </div>
      </section>

      {/* ── STATISTIK SINGKAT ────────────────────────────── */}
      <section ref={statsRef} className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat, i) => (
              <div key={i} className="stat-card">
                <StatCard
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  color="bg-blue-50 text-blue-900"
                />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── LAYANAN UNGGULAN ─────────────────────────────── */}
      <section ref={layananRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <SectionTitle
              title="Layanan Publik"
              subtitle="Layanan administrasi yang tersedia di Kantor Kecamatan Mojolaban"
            />
            <Link
              to="/layanan"
              className="inline-flex items-center gap-1.5 text-blue-700 font-medium text-sm hover:underline shrink-0"
            >
              Lihat semua layanan <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layananUnggulan.map((item) => (
              <div
                key={item.id}
                className="layanan-card card-lift bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-100 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-3 text-lg font-bold transition-transform group-hover:scale-110">
                  {item.nama.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">
                  {item.nama}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {item.deskripsi}
                </p>
                <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {item.kategori}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BERITA TERBARU ───────────────────────────────── */}
      <section ref={beritaRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <SectionTitle
              title="Berita Terbaru"
              subtitle="Informasi terkini dari Kecamatan Mojolaban"
            />
            <Link
              to="/berita"
              className="inline-flex items-center gap-1.5 text-blue-700 font-medium text-sm hover:underline shrink-0"
            >
              Semua berita <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beritaTerbaru.map((item) => (
              <div key={item.id} className="berita-card">
                <NewsCard berita={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PETA LOKASI ──────────────────────────────────── */}
      <section ref={petaRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Lokasi Kecamatan"
            subtitle="Kantor Kecamatan Mojolaban, Kabupaten Sukoharjo, Jawa Tengah"
            center
          />
          <div className="peta-box rounded-2xl overflow-hidden shadow-md border border-gray-200 h-80">
            <iframe
              title="Peta Kecamatan Mojolaban"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.16!2d110.862!3d-7.612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a158e5a7b8c55%3A0x0!2sKecamatan+Mojolaban!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-4">
            <a
              href="https://maps.google.com/?q=Kecamatan+Mojolaban+Sukoharjo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 text-sm font-medium hover:underline"
            >
              Buka di Google Maps <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
