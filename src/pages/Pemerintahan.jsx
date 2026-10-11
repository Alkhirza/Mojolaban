import { useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { camat, pejabat, tupoksi } from '../data/pejabat'
import { User, Briefcase } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Pemerintahan() {
  const camatRef  = useRef(null)
  const tableRef  = useRef(null)
  const baganRef  = useRef(null)
  const tupoksiRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Camat card pop
      gsap.from('.camat-card', { scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: camatRef.current, start: 'top 85%', toggleActions: 'play none none none' } })

      // Table rows slide
      gsap.from('.pejabat-row', { x: -20, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: tableRef.current, start: 'top 85%', toggleActions: 'play none none none' } })

      // Org chart boxes
      gsap.from('.org-box', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: baganRef.current, start: 'top 85%', toggleActions: 'play none none none' } })

      // Tupoksi cards stagger
      gsap.from('.tupoksi-card', { x: -30, opacity: 0, duration: 0.5, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: tupoksiRef.current, start: 'top 85%', toggleActions: 'play none none none' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      <PageHeader
        title="Struktur Pemerintahan"
        subtitle="Organisasi dan perangkat Kecamatan Mojolaban"
        breadcrumbs={[{ label: 'Pemerintahan' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Camat */}
        <section ref={camatRef}>
          <SectionTitle title="Pimpinan Kecamatan" />
          <div className="flex justify-center">
            <div className="camat-card bg-white rounded-xl border-2 border-blue-900 shadow-lg p-8 text-center max-w-xs w-full">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-blue-900" />
              </div>
              <p className="font-bold text-xl text-gray-900">{camat.nama}</p>
              <p className="text-blue-700 font-medium mt-1">{camat.jabatan}</p>
              <p className="text-gray-400 text-xs mt-2">NIP: {camat.nip ?? 'Belum tersedia'}</p>
              <p className="text-gray-400 text-xs mt-1">Menjabat sejak Januari 2026</p>
            </div>
          </div>
        </section>

        {/* Perangkat */}
        <section ref={tableRef}>
          <SectionTitle title="Perangkat Kecamatan" subtitle="Daftar pejabat dan perangkat Kecamatan Mojolaban" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">No.</th>
                  <th className="px-6 py-4 text-left font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left font-semibold">Jabatan</th>
                  <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">NIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pejabat.map((p, i) => (
                  <tr key={i} className="pejabat-row hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{p.nama ?? 'Belum tersedia'}</td>
                    <td className="px-6 py-4 text-gray-600">{p.jabatan}</td>
                    <td className="px-6 py-4 text-gray-400 hidden md:table-cell">{p.nip ?? 'Belum tersedia'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 px-6 py-3 bg-gray-50 border-t border-gray-100">
              Nama dan NIP pejabat selain Camat: Belum tersedia pada sumber publik yang ditemukan.
            </p>
          </div>
        </section>

        {/* Bagan */}
        <section ref={baganRef}>
          <SectionTitle title="Bagan Organisasi" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="org-box bg-blue-900 text-white rounded-lg px-6 py-3 text-center">
                <p className="font-bold">CAMAT</p>
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />
              <div className="org-box bg-blue-700 text-white rounded-lg px-6 py-3 text-center">
                <p className="font-semibold text-sm">SEKRETARIS KECAMATAN</p>
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />
              <div className="relative w-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300" />
                <div className="pt-4 border-t border-gray-300 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {['Seksi Pemerintahan','Seksi Trantib','Seksi Pember-dayaan','Seksi Kesos','Seksi Yanmum'].map((seksi) => (
                    <div key={seksi} className="org-box bg-blue-50 border border-blue-200 rounded-lg px-3 py-3 text-center">
                      <p className="text-blue-900 text-xs font-semibold">{seksi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">* Bagan lengkap dalam format resmi dapat diperoleh di kantor kecamatan</p>
          </div>
        </section>

        {/* Tupoksi */}
        <section ref={tupoksiRef}>
          <SectionTitle title="Tugas Pokok & Fungsi" subtitle="Uraian tugas masing-masing unit di lingkungan Kecamatan Mojolaban" />
          <div className="space-y-4">
            {tupoksi.map((t, i) => (
              <div key={i} className="tupoksi-card card-lift bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.unit}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.tugas}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
