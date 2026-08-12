import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { PROJECTS, previewSrc, type Project } from '../data/content'
import TechnicalDrawing from './TechnicalDrawing'
import ModelViewer from './ModelViewer'
import { getLenis, usePrefersReducedMotion, useIsMobile } from '../lib/scroll'

/* ---------- media gallery for the expanded detail view ---------- */
function ProjectGallery({ project, reduced, className }: { project: Project; reduced: boolean; className?: string }) {
  const [i, setI] = useState(0)
  const media = project.media

  if (!media || media.length === 0) {
    return (
      <TechnicalDrawing
        kind={project.drawing}
        reduced={reduced}
        className={className ?? 'mx-auto h-56 w-full max-w-md md:h-64'}
      />
    )
  }

  const current = media[i]
  const go = (e: MouseEvent, delta: number) => {
    e.stopPropagation()
    setI((n) => (n + delta + media.length) % media.length)
  }

  return (
    <div className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        {current.type === 'model' ? (
          <ModelViewer
            key={current.src}
            src={current.src}
            mode="inspect"
            className="h-full w-full"
            fallback={
              <div className="flex h-full w-full items-center justify-center px-6 text-center font-mono text-[10px] tracking-[0.2em] text-ghost">
                3D MODEL UNAVAILABLE ON THIS DEVICE
              </div>
            }
          />
        ) : current.type === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          />
        ) : (
          <img
            key={current.src}
            src={current.src}
            alt={`${project.title} — view ${i + 1} of ${media.length}`}
            className="h-full w-full object-contain"
          />
        )}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => go(e, -1)}
              data-cursor="link"
              aria-label="Previous media"
              className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center border border-line bg-panel/80 text-fog backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              ‹
            </button>
            <button
              onClick={(e) => go(e, 1)}
              data-cursor="link"
              aria-label="Next media"
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center border border-line bg-panel/80 text-fog backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              ›
            </button>
          </>
        )}
      </div>
      {media.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {media.map((m, idx) => (
            <button
              key={m.src}
              onClick={(e) => {
                e.stopPropagation()
                setI(idx)
              }}
              data-cursor="link"
              aria-label={`Show ${m.type} ${idx + 1}`}
              className={`h-1.5 w-5 transition-colors ${idx === i ? 'bg-accent' : 'bg-line hover:bg-ghost'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- project card with 3D tilt + annotation overlay ---------- */
function ProjectCard({
  project,
  onOpen,
  reduced,
  mobile,
}: {
  project: Project
  onOpen: () => void
  reduced: boolean
  mobile: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 260, damping: 22 })
  const sry = useSpring(ry, { stiffness: 260, damping: 22 })

  const onMove = (e: MouseEvent) => {
    if (reduced || mobile || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -9)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const accentClass = project.accent === 'accent' ? 'text-accent' : 'text-blueprint'

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        layoutId={`card-${project.id}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onOpen}
        data-cursor="link"
        data-cursor-label="INSPECT"
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative cursor-pointer overflow-hidden border border-line bg-panel/60 transition-colors duration-300 hover:border-accent/60"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen()
          }
        }}
        aria-label={`Open project: ${project.title}`}
      >
        {/* header strip */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[10px] tracking-[0.25em]">
          <span className="text-ghost">{project.index}</span>
          <span className={accentClass}>● REV A</span>
        </div>

        {/* drawing viewport */}
        <div className="bp-grid relative aspect-[16/10] overflow-hidden [background-size:60px_60px,60px_60px,12px_12px,12px_12px]">
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
            {(() => {
              const still = project.media?.find((m) => m.type === 'image')
              /* object-contain, not cover: these renders have their backgrounds
                 removed, so letterboxing shows the blueprint grid behind them
                 rather than cropping the part out of frame. */
              const image = still ? (
                <img src={still.src} alt={project.title} className="h-full w-full object-contain" />
              ) : (
                <TechnicalDrawing kind={project.drawing} reduced={reduced} className="h-full w-full p-4" />
              )
              return project.model ? (
                <ModelViewer
                  src={previewSrc(project.model)}
                  mode="card"
                  className="h-full w-full"
                  fallback={image}
                />
              ) : (
                image
              )
            })()}
          </div>
          {/* hover annotation overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink via-ink/85 to-transparent px-5 pb-4 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <dl className="space-y-1 font-mono text-[10px] tracking-[0.15em]">
              {project.annotations.map((a) => (
                <div key={a.k} className="flex justify-between">
                  <dt className="text-ghost">{a.k}</dt>
                  <dd className={accentClass}>{a.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* title block */}
        <div className="px-5 py-4">
          <h3 className="font-mono text-sm font-semibold tracking-wider text-[#201c22]">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-fog">
            {project.course} · {project.year}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- expanded detail panel (shared-layout morph) ---------- */
function ProjectDetail({
  project,
  onClose,
  reduced,
}: {
  project: Project
  onClose: () => void
  reduced: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const accentClass = project.accent === 'accent' ? 'text-accent' : 'text-blueprint'

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-8">
      <motion.div
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${project.id}`}
        className="hud-corners relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden border border-line bg-panel"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4 font-mono text-[10px] tracking-[0.25em]">
          <span className="text-ghost">
            {project.index} / DETAIL VIEW
          </span>
          <button
            onClick={onClose}
            data-cursor="link"
            className="border border-line px-3 py-1.5 text-fog transition-colors hover:border-accent hover:text-accent"
            aria-label="Close detail view"
          >
            CLOSE [ESC]
          </button>
        </div>

        <motion.div
          className="overflow-y-auto px-6 py-6 md:px-8"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: reduced ? 0 : 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <h3 className="font-mono text-xl font-bold tracking-wide text-[#201c22] md:text-2xl">
            {project.title}
          </h3>
          <p className={`mt-1 font-mono text-xs tracking-[0.2em] ${accentClass}`}>
            {`${project.course} · ${project.year}`.toUpperCase()}
          </p>

          <div className="bp-grid mt-6 border border-line/60 [background-size:80px_80px,80px_80px,16px_16px,16px_16px]">
            <ProjectGallery project={project} reduced={reduced} />
          </div>

          <p className="mt-6 text-justify leading-relaxed text-fog [hyphens:auto]">{project.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line pt-5 sm:grid-cols-2">
            {project.specs.map((s) => (
              <div key={s.k} className="flex justify-between gap-4 border-b border-line/40 py-1.5 font-mono text-[11px]">
                <span className="tracking-[0.15em] text-ghost">{s.k}</span>
                <span className="text-right text-[#201c22]">{s.v}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span key={t} className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-widest text-fog">
                {t}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-fog transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const open = PROJECTS.find((p) => p.id === openId)

  // freeze smooth scrolling while the detail panel is up
  useEffect(() => {
    const lenis = getLenis()
    if (openId) lenis?.stop()
    else lenis?.start()
  }, [openId])

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">02 / PROJECTS</p>
          <h2 className="text-3xl font-medium text-[#201c22] md:text-4xl">
            Build log<span className="text-accent">.</span>
          </h2>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-ghost md:block">
          {PROJECTS.length} ENTRIES / CLICK TO INSPECT
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onOpen={() => setOpenId(p.id)}
            reduced={reduced}
            mobile={mobile}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && <ProjectDetail project={open} onClose={() => setOpenId(null)} reduced={reduced} />}
      </AnimatePresence>
    </section>
  )
}
