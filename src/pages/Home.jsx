import { Link } from 'react-router-dom'
import markLarge from '../assets/hashtype-mark-640.webp'
import Photo from '../components/Photo.jsx'
import { Button, ClosingCta, SectionHeading, Seo, TextLink } from '../components/Ui.jsx'
import { home } from '../content/home.js'

export default function Home() {
  const { hero, outcomes, solutionsTeaser, industriesStrip, grants, closing } = home
  return (
    <>
      <Seo {...home.meta} />

      <section className="hero">
        <Photo name={hero.image} className="hero-bg" eager />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.heading}</h1>
            <p className="lead">{hero.body}</p>
            <div className="actions">
              <Button to={hero.primary.to}>{hero.primary.label}</Button>
              <TextLink to={hero.secondary.to}>{hero.secondary.label}</TextLink>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <img src={markLarge} alt="" width="440" height="423" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="01">{outcomes.heading}</SectionHeading>
          <div className="grid grid-3">
            {outcomes.items.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading index="02">{solutionsTeaser.heading}</SectionHeading>
            <p className="lead">{solutionsTeaser.body}</p>
            <TextLink to={solutionsTeaser.link.to}>{solutionsTeaser.link.label}</TextLink>
          </div>
          <ul className="index-list">
            {solutionsTeaser.list.map((item, i) => (
              <li key={item.label}>
                <Link to={item.to}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="03">{industriesStrip.heading}</SectionHeading>
          <ul className="chip-grid">
            {industriesStrip.list.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="chip">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <TextLink to={industriesStrip.link.to}>{industriesStrip.link.label}</TextLink>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="callout">
            <span className="label">EDG</span>
            <div>
              <h2>{grants.heading}</h2>
              <p>{grants.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Same action as the hero button, so this one is outlined. */}
      <ClosingCta {...closing} variant="outline" />
    </>
  )
}
