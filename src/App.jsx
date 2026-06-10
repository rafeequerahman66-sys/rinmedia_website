import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import SiteLoader from './components/SiteLoader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import Scene01Hero from './scenes/Scene01Hero'
import Scene02Pacing from './scenes/Scene02Pacing'
import Scene03Transition from './scenes/Scene03Transition'
import Scene04Purpose from './scenes/Scene04Purpose'
import Scene05Reveal from './scenes/Scene05Reveal'
import Scene06Capabilities from './scenes/Scene06Capabilities'
import Scene07Work from './scenes/Scene07Work'
import Scene08Trust from './scenes/Scene08Trust'
import Scene09Positioning from './scenes/Scene09Positioning'
import Scene10Results from './scenes/Scene10Results'
import Scene11CTA from './scenes/Scene11CTA'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Kill browser scroll restoration so pinned scenes don't jump
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.85,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: "'Satoshi', 'Outfit', sans-serif" }}>
      <SiteLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar lenisRef={lenisRef} />
      <Scene01Hero />
      <Scene02Pacing />
      <Scene03Transition />
      <Scene04Purpose />
      <Scene05Reveal />
      <Scene06Capabilities />
      <Scene07Work />
      <Scene08Trust />
      <Scene09Positioning />
      <Scene10Results />
      <Scene11CTA />
      <Footer />
    </div>
  )
}
