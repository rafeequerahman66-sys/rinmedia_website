import { useEffect, useRef } from 'react'

/**
 * Wrap a button/anchor and apply a subtle magnetic effect — element follows
 * the cursor within a small radius. Touch devices are no-op'd.
 *
 * Usage:
 *   <MagneticButton>
 *     <a href="…">Click me</a>
 *   </MagneticButton>
 */
export default function MagneticButton({ children, strength = 0.35, radius = 90 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const el = ref.current

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        el.style.transform = ''
        return
      }
      const x = dx * strength
      const y = dy * strength
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => { el.style.transform = '' }

    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, radius])

  return (
    <span ref={ref} className="rin-magnetic">
      {children}
    </span>
  )
}
