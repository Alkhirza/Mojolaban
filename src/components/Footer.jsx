import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-sm">
                MJL
              </div>
              <div>
                <p className="font-bold text-white">Kec. Mojolaban</p>
                <p className="text-blue-300 text-xs">Kab. Sukoharjo</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Website resmi Kecamatan Mojolaban, Kabupaten Sukoharjo, Provinsi Jawa Tengah.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              {[
                ['/', 'Beranda'],
                ['/profil', 'Profil Kecamatan'],
                ['/pemerintahan', 'Pemerintahan'],
                ['/wilayah', 'Data Wilayah'],
                ['/statistik', 'Statistik'],
                ['/layanan', 'Layanan Publik'],
                ['/berita', 'Berita'],
                ['/galeri', 'Galeri'],
                ['/kontak', 'Kontak'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="shrink-0 mt-0.5 text-blue-400" />
                <span>Jl. Veteran Perang Kemerdekaan No. 4, Mojolaban, Sukoharjo, Jawa Tengah 57554</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-blue-400" />
                <span>(0271) 611767</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-blue-400" />
                <span>kecamatanmojolaban@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Jam Layanan */}
          <div>
            <h3 className="font-semibold text-white mb-4">Jam Layanan</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <Clock size={15} className="shrink-0 mt-0.5 text-blue-400" />
                <div>
                  <p>Senin – Kamis</p>
                  <p className="text-white font-medium">07.30 – 15.30 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="shrink-0 mt-0.5 text-blue-400" />
                <div>
                  <p>Jumat</p>
                  <p className="text-white font-medium">07.30 – 11.30 WIB</p>
                </div>
              </li>
              <li className="text-blue-300 text-xs mt-2">
                Sabtu – Minggu: Tutup
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-400">
          <p>© {new Date().getFullYear()} Kecamatan Mojolaban – Kabupaten Sukoharjo. Semua hak cipta dilindungi.</p>
          <p>Dibangun dengan React + Vite + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
