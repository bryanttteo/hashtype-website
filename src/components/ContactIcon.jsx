import { useId, useRef } from 'react'
import { useInView } from './motion.js'

// Line icons for the contact links, in the logo gradient. Each makes one small move
// when its link is hovered or focused. On touch screens (no hover) each plays once
// when it scrolls into view. Decorative: the link itself carries the label.

const icons = {
  // Envelope: flap lifts, letter slides out
  email: (
    <>
      <rect className="ci-letter" x="7" y="8" width="10" height="8" rx="1" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path className="ci-flap" d="M3.5 8l8.5 6 8.5-6" />
    </>
  ),
  // Handset: rings, with sound arcs
  phone: (
    <>
      <path
        className="ci-handset"
        d="M6 4h3l1.6 4.2-2 1.3a10 10 0 0 0 5.9 5.9l1.3-2L20 15v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2z"
      />
      <path className="ci-arc ci-arc1" d="M15 6.5a3 3 0 0 1 2.5 2.5" />
      <path className="ci-arc ci-arc2" d="M15 3a6.5 6.5 0 0 1 6 6" />
    </>
  ),
  // Chat bubble: typing dots appear
  whatsapp: (
    <>
      <path d="M4 5h16v11H10l-5 4v-4H4z" />
      <circle className="ci-dot ci-dot1" cx="8.5" cy="10.5" r="1" />
      <circle className="ci-dot ci-dot2" cx="12" cy="10.5" r="1" />
      <circle className="ci-dot ci-dot3" cx="15.5" cy="10.5" r="1" />
    </>
  ),
  // Map pin: hops and settles
  address: (
    <>
      <g className="ci-pin">
        <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
        <circle cx="12" cy="11" r="2.2" />
      </g>
      <path className="ci-shadow" d="M9 21.5h6" />
    </>
  ),
  // Profile card with a small network: the dots connect
  linkedin: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="10" r="2" />
      <path d="M5.5 16.5a3 3 0 0 1 6 0" />
      <path className="ci-link" pathLength="1" d="M15 9l3 4-4 2.5" />
      <circle className="ci-node" cx="15" cy="9" r="1.2" />
      <circle className="ci-node" cx="18" cy="13" r="1.2" />
      <circle className="ci-node" cx="14" cy="15.5" r="1.2" />
    </>
  ),
}

export default function ContactIcon({ name }) {
  const ref = useRef(null)
  const id = useId().replace(/:/g, '')
  const seen = useInView(ref, { threshold: 0.6, once: true })
  if (!icons[name]) return null
  return (
    <svg
      ref={ref}
      className={`ci ci-${name} ${seen ? 'is-seen' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`ci-${id}`} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#7EF0C1" />
          <stop offset="100%" stopColor="#5466AE" />
        </linearGradient>
      </defs>
      <g stroke={`url(#ci-${id})`}>{icons[name]}</g>
    </svg>
  )
}
