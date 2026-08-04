import { motion } from 'framer-motion'
import { IDENTITY } from '../data/content'
import MagneticButton from './MagneticButton'

/** Hex bolt that rotates and "locks into place" as the section arrives —
 *  the page's mechanical full-stop. */
function LockingBolt({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto mb-10 h-20 w-20">
      {/* socket */}
      <svg viewBox="-40 -40 80 80" className="absolute inset-0" aria-hidden>
        <polygon
          points="0,-34 29.4,-17 29.4,17 0,34 -29.4,17 -29.4,-17"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
        <circle r="38" fill="none" stroke="var(--color-line)" strokeWidth="0.75" strokeDasharray="2 6" />
      </svg>
      {/* bolt head */}
      <motion.svg
        viewBox="-40 -40 80 80"
        className="absolute inset-0"
        initial={reduced ? false : { rotate: 150, scale: 1.6, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
        aria-hidden
      >
        <polygon
          points="0,-28 24.2,-14 24.2,14 0,28 -24.2,14 -24.2,-14"
          fill="var(--color-panel)"
          stroke="var(--color-accent)"
          strokeWidth="2"
        />
        <circle r="9" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
        <text y="3" textAnchor="middle" fontSize="7" fill="var(--color-accent)" fontFamily="var(--font-mono)">
          M12
        </text>
      </motion.svg>
      {/* torque flash on lock */}
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full border border-accent"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: [0, 0.8, 0], scale: [0.6, 1.5, 1.7] }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, delay: 0.9 }}
          aria-hidden
        />
      )}
    </div>
  )
}

export default function Contact({ reduced }: { reduced: boolean }) {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="bp-grid absolute inset-0 opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <LockingBolt reduced={reduced} />
        <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">04 / CONTACT</p>
        <h2 className="text-3xl font-medium text-[#201c22] md:text-5xl">
          Assembly complete<span className="text-accent">.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-fog">
          Thanks for taking the time to explore my work. I hope this portfolio gave you a sense
          of how I think, design, and solve problems. If you'd like to learn more, I'd love to
          connect!
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={IDENTITY.resumeUrl} variant="solid" download>
            RESUME.PDF ↓
          </MagneticButton>
          <MagneticButton href={IDENTITY.linkedin}>LINKEDIN</MagneticButton>
        </div>
      </div>

      <div className="relative mx-auto mt-28 max-w-3xl border-t border-line/60 px-5 pt-10 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] text-accent">End of Transmission.</p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.3em] text-accent">
          The next project starts with a conversation.
        </p>
      </div>

      <footer className="relative mt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 pb-2 font-mono text-[10px] tracking-[0.2em] text-ghost md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} {IDENTITY.name} — ALL TOLERANCES NOMINAL</span>
          <span>{IDENTITY.coordinates}</span>
          <span>DWG NO. PORTFOLIO-2026 / SHEET 1 OF 1</span>
        </div>
      </footer>
    </section>
  )
}
