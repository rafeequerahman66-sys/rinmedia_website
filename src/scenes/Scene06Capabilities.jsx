import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterMarker from '../components/ChapterMarker'

const CAPS = [
  { num: '01', title: 'Brand Films', sub: 'Stories that move people.' },
  { num: '02', title: 'Event Films', sub: 'Moments worth reliving.' },
  { num: '03', title: 'Founder Stories', sub: 'The humans behind the vision.' },
  { num: '04', title: 'Social Content', sub: 'Built for attention.\nDesigned for impact.' },
]

function CapItem({ cap, index }) {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const numRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from(numRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(lineRef.current, { scaleX: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '15vh 8vw',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <span
          ref={numRef}
          style={{
            fontSize: '0.75rem',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          {cap.num}
        </span>
        <div
          ref={lineRef}
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255,255,255,0.12)',
            transformOrigin: 'left center',
          }}
        />
      </div>

      <h2
        ref={titleRef}
        style={{
          fontSize: 'clamp(3rem, 10vw, 12rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: '#fff',
          marginBottom: '2.5rem',
        }}
      >
        {cap.title}
      </h2>

      <p
        ref={subRef}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '480px',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}
      >
        {cap.sub}
      </p>
    </div>
  )
}

export default function Scene06Capabilities() {
  return (
    <section id="scene-06" style={{ background: '#000', width: '100%' }}>
      <ChapterMarker n={6} label="Craft" />
      <div style={{ padding: '8vh 8vw 4vh' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          What We Do
        </motion.p>
      </div>

      {CAPS.map((cap, i) => (
        <CapItem key={cap.num} cap={cap} index={i} />
      ))}
    </section>
  )
}
