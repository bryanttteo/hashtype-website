import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Site-wide background: three depths of circuit traces in the logo's mint-to-indigo
// gradient, fixed behind every page. Full strength at the top of the page (behind the
// hero or page intro), fading to a faint, slower layer as you scroll down. Layers move
// at different speeds with the scroll (and, with a mouse, the pointer), and a mint
// signal pulse runs along a trace now and then. With reduced motion the traces hold
// still and only redraw on scroll. Purely decorative.

const MINT = [126, 240, 193]
const INDIGO = [84, 102, 174]
const mix = (t, a) =>
  `rgba(${MINT.map((m, i) => Math.round(m + (INDIGO[i] - m) * t)).join(',')},${a})`

// How faint the traces get once you are past the top section (1 = full strength).
const FAINT = 0.28
// Other pages' intros are short, so text sits on the traces sooner: start them lower.
const INTRO_PEAK = 0.65

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

// The pattern is a tile two screens tall that repeats down the page.
function buildLayers(w, tile, sparse) {
  const step = 24
  return LAYERS.map((layer, li) => {
    const rand = seeded(97 + li * 31)
    const count = Math.round(((w * tile) / layer.density) * (sparse ? 0.7 : 1))
    const traces = []
    for (let i = 0; i < count; i++) {
      let x = Math.round((rand() * w) / step) * step
      let y = Math.round((rand() * tile) / step) * step
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

export default function SiteCircuit() {
  const canvasRef = useRef(null)
  const redrawRef = useRef(() => {})
  const { pathname } = useLocation()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.matchMedia('(hover: none)').matches
    // Lighter pointer parallax on phones and tablets.
    const sway = touch ? 0.5 : 1

    let w = 0
    let h = 0
    let tile = 0
    let dpr = 1
    let layers = []
    let pulses = []
    let nextPulse = 0
    let raf = 0
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

    // The page's top section: the Home hero or another page's intro.
    const topSection = () => document.querySelector('main > section:first-child')

    function strength() {
      const top = topSection()
      const span = Math.max(top ? top.offsetHeight : 0, h * 0.7)
      const peak = top && top.classList.contains('hero') ? 1 : INTRO_PEAK
      const t = Math.min(1, Math.max(0, (window.scrollY - span * 0.35) / (span * 0.9)))
      return peak - t * (peak - FAINT)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      tile = Math.ceil((h * 2) / 24) * 24
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      layers = buildLayers(w, tile, touch)
      pulses = []
      draw(performance.now())
    }

    function draw(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const k = strength()
      const scroll = reduced ? 0 : window.scrollY
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      const mx = reduced ? 0 : pointer.x - 0.5
      const my = reduced ? 0 : pointer.y - 0.5

      layers.forEach((layer, li) => {
        // Nearer layers scroll faster, which gives the depth.
        const speed = 0.12 + layer.depth * 0.28
        const off = -((((scroll * speed) % tile) + tile) % tile)
        const ox = mx * -24 * layer.depth * sway
        const oy = my * -16 * layer.depth * sway
        ctx.lineWidth = layer.width
        ctx.lineJoin = 'round'
        for (const base of [off, off + tile]) {
          if (base > h || base + tile < 0) continue
          ctx.save()
          ctx.translate(ox, base + oy)
          layer.traces.forEach((tr) => {
            const t = Math.min(1, Math.max(0, tr.pts[0][0] / w))
            ctx.strokeStyle = mix(t, layer.alpha * k)
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
            pulses.forEach((p) => {
              const f = (now - p.start) / p.dur
              for (let j = 0; j < 8; j++) {
                const [x, y] = pointAlong(p.tr, Math.max(0, f * p.tr.length - j * 6))
                ctx.fillStyle = `rgba(126,240,193,${(1 - j / 8) * 0.9 * Math.max(0.35, k)})`
                ctx.beginPath()
                ctx.arc(x, y, j === 0 ? 2.6 : 1.8, 0, Math.PI * 2)
                ctx.fill()
              }
            })
          }
          ctx.restore()
        }
      })

      // Keep the top section's headline readable: fade the traces out towards the left,
      // where the text sits, as the hero always did.
      const top = topSection()
      if (top) {
        const r = top.getBoundingClientRect()
        if (r.bottom > 0) {
          const g = ctx.createLinearGradient(0, 0, w, 0)
          g.addColorStop(0, 'rgba(0,0,0,1)')
          g.addColorStop(0.4, 'rgba(0,0,0,0.84)')
          g.addColorStop(1, 'rgba(0,0,0,0.2)')
          ctx.globalCompositeOperation = 'destination-out'
          ctx.fillStyle = g
          ctx.fillRect(0, Math.max(0, r.top), w, Math.min(h, r.bottom) - Math.max(0, r.top))
          ctx.globalCompositeOperation = 'source-over'
        }
      }

      if (!reduced && layers[2]) {
        // Pulses: frequent at the top, rarer once the traces are faint.
        if (now > nextPulse && layers[2].traces.length) {
          const tr = layers[2].traces[Math.floor(Math.random() * layers[2].traces.length)]
          pulses.push({ tr, start: now, dur: 1400 + Math.random() * 900 })
          nextPulse = now + (700 + (1 - k) * 4000) * (0.6 + Math.random() * 0.8)
        }
        pulses = pulses.filter((p) => now - p.start < p.dur)
      }
    }

    function loop(now) {
      if (!document.hidden) draw(now)
      raf = requestAnimationFrame(loop)
    }

    const onPointer = (e) => {
      if (e.pointerType !== 'mouse') return
      pointer.tx = e.clientX / Math.max(1, w)
      pointer.ty = e.clientY / Math.max(1, h)
    }
    const onScroll = () => draw(performance.now())
    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 120)
    }

    redrawRef.current = () => draw(performance.now())
    resize()
    window.addEventListener('resize', onResize)
    if (reduced) {
      window.addEventListener('scroll', onScroll, { passive: true })
    } else {
      window.addEventListener('pointermove', onPointer)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  // A new page has a different top section: redraw once it has rendered.
  useEffect(() => {
    const id = requestAnimationFrame(() => redrawRef.current())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return <canvas ref={canvasRef} className="site-circuit" aria-hidden="true" />
}
