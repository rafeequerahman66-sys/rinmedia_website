import { useRef } from 'react'
import { motion } from 'framer-motion'
import ChapterMarker from '../components/ChapterMarker'
import HeroBackground3D from '../components/HeroBackground3D'

export default function Scene01Hero() {
  const sectionRef = useRef(null)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
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
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ChapterMarker n={1} label="Intro" />

      {/* 3D cube tunnel — Blockwee-style background */}
      <HeroBackground3D />

      {/* Centered hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 6vw',
          textAlign: 'center',
        }}
      >
        <motion.span
          variants={item}
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: '#fff',
            lineHeight: 1.05,
            fontFamily: "'Satoshi', sans-serif",
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          We don't do
        </motion.span>

        <motion.h1
          variants={item}
          style={{
            fontSize: 'clamp(4rem, 14vw, 14rem)',
            fontWeight: 900,
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            color: '#fff',
            textTransform: 'uppercase',
            fontFamily: "'Satoshi', sans-serif",
            margin: 0,
          }}
        >
          Normal
        </motion.h1>
      </motion.div>

      {/* Scroll Down — centered bottom */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => {
          document.getElementById('scene-02')?.scrollIntoView({ behavior: 'smooth' })
        }}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vh, 3.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.9rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.02em',
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
          }}
        >
          Scroll Down
        </span>

        <div
          style={{
            width: '22px',
            height: '36px',
            border: '1.5px solid rgba(255,255,255,0.7)',
            borderRadius: '14px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ y: [4, 18, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              background: '#fff',
              borderRadius: '50%',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
