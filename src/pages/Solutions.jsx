import IndustrySketch from '../components/IndustrySketch.jsx'
import { Button, ClosingCta, SectionHeading, Seo } from '../components/Ui.jsx'
import { mailtoFor } from '../content/site.js'
import { solutions } from '../content/solutions.js'

export default function Solutions() {
  const { intro, applications, services, closing } = solutions
  return (
    <>
      <Seo {...solutions.meta} />

      <section className="page-intro">
        <div className="container">
          <h1>{intro.heading}</h1>
          <p className="lead">{intro.body}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="01">{solutions.solutions.heading}</SectionHeading>
          <div className="solution-list">
            {solutions.solutions.items.map((item, i) => (
              <article key={item.id} id={item.id} className="solution">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div className="solution-body">
                  <h3>{item.title}</h3>
                  <p className="outcome">{item.outcome}</p>
                  <p className="how">
                    <span className="label">How it works</span>
                    {item.how}
                  </p>
                </div>
                <div className="solution-sketch">
                  <IndustrySketch sketch={item.sketch} label={solutions.illustrationLabel} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="02">{applications.heading}</SectionHeading>
          <p className="lead">{applications.body}</p>
          <div className="grid grid-3">
            {applications.items.map((item) => (
              <article key={item.title} className="card demo-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {/* Until a demo site exists, the button asks for a demo by email. */}
                <Button
                  variant="outline"
                  href={item.demoUrl || mailtoFor(`Demo request — ${item.title}`)}
                  {...(item.demoUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {applications.demoLabel}&nbsp;<span aria-hidden="true">↗</span>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="03">{services.heading}</SectionHeading>
          <div className="grid grid-3 services">
            {services.items.map((item) => (
              <article key={item.title} className="card card-plain">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta {...closing} />
    </>
  )
}
