import { Button, Seo } from '../components/Ui.jsx'
import { contactPage } from '../content/contact.js'
import { contact, emailRequests, grantLinks, mailtoFor, telHref, whatsappHref } from '../content/site.js'

export default function Contact() {
  const { intro, requests, nextSteps, details, grantsNote } = contactPage
  const rows = [
    { label: details.labels.email, value: contact.emailEnquiries, href: `mailto:${contact.emailEnquiries}` },
    {
      label: details.labels.phone,
      value: contact.phone,
      href: telHref(contact.phone),
      extra: { label: details.labels.whatsappLink, href: whatsappHref(contact.phone) },
    },
    { label: details.labels.location, value: contact.location, href: null },
    {
      label: details.labels.linkedin,
      value: contact.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''),
      href: contact.linkedinUrl,
      external: true,
    },
  ].filter((r) => r.value)

  return (
    <>
      <Seo {...contactPage.meta} />

      <section className="page-intro">
        <div className="container">
          <h1>{intro.heading}</h1>
          <p className="lead">{intro.body}</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container grid grid-3 requests">
          {requests.map((r, i) => (
            <article key={r.key} className={`card request ${i === 0 ? 'is-default' : ''}`}>
              <h2>{r.title}</h2>
              <p>{r.description}</p>
              <Button href={mailtoFor(emailRequests.subjects[r.key])} variant={i === 0 ? 'primary' : 'outline'}>
                {r.button}
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h-sm">{nextSteps.heading}</h2>
            <ol className="steps">
              {nextSteps.list.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="grants-note">
              <p>{grantsNote}</p>
              <ul className="grant-links">
                {grantLinks.map((g) => (
                  <li key={g.href}>
                    <a href={g.href} target="_blank" rel="noopener noreferrer">
                      {g.label}&nbsp;<span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="h-sm">{details.heading}</h2>
            <dl className="details">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt className="label">{r.label}</dt>
                  <dd>
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                    {r.extra && (
                      <a className="extra" href={r.extra.href} target="_blank" rel="noopener noreferrer">
                        {r.extra.label}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
