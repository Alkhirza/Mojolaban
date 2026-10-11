import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { wilayah } from '../data/wilayah'
import { MapPin, Users, ChevronRight } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const formatValue = (value, unit) => value == null
  ? 'Belum tersedia'
  : `${value.toLocaleString('id-ID')}${unit ? ` ${unit}` : ''}`

export default function Wilayah() {
  const gridRef  = useRef(null)
  const tableRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.desa-card', {
        y: 40, opacity: 0, scale: 0.96, duration: 0.5, stagger: 0.055, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
      gsap.from('.desa-row', {
        opacity: 0, x: -15, duration: 0.4, stagger: 0.04, ease: 'power2.out',
        scrollTrigger: { trigger: tableRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      <PageHeader
        title="Data Wilayah"
        subtitle={`Kecamatan Mojolaban terdiri dari ${wilayah.length} desa yang tersebar di berbagai penjuru wilayah`}
        breadcrumbs={[{ label: 'Data Wilayah' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle title="Daftar Desa" subtitle="Klik kartu untuk melihat detail masing-masing desa" />

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {wilayah.map((desa) => (
            <Link
              key={desa.slug}
              to={`/wilayah/${desa.slug}`}
              className="desa-card card-lift bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  {desa.nama.charAt(0)}
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{desa.jenis}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">
                {desa.jenis} {desa.nama}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{desa.deskripsi}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><MapPin size={11} />{formatValue(desa.luas, 'km²')}</span>
                <span className="flex items-center gap-1"><Users size={11} />{formatValue(desa.penduduk, 'jiwa')}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-medium">
                Lihat detail <ChevronRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        <SectionTitle title="Ringkasan Data Wilayah" />
        <div ref={tableRef} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-3 text-left font-semibold">No.</th>
                <th className="px-4 py-3 text-left font-semibold">Nama</th>
                <th className="px-4 py-3 text-left font-semibold">Jenis</th>
                <th className="px-4 py-3 text-left font-semibold">Luas</th>
                <th className="px-4 py-3 text-left font-semibold">Penduduk</th>
                <th className="px-4 py-3 text-left font-semibold">Kepala Desa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {wilayah.map((desa, i) => (
                <tr key={desa.slug} className="desa-row hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link to={`/wilayah/${desa.slug}`} className="hover:text-blue-700 hover:underline">{desa.nama}</Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{desa.jenis}</td>
                  <td className="px-4 py-3 text-gray-600">{formatValue(desa.luas, 'km²')}</td>
                  <td className="px-4 py-3 text-gray-600">{formatValue(desa.penduduk, 'jiwa')} <span className="text-xs text-gray-400">(2022)</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{desa.kepala ?? 'Belum tersedia'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 px-6 py-3 bg-gray-50 border-t border-gray-100">
            Penduduk: Open Data Kecamatan Mojolaban, Desember 2022. RW/RT: Open Data Kecamatan Mojolaban, 2025. Luas per desa dan nama kepala desa: Belum tersedia.
          </p>
        </div>
      </div>
    </div>
  )
}
