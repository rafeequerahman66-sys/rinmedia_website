import { useEffect, useState } from 'react'

export default function SiteLoader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let start = null
    const total = 1800 // ms

    const step = (t) => {
      if (start === null) start = t
      const progress = Math.min(1, (t - start) / total)
      // Ease-out cubic for a slower finish
      const eased = 1 - Math.pow(1 - progress, 3)
      const v = Math.round(eased * 100)
      setCount(v)
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        // Hold at 100 briefly so the user reads it before fade
        setTimeout(() => setDone(true), 280)
      }
    }
    raf = requestAnimationFrame(step)

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`rin-loader ${done ? 'rin-loader--done' : ''}`} aria-hidden={done}>
      <div className="rin-loader__mark">RIN MEDIA</div>
      <div className="rin-loader__count">
        {String(count).padStart(2, '0')}
        <span style={{ opacity: 0.35, fontWeight: 200 }}> / 100</span>
      </div>
      <div className="rin-loader__bar">
        <div className="rin-loader__bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
      <div className="rin-loader__status">Compiling stories</div>
    </div>
  )
}
