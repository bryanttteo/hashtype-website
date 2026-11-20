import { useRef } from 'react'
import { useInView, useReducedMotion, useTicker } from './motion.js'

// Small animated interface sketches: what HashType would deliver for each industry.
// They carry no figures and are labelled as illustrations. Animation pauses when the
// sketch is off screen; with reduced motion each shows its finished state.

const RATE = { wildlife: 1300, yard: 1100, machines: 900, integrity: 1600, jobsheet: 900, camera: 1200, coldroom: 80 }

function Toast({ show, warn, children }) {
  return (
    <div className={`sk-toast ${warn ? 'is-warn' : ''} ${show ? 'is-shown' : ''}`} role="presentation">
      <span className="sk-dot" />
      <span>{children}</span>
    </div>
  )
}

/* Supply chain: containers identified one by one */
const FULL = [0, 1, 3, 4, 6, 8, 9, 10, 13, 14, 16, 17]
function Yard({ s, tick }) {
  const idx = tick === null ? 8 : tick % (FULL.length + 2)
  const ok = new Set(FULL.slice(0, Math.min(idx, FULL.length)))
  const scanning = tick !== null && idx < FULL.length ? FULL[idx] : -1
  return (
    <>
      <div className="sk-yard">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className={`sk-slot ${FULL.includes(i) ? 'is-full' : ''} ${ok.has(i) ? 'is-ok' : ''} ${scanning === i ? 'is-scan' : ''}`}
          />
        ))}
      </div>
      <Toast show={idx > 0}>{s.toast}</Toast>
    </>
  )
}

/* Manufacturing: one machine drifts into "watch" */
function Machines({ s, tick }) {
  const phase = tick === null ? 6 : tick % 9
  const watch = phase >= 4
  const widths = [46, 58, 38, Math.min(84, 36 + phase * 8)]
  return (
    <>
      <div className="sk-rows">
        {s.machines.map((name, i) => {
          const isWatch = i === 3 && watch
          return (
            <div className="sk-row sk-machine" key={name}>
              <span className="sk-name">{name}</span>
              <span className="sk-bar">
                <span className={isWatch ? 'is-watch' : ''} style={{ width: `${widths[i]}%` }} />
              </span>
              <span className={`sk-chip ${isWatch ? 'is-progress' : 'is-closed'}`}>
                {isWatch ? s.watch : s.normal}
              </span>
            </div>
          )
        })}
      </div>
      <Toast show={watch} warn>
        {s.toast}
      </Toast>
    </>
  )
}

/* Offshore & marine: findings move through to closed */
const ORDER = ['open', 'progress', 'closed']
const START = [2, 1, 0, 2]
function Integrity({ s, tick }) {
  const t = tick ?? 0
  const advance = [0, Math.floor(t / 2), Math.ceil(t / 2), 0]
  return (
    <div className="sk-rows">
      {s.assets.map((name, i) => {
        const state = ORDER[(START[i] + advance[i]) % 3]
        return (
          <div className="sk-row" key={name}>
            <span className="sk-name">{name}</span>
            <span className={`sk-chip is-${state}`}>{s.states[state]}</span>
          </div>
        )
      })}
    </div>
  )
}

/* Industrial services: a digital job sheet ticks itself off */
function JobSheet({ s, tick }) {
  const phase = tick === null ? 6 : tick % 8
  const done = Math.min(s.steps.length, phase)
  return (
    <>
      <ul className="sk-steps">
        {s.steps.map((step, i) => (
          <li key={step} className={i < done ? 'is-done' : ''}>
            <span className="sk-box" />
            {step}
          </li>
        ))}
      </ul>
      <Toast show={phase >= 5}>{s.toast}</Toast>
    </>
  )
}

/* Real estate & construction: camera spots a missing hard hat */
function Person({ x, hat, warn, label, showBox }) {
  return (
    <g className={`sk-person ${warn ? 'is-warn' : ''}`} style={{ '--x': `${x}px` }}>
      <g transform={`translate(${x} 0)`}>
        <circle cx="0" cy="70" r="9" className="sk-figure" />
        {hat && <path d="M-10 66a10 9 0 0 1 20 0z" className="sk-hat" />}
        <path d="M-14 118v-26a14 14 0 0 1 28 0v26z" className="sk-figure" />
        {showBox && (
          <>
            <rect x="-22" y="54" width="44" height="68" rx="3" className="sk-bbox" />
            <rect x="-22" y="40" width={label.length * 6.2 + 10} height="13" rx="2" className="sk-tag" />
            <text x="-17" y="50" className="sk-tag-text">
              {label}
            </text>
          </>
        )}
      </g>
    </g>
  )
}
function Camera({ s, tick }) {
  const phase = tick === null ? 3 : tick % 5
  return (
    <>
      <svg className={`sk-camera ${tick === null ? '' : 'is-moving'}`} viewBox="0 0 300 140" aria-hidden="true">
        <rect x="0.5" y="0.5" width="299" height="139" rx="6" className="sk-frame" />
        <path d="M0 122h300" className="sk-ground" />
        <path d="M12 12h14M12 12v14M288 12h-14M288 12v14M12 128h14M12 128v-14M288 128h-14M288 128v-14" className="sk-corner" />
        <circle cx="270" cy="22" r="3" className="sk-rec" />
        <Person x={70} hat label={s.ok} showBox={phase >= 1} />
        <Person x={150} hat label={s.ok} showBox={phase >= 1} />
        <Person x={228} warn label={s.missing} showBox={phase >= 1} />
      </svg>
      <Toast show={phase >= 2} warn>
        {s.toast}
      </Toast>
    </>
  )
}

/* Retail, F&B & hospitality: temperature crosses the safe limit */
function tempAt(x, t) {
  const spike = Math.exp(-Math.pow((x - 210) / 22, 2)) * 58 * (0.5 + 0.5 * Math.sin(t))
  return 82 + Math.sin(x / 18 + t) * 5 - spike
}
function ColdRoom({ s, tick }) {
  const t = tick === null ? Math.PI / 2 : tick * 0.035
  let peak = 200
  const pts = []
  for (let x = 0; x <= 300; x += 6) {
    const y = tempAt(x, t)
    peak = Math.min(peak, y)
    pts.push(`${x},${y.toFixed(1)}`)
  }
  return (
    <>
      <svg className="sk-chart" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="40" x2="300" y2="40" className="sk-limit" />
        <text x="296" y="34" textAnchor="end" className="sk-limit-text">
          {s.limit}
        </text>
        <polyline points={pts.join(' ')} className="sk-line" />
      </svg>
      <Toast show={peak < 40} warn>
        {s.toast}
      </Toast>
    </>
  )
}

/* Completed project: wildlife detection with automatic response */
function Wildlife({ s, tick }) {
  const phase = tick === null ? 4 : tick % 7
  const boxed = phase >= 1
  const acted = phase >= 2
  const logged = phase >= 3
  return (
    <>
      <svg className={`sk-camera ${tick === null ? '' : 'is-moving'}`} viewBox="0 0 300 140" aria-hidden="true">
        <rect x="0.5" y="0.5" width="299" height="139" rx="6" className="sk-frame" />
        <rect x="24" y="78" width="96" height="38" className="sk-wall" />
        <path d="M0 116h300" className="sk-ground" />
        <path d="M12 12h14M12 12v14M288 12h-14M288 12v14M12 128h14M12 128v-14M288 128h-14M288 128v-14" className="sk-corner" />
        <circle cx="270" cy="22" r="3" className="sk-rec" />
        {/* monkey sitting on the wall */}
        <g transform="translate(72 0)">
          <circle cx="0" cy="44" r="8" className="sk-animal-fill" />
          <circle cx="-8" cy="40" r="3.5" className="sk-animal-fill" />
          <circle cx="8" cy="40" r="3.5" className="sk-animal-fill" />
          <ellipse cx="0" cy="64" rx="10" ry="13" className="sk-animal-fill" />
          <path d="M9 72c14 4 18-10 9-16" className="sk-tail" />
          {boxed && (
            <g className="is-warn">
              <rect x="-18" y="30" width="40" height="50" rx="3" className="sk-bbox" />
              <rect x="-18" y="16" width={s.monkey.length * 6.2 + 10} height="13" rx="2" className="sk-tag" />
              <text x="-13" y="26" className="sk-tag-text">{s.monkey}</text>
            </g>
          )}
        </g>
        {/* wild boar at the edge */}
        <g transform="translate(212 0)">
          <ellipse cx="0" cy="98" rx="28" ry="13" className="sk-animal-fill" />
          <path d="M24 92l16 3-2 8-14 2z" className="sk-animal-fill" />
          <path d="M-12 84l-4-6M-6 84l2-7" className="sk-legs" />
          <path d="M-18 108v8M-8 109v7M8 109v7M18 108v8" className="sk-legs" />
          {boxed && (
            <>
              <rect x="-34" y="78" width="80" height="40" rx="3" className="sk-bbox" />
              <rect x="-34" y="64" width={s.boar.length * 6.2 + 10} height="13" rx="2" className="sk-tag" />
              <text x="-29" y="74" className="sk-tag-text">{s.boar}</text>
            </>
          )}
        </g>
        {acted && (
          <g className="sk-ripple">
            <circle cx="72" cy="56" r="30" />
            <circle cx="72" cy="56" r="44" />
          </g>
        )}
      </svg>
      <div className="sk-rows">
        <div className={`sk-row sk-log ${logged ? 'is-in' : ''}`}>
          <span className="sk-name">{s.monkey}</span>
          <span className="sk-chip is-progress">{s.deterrent}</span>
        </div>
        <div className={`sk-row sk-log ${logged ? 'is-in' : ''}`}>
          <span className="sk-name">{s.boar}</span>
          <span className="sk-chip is-closed">{s.alerted}</span>
        </div>
      </div>
      <Toast show={acted} warn>
        {s.toast}
      </Toast>
    </>
  )
}

const VIEWS = { wildlife: Wildlife, yard: Yard, machines: Machines, integrity: Integrity, jobsheet: JobSheet, camera: Camera, coldroom: ColdRoom }

export default function IndustrySketch({ sketch, label }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { threshold: 0.2 })
  const tick = useTicker(inView, RATE[sketch.type] ?? 1000, reduced)
  const View = VIEWS[sketch.type]
  if (!View) return null
  return (
    <div ref={ref} className="sketch" aria-hidden="true">
      <div className="sk-screen">
        <div className="sk-bar-top">
          <b>{sketch.title}</b>
          <span>{sketch.status}</span>
        </div>
        <View s={sketch} tick={tick} />
      </div>
      <span className="sk-illus">{label}</span>
    </div>
  )
}
