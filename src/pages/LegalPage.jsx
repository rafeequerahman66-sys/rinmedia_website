import { useEffect } from 'react'
import Footer from '../components/Footer'
import SmoothCursor from '../components/SmoothCursor'

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function LegalPage({ doc }) {
  useEffect(() => {
    document.title = `${doc.title} — RIN MEDIA`
    window.scrollTo(0, 0)
    // per-page canonical + og:url for the SPA route
    const url = `https://www.rinmedia.xyz${doc.path}`
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', url)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', url)
    return () => {
      if (canonical) canonical.setAttribute('href', 'https://www.rinmedia.xyz/')
      if (ogUrl) ogUrl.setAttribute('content', 'https://www.rinmedia.xyz/')
    }
  }, [doc])

  const onTocClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState({}, '', `#${id}`)
    }
  }

  return (
    <div className="rin-legal-root" style={{ background: 'var(--bg)', color: 'var(--text-1)', fontFamily: 'var(--font-body)' }}>
      <SmoothCursor />

      <header className="rin-legal__nav">
        <a className="rin-legal__brand" href="/" aria-label="Rin Media — home">
          <span className="rin-legal__dot" />
          <span>Rin Media</span>
        </a>
        <a className="rin-legal__back" href="/">Back to site ↗</a>
      </header>

      <div className="rin-legal">
        <div className="rin-legal__head">
          <nav className="rin-legal__crumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden>/</span>
            <span>Legal</span>
            <span aria-hidden>/</span>
            <span className="rin-legal__crumb-current">{doc.breadcrumb}</span>
          </nav>

          <h1 className="rin-legal__title">{doc.title}</h1>

          <div className="rin-legal__meta">
            <span className="rin-legal__chip">{doc.readingTime}</span>
            <span className="rin-legal__meta-item">{doc.effective}</span>
            <span className="rin-legal__meta-item">{doc.updated}</span>
          </div>

          <p className="rin-legal__intro">{doc.intro}</p>
        </div>

        <div className="rin-legal__layout">
          <aside className="rin-legal__toc" aria-label="On this page">
            <p className="rin-legal__toc-title">On this page</p>
            <nav>
              <ul>
                {doc.sections.map((s) => (
                  <li key={s.h}>
                    <a href={`#${slug(s.h)}`} onClick={(e) => onTocClick(e, slug(s.h))}>{s.h}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="rin-legal__body">
            {doc.sections.map((s) => (
              <section className="rin-legal__section" id={slug(s.h)} key={s.h}>
                <h2 className="rin-legal__h">{s.h}</h2>
                {s.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p className="rin-legal__p" key={i}>{block}</p>
                  ) : (
                    <ul className="rin-legal__list" key={i}>
                      {block.list.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  )
                )}
              </section>
            ))}

            <div className="rin-legal__foot-cta">
              <a className="rin-btn rin-btn--lime" href="/#contact">Start a project</a>
              <a className="rin-btn rin-btn--outline" href="/">Back to home</a>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
