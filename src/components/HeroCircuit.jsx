import { useEffect, useRef } from 'react'

// Home hero background: three depths of circuit traces in the logo's mint-to-indigo
// gradient. Layers move at different speeds as the page scrolls (and, with a mouse,
// as the pointer moves), and a mint signal pulse runs along a trace now and then.
// With reduced motion it draws one still frame. Purely decorative.

const MINT = [126, 240, 193]
const INDIGO = [84, 102, 174]
const mix = (t, a) =>
  `rgba(${MINT.map((m, i) => Math.round(m + (INDIGO[i] - m) * t)).join(',')},${a})`

function seeded(seed) {
  let h = seed >>> 0 || 1
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return ((h >>> 0) % 100000) / 100000
  }
}

const LAYERS = [
  { depth: 0.25, alpha: 0.16, width: 1, density: 18000 },
  { depth: 0.55, alpha: 0.3, width: 1.3, density: 18000 },
  { depth: 1, alpha: 0.6, width: 1.8, density: 26000 },
]

function buildLayers(w, h) {
  const step = 24
  return LAYERS.map((layer, li) => {
    const rand = seeded(97 + li * 31)
    const H = h * 1.8
    const count = Math.round((w * H) / layer.density)
    const traces = []
    for (let i = 0; i < count; i++) {
      let x = Math.round((rand() * w) / step) * step
      let y = Math.round((rand() * H) / step) * step - h * 0.4
      const pts = [[x, y]]
      const segs = 2 + Math.floor(rand() * 3)
      for (let k = 0; k < segs; k++) {
        const len = (2 + Math.floor(rand() * 4)) * step
        const dir = Math.floor(rand() * 3)
        if (dir === 0) x += len
        else if (dir === 1) {
          x += len
          y += rand() > 0.5 ? len : -len
        } else y += rand() > 0.5 ? len : -len
        pts.push([x, y])
      }
      let length = 0
      for (let k = 1; k < pts.length; k++) {
        length += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1])
      }
      traces.push({ pts, length })
    }
    return { ...layer, traces }
  })
}

function pointAlong(trace, d) {
  const p = trace.pts
  for (let k = 1; k < p.length; k++) {
    const seg = Math.hypot(p[k][0] - p[k - 1][0], p[k][1] - p[k - 1][1])
    if (d <= seg) {
      const t = d / seg
      return [p[k - 1][0] + (p[k][0] - p[k - 1][0]) * t, p[k - 1][1] + (p[k][1] - p[k - 1][1]) * t]
    }
    d -= seg
  }
  return p[p.length - 1]
}

export default function HeroCircuit({ className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const hero = wrap.parentElement
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.matchMedia('(hover: none)').matches
    // Lighter parallax on phones and tablets.
    const strength = touch ? 0.5 : 1

    let w = 0
    let h = 0
    let dpr = 1
    let layers = []
    let pulses = []
    let nextPulse = 0
    let visible = true
    let raf = 0
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

    function resize() {
      const r = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      layers = buildLayers(w, h)
      pulses = []
      if (reduced) draw(performance.now())
    }

    function draw(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const r = hero.getBoundingClientRect()
      const progress = reduced ? 0 : Math.max(0, -r.top / Math.max(1, r.height))
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      const mx = reduced ? 0 : pointer.x - 0.5
      const my = reduced ? 0 : pointer.y - 0.5

      layers.forEach((layer, li) => {
        const oy = (-progress * 140 * layer.depth + my * -18 * layer.depth) * strength
        const ox = mx * -24 * layer.depth * strength
        ctx.save()
        ctx.translate(ox, oy)
        ctx.lineWidth = layer.width
        ctx.lineJoin = 'round'
        layer.traces.forEach((tr) => {
          const t = Math.min(1, Math.max(0, tr.pts[0][0] / w))
          ctx.strokeStyle = mix(t, layer.alpha)
          ctx.beginPath()
          tr.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
          ctx.stroke()
          if (li === 2) {
            const [ex, ey] = tr.pts[tr.pts.length - 1]
            ctx.fillStyle = '#000'
            ctx.beginPath()
            ctx.arc(ex, ey, 3.2, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
          }
        })

        if (li === 2 && !reduced) {
          if (now > nextPulse && layer.traces.length) {
            const tr = layer.traces[Math.floor(Math.random() * layer.traces.length)]
            pulses.push({ tr, start: now, dur: 1400 + Math.random() * 900 })
            nextPulse = now + 700 + Math.random() * 900
          }
          pulses = pulses.filter((p) => now - p.start < p.dur)
          pulses.forEach((p) => {
            const f = (now - p.start) / p.dur
            for (let k = 0; k < 8; k++) {
              const [x, y] = pointAlong(p.tr, Math.max(0, f * p.tr.length - k * 6))
              ctx.fillStyle = `rgba(126,240,193,${(1 - k / 8) * 0.9})`
              ctx.beginPath()
              ctx.arc(x, y, k === 0 ? 2.6 : 1.8, 0, Math.PI * 2)
              ctx.fill()
            }
          })
        }
        ctx.restore()
      })
    }

    function loop(now) {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    const onPointer = (e) => {
      if (e.pointerType !== 'mouse') return
      const r = hero.getBoundingClientRect()
      pointer.tx = (e.clientX - r.left) / r.width
      pointer.ty = (e.clientY - r.top) / r.height
    }
    const onLeave = () => {
      pointer.tx = 0.5
      pointer.ty = 0.5
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(wrap)
    resize()

    if (!reduced) {
      hero.addEventListener('pointermove', onPointer)
      hero.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      hero.removeEventListener('pointermove', onPointer)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className={`hero-circuit ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
