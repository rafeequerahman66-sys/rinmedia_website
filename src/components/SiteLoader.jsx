import { useEffect, useState } from 'react'

export default function SiteLoader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let start = null
    const total = 1900

    const step = (t) => {
      if (start === null) start = t
      const progress = Math.min(1, (t - start) / total)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * 100))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setTimeout(() => setDone(true), 280)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`rin-loader ${done ? 'rin-loader--done' : ''}`} aria-hidden={done}>
      <div className="rin-loader__mark">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 14px var(--lime-glow)' }} />
          Rin Media
        </span>
      </div>
      <div className="rin-loader__count">{count}</div>
      <div className="rin-loader__bar">
        <div className="rin-loader__bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
      <div className="rin-loader__status">Loading the reel</div>
    </div>
  )
}
