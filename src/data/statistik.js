// src/data/statistik.js
// Sumber: Open Data Kabupaten Sukoharjo, Disdukcapil dan Kecamatan Mojolaban.
export const statistik = {
  tahun: 2025,
  sumber: "Open Data Kabupaten Sukoharjo (Disdukcapil dan Kecamatan Mojolaban)",
  catatanSumber: "Penduduk, KK, dan agama: semester 2 tahun 2025. Pendidikan: semester 1 tahun 2025. Data pekerjaan belum dikelompokkan ke kategori yang ditampilkan.",

  penduduk: {
    total: 93349,
    laki: 46583,
    perempuan: 46766,
  },

  kk: 32126,

  kepadatan: 2628,

  luas: "35,52 km²",

  jumlahDesa: 15,

  mataPencaharian: [
    { kategori: "Pertanian", jumlah: null, deskripsi: "Sektor terbesar masyarakat pedesaan (>60% luas lahan adalah sawah irigasi teknis)." },
    { kategori: "Industri Pengolahan / Kerajinan", jumlah: null, deskripsi: "Sentra gamelan (Wirun & Laban), industri etanol/alkohol tradisional (Bekonang), batik, dan kerajinan kayu." },
    { kategori: "Perdagangan & Jasa", jumlah: null, deskripsi: "Terkonsentrasi di kawasan komersial Palur dan Pasar Bekonang." },
    { kategori: "Karyawan Swasta & ASN", jumlah: null, deskripsi: "Terutama di desa-desa yang berbatasan langsung dengan Kota Surakarta (Palur, Triyagan, Dukuh)." },
    { kategori: "Lainnya", jumlah: null, deskripsi: "Sektor lain yang belum terklasifikasi." },
  ],

  pendidikan: [
    { tingkat: "Tidak / Belum Sekolah", jumlah: 17068 },
    { tingkat: "Belum Tamat SD / Sederajat", jumlah: 9035 },
    { tingkat: "SD / Sederajat", jumlah: 16025 },
    { tingkat: "SMP / Sederajat", jumlah: 16981 },
    { tingkat: "SMA / Sederajat", jumlah: 25207 },
    { tingkat: "Diploma I / II", jumlah: 347 },
    { tingkat: "Akademi / Diploma III", jumlah: 2482 },
    { tingkat: "Diploma IV / Sarjana", jumlah: 5605 },
    { tingkat: "Strata II", jumlah: 438 },
    { tingkat: "Strata III", jumlah: 52 },
  ],

  agama: [
    { agama: "Islam", jumlah: 89697 },
    { agama: "Kristen", jumlah: 2125 },
    { agama: "Katolik", jumlah: 1413 },
    { agama: "Hindu", jumlah: 49 },
    { agama: "Buddha", jumlah: 56 },
    { agama: "Khonghucu", jumlah: 3 },
    { agama: "Kepercayaan", jumlah: 6 },
  ],
}
