import { motion, type Variants } from 'framer-motion'
import { SKILLS } from '../data/content'

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
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

export default function Skills({ reduced }: { reduced: boolean }) {
  return (
    <section id="skills" className="relative border-y border-line/60 bg-panel/30 py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">03 / TOOLING</p>
        <h2 className="mb-12 text-3xl font-medium text-[#201c22] md:text-4xl">
          Skills Panel<span className="text-accent">.</span>
        </h2>

        <motion.ul
          className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
          variants={reduced ? undefined : gridVariants}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILLS.map((skill, i) => (
            <motion.li
              key={skill.id}
              variants={reduced ? undefined : tileVariants}
              data-cursor="link"
              className="group relative bg-ink p-5 transition-colors duration-300 hover:bg-panel"
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-ghost">
                T-{String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-sm font-medium text-[#201c22] transition-colors group-hover:text-accent">
                {skill.name}
              </h3>
              <p className="mt-0.5 font-mono text-[9px] tracking-[0.15em] text-ghost">{skill.cat}</p>
              {/* calibration bar — fills with a slight overshoot */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[3px] flex-1 bg-line">
                  <motion.div
                    className="h-full bg-accent/80 group-hover:bg-accent"
                    initial={reduced ? false : { width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.06,
                      type: 'spring',
                      stiffness: 60,
                      damping: 12,
                    }}
                  />
                </div>
                <span className="font-mono text-[9px] text-fog tabular-nums">{skill.level}</span>
              </div>
              {/* corner tick appears on hover */}
              <span className="absolute right-2 top-2 size-1.5 border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent-dim" />
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-6 text-right font-mono text-[10px] tracking-[0.2em] text-ghost">
          CALIBRATION SCALE 0–100 / SELF-ASSESSED
        </p>
      </div>
    </section>
  )
}
