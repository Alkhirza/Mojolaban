import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

// Inline kontak data since it's simple enough
const kontakData = {
  alamat: "Jl. Veteran Perang Kemerdekaan No. 4, Mojolaban, Sukoharjo, Jawa Tengah 57554",
  telepon: "(0271) 611767",
  email: "kecamatanmojolaban@gmail.com",
  website: "https://www.ppid.mojolaban.sukoharjokab.go.id",
  mapsUrl: "https://maps.google.com/?q=Kecamatan+Mojolaban+Sukoharjo",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.16!2d110.862!3d-7.612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a158e5a7b8c55%3A0x0!2sKecamatan+Mojolaban!5e0!3m2!1sid!2sid!4v1",
  jamLayanan: [
    { hari: "Senin – Kamis", jam: "07.30 – 15.30 WIB" },
    { hari: "Jumat", jam: "07.30 – 11.30 WIB" },
    { hari: "Sabtu – Minggu", jam: "Tutup" },
  ],
  catatan: "Istirahat: 12.00 – 13.00 WIB (Senin–Kamis)",
}

export default function Kontak() {
  return (
    <div>
      <PageHeader
        title="Kontak"
        subtitle="Informasi kontak dan lokasi Kantor Kecamatan Mojolaban"
        breadcrumbs={[{ label: 'Kontak' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Informasi Kontak */}
          <div className="space-y-6">
            <SectionTitle title="Informasi Kontak" />

            {/* Kontak Detail */}
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin size={20} />,
                  label: 'Alamat',
                  value: kontakData.alamat,
                  color: 'bg-red-50 text-red-700',
                },
                {
                  icon: <Phone size={20} />,
                  label: 'Telepon',
                  value: kontakData.telepon,
                  color: 'bg-green-50 text-green-700',
                },
                {
                  icon: <Mail size={20} />,
                  label: 'Email',
                  value: kontakData.email,
                  color: 'bg-blue-50 text-blue-700',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Jam Layanan */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-blue-700" />
                Jam Pelayanan
              </h3>
              <div className="space-y-2">
                {kontakData.jamLayanan.map((j, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-600">{j.hari}</span>
                    <span className={`font-medium ${j.jam === 'Tutup' ? 'text-red-500' : 'text-gray-900'}`}>
                      {j.jam}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">{kontakData.catatan}</p>
            </div>

            {/* Tombol Maps */}
            <a
              href={kontakData.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-900 text-white font-medium px-5 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <MapPin size={16} />
              Buka di Google Maps
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Peta */}
          <div>
            <SectionTitle title="Lokasi di Peta" />
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-96 lg:h-full min-h-64">
              <iframe
                title="Peta Kantor Kecamatan Mojolaban"
                src={kontakData.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
