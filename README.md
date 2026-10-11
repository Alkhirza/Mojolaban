# Website Kecamatan Mojolaban

Website resmi Kecamatan Mojolaban, Kabupaten Sukoharjo, Provinsi Jawa Tengah.

## Teknologi

- **React** + **Vite** (bundler)
- **Tailwind CSS v4** (styling)
- **React Router v6** (HashRouter)
- **Lucide React** (icons)

## Menjalankan Secara Lokal

```bash
# Install dependensi
npm install

# Jalankan dev server
npm run dev

# Build untuk produksi
npm run build

# Preview hasil build
npm run preview
```

## Struktur Folder

```
src/
├── components/     # Komponen reusable (Navbar, Footer, dll.)
├── data/           # Data statis (profil, wilayah, statistik, dll.)
└── pages/          # Halaman-halaman website
```

## Halaman

| Route | Halaman |
|---|---|
| `/` | Beranda |
| `/profil` | Profil Kecamatan |
| `/pemerintahan` | Struktur Pemerintahan |
| `/wilayah` | Data Wilayah |
| `/wilayah/:slug` | Detail Desa |
| `/statistik` | Data & Statistik |
| `/layanan` | Layanan Publik |
| `/berita` | Berita & Pengumuman |
| `/galeri` | Galeri |
| `/kontak` | Kontak |

## Mengisi Data

1. **Nama pejabat**: Edit `src/data/pejabat.js`
2. **Statistik penduduk**: Edit `src/data/statistik.js` (sumber: BPS Kab. Sukoharjo)
3. **Data desa**: Edit `src/data/wilayah.js`
4. **Foto**: Simpan di `public/images/` dan perbarui `src/data/galeri.js`

> ⚠️ Semua data yang bertanda `[Data menyusul]` harus diverifikasi ke sumber resmi sebelum dipublikasikan.

## Deploy

Deploy folder `dist/` ke:
- **Netlify**: drag & drop folder `dist/`
- **GitHub Pages**: gunakan `gh-pages` package
- **Vercel**: connect repository

## Lisensi

Website ini dibuat untuk keperluan akademis dan pemerintahan Kecamatan Mojolaban.
# Mojolaban
