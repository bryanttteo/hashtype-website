import IndustrySketch from '../components/IndustrySketch.jsx'
import { ClosingCta, Seo } from '../components/Ui.jsx'
import { projects } from '../content/projects.js'

export default function Projects() {
  const { intro, items, closing, problemsLabel, startLabel, illustrationLabel, groups } = projects
  return (
    <>
      <Seo {...projects.meta} />

      <section className="page-intro">
        <div className="container">
          <h1>{intro.heading}</h1>
          <p className="lead">{intro.body}</p>
          <nav aria-label="Projects">
            <ul className="chip-grid jump">
              {items.map((item) => (
                <li key={item.id}>
                  <a className="chip" href={`#${item.id}`}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="container industry-list">
        {items.map((item, i) => (
          <div key={item.id} className="industry-group">
            {(i === 0 || items[i - 1].group !== item.group) && (
              <h2 className="group-label label">{groups[item.group]}</h2>
            )}
            <section id={item.id} className="industry" aria-labelledby={`${item.id}-h`}>
              <IndustrySketch sketch={item.sketch} label={illustrationLabel} />
              <div className="industry-body">
                <div className="industry-meta">
                  <span className="label">{String(i + 1).padStart(2, '0')}</span>
                  {item.badge && <span className="industry-badge">{item.badge}</span>}
                </div>
                <h2 id={`${item.id}-h`}>{item.title}</h2>
                <div className="industry-cols">
                  <div>
                    <h3 className="label">{item.problemsLabel ?? problemsLabel}</h3>
                    <ul className="dash-list">
                      {item.problems.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="label">{item.startLabel ?? startLabel}</h3>
                    <ul className="fit-list">
                      {item.start.map((s) => (
                        <li key={s.solution}>
                          <strong>{s.solution}</strong> — {s.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {item.note && <p className="industry-note">{item.note}</p>}
              </div>
            </section>
          </div>
        ))}
      </div>

      <ClosingCta {...closing} />
    </>
  )
}
