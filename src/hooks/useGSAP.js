import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animate elements into view when they enter the viewport.
 * @param {string} selector – CSS selector for target elements inside containerRef
 * @param {object} fromVars  – gsap.from() vars  (default: fade + slide up)
 * @param {object} options   – ScrollTrigger options override
 * @returns containerRef – attach to the wrapper element
 */
export function useScrollReveal(selector = '[data-reveal]', fromVars = {}, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll(selector)
      if (!targets?.length) return

      targets.forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.08,
          ...fromVars,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            ...options,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}

/**
 * Stagger animation for a list of children.
 * @returns containerRef
 */
export function useStaggerReveal(selector = '[data-stagger]', fromVars = {}, stagger = 0.1) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll(selector)
      if (!targets?.length) return

      gsap.from(targets, {
        y: 50,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger,
        ...fromVars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}

/**
 * Animate a single ref element on mount (no scroll trigger).
 */
export function useMountAnimation(fromVars = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const anim = gsap.from(ref.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...fromVars,
    })
    return () => anim.kill()
  }, [])

  return ref
}

export { gsap, ScrollTrigger }
