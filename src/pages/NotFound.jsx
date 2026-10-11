import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-blue-100 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau URL tidak sesuai.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-900 text-white font-medium px-5 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Home size={16} />
            Ke Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium px-5 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}
