import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Scene01Hero() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={sectionRef}
      className="scene-full"
      id="scene-01"
      style={{
        height: '100vh',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a2e 0%, #0d0d0d 50%, #000 100%)',
      }}
    >
      <video
        ref={videoRef}
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        style={{ transformOrigin: 'center center' }}
      >
        <source src="/videos/founder-stories.mp4" type="video/mp4" />
      </video>

      <div className="overlay-full" />

      <motion.div
        className="scene-content"
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          height: '100%',
          padding: '0 8vw 10vh',
        }}
      >
        <motion.p
          variants={item}
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '2rem',
            fontWeight: 300,
          }}
        >
          Creative Production Studio
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <motion.h1
            variants={item}
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 13rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#fff',
            }}
          >
            We Don't
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
          <motion.h1
            variants={item}
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 13rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#fff',
            }}
          >
            Do Normal.
          </motion.h1>
        </div>

        <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '1rem 2.5rem',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '100px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('scene-07')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Our Work
          </motion.button>

          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '4vh',
          right: '5vw',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.3)', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: '#fff' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
