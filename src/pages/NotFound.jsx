import { Button } from '../components/Ui.jsx'
import { notFound } from '../content/site.js'

export default function NotFound() {
  return (
    <>
      <title>{notFound.title}</title>
      <meta name="robots" content="noindex" />
      <section className="page-intro not-found">
        <div className="container">
          <p className="eyebrow">{notFound.eyebrow}</p>
          <h1>{notFound.heading}</h1>
          <p className="lead">{notFound.body}</p>
          <Button to={notFound.button.to}>{notFound.button.label}</Button>
        </div>
      </section>
    </>
  )
}
