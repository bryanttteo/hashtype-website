import { useId } from 'react'

// Decorative circuit-trace graphic in the logo's mint-to-indigo gradient.
// Used where a photo has not been supplied yet. Purely decorative (aria-hidden).

function seeded(seedText) {
  let h = 2166136261
  for (const ch of seedText) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return ((h >>> 0) % 10000) / 10000
  }
}

export default function CircuitArt({ seed = 'hashtype', className = '' }) {
  const id = useId().replace(/:/g, '')
  const rand = seeded(seed)
  const W = 400
  const H = 260
  const step = 20
  const traces = []
  const nodes = []

  for (let i = 0; i < 14; i++) {
    let x = Math.round((rand() * W) / step) * step
    let y = Math.round((rand() * H) / step) * step
    const points = [[x, y]]
    const segments = 2 + Math.floor(rand() * 3)
    for (let s = 0; s < segments; s++) {
      const len = (2 + Math.floor(rand() * 5)) * step
      const dir = Math.floor(rand() * 4)
      if (dir === 0) x += len
      else if (dir === 1) x -= len
      else if (dir === 2) {
        x += len
        y += dir === 2 && rand() > 0.5 ? len : -len
      } else y += rand() > 0.5 ? len : -len
      x = Math.max(0, Math.min(W, x))
      y = Math.max(0, Math.min(H, y))
      points.push([x, y])
    }
    traces.push(points)
    nodes.push(points[points.length - 1])
  }

  return (
    <svg
      className={`circuit-art ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7EF0C1" />
          <stop offset="100%" stopColor="#5466AE" />
        </linearGradient>
        <radialGradient id={`r-${id}`} cx="70%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#4FB3A9" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#0D1013" />
      <rect width={W} height={H} fill={`url(#r-${id})`} />
      <g stroke={`url(#g-${id})`} strokeWidth="2.5" fill="none" strokeLinejoin="round" opacity="0.75">
        {traces.map((pts, i) => (
          <polyline key={i} points={pts.map((p) => p.join(',')).join(' ')} />
        ))}
      </g>
      <g fill="#0D1013" stroke={`url(#g-${id})`} strokeWidth="2.5">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" />
        ))}
      </g>
    </svg>
  )
}
