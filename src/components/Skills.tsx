import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { SKILLS, CERTIFICATES, type Certificate } from '../data/content'

/* ---------- certificate row — reveals its preview only once clicked ---------- */
function CertificateRow({ cert, index }: { cert: Certificate; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="border border-line bg-ink">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="link"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-panel/60"
      >
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[9px] tracking-[0.2em] text-ghost">
            C-{String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h4 className="text-sm font-medium text-[#201c22]">{cert.title}</h4>
            <p className="mt-1 font-mono text-[9px] tracking-[0.15em] text-ghost">
              {cert.org} · {cert.date}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 font-mono text-lg leading-none text-accent transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line"
          >
            <div className="p-5">
              <p className="max-w-xl text-xs leading-relaxed text-fog">{cert.note}</p>
              <img
                src={cert.preview}
                alt={`${cert.title} certificate preview`}
                loading="lazy"
                className="mt-4 h-auto w-full max-w-[280px] border border-line"
              />
              <a
                href={cert.file}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="mt-4 inline-block border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-fog transition-colors hover:border-accent hover:text-accent"
              >
                VIEW FULL CERTIFICATE ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ---------- skill tile — flips on click to reveal its category, since
   there's no honest way to give it a proficiency score ---------- */
function SkillTile({ skill, index }: { skill: { id: string; name: string; cat: string }; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.li variants={tileVariants} className="relative bg-ink" style={{ perspective: 800 }}>
      <button
        onClick={() => setFlipped((v) => !v)}
        data-cursor="link"
        aria-pressed={flipped}
        aria-label={`${skill.name} — ${flipped ? 'showing category' : 'show category'}`}
        className="group block h-24 w-full text-left"
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* front */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 flex flex-col justify-center gap-1.5 p-4 transition-colors duration-300 group-hover:bg-panel"
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-ghost">
              S-{String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-sm font-medium leading-snug text-[#201c22] transition-colors group-hover:text-accent">
              {skill.name}
            </h3>
          </div>
          {/* back */}
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 flex flex-col justify-center gap-1.5 bg-accent p-4"
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-ink/70">CATEGORY</span>
            <p className="font-mono text-xs leading-snug tracking-wide text-ink">{skill.cat}</p>
          </div>
        </motion.div>
      </button>
      <span className="pointer-events-none absolute right-2 top-2 size-1.5 border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent-dim" />
    </motion.li>
  )
}

export default function Skills({ reduced }: { reduced: boolean }) {
  return (
    <section id="skills" className="relative border-y border-line/60 bg-panel/30 py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">04 / TOOLING</p>
        <h2 className="mb-12 text-3xl font-medium text-[#201c22] md:text-4xl">
          Skills Panel<span className="text-accent">.</span>
        </h2>

        <motion.ul
          className="grid grid-cols-3 gap-px border border-line bg-line sm:grid-cols-4 md:grid-cols-6"
          variants={reduced ? undefined : gridVariants}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILLS.map((skill, i) => (
            <SkillTile key={skill.id} skill={skill} index={i} />
          ))}
        </motion.ul>

        <p className="mt-6 text-right font-mono text-[10px] tracking-[0.2em] text-ghost">
          {SKILLS.length} TOOLS ON RECORD / TAP A TILE TO FLIP
        </p>

        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-xl font-medium text-[#201c22] md:text-2xl">
              Certifications<span className="text-accent">.</span>
            </h3>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-ghost md:block">
              {CERTIFICATES.length} ON FILE / CLICK TO EXPAND
            </span>
          </div>
          <ul className="space-y-3">
            {CERTIFICATES.map((cert, i) => (
              <CertificateRow key={cert.id} cert={cert} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
