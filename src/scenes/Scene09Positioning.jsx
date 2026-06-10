import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterMarker from '../components/ChapterMarker'

export default function Scene09Positioning() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(line1Ref.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' })
      tl.to({}, { duration: 0.2 })
      tl.to(line2Ref.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' })
      tl.to({}, { duration: 0.5 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="scene-09"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 8vw',
        overflow: 'hidden',
      }}
    >
      <ChapterMarker n={9} label="Stand" />
      <span
        ref={line1Ref}
        style={{
          fontSize: 'clamp(2rem, 6vw, 6.5rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.3)',
          display: 'block',
          opacity: 0,
          transform: 'translateY(50px)',
          willChange: 'transform, opacity',
          lineHeight: 1.2,
        }}
      >
        We don't just make videos.
      </span>

      <span
        ref={line2Ref}
        style={{
          fontSize: 'clamp(2.5rem, 7.5vw, 9rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#fff',
          display: 'block',
          marginTop: '1rem',
          opacity: 0,
          transform: 'translateY(50px)',
          willChange: 'transform, opacity',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        We create stories<br />people remember.
      </span>
    </section>
  )
}
