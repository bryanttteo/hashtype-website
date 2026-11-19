import { Link, useLocation } from 'react-router-dom'
import { siteUrl } from '../content/site.js'

// Primary = mint fill with black text (one per page). Outline = secondary.
export function Button({ to, href, variant = 'primary', children, ...rest }) {
  const className = `btn btn-${variant}`
  if (href) {
    return (
      <a className={className} href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link className={className} to={to} {...rest}>
      {children}
    </Link>
  )
}

export function TextLink({ to, children }) {
  return (
    <Link className="text-link" to={to}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  )
}

export function SectionHeading({ index, children, as: Tag = 'h2', id }) {
  return (
    <div className="section-heading">
      {index && <span className="label">{index}</span>}
      <Tag id={id}>{children}</Tag>
      <span className="rule" aria-hidden="true" />
    </div>
  )
}

export function Seo({ title, description }) {
  // React 19 hoists these tags into <head>. The canonical link tells search
  // engines that hashtype.net is the official copy of each page.
  const { pathname } = useLocation()
  const url = `${siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  )
}

export function ClosingCta({ heading, body, primary, variant = 'primary' }) {
  return (
    <section className="closing">
      <div className="container closing-inner">
        <h2>{heading}</h2>
        <p>{body}</p>
        <Button to={primary.to} variant={variant}>
          {primary.label}
        </Button>
      </div>
    </section>
  )
}
