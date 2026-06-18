import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SiteLoader() {
  const [progress, setProgress] = useState(0) // 0 → 1
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let start = null
    const total = 2400 // ms — tuned for a ~3s reel-intro cadence

    const step = (t) => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / total)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setTimeout(() => setDone(true), 420)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Staggered reveal points along the progress timeline
  const showReady = progress >= 0.06
  const showSet = progress >= 0.34
  const showGo = progress >= 0.6

  const wordIn = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }
  const goIn = {
    hidden: { opacity: 0, scale: 0.55, filter: 'blur(16px)' },
    show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <div className={`rin-loader ${done ? 'rin-loader--done' : ''}`} aria-hidden={done}>
      <div className="rin-loader__grain" aria-hidden />
      <div className="rin-loader__glow" aria-hidden />

      <div className="rin-loader__top">
        <div className="rin-loader__mark">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="rin-loader__dot" />
            Rin Media
          </span>
        </div>
      </div>

      <div className="rin-loader__seq">
        <motion.span
          className="rin-loader__word rin-loader__word--ready"
          variants={wordIn}
          initial="hidden"
          animate={showReady ? 'show' : 'hidden'}
        >
          Ready
        </motion.span>
        <motion.span
          className="rin-loader__word rin-loader__word--set"
          variants={wordIn}
          initial="hidden"
          animate={showSet ? 'show' : 'hidden'}
        >
          Set
        </motion.span>
        <motion.span
          className="rin-loader__word rin-loader__word--go"
          variants={goIn}
          initial="hidden"
          animate={showGo ? 'show' : 'hidden'}
        >
          Go
        </motion.span>
      </div>

      <div className="rin-loader__foot">
        <div className="rin-loader__bar">
          <div className="rin-loader__bar-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="rin-loader__status">The reel is ready</div>
      </div>
    </div>
  )
}
