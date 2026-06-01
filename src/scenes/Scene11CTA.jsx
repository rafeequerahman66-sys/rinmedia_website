import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Scene11CTA() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(line1Ref.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' })
      tl.to({}, { duration: 0.25 })
      tl.to(line2Ref.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' })
      tl.to({}, { duration: 0.45 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="scene-11"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span
        ref={line1Ref}
        style={{
          fontSize: 'clamp(2rem, 6vw, 6rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.3)',
          display: 'block',
          opacity: 0,
          transform: 'translateY(60px)',
          willChange: 'transform, opacity',
          lineHeight: 1.2,
          maxWidth: '900px',
        }}
      >
        Your story deserves<br />more than content.
      </span>

      <span
        ref={line2Ref}
        style={{
          fontSize: 'clamp(3rem, 9vw, 11rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          color: '#fff',
          textTransform: 'uppercase',
          display: 'block',
          marginTop: '1.5rem',
          opacity: 0,
          transform: 'translateY(60px)',
          willChange: 'transform, opacity',
        }}
      >
        Let's create<br />something<br />unforgettable.
      </span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: '5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}
      >
        <motion.button
          whileHover={{ scale: 1.04, background: '#e0e0e0' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '1.2rem 3rem',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '100px',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          Start a Project
        </motion.button>

        <motion.a
          href="mailto:rinmedia.xyz@gmail.com"
          whileHover={{ color: '#fff' }}
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            fontWeight: 300,
            transition: 'color 0.3s ease',
          }}
        >
          rinmedia.xyz@gmail.com
        </motion.a>
      </motion.div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '4vh',
        left: '8vw',
        right: '8vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>
          © 2024 Rin Media
        </span>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Premium Creative Production
        </span>
      </div>
    </section>
  )
}
