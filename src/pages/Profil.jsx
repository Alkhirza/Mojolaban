import { useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import { profil } from '../data/profil'
import { MapPin, Map, Compass, Home, LayoutGrid } from 'lucide-react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Profil() {
  const sejarahRef  = useRef(null)
  const geoRef      = useRef(null)
  const batasRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sejarah
      gsap.from('.sejarah-box', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sejarahRef.current, start: 'top 85%', toggleActions: 'play none none none' } })


      // Geo cards
      gsap.from('.geo-card', { y: 30, opacity: 0, scale: 0.96, duration: 0.5, stagger: 0.07, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: geoRef.current, start: 'top 85%', toggleActions: 'play none none none' } })

      // Batas wilayah rows
      gsap.from('.batas-row', { x: -30, opacity: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: batasRef.current, start: 'top 88%', toggleActions: 'play none none none' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      <PageHeader
        title="Profil Kecamatan"
        subtitle="Mengenal lebih dekat Kecamatan Mojolaban, Kabupaten Sukoharjo"
        breadcrumbs={[{ label: 'Profil' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Sejarah */}
        <section ref={sejarahRef}>
          <SectionTitle title="Sejarah Singkat" />
          <div className="sejarah-box bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{profil.sejarah}</p>
          </div>
        </section>


        {/* Letak Geografis */}
        <section ref={geoRef}>
          <SectionTitle title="Letak Geografis" subtitle="Posisi dan batas wilayah Kecamatan Mojolaban" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Map size={20} />, label: 'Luas Wilayah', value: profil.geografis.luas },
              { icon: <Compass size={20} />, label: 'Koordinat', value: profil.geografis.koordinat },
              { icon: <Home size={20} />, label: 'Ketinggian', value: profil.geografis.ketinggian },
              { icon: <LayoutGrid size={20} />, label: 'Jumlah Desa', value: `${profil.jumlahDesa} Desa` },
              { icon: <LayoutGrid size={20} />, label: 'Jumlah Dusun', value: `${profil.jumlahDusun}+ Dusun` },
              { icon: <MapPin size={20} />, label: 'Ibu Kota', value: profil.ibukota },
            ].map((item, i) => (
              <div key={i} className="geo-card card-lift bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Batas Wilayah */}
        <section ref={batasRef}>
          <SectionTitle title="Batas Wilayah" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Arah</th>
                  <th className="px-6 py-4 text-left font-semibold">Berbatasan Dengan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['⬆ Utara', profil.geografis.batasUtara],
                  ['⬇ Selatan', profil.geografis.batasSelatan],
                  ['⬅ Barat', profil.geografis.batasBarat],
                  ['➡ Timur', profil.geografis.batasTimur],
                ].map(([arah, batas]) => (
                  <tr key={arah} className="batas-row hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-700">{arah}</td>
                    <td className="px-6 py-4 text-gray-600">{batas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
