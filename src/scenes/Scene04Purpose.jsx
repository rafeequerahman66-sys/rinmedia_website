import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RetroCameraCanvas from '../components/RetroCameraCanvas'

const LINES = [
  'Through cinematic storytelling.',
  'Through creative strategy.',
  'Through unforgettable execution.',
]

export default function Scene04Purpose() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const linesRef = useRef([])
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      linesRef.current.forEach((line, i) => {
        if (!line) return
        gsap.from(line, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // Track scroll progress through scene-04 to drive camera rotation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="scene-04"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '15vh 8vw',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <RetroCameraCanvas
        scrollProgressRef={scrollProgressRef}
        modelPath="/models/retro-computer.glb"
        scrollOffsetMultiplier={2}
        baseRotation={Math.PI}
      />

      <h1
        ref={headRef}
        style={{
          fontSize: 'clamp(3rem, 10vw, 12rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: '#fff',
          marginBottom: '5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        We Make<br />People Watch.
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {LINES.map((line, i) => (
          <p
            key={line}
            ref={el => linesRef.current[i] = el}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.01em',
              lineHeight: 1.4,
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
