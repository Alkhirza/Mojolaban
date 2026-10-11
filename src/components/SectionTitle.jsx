import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SectionTitle – judul section dengan animasi scroll reveal
 */
export default function SectionTitle({ title, subtitle, center = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.st-line',     { scaleX: 0, duration: 0.4, ease: 'power2.out', transformOrigin: 'left',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } })
      gsap.from('.st-title',    { x: -20, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } })
      gsap.from('.st-subtitle', { y: 12, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } })
    }, ref)
    return () => ctx.revert()
  }, [title])

  return (
    <div ref={ref} className={`mb-8 ${center ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-2 ${center ? 'justify-center' : ''}`}>
        <div className="st-line h-1 w-8 rounded-full bg-blue-900" />
        <h2 className="st-title text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      {subtitle && (
        <p className={`st-subtitle text-gray-600 text-base md:text-lg mt-2 ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
