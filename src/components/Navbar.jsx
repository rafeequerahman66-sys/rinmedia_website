import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({ lenisRef }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el && lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.6 })
    }
  }

  return (
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
        padding: scrolled ? '1.25rem 5vw' : '2rem 5vw',
        background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <span
        style={{
          fontWeight: 900,
          fontSize: '1.1rem',
          letterSpacing: '0.15em',
          color: '#fff',
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
        onClick={() => lenisRef?.current?.scrollTo(0, { duration: 1.6 })}
      >
        RIN MEDIA
      </span>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {[
          { label: 'Work', id: 'scene-07' },
          { label: 'Services', id: 'scene-06' },
          { label: 'About', id: 'scene-05' },
          { label: 'Contact', id: 'scene-11' },
        ].map(({ label, id }) => (
          <button
            key={label}
            onClick={() => scrollTo(id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.8rem',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              padding: 0,
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >
            {label}
          </button>
        ))}
      </div>
    </motion.nav>
  )
}
