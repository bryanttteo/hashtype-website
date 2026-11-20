import { useState } from 'react'
import ContactIcon from '../components/ContactIcon.jsx'
import { Button, Seo } from '../components/Ui.jsx'
import { contactPage } from '../content/contact.js'
import {
  contact,
  contactUi,
  emailRequests,
  grantLinks,
  mailtoFor,
  openLink,
  telHref,
  whatsappHref,
} from '../content/site.js'

export default function Contact() {
  const { intro, requests, nextSteps, details, grantsNote } = contactPage
  const [showNumber, setShowNumber] = useState(false)

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
              <div>
                <dt className="label">{details.labels.email}</dt>
                <dd>
                  <ContactIcon name="email" />
                  <a href={`mailto:${contact.emailEnquiries}`}>{contact.emailEnquiries}</a>
                </dd>
              </div>
              <div>
                <dt className="label">{details.labels.phone}</dt>
                <dd>
                  <ContactIcon name="phone" />
                  {showNumber ? (
                    <a href={telHref(contact.phone)}>{contact.phone}</a>
                  ) : (
                    <button type="button" className="reveal" onClick={() => setShowNumber(true)}>
                      {contactUi.showNumber}
                    </button>
                  )}
                  <span className="dd-actions">
                    <button type="button" className="chip-btn" onClick={() => openLink(telHref(contact.phone))}>
                      {contactUi.call}
                    </button>
                    <button
                      type="button"
                      className="chip-btn"
                      onClick={() => openLink(whatsappHref(contact.phone, contactUi.whatsappMessage), true)}
                    >
                      {contactUi.whatsapp}
                    </button>
                  </span>
                </dd>
              </div>
              {contact.location && (
                <div>
                  <dt className="label">{details.labels.location}</dt>
                  <dd>{contact.location}</dd>
                </div>
              )}
              <div>
                <dt className="label">{details.labels.linkedin}</dt>
                <dd>
                  <ContactIcon name="linkedin" />
                  <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    {contact.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
