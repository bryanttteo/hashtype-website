import Photo from '../components/Photo.jsx'
import { ClosingCta, Seo } from '../components/Ui.jsx'
import { projects } from '../content/projects.js'

function Row({ label, children }) {
  if (!children) return null
  return (
    <div className="project-row">
      <dt className="label">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export default function Projects() {
  const { intro, labels, emptyState, closing } = projects
  const published = projects.items.filter((p) => p.publish)

  return (
    <>
      <Seo {...projects.meta} />

      <section className="page-intro">
        <div className="container">
          <h1>{intro.heading}</h1>
          <p className="lead">{intro.body}</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          {published.length === 0 ? (
            <div className="card empty-state">
              <h2>{emptyState.heading}</h2>
              <p>{emptyState.body}</p>
            </div>
          ) : (
            <div className="project-grid">
              {published.map((p) => (
                <article key={p.id} id={p.id} className="project">
                  {p.image && <Photo name={p.image} className="project-photo" />}
                  <div className="project-head">
                    <span className="status">{p.status}</span>
                    <h2>{p.title}</h2>
                  </div>
                  <dl>
                    <Row label={labels.client}>{p.client}</Row>
                    <Row label={labels.sector}>{p.sector}</Row>
                    <Row label={labels.problem}>{p.problem}</Row>
                    <Row label={labels.delivered}>{p.delivered}</Row>
                    <Row label={labels.role}>{p.role}</Row>
                    <Row label={labels.partners}>{p.partners}</Row>
                    <Row label={labels.result}>{p.result}</Row>
                  </dl>
                  {p.testimonial && (
                    <blockquote className="testimonial">
                      <p>“{p.testimonial.quote}”</p>
                      <footer>{p.testimonial.by}</footer>
                    </blockquote>
                  )}
                  <ul className="tags" aria-label={labels.solutions}>
                    {p.solutions.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ClosingCta {...closing} />
    </>
  )
}
