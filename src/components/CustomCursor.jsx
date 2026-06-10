import { useEffect, useRef, useState } from 'react'

/**
 * Mouse-aware cursor: a ring + dot that follows the pointer with eased motion.
 * Grows + tints accent gold when hovering interactive elements.
 * Auto-disables on touch / coarse-pointer devices (handled by CSS media query).
 */
export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const target = useRef({ x: -50, y: -50 })
  const current = useRef({ x: -50, y: -50 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Bail out on touch devices — CSS already hides, but skip listeners too.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      // Dot follows pointer 1:1 (no lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove, { passive: true })

    // Mark anything interactive so the cursor knows to expand.
    const interactiveSel = 'a, button, [role="button"], input, textarea, select, .rin-magnetic, .logo-cell, .rin-logo-cell, [data-cursor-hover]'
    const els = Array.from(document.querySelectorAll(interactiveSel))
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Eased ring animation
    let raf
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18
      current.current.y += (target.current.y - current.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Watch the DOM for new interactive elements (route changes, dynamic content)
    const mo = new MutationObserver(() => {
      const newEls = Array.from(document.querySelectorAll(interactiveSel))
      newEls.forEach(el => {
        if (el.dataset.rinCursorBound) return
        el.dataset.rinCursorBound = '1'
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      mo.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className={`rin-cursor ${hovering ? 'rin-cursor--hover' : ''}`} aria-hidden />
      <div ref={dotRef} className="rin-cursor__dot" aria-hidden />
    </>
  )
}
