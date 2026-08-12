import { motion } from 'framer-motion'
import { EXPERIENCE } from '../data/content'

/* ==========================================================================
   EXPERIENCE — industrial placements, given their own section.
   This previously existed only as a PDF filed under Certifications, where
   an employer scanning the page would never find it. Work experience is the
   first thing they look for, so it sits directly after About and ahead of
   the project work.
   ========================================================================== */
export default function Experience({ reduced }: { reduced: boolean }) {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">02 / EXPERIENCE</p>
        <h2 className="mb-12 text-3xl font-medium text-[#201c22] md:text-4xl">
          In The Field<span className="text-accent">.</span>
        </h2>

        <div className="space-y-6">
          {EXPERIENCE.map((job, i) => (
            <motion.article
              key={job.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="hud-corners border border-line bg-panel/40 p-6 md:p-9"
            >
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                {/* left rail — who and when */}
                <div className="md:border-r md:border-line md:pr-8">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-accent">{job.date}</p>
                  <h3 className="mt-3 text-xl font-medium leading-snug text-[#201c22] md:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 font-mono text-xs tracking-[0.15em] text-fog">{job.org}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ghost">
                    {job.location}
                  </p>
                  {job.file && (
                    <a
                      href={job.file}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="mt-5 inline-flex items-center gap-2 border border-line px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] text-fog transition-colors hover:border-accent hover:text-accent"
                    >
                      LETTER OF EXPERIENCE ↗
                    </a>
                  )}
                </div>

                {/* right — what was actually done */}
                <div>
                  <p className="leading-relaxed text-fog">{job.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-fog">
                        <span aria-hidden className="mt-[7px] size-1.5 shrink-0 bg-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
