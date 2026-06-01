import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RetroCameraCanvas from '../components/RetroCameraCanvas'

export default function Scene03Transition() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress
          },
        },
      })

      tl.to(line1Ref.current, { y: 0, opacity: 1, duration: 0.3 })
      tl.to({}, { duration: 0.25 })
      tl.to(line2Ref.current, { y: 0, opacity: 1, duration: 0.3 })
      tl.to({}, { duration: 0.4 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="scene-03"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '0 8vw',
        overflow: 'hidden',
        textAlign: 'right',
        position: 'relative',
      }}
    >
      <RetroCameraCanvas
        scrollProgressRef={scrollProgressRef}
        modelPath="/models/movie-camera.glb"
        baseRotation={Math.PI * 0.5}
        scrollOffsetMultiplier={1.8}
      />

      <span
        ref={line1Ref}
        style={{
          fontSize: 'clamp(2rem, 6.5vw, 7rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: 'rgba(255,255,255,0.45)',
          display: 'block',
          opacity: 0,
          transform: 'translateY(50px)',
          willChange: 'transform, opacity',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Most brands blend in.
      </span>

      <span
        ref={line2Ref}
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 9rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: '#fff',
          display: 'block',
          marginTop: '1rem',
          textTransform: 'uppercase',
          opacity: 0,
          transform: 'translateY(50px)',
          willChange: 'transform, opacity',
          position: 'relative',
          zIndex: 2,
        }}
      >
        The best stories don't.
      </span>
    </section>
  )
}
