import { lazy, Suspense, useEffect, useRef, useState, Component, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import gsap from 'gsap'
import { IDENTITY } from '../../data/content'
import KineticTitle from './KineticTitle'
import TechnicalDrawing from '../TechnicalDrawing'
import type { HeroAnim } from './AssemblyScene'

// lazy-load the three.js bundle so first paint isn't blocked by it
const AssemblyScene = lazy(() => import('./AssemblyScene'))

/* Static blueprint shown when WebGL is unavailable or crashes (old iOS
   Safari has no WebGL2; newer ones sometimes drop the context under
   memory pressure) — the hero never renders empty. */
function StaticHeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <TechnicalDrawing kind="gear" reduced={false} className="h-[46vh] w-auto max-w-[88vw] opacity-70" />
      <span className="absolute bottom-[16vh] font-mono text-[9px] tracking-[0.3em] text-ghost">
        FIG. 001-S — STATIC VIEW
      </span>
    </div>
  )
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function Hero({
  started,
  reduced,
  mobile,
}: {
  started: boolean
  reduced: boolean
  mobile: boolean
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const anim = useRef<HeroAnim>({ intro: reduced ? 0 : 1, explode: 0 })
  const [glFailed, setGlFailed] = useState(false)

  /* scroll through this 260vh section drives the exploded view */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    anim.current.explode = reduced ? 0 : v
  })

  /* fly-in assembly once the boot loader finishes */
  useEffect(() => {
    if (!started || reduced) return
    const tween = gsap.to(anim.current, {
      intro: 0,
      duration: 2.2,
      ease: 'power3.inOut',
    })
    return () => {
      tween.kill()
    }
  }, [started, reduced])

  /* headline fades/lifts away as the assembly explodes */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -60])
  const hudOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.85, 1], [0, 1, 1, 0])
  const scrollHint = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  /* blueprint grid parallax follows the mouse */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const gx = useSpring(mx, { stiffness: 40, damping: 20 })
  const gy = useSpring(my, { stiffness: 40, damping: 20 })
  useEffect(() => {
    if (reduced || mobile) return
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * -24)
      my.set((e.clientY / window.innerHeight - 0.5) * -24)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mobile, mx, my])

  return (
    <section ref={sectionRef} id="hero" className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* parallax blueprint grid */}
        <motion.div
          className="bp-grid absolute -inset-8 opacity-40"
          style={{
            x: gx,
            y: gy,
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 75%)',
          }}
          aria-hidden
        />
        {/* faint dimension circle behind the model */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
          width="640"
          height="640"
          viewBox="-320 -320 640 640"
          aria-hidden
        >
          <circle r="270" fill="none" stroke="var(--color-blueprint)" strokeWidth="0.5" strokeDasharray="3 9" className="dash-crawl" />
          <circle r="210" fill="none" stroke="var(--color-line)" strokeWidth="0.75" />
          <g stroke="var(--color-line)" strokeWidth="0.75">
            <line x1="-300" y1="0" x2="-240" y2="0" />
            <line x1="240" y1="0" x2="300" y2="0" />
            <line x1="0" y1="-300" x2="0" y2="-240" />
            <line x1="0" y1="240" x2="0" y2="300" />
          </g>
          <text x="250" y="-14" fill="var(--color-ghost)" fontSize="10" fontFamily="var(--font-mono)">
            R270.0
          </text>
        </svg>

        {/* 3D canvas — falls back to a static blueprint if WebGL fails */}
        <div className="absolute inset-0">
          {glFailed ? (
            <StaticHeroFallback />
          ) : (
            <SceneBoundary fallback={<StaticHeroFallback />}>
              <Suspense fallback={null}>
                <AssemblyScene
                  anim={anim}
                  reduced={reduced}
                  mobile={mobile}
                  onFail={() => setGlFailed(true)}
                />
              </Suspense>
            </SceneBoundary>
          )}
        </div>

        {/* headline overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.p
            className="mb-4 font-mono text-[11px] tracking-[0.4em] text-accent"
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            // PORTFOLIO v2.0 — {IDENTITY.location}
          </motion.p>
          <h1 className="font-mono text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-none tracking-tight text-white">
            <KineticTitle text={IDENTITY.name} start={started} delay={500} reduced={reduced} />
          </h1>
          <div className="mt-5 flex items-center gap-4">
            <span className="hidden h-px w-16 bg-line sm:block" />
            <h2 className="font-mono text-[clamp(0.65rem,2vw,0.85rem)] tracking-[0.35em] text-fog">
              <KineticTitle text={IDENTITY.role} start={started} delay={1500} reduced={reduced} />
            </h2>
            <span className="hidden h-px w-16 bg-line sm:block" />
          </div>
          <motion.p
            className="mt-8 max-w-md text-sm leading-relaxed text-fog/90 sm:text-base"
            initial={{ opacity: 0, y: 14 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {IDENTITY.tagline}
          </motion.p>
        </motion.div>

        {/* HUD readout while exploding */}
        <motion.div
          className="pointer-events-none absolute left-5 top-20 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-ghost md:left-8"
          style={{ opacity: hudOpacity }}
          aria-hidden
        >
          <p className="text-accent">▸ EXPLODED VIEW</p>
          <p>ASSEMBLY: GBX-2000 [PLACEHOLDER]</p>
          <p>PARTS: 13 / FASTENERS: 6</p>
          <p>SCALE 1:1 · THIRD ANGLE</p>
        </motion.div>

        {/* corner frame + coordinates */}
        <div className="pointer-events-none absolute inset-x-5 bottom-6 flex items-end justify-between font-mono text-[10px] tracking-[0.2em] text-ghost md:inset-x-8" aria-hidden>
          <span>{IDENTITY.coordinates}</span>
          <motion.div style={{ opacity: scrollHint }} className="flex flex-col items-center gap-2">
            <span className="text-fog">SCROLL TO DISASSEMBLE</span>
            <motion.span
              className="block h-8 w-px bg-gradient-to-b from-accent to-transparent"
              animate={reduced ? {} : { scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="hidden sm:block">FIG. 001 — HERO ASSEMBLY</span>
        </div>
      </div>
    </section>
  )
}
