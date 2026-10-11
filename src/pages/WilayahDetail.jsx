import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { wilayah } from '../data/wilayah'
import { MapPin, Users, ArrowLeft, Home } from 'lucide-react'

const formatValue = (value, unit) => value == null
  ? 'Belum tersedia'
  : `${value.toLocaleString('id-ID')}${unit ? ` ${unit}` : ''}`

export default function WilayahDetail() {
  const { slug } = useParams()
  const desa = wilayah.find((d) => d.slug === slug)

  if (!desa) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Desa tidak ditemukan</h2>
        <p className="text-gray-500 mb-6">Desa dengan ID "{slug}" tidak ada dalam data.</p>
        <Link to="/wilayah" className="text-blue-700 font-medium hover:underline flex items-center gap-2 justify-center">
          <ArrowLeft size={16} /> Kembali ke Data Wilayah
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={`${desa.jenis} ${desa.nama}`}
        subtitle={`Informasi ${desa.jenis} ${desa.nama}, Kecamatan Mojolaban`}
        breadcrumbs={[
          { label: 'Data Wilayah', to: '/wilayah' },
          { label: desa.nama },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { icon: <Home size={20} />, label: 'Jenis', value: desa.jenis },
            { icon: <MapPin size={20} />, label: 'Luas', value: formatValue(desa.luas, 'km²') },
            { icon: <Users size={20} />, label: 'Penduduk (2022)', value: formatValue(desa.penduduk, 'jiwa') },
            { icon: <Users size={20} />, label: 'RW (2025)', value: formatValue(desa.rw) },
            { icon: <Users size={20} />, label: 'RT (2025)', value: formatValue(desa.rt) },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Deskripsi */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-3">Tentang {desa.jenis} {desa.nama}</h2>
          <p className="text-gray-700 leading-relaxed">{desa.deskripsi}</p>
        </div>

        {/* Kepala Desa */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Kepala {desa.jenis}</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xl">
              {desa.nama.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{desa.kepala ?? 'Belum tersedia'}</p>
              <p className="text-gray-500 text-sm">Kepala {desa.jenis} {desa.nama}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <Link
          to="/wilayah"
          className="inline-flex items-center gap-2 text-blue-700 font-medium hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Data Wilayah
        </Link>
      </div>
    </div>
  )
}
