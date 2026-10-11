import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { layanan, jamLayanan } from '../data/layanan'
import { Clock, CheckCircle, ChevronDown, ChevronUp, Banknote } from 'lucide-react'

function LayananCard({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center text-lg font-bold shrink-0">
          {item.nama.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-gray-900">{item.nama}</h3>
            {open ? <ChevronUp size={18} className="text-gray-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{item.kategori}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={11} /> {item.waktu}
            </span>
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <Banknote size={11} /> {item.biaya}
            </span>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">Syarat Dokumen</h4>
              <ul className="space-y-1.5">
                {item.syarat.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">Alur Pelayanan</h4>
              <ol className="space-y-1.5">
                {item.alur.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {a}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center gap-4 text-sm flex-wrap">
            <span className="text-gray-500">Loket: <strong className="text-gray-700">{item.loket}</strong></span>
            <span className="text-gray-500">Waktu: <strong className="text-gray-700">{item.waktu}</strong></span>
            <span className="text-gray-500">Biaya: <strong className="text-green-600">{item.biaya}</strong></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Layanan() {
  return (
    <div>
      <PageHeader
        title="Layanan Publik"
        subtitle="Informasi layanan administrasi yang tersedia di Kantor Kecamatan Mojolaban"
        breadcrumbs={[{ label: 'Layanan Publik' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Jam Layanan */}
        <div className="bg-blue-900 text-white rounded-2xl p-6 md:p-8">
          <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Clock size={20} />
            Jam Pelayanan
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-blue-200 mb-1">Senin – Kamis</p>
              <p className="font-bold text-lg">{jamLayanan.senin_kamis}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-blue-200 mb-1">Jumat</p>
              <p className="font-bold text-lg">{jamLayanan.jumat}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-blue-200 mb-1">Sabtu – Minggu</p>
              <p className="font-bold text-lg">{jamLayanan.sabtu_minggu}</p>
            </div>
          </div>
          <p className="text-blue-200 text-xs mt-3">{jamLayanan.catatan}</p>
        </div>

        {/* Daftar Layanan */}
        <section>
          <SectionTitle
            title="Daftar Layanan"
            subtitle="Klik layanan untuk melihat syarat dan alur pelayanan"
          />
          <div className="space-y-3">
            {layanan.map((item) => (
              <LayananCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Catatan */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-sm text-gray-600">
          <p className="font-semibold text-gray-800 mb-2">Informasi Penting</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Pastikan seluruh berkas persyaratan sudah lengkap sebelum datang ke kantor.</li>
            <li>Untuk layanan yang memerlukan tanda tangan pejabat, harap hadir langsung.</li>
            <li>Hubungi kantor kecamatan untuk informasi lebih lanjut atau jika ada perubahan persyaratan.</li>
            <li>Seluruh layanan di kantor kecamatan tidak dipungut biaya (gratis).</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
