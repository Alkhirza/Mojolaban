import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * StatCard – kartu statistik animasi scroll reveal
 */
export default function StatCard({ icon, value, label, color = 'bg-blue-100 text-blue-900' }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 30, opacity: 0, scale: 0.95, duration: 0.55, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 card-lift"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm mt-0.5">{label}</p>
      </div>
    </div>
  )
}
