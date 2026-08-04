import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import SiteLoader from './components/SiteLoader'
import SmoothCursor from './components/SmoothCursor'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import SectionHero from './sections/SectionHero'
import SectionHow from './sections/SectionHow'
import SectionWorks from './sections/SectionWorks'
import SectionTestimonials from './sections/SectionTestimonials'
import SectionCapabilities from './sections/SectionCapabilities'
import SectionPlatforms from './sections/SectionPlatforms'
import SectionSubscription from './sections/SectionSubscription'
import SectionStats from './sections/SectionStats'
import SectionContact from './sections/SectionContact'

export default function HomePage() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    document.title = 'Rin Media — Media Production & Creative Agency for Startups & Founders | Bangalore'

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // If we arrived with a hash (e.g. /#works from another page), scroll to it
    const hash = window.location.hash
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) lenis.scrollTo(el, { offset: -80, immediate: false })
      })
    } else {
      window.scrollTo(0, 0)
    }

    let raf
    const tick = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  // Reveal-on-scroll for [data-reveal] elements
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )
    els.forEach((el) => io.observe(el))

    const mo = new MutationObserver(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        io.observe(el)
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-1)', fontFamily: 'var(--font-body)' }}>
      <SiteLoader />
      <SmoothCursor />
      <ScrollProgress />
      <Navbar lenisRef={lenisRef} />
      <main>
        <SectionHero />
        <SectionHow />
        <SectionPlatforms />
        <SectionWorks />
        <SectionTestimonials />
        <SectionCapabilities />
        <SectionSubscription />
        <SectionStats />
        <SectionContact />
      </main>
      <Footer />
    </div>
  )
}
