import { useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { statistik } from '../data/statistik'
import { Users, Home, MapPin, AlertCircle } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function DataBar({ label, value, max, color = 'bg-blue-700' }) {
  const available = Number.isFinite(value)
  const pct = available && max > 0 ? Math.round((value / max) * 100) : 0
  const barRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bar-fill', { scaleX: 0, duration: 0.8, ease: 'power3.out', transformOrigin: 'left',
        scrollTrigger: { trigger: barRef.current, start: 'top 90%', toggleActions: 'play none none none' } })
    }, barRef)
    return () => ctx.revert()
  }, [pct])

  return (
    <div ref={barRef} className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500 font-medium">{available ? value.toLocaleString('id-ID') : 'Belum tersedia'}</span>
      </div>
      {available && <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`bar-fill h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>}
    </div>
  )
}

export default function Statistik() {
  const cardsRef   = useRef(null)
  const chartsRef  = useRef(null)
  const wilayahRef = useRef(null)

  const totalMP    = statistik.mataPencaharian.reduce((total, item) => total + (item.jumlah ?? 0), 0)
  const totalPend  = statistik.pendidikan.reduce((total, item) => total + (item.jumlah ?? 0), 0)
  const totalAgama = statistik.agama.reduce((total, item) => total + (item.jumlah ?? 0), 0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-summary-card', { y: 35, opacity: 0, scale: 0.95, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none none' } })

      gsap.from('.chart-panel', { y: 40, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: chartsRef.current, start: 'top 85%', toggleActions: 'play none none none' } })

      gsap.from('.wilayah-card', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: wilayahRef.current, start: 'top 88%', toggleActions: 'play none none none' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      <PageHeader
        title="Data & Statistik"
        subtitle="Data kependudukan dan statistik wilayah Kecamatan Mojolaban"
        breadcrumbs={[{ label: 'Statistik' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Catatan */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 mb-1">Catatan Data</p>
            <p className="text-amber-700 text-sm">
              {statistik.catatanSumber} Sumber: <strong>{statistik.sumber}</strong>
            </p>
          </div>
        </div>

        {/* Ringkasan */}
        <section>
          <SectionTitle title="Ringkasan Kependudukan" />
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Penduduk (2025)', value: statistik.penduduk.total.toLocaleString('id-ID'), color: 'bg-blue-50 text-blue-900' },
              { label: 'Laki-laki (2025)', value: statistik.penduduk.laki.toLocaleString('id-ID'), color: 'bg-sky-50 text-sky-800' },
              { label: 'Perempuan (2025)', value: statistik.penduduk.perempuan.toLocaleString('id-ID'), color: 'bg-rose-50 text-rose-800' },
              { label: 'Kepala Keluarga (2025)', value: statistik.kk.toLocaleString('id-ID'), color: 'bg-green-50 text-green-800' },
            ].map((item, i) => (
              <div key={i} className={`stat-summary-card bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  {i < 3 ? <Users size={22} /> : <Home size={22} />}
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{item.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Charts */}
        <div ref={chartsRef} className="grid md:grid-cols-3 gap-8">
          <section className="chart-panel bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5">Mata Pencaharian</h3>
            {statistik.mataPencaharian.map((mp, i) => (
              <DataBar key={i} label={mp.kategori} value={mp.jumlah} max={totalMP} color="bg-blue-700" />
            ))}
            <p className="text-xs text-gray-400 mt-3">Data pekerjaan tersedia dengan kategori terperinci; belum tersedia dalam pengelompokan ringkas ini.</p>
          </section>

          <section className="chart-panel bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5">Tingkat Pendidikan</h3>
            {statistik.pendidikan.map((p, i) => (
              <DataBar key={i} label={p.tingkat} value={p.jumlah} max={totalPend} color="bg-green-600" />
            ))}
            <p className="text-xs text-gray-400 mt-3">Sumber: Disdukcapil, semester 1 tahun 2025.</p>
          </section>

          <section className="chart-panel bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5">Agama</h3>
            {statistik.agama.map((a, i) => (
              <DataBar key={i} label={a.agama} value={a.jumlah} max={totalAgama} color="bg-purple-600" />
            ))}
            <p className="text-xs text-gray-400 mt-3">Sumber: Disdukcapil, semester 2 tahun 2025.</p>
          </section>
        </div>

        {/* Wilayah */}
        <section>
          <SectionTitle title="Data Wilayah" />
          <div ref={wilayahRef} className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Luas Total', value: statistik.luas },
              { label: 'Kepadatan Penduduk', value: statistik.kepadatan ?? 'Belum tersedia' },
              { label: 'Jumlah Desa', value: `${statistik.jumlahDesa} Desa` },
            ].map((item, i) => (
              <div key={i} className="wilayah-card card-lift bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
