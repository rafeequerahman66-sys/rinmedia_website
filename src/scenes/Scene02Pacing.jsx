import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RetroCameraCanvas from '../components/RetroCameraCanvas'

export default function Scene02Pacing() {
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
          end: '+=200%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress
          },
        },
      })

      tl.to(line1Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
      })
      tl.to({}, { duration: 0.3 })
      tl.to(line2Ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
      })
      tl.to({}, { duration: 0.4 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const textStyle = {
    fontSize: 'clamp(2.5rem, 8vw, 9rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
    color: '#fff',
    display: 'block',
    opacity: 0,
    transform: 'translateY(60px)',
    willChange: 'transform, opacity',
    position: 'relative',
    zIndex: 2,
  }

  return (
    <section
      ref={sectionRef}
      id="scene-02"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <RetroCameraCanvas scrollProgressRef={scrollProgressRef} />

      <span ref={line1Ref} style={textStyle}>
        Content is everywhere.
      </span>

      <span
        ref={line2Ref}
        style={{
          ...textStyle,
          marginTop: '1.5rem',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        Attention isn't.
      </span>
    </section>
  )
}
