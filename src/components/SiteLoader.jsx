import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SiteLoader() {
  const [progress, setProgress] = useState(0) // 0 → 1
  const [flashing, setFlashing] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let start = null
    const total = 2900 // ms — ~3s reel-intro cadence

    const step = (t) => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / total)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        // Quick flash, then fade into content
        setFlashing(true)
        setTimeout(() => setDone(true), 300)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Staggered reveal points along the progress timeline
  const showReady = progress >= 0.05
  const showSet = progress >= 0.32
  const showCreate = progress >= 0.56
  // glow pulse kicks in once CREATE has settled
  const pulsing = progress >= 0.78

  const readyIn = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
    show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }
  const setIn = {
    hidden: { opacity: 0, y: 48, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }
  const createIn = {
    hidden: { opacity: 0, scale: 0.4, filter: 'blur(18px)' },
    show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
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
          variants={readyIn}
          initial="hidden"
          animate={showReady ? 'show' : 'hidden'}
        >
          Ready.
        </motion.span>
        <motion.span
          className="rin-loader__word rin-loader__word--set"
          variants={setIn}
          initial="hidden"
          animate={showSet ? 'show' : 'hidden'}
        >
          Set.
        </motion.span>
        <motion.span
          className={`rin-loader__word rin-loader__word--create ${pulsing ? 'is-pulsing' : ''}`}
          variants={createIn}
          initial="hidden"
          animate={showCreate ? 'show' : 'hidden'}
        >
          Create.
        </motion.span>
      </div>

      <div className="rin-loader__foot">
        <div className="rin-loader__bar">
          <div className="rin-loader__bar-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="rin-loader__status">Turning moments into stories</div>
      </div>

      <div className={`rin-loader__flash ${flashing ? 'is-flashing' : ''}`} aria-hidden />
    </div>
  )
}
