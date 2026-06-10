import { useEffect, useRef } from 'react'

/** Thin gold bar at the very top, fills based on scroll position. */
export default function ScrollProgress() {
  const fillRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p})`
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="rin-progress" aria-hidden>
      <div ref={fillRef} className="rin-progress__fill" />
    </div>
  )
}
