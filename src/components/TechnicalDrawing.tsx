import { motion } from 'framer-motion'
import type { Project } from '../data/content'

/* ==========================================================================
   PLACEHOLDER PROJECT ART — blueprint-style SVG line drawings that animate
   in like a plotter. Replace with real renders/photos per project by
   swapping the <TechnicalDrawing> usage in Projects.tsx for an <img> or a
   small react-three-fiber canvas.
   ========================================================================== */

const PATHS: Record<Project['drawing'], { d: string; accent?: boolean; dashed?: boolean }[]> = {
  gear: [
    { d: 'M100 25 a45 45 0 1 1 -0.01 0' },
    { d: 'M100 43 a27 27 0 1 1 -0.01 0' },
    { d: 'M100 62 a8 8 0 1 1 -0.01 0' },
    { d: 'M100 12 v14 M100 114 v14 M43 70 h14 M143 70 h14 M60 30 l10 10 M140 110 l-10 -10 M140 30 l-10 10 M60 110 l10 -10' },
    { d: 'M155 70 h30 M170 62 v16', accent: true },
    { d: 'M100 70 m-52 0 a52 52 0 1 1 104 0', dashed: true },
  ],
  arm: [
    { d: 'M40 125 h60 l-8 -14 h-44 z' },
    { d: 'M70 111 L88 60' },
    { d: 'M88 60 L138 42' },
    { d: 'M70 111 a7 7 0 1 1 0.01 0 M88 60 a6 6 0 1 1 0.01 0 M138 42 a5 5 0 1 1 0.01 0' },
    { d: 'M138 42 l14 -8 m-14 8 l16 4' },
    { d: 'M152 34 l8 -4 M154 46 l10 2', accent: true },
    { d: 'M88 60 A 62 62 0 0 1 150 90', dashed: true },
    { d: 'M30 125 h140', accent: true },
  ],
  turbine: [
    { d: 'M100 70 m-9 0 a9 9 0 1 1 18 0 a9 9 0 1 1 -18 0' },
    { d: 'M100 61 C 96 38 102 22 112 14 C 116 30 110 50 106 62' },
    { d: 'M92 74 C 71 85 55 84 44 76 C 58 66 79 66 92 66' },
    { d: 'M108 76 C 122 95 124 111 118 123 C 106 113 100 93 100 79' },
    { d: 'M100 70 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0', dashed: true },
    { d: 'M100 70 h58 M158 64 v12', accent: true },
    { d: 'M36 20 l12 0 M36 20 l0 12', accent: true },
  ],
  bracket: [
    { d: 'M45 115 h110 l-18 -70 h-40 l-52 70 z' },
    { d: 'M60 108 a6 6 0 1 1 0.01 0 M140 108 a6 6 0 1 1 0.01 0 M112 55 a6 6 0 1 1 0.01 0' },
    { d: 'M78 100 l24 -38 l18 38 z' },
    { d: 'M45 122 h110', accent: true },
    { d: 'M45 128 v-6 M155 128 v-6', accent: true },
    { d: 'M97 45 h-45 l52 -20 z', dashed: true },
  ],
}

export default function TechnicalDrawing({
  kind,
  reduced,
  className = '',
  animate = true,
}: {
  kind: Project['drawing']
  reduced: boolean
  className?: string
  animate?: boolean
}) {
  const paths = PATHS[kind]
  const still = reduced || !animate
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className} aria-hidden>
      {paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke={p.accent ? 'var(--color-accent)' : 'var(--color-blueprint)'}
          strokeOpacity={p.accent ? 0.9 : 0.75}
          strokeWidth={p.accent ? 1 : 1.4}
          strokeDasharray={p.dashed ? '3 5' : undefined}
          initial={still ? false : { pathLength: 0, opacity: 0 }}
          whileInView={still ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay: 0.15 + i * 0.14, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}
