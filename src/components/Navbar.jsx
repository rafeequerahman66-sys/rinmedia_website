import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Work', id: 'scene-07' },
  { label: 'Services', id: 'scene-06' },
  { label: 'About', id: 'scene-05' },
  { label: 'Contact', id: 'scene-11' },
]

export default function Navbar({ lenisRef }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      lenisRef?.current?.stop?.()
    } else {
      document.body.style.overflow = ''
      lenisRef?.current?.start?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, lenisRef])

  const scrollTo = (id) => {
    setOpen(false)
    // Wait a tick so body unlocks before lenis scroll runs
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el && lenisRef?.current) {
        lenisRef.current.scrollTo(el, { offset: -80, duration: 1.6 })
      }
    })
  }

  return (
    <>
      <style>{`
        .rin-nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .rin-nav-burger { display: none; }
        @media (max-width: 720px) {
          .rin-nav-links { display: none; }
          .rin-nav-burger { display: flex; }
        }
        .rin-nav-link {
          background: none; border: none; color: rgba(255,255,255,0.6);
          font-size: 0.8rem; font-family: 'Satoshi', sans-serif; font-weight: 400;
          text-transform: uppercase; letter-spacing: 0.12em;
          cursor: pointer; padding: 0;
          transition: color 0.3s ease;
        }
        .rin-nav-link:hover { color: #fff; }

        .rin-nav-cta {
          background: var(--rin-accent, #D9B26A);
          color: #0a0a0a;
          font-family: 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.7rem 1.4rem;
          border-radius: 999px;
          text-decoration: none;
          margin-left: 0.5rem;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                      background 0.3s ease;
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }
        .rin-nav-cta:hover {
          background: #eecf8d;
          transform: translateY(-1px);
        }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: scrolled ? '1rem 5vw' : '1.5rem 5vw',
          background: scrolled || open ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <span
          style={{
            fontWeight: 900,
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            letterSpacing: '0.15em',
            color: '#fff',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
          onClick={() => {
            setOpen(false)
            lenisRef?.current?.scrollTo(0, { duration: 1.6 })
          }}
        >
          RIN MEDIA
        </span>

        {/* Desktop links */}
        <div className="rin-nav-links">
          {NAV_ITEMS.map(({ label, id }) => (
            <button key={label} onClick={() => scrollTo(id)} className="rin-nav-link">
              {label}
            </button>
          ))}
          <a
            href="mailto:rinmedia.xyz@gmail.com?subject=Book%20a%20Call%20%E2%80%94%20RIN%20MEDIA&body=Hi%20Rin%20Media%2C%0A%0AI%27d%20like%20to%20book%20a%20call."
            className="rin-nav-cta"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile burger button */}
        <button
          className="rin-nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            padding: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            zIndex: 1001,
          }}
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: '#fff',
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
              transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
              transformOrigin: 'center',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: '#fff',
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
              transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
              transformOrigin: 'center',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(0,0,0,0.96)',
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
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 }}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
