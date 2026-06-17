import { useEffect, useRef } from 'react'

// Magic UI smooth-cursor — fluid arrow that trails the pointer with spring physics
// and rotates toward direction of motion. Direct DOM + RAF for reliability.

export default function SmoothCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const el = cursorRef.current
    if (!el) return

    // Target position (mouse) and current position (animated)
    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    const vel = { x: 0, y: 0 }
    let angle = 0
    let prevX = 0
    let prevY = 0
    let prevT = performance.now()

    // Spring physics constants — tuned for slight wobble but tight tracking
    const stiffness = 0.22
    const damping = 0.62

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY

      const now = performance.now()
      const dt = Math.max(1, now - prevT)
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      const speed = Math.hypot(dx, dy) / dt

      if (speed > 0.08) {
        // Angle toward direction of motion (+90 so arrow points "forward")
        angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      }

      prevX = e.clientX
      prevY = e.clientY
      prevT = now
    }

    let raf
    const tick = () => {
      // Spring step
      const ax = (target.x - current.x) * stiffness
      const ay = (target.y - current.y) * stiffness
      vel.x = (vel.x + ax) * damping
      vel.y = (vel.y + ay) * damping
      current.x += vel.x
      current.y += vel.y

      el.style.transform = `translate(${current.x}px, ${current.y}px) translate(-25%, -25%) rotate(${angle}deg)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 10001,
        color: 'var(--lime)',
        filter: 'drop-shadow(0 0 6px var(--lime-glow))',
        willChange: 'transform',
        transform: 'translate(-100px, -100px)',
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M2 2 L2 18 L7 14 L10 22 L13 21 L10 13 L18 13 Z" />
      </svg>
    </div>
  )
}
