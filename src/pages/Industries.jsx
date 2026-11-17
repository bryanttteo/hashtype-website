import Photo from '../components/Photo.jsx'
import { ClosingCta, Seo } from '../components/Ui.jsx'
import { industries } from '../content/industries.js'

export default function Industries() {
  const { intro, items, closing, problemsLabel, startLabel } = industries
  return (
    <>
      <Seo {...industries.meta} />

      <section className="page-intro">
        <div className="container">
          <h1>{intro.heading}</h1>
          <p className="lead">{intro.body}</p>
          <nav aria-label="Industries">
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
          <section key={item.id} id={item.id} className="industry" aria-labelledby={`${item.id}-h`}>
            <Photo name={item.image} className="industry-photo" />
            <div className="industry-body">
              <span className="label">{String(i + 1).padStart(2, '0')}</span>
              <h2 id={`${item.id}-h`}>{item.title}</h2>
              <div className="industry-cols">
                <div>
                  <h3 className="label">{problemsLabel}</h3>
                  <ul className="dash-list">
                    {item.problems.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label">{startLabel}</h3>
                  <ul className="fit-list">
                    {item.start.map((s) => (
                      <li key={s.solution}>
                        <strong>{s.solution}</strong> — {s.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ClosingCta {...closing} />
    </>
  )
}
