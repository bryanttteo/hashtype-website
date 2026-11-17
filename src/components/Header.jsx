import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import mark from '../assets/hashtype-mark-128.png'
import { brand, nav } from '../content/site.js'

export default function Header() {
  const [open, setOpen] = useState(false)

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${brand.name} home`}>
          <img src={mark} alt={brand.logoAlt} width="36" height="35" />
          <span>{brand.name}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`bars ${open ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav id="site-nav" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {/* Each link closes the mobile menu when tapped. */}
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="header-cta" onClick={() => setOpen(false)}>
            Book a demo
          </Link>
        </nav>
      </div>
    </header>
  )
}
