import { Link } from 'react-router-dom'
import mark from '../assets/hashtype-mark-128.png'
import { brand, contact, nav, telHref, whatsappHref } from '../content/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand" aria-label={`${brand.name} home`}>
            <img src={mark} alt={brand.logoAlt} width="32" height="31" />
            <span>{brand.name}</span>
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

        <ul className="footer-contact">
          <li>
            <a href={`mailto:${contact.emailEnquiries}`}>{contact.emailEnquiries}</a>
          </li>
          <li>
            <a href={telHref(contact.phone)}>{contact.phone}</a>
          </li>
          <li>
            <a href={whatsappHref(contact.phone)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={contact.linkedinUrl} rel="noopener noreferrer" target="_blank">
              LinkedIn
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
