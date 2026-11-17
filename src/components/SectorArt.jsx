import { useId } from 'react'

// A single clean line icon per sector, on a quiet panel. Shown where a photo has
// not been supplied yet. Purely decorative (aria-hidden): the heading beside it
// already names the sector.

const icons = {
  // Stacked shipping containers
  logistics: (
    <>
      <rect x="10" y="40" width="28" height="16" rx="1.5" />
      <rect x="40" y="40" width="28" height="16" rx="1.5" />
      <rect x="25" y="22" width="28" height="16" rx="1.5" />
      <path d="M17 44v8M24 44v8M31 44v8M47 44v8M54 44v8M61 44v8M32 26v8M39 26v8M46 26v8" />
      <path d="M6 60h68" />
    </>
  ),
  // Factory with saw-tooth roof and chimney
  manufacturing: (
    <>
      <path d="M8 60V36l14 8V36l14 8V36l14 8V20h8v40" />
      <path d="M8 60h64" />
      <path d="M58 60V28h8v32" />
      <rect x="16" y="48" width="6" height="6" />
      <rect x="30" y="48" width="6" height="6" />
      <rect x="44" y="48" width="6" height="6" />
    </>
  ),
  // Vessel with bridge, on the water
  marine: (
    <>
      <path d="M10 44h60l-8 12H18z" />
      <path d="M22 44V34h22v10" />
      <path d="M28 34v-8h10v8" />
      <path d="M33 26v-6" />
      <path d="M50 44v-6h10v6" />
      <path d="M6 62c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2" />
    </>
  ),
  // Field job sheet with ticks
  services: (
    <>
      <rect x="20" y="14" width="40" height="50" rx="3" />
      <path d="M32 14v-3h16v3" />
      <path d="M28 28l3 3 6-6M42 28h10" />
      <path d="M28 40l3 3 6-6M42 40h10" />
      <path d="M28 52h4M42 52h10" />
    </>
  ),
  // Tower crane beside a rising building
  construction: (
    <>
      <path d="M18 62V22M24 62V22" />
      <path d="M18 60l6-7-6-7 6-7-6-7 6-7" />
      <path d="M21 22V12" />
      <path d="M8 22h58M21 12L9 22M21 12l39 10" />
      <rect x="8" y="22" width="7" height="5" />
      <path d="M54 22v10" />
      <rect x="50" y="32" width="8" height="5" />
      <rect x="38" y="44" width="22" height="18" />
      <path d="M43 50h4M51 50h4M43 56h4M51 56h4" />
      <path d="M10 62h58" />
    </>
  ),
  // Shopfront with awning
  fnb: (
    <>
      <path d="M12 30l4-14h48l4 14" />
      <path d="M12 30c0 4 3 6 7 6s7-2 7-6c0 4 3 6 7 6s7-2 7-6c0 4 3 6 7 6s7-2 7-6c0 4 3 6 7 6s7-2 7-6" />
      <path d="M16 36v26h48V36" />
      <path d="M28 62V46h12v16" />
      <rect x="46" y="46" width="12" height="9" />
      <path d="M10 62h60" />
    </>
  ),
  // Sensor chip with signal
  iot: (
    <>
      <rect x="24" y="30" width="28" height="28" rx="3" />
      <rect x="32" y="38" width="12" height="12" rx="1.5" />
      <path d="M30 30v-5M38 30v-5M46 30v-5M30 63v-5M38 63v-5M46 63v-5M24 36h-5M24 44h-5M24 52h-5M57 36h-5M57 44h-5M57 52h-5" />
      <path d="M56 22a10 10 0 0 1 6 6M58 14a20 20 0 0 1 12 12" />
    </>
  ),
}

export default function SectorArt({ sector }) {
  const id = useId().replace(/:/g, '')
  const icon = icons[sector]
  if (!icon) return null
  return (
    <div className="sector-art" aria-hidden="true">
      <svg viewBox="0 0 80 72" focusable="false">
        <defs>
          <linearGradient id={`sg-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="80" y2="72">
            <stop offset="0%" stopColor="#7EF0C1" />
            <stop offset="100%" stopColor="#5466AE" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke={`url(#sg-${id})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </g>
      </svg>
    </div>
  )
}
