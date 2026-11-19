import { useEffect, useState } from 'react'

// True when the visitor has asked their device to reduce motion.
export function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Tracks whether an element is on screen. With `once`, stays true after the first time.
export function useInView(ref, { threshold = 0.3, once = false, rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, once, rootMargin])
  return inView
}

// A counter that ticks every `ms` while `active`. Returns null when motion is reduced,
// so callers can render their finished, static state instead.
export function useTicker(active, ms, reduced) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!active || reduced) return
    const id = setInterval(() => setTick((t) => t + 1), ms)
    return () => clearInterval(id)
  }, [active, ms, reduced])
  return reduced ? null : tick
}
