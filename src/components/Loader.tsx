import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IDENTITY } from '../data/content'

const BOOT_LINES = [
  'MOUNTING KINEMATIC SOLVER .......... OK',
  'LOADING GEOMETRY KERNEL ............ OK',
  'CALIBRATING TOLERANCES ............. ±0.02mm',
  'MESHING VIEWPORT ................... 60Hz',
  `OPERATOR: ${IDENTITY.name} ......... VERIFIED`,
]

/** Full-screen "system boot" sequence shown once on load.
 *  Calls onDone when the exit animation can start. */
export default function Loader({
  onDone,
  skip,
}: {
  onDone: () => void
  skip: boolean
}) {
  const [progress, setProgress] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (skip) {
      onDone()
      setLeaving(true)
      return
    }
    const t0 = performance.now()
    const DURATION = 2100
    let raf: number
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION)
      // ease so the counter hesitates like a real init sequence
      const eased = p < 0.7 ? p * 1.2 : 0.84 + (p - 0.7) * 0.5334
      setProgress(Math.min(100, Math.round(eased * 100)))
      setVisibleLines(Math.min(BOOT_LINES.length, Math.floor(p * (BOOT_LINES.length + 1))))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setLeaving(true)
          onDone()
        }, 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [skip, onDone])

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="scanlines fixed inset-0 z-100 flex items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          aria-hidden
        >
          <div className="w-[min(480px,86vw)] font-mono text-xs">
            <div className="mb-6 flex items-end justify-between text-ghost">
              <span>SYS.INIT</span>
              <span className="text-3xl font-light text-accent tabular-nums">
                {String(progress).padStart(3, '0')}
                <span className="text-sm">%</span>
              </span>
            </div>
            <div className="h-px w-full bg-line">
              <motion.div
                className="h-px bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-6 space-y-1.5 text-fog">
              {BOOT_LINES.slice(0, visibleLines).map((line) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-ghost">&gt; </span>
                  {line}
                </motion.p>
              ))}
              <p className="caret-blink text-accent">_</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
