import { useEffect, useState } from 'react'
import HomePage from './HomePage'
import LegalPage from './pages/LegalPage'
import { LEGAL_DOCS } from './pages/legalContent'

// Minimal built-in router (no dependency). Vercel already rewrites
// every path to index.html, so these client routes resolve on refresh too.
export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)

    // Intercept clicks on internal absolute links ("/...", "/#works") for SPA nav.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a')
      if (!a) return
      if (a.target === '_blank' || a.hasAttribute('data-native')) return
      const href = a.getAttribute('href') || ''
      if (!href.startsWith('/')) return // leave "#hash", "mailto:", external links alone

      e.preventDefault()
      const url = new URL(href, window.location.origin)
      const changingPage = url.pathname !== window.location.pathname
      if (changingPage) {
        window.history.pushState({}, '', url.pathname + url.hash)
        setPath(url.pathname)
      } else if (url.hash) {
        window.history.replaceState({}, '', url.pathname + url.hash)
      }
      requestAnimationFrame(() => {
        if (url.hash) {
          const el = document.getElementById(url.hash.slice(1))
          if (el) el.scrollIntoView({ behavior: changingPage ? 'auto' : 'smooth' })
          else window.scrollTo(0, 0)
        } else {
          window.scrollTo(0, 0)
        }
      })
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const doc = LEGAL_DOCS[path]
  if (doc) return <LegalPage doc={doc} />
  return <HomePage />
}
