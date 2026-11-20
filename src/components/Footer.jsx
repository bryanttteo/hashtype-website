import { Link } from 'react-router-dom'
import mark from '../assets/hashtype-mark-128.png'
import ContactIcon from './ContactIcon.jsx'
import { brand, contact, contactUi, nav, openLink, telHref, whatsappHref } from '../content/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand" aria-label={`${brand.wordmark} home`}>
            <img src={mark} alt={brand.logoAlt} width="32" height="31" />
            <span>{brand.wordmark}</span>
          </Link>
          <p>{brand.description}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer-links">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons only: the email and number are built at the moment of the click. */}
        <ul className="footer-icons">
          <li>
            <button type="button" className="c-link" onClick={() => openLink(`mailto:${contact.emailEnquiries}`)}>
              <ContactIcon name="email" />
              <span>{contactUi.email}</span>
            </button>
          </li>
          <li>
            <button type="button" className="c-link" onClick={() => openLink(telHref(contact.phone))}>
              <ContactIcon name="phone" />
              <span>{contactUi.call}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="c-link"
              onClick={() => openLink(whatsappHref(contact.phone, contactUi.whatsappMessage), true)}
            >
              <ContactIcon name="whatsapp" />
              <span>{contactUi.whatsapp}</span>
            </button>
          </li>
          <li>
            <a className="c-link" href={contact.linkedinUrl} rel="noopener noreferrer" target="_blank">
              <ContactIcon name="linkedin" />
              <span>{contactUi.linkedin}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="container footer-base">
        <span>
          © {year} {brand.legalName}
        </span>
        {contact.uen && <span>UEN {contact.uen}</span>}
      </div>
    </footer>
  )
}
