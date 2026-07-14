import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Crosshair reticle cursor. Expands + rotates over anything carrying
 *  a `data-cursor` attribute. Disabled on touch devices. */
export default function Cursor({ enabled }: { enabled: boolean }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 })
  const [hot, setHot] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!enabled) {
      document.body.dataset.customCursor = 'false'
      return
    }
    document.body.dataset.customCursor = 'true'
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as Element | null)?.closest('[data-cursor]')
      setHot(!!target)
      setLabel(target?.getAttribute('data-cursor-label') ?? '')
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.dataset.customCursor = 'false'
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-99"
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <motion.svg
        width="44"
        height="44"
        viewBox="-22 -22 44 44"
        className="-ml-[22px] -mt-[22px] block"
        animate={{ rotate: hot ? 45 : 0, scale: hot ? 1.35 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* crosshair ticks */}
        <g stroke="var(--color-accent)" strokeWidth="1.5">
          <line x1="0" y1="-12" x2="0" y2="-6" />
          <line x1="0" y1="6" x2="0" y2="12" />
          <line x1="-12" y1="0" x2="-6" y2="0" />
          <line x1="6" y1="0" x2="12" y2="0" />
        </g>
        <circle
          r="2"
          fill={hot ? 'var(--color-accent)' : 'transparent'}
          stroke="var(--color-accent)"
          strokeWidth="1"
        />
        {/* outer ring appears on hover targets */}
        <motion.circle
          r="16"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeDasharray="4 6"
          animate={{ opacity: hot ? 0.9 : 0 }}
        />
      </motion.svg>
      {label && (
        <span className="absolute left-5 top-4 whitespace-nowrap font-mono text-[10px] tracking-widest text-accent">
          {label}
        </span>
      )}
    </motion.div>
  )
}
