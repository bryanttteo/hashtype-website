import { useEffect, useRef, useState } from 'react'

// Slim sticky bar of jump links that appears under the header once the page's own
// jump links have scrolled away. Highlights the section currently on screen.

export default function JumpBar({ items, watchRef, label }) {
  const [shown, setShown] = useState(false)
  const [active, setActive] = useState(null)
  const barRef = useRef(null)

  useEffect(() => {
    const el = watchRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [watchRef])

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  // Keep the active chip in view inside the bar.
  useEffect(() => {
    const chip = barRef.current?.querySelector(`[data-id="${active}"]`)
    if (chip && shown) chip.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [active, shown])

  return (
    <nav className={`jump-bar ${shown ? 'is-shown' : ''}`} aria-label={label} aria-hidden={!shown}>
      <div className="container">
        <ul ref={barRef}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-id={item.id}
                className={active === item.id ? 'is-active' : ''}
                tabIndex={shown ? 0 : -1}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
