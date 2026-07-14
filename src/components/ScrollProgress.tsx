import { useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

/** Right-edge scroll gauge styled like a machinist's ruler. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const top = useTransform(smooth, (n) => `calc(${(n * 100).toFixed(2)}% - 2px)`)
  const [pct, setPct] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) =>
    setPct(Math.round(v * 100)),
  )

  return (
    <div
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 select-none md:flex md:flex-col md:items-center"
      aria-hidden
    >
      <span className="mb-2 font-mono text-[9px] tracking-widest text-ghost">
        POS
      </span>
      <div className="relative h-44 w-4">
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className="absolute right-0 h-px bg-line"
            style={{ top: `${i * 5}%`, width: i % 5 === 0 ? 16 : 8 }}
          />
        ))}
        <motion.span
          className="absolute -right-1 h-[3px] w-6 bg-accent shadow-[0_0_8px_var(--color-accent)]"
          style={{ top }}
        />
      </div>
      <span className="mt-2 font-mono text-[10px] tabular-nums text-accent">
        {String(pct).padStart(3, '0')}
      </span>
    </div>
  )
}
