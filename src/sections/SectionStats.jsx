import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 100,  suffix: '+',  label: 'Events Captured' },
  { value: 50,   suffix: '+',  label: 'Brands Served' },
  { value: 1,    suffix: 'M+', label: 'Views Generated' },
  { value: 1000, suffix: '+',  label: 'Stories Told' },
]

function StatItem({ stat }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true
            const total = 2200
            const start = performance.now()
            let raf
            const tick = (t) => {
              const p = Math.min(1, (t - start) / total)
              const eased = 1 - Math.pow(1 - p, 3)
              setN(Math.round(eased * stat.value))
              if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [stat.value])

  return (
    <div className="rin-stat" ref={ref} data-reveal>
      <span className="rin-stat__num">{n}{stat.suffix}</span>
      <span className="rin-stat__label">{stat.label}</span>
    </div>
  )
}

export default function SectionStats() {
  return (
    <section id="stats" className="rin-section">
      <div className="rin-stats__grid">
        {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
      </div>
    </section>
  )
}
