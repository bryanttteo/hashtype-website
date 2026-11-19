import { useEffect, useId, useRef, useState } from 'react'
import { useInView, useReducedMotion } from './motion.js'

// Animated line icon for each solution. Draws itself once when scrolled into view,
// plays its signature move once, and replays the move on hover. Decorative only:
// the solution's heading sits right beside it.

const d = (i) => ({ className: 'd', pathLength: 1, style: { '--i': i } })

const icons = {
  // App window whose modules slot into place
  bespoke: (
    <>
      <rect {...d(0)} x="10" y="12" width="60" height="48" rx="4" />
      <path {...d(1)} d="M10 22h60M16 17h0M21 17h0M26 17h0" />
      <rect {...d(2)} className="d m-mod1" x="16" y="28" width="20" height="26" rx="2" />
      <rect {...d(3)} className="d m-mod2" x="40" y="28" width="24" height="11" rx="2" />
      <rect {...d(4)} className="d m-mod3" x="40" y="43" width="24" height="11" rx="2" />
    </>
  ),
  // Paper form slides into a tablet; sync arrows turn
  'digital-enablement': (
    <>
      <g className="m-sheet">
        <path {...d(0)} d="M8 18h16l6 6v28H8z" />
        <path {...d(1)} d="M24 18v6h6M12 32h12M12 38h12M12 44h8" />
      </g>
      <rect {...d(2)} x="40" y="14" width="32" height="44" rx="4" />
      <path {...d(3)} d="M53 53h6M46 24h20M46 31h20M46 38h14" />
      <g className="m-sync">
        <path {...d(4)} d="M28 62a6 6 0 0 1 10-4M38 54v4h-4" />
      </g>
    </>
  ),
  // Sensor chip with signal waves
  iot: (
    <>
      <rect {...d(0)} x="18" y="26" width="28" height="28" rx="3" />
      <rect {...d(1)} x="26" y="34" width="12" height="12" rx="1.5" />
      <path
        {...d(2)}
        d="M24 26v-5M32 26v-5M40 26v-5M24 59v-5M32 59v-5M40 59v-5M18 32h-5M18 40h-5M18 48h-5M51 32h-5M51 40h-5M51 48h-5"
      />
      <path {...d(3)} className="d m-wave1" d="M52 20a8 8 0 0 1 5 5" />
      <path {...d(4)} className="d m-wave2" d="M54 13a16 16 0 0 1 11 11" />
      <path {...d(5)} className="d m-wave3" d="M56 6a24 24 0 0 1 17 17" />
    </>
  ),
  // Camera whose scan box sweeps, then locks onto a target
  'vision-ai': (
    <>
      <path {...d(0)} d="M8 22h10l4-6h14l4 6h10v30H8z" />
      <circle {...d(1)} cx="29" cy="37" r="9" />
      <circle {...d(2)} cx="29" cy="37" r="3.5" />
      <circle className="m-target" cx="64" cy="40" r="3" />
      <g className="m-scan">
        <path {...d(3)} d="M57 33h-3v3M71 33h3v3M57 47h-3v-3M71 47h3v-3" />
      </g>
    </>
  ),
  // Work moves step to step, then pauses for a person to approve
  'agentic-automation': (
    <>
      <path {...d(0)} d="M20 36h14M46 36h14" />
      <rect {...d(1)} x="6" y="28" width="14" height="16" rx="3" />
      <rect {...d(2)} x="33" y="28" width="14" height="16" rx="3" />
      <circle {...d(3)} cx="67" cy="36" r="8" />
      <path className="m-check" d="M63 36l3 3 5-6" />
      <circle className="m-dot" cx="13" cy="36" r="2.6" />
      <path {...d(4)} d="M67 52v6M62 62h10" />
    </>
  ),
}

export default function SolutionIcon({ icon }) {
  const ref = useRef(null)
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const seen = useInView(ref, { threshold: 0.4, once: true })
  const [phase, setPhase] = useState('pending') // pending → drawn → done

  useEffect(() => {
    if (!seen || reduced) return
    const toDrawn = setTimeout(() => setPhase('drawn'), 0)
    // After drawing, play the signature move once, then rest.
    const toLive = setTimeout(() => setPhase('live'), 1500)
    const toDone = setTimeout(() => setPhase('done'), 1500 + 3300)
    return () => [toDrawn, toLive, toDone].forEach(clearTimeout)
  }, [seen, reduced])

  if (!icons[icon]) return null
  const state = reduced ? 'is-static' : seen ? `is-${phase}` : 'is-pending'

  return (
    <div ref={ref} className={`sol-icon ${state}`} aria-hidden="true">
      <svg viewBox="0 0 80 72" focusable="false">
        <defs>
          <linearGradient id={`sol-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="80" y2="72">
            <stop offset="0%" stopColor="#7EF0C1" />
            <stop offset="100%" stopColor="#5466AE" />
          </linearGradient>
        </defs>
        <g className="ic" stroke={`url(#sol-${id})`}>
          {icons[icon]}
        </g>
      </svg>
    </div>
  )
}
