import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterMarker from '../components/ChapterMarker'

const STATS = [
  { value: 100, suffix: '+', label: 'Events Captured' },
  { value: 50, suffix: '+', label: 'Brands Served' },
  { value: 1, suffix: 'M+', label: 'Views Generated' },
  { value: 1000, suffix: '+', label: 'Stories Told' },
]

function CounterItem({ stat, index }) {
  const ref = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    if (!stat.value) return

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stat.value,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          once: true,
        },
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent = Math.ceil(obj.val) + (stat.suffix || '')
          }
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [stat])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '3rem 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        ref={numRef}
        style={{
          fontSize: 'clamp(3rem, 7vw, 7rem)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#fff',
        }}
      >
        {stat.display || `0${stat.suffix || ''}`}
      </span>
      <span style={{
        fontSize: '0.75rem',
        fontWeight: 300,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
      }}>
        {stat.label}
      </span>
    </motion.div>
  )
}

export default function Scene10Results() {
  return (
    <section
      id="scene-10"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '60vh',
        padding: '10vh 8vw',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <ChapterMarker n={10} label="Impact" />
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
          marginBottom: '4rem',
        }}
      >
        By the Numbers
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0 5rem',
      }}>
        {STATS.map((stat, i) => (
          <CounterItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}
