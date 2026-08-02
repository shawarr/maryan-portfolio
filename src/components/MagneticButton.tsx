import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion, useIsMobile } from '../lib/scroll'

/** Anchor that pulls toward the cursor within its own bounds ("magnetic"). */
export default function MagneticButton({
  href,
  children,
  download,
  variant = 'outline',
  className = '',
}: {
  href: string
  children: ReactNode
  download?: boolean
  variant?: 'outline' | 'solid'
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 300, damping: 18, mass: 0.5 })

  const onMove = (e: MouseEvent) => {
    if (reduced || mobile || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    variant === 'solid'
      ? 'bg-accent text-ink hover:bg-[#c2185b]'
      : 'border border-line text-fog hover:border-accent hover:text-accent'

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      data-cursor="link"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-3 px-6 py-3.5 font-mono text-xs tracking-[0.2em] transition-colors duration-200 ${base} ${className}`}
    >
      {children}
    </motion.a>
  )
}
