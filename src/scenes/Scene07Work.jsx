import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PROJECTS = [
  {
    title: 'Founder Stories',
    type: 'Community Storytelling',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070',
    video: '/videos/founder-stories.mp4',
    year: '2024',
  },
  {
    title: 'Builder Events',
    type: 'Event Aftermovie — Showreel',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2024',
    video: '/videos/builder-events.mp4',
    year: '2023',
  },
]

function ProjectItem({ project, index }) {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Title reveal
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  // Mobile-safe autoplay: explicitly force muted on the DOM node + only call
  // play() when the video enters the viewport. iOS Safari will refuse autoplay
  // unless the element is actually visible AND muted at the JS layer (not just
  // a JSX attribute — React sometimes binds it after the browser checks).
  useEffect(() => {
    if (!project.video || !imgRef.current) return
    const video = imgRef.current
    // Belt-and-braces: set every flag iOS Safari might check.
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const tryPlay = () => {
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => { /* swallow autoplay-blocked */ })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else video.pause()
      },
      { threshold: 0.2 }
    )
    observer.observe(video)

    // Some mobile browsers only unblock playback after a real touch; piggyback
    // on the first touchstart anywhere on the page.
    const onTouch = () => {
      tryPlay()
      window.removeEventListener('touchstart', onTouch)
    }
    window.addEventListener('touchstart', onTouch, { once: true, passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('touchstart', onTouch)
    }
  }, [project.video])

  return (
    <div
      ref={ref}
      className="rin-project-tile"
      style={{
        position: 'relative',
        width: '100%',
        height: '90vh',
        minHeight: '420px',
        overflow: 'hidden',
        cursor: 'crosshair',
      }}
    >
      {project.video ? (
        <video
          ref={imgRef}
          src={project.video}
          poster={project.img}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: 'absolute',
            inset: '-15% 0',
            width: '100%',
            height: '130%',
            objectFit: 'cover',
            willChange: 'transform',
          }}
        />
      ) : (
        <img
          ref={imgRef}
          src={project.img}
          alt={project.title}
          style={{
            position: 'absolute',
            inset: '-15% 0',
            width: '100%',
            height: '130%',
            objectFit: 'cover',
            willChange: 'transform',
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 max(5vw, 1.25rem) 6vh',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
          <div ref={titleRef}>
            <p style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '0.75rem',
              fontWeight: 300,
            }}>
              {project.year} — {project.type}
            </p>
            <h3 style={{
              fontSize: 'clamp(2.5rem, 7vw, 8rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              {project.title}
            </h3>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              width: '60px',
              height: '60px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              marginLeft: '2rem',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1.2rem', color: '#fff' }}>↗</span>
          </motion.div>
        </div>
      </div>

      {/* Index number */}
      <span style={{
        position: 'absolute',
        top: '5vh',
        right: '5vw',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.2)',
        zIndex: 2,
        fontWeight: 300,
      }}>
        0{index + 1} / 02
      </span>
    </div>
  )
}

export default function Scene07Work() {
  return (
    <section id="scene-07" style={{ background: '#000', width: '100%' }}>
      <div style={{ padding: '10vh 8vw 6vh' }}>
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
          Showreel
        </motion.p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {PROJECTS.map((p, i) => (
          <ProjectItem key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
