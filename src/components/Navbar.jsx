import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Process', id: 'how' },
  { label: 'Services', id: 'capabilities' },
  { label: 'Portfolio', id: 'works' },
  { label: 'Pricing', id: 'subscription' },
]

export default function Navbar({ lenisRef }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      lenisRef?.current?.stop?.()
    } else {
      document.body.style.overflow = ''
      lenisRef?.current?.start?.()
    }
    return () => { document.body.style.overflow = '' }
  }, [open, lenisRef])

  const scrollTo = (id) => {
    setOpen(false)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(el, { offset: -90, duration: 1.4 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  const scrollToTop = () => {
    setOpen(false)
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="rin-nav-wrap">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={`rin-nav ${scrolled ? 'rin-nav--scrolled' : ''}`}
        >
          <button className="rin-nav__brand" onClick={scrollToTop} aria-label="Rin Media — home">
            <span className="rin-nav__dot" />
            <span>Rin Media</span>
          </button>

          <div className="rin-nav__links">
            {NAV_ITEMS.map(({ label, id }) => (
              <button key={id} className="rin-nav__link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </div>

          <button className="rin-nav__cta" onClick={() => scrollTo('contact')}>Get Started</button>

          <button
            className="rin-nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span style={{ width: 16, height: 1.5, background: 'var(--ink)', display: 'block', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: -5, width: 16, height: 1.5, background: 'var(--ink)' }} />
              <span style={{ position: 'absolute', left: 0, top: 5, width: 16, height: 1.5, background: 'var(--ink)' }} />
            </span>
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(8, 12, 5, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              padding: '2rem',
            }}
          >
            {NAV_ITEMS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.06 }}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                  fontFamily: 'Clash Display, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                }}
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 + NAV_ITEMS.length * 0.06 }}
              onClick={() => scrollTo('contact')}
              className="rin-btn rin-btn--lime"
              style={{ marginTop: '1rem' }}
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
