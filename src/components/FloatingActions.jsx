import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContactIcon from './ContactIcon.jsx'
import { contact, contactUi, openLink, whatsappHref } from '../content/site.js'

// Bottom-right corner: WhatsApp (after the first screen, not on Contact) and
// back-to-top (only on long pages, after two screens). Back-to-top sits above.

export default function FloatingActions() {
  const { pathname } = useLocation()
  const [showChat, setShowChat] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const long = document.documentElement.scrollHeight > vh * 3
      setShowChat(y > vh * 0.8)
      setShowTop(long && y > vh * 2)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  const chatHidden = pathname === '/contact' || !showChat

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="float-actions">
      <button
        type="button"
        className={`float-btn float-top ${showTop ? 'is-shown' : ''}`}
        onClick={toTop}
        aria-label={contactUi.backToTop}
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
        <span className="float-tip">{contactUi.backToTop}</span>
      </button>
      <button
        type="button"
        className={`float-btn float-chat ${chatHidden ? '' : 'is-shown'}`}
        onClick={() => openLink(whatsappHref(contact.phone, contactUi.whatsappMessage), true)}
        aria-label={contactUi.whatsappFloat}
        tabIndex={chatHidden ? -1 : 0}
      >
        <ContactIcon name="whatsapp" />
        <span className="float-tip">{contactUi.whatsappFloat}</span>
      </button>
    </div>
  )
}
