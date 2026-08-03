import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/** Semi-circular calibration gauge. The needle is driven by GSAP. */
function Gauge({ label, value, index }: { label: string; value: number; index: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="92" height="58" viewBox="0 0 92 58" aria-hidden>
        {/* tick ring */}
        {Array.from({ length: 11 }).map((_, i) => {
          const a = Math.PI - (i / 10) * Math.PI
          const x1 = 46 + Math.cos(a) * 38
          const y1 = 52 - Math.sin(a) * 38
          const x2 = 46 + Math.cos(a) * (i % 5 === 0 ? 30 : 34)
          const y2 = 52 - Math.sin(a) * (i % 5 === 0 ? 30 : 34)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-line)" strokeWidth="1.5" />
        })}
        <path d="M 8 52 A 38 38 0 0 1 84 52" fill="none" stroke="var(--color-line)" strokeWidth="1" />
        {/* needle — rotated by the section timeline */}
        <g className={`gauge-needle gauge-needle-${index}`} style={{ transformOrigin: '46px 52px', transform: 'rotate(-90deg)' }}>
          <line x1="46" y1="52" x2="46" y2="18" stroke="var(--color-accent)" strokeWidth="2" />
        </g>
        <circle cx="46" cy="52" r="3.5" fill="var(--color-panel)" stroke="var(--color-accent)" strokeWidth="1.5" />
      </svg>
      <span className="font-mono text-[9px] tracking-[0.2em] text-ghost">{label}</span>
      <span className="gauge-value font-mono text-xs text-accent tabular-nums" data-value={value}>
        000
      </span>
    </div>
  )
}

export default function About({ reduced }: { reduced: boolean }) {
  const wrap = useRef<HTMLElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (reduced) {
      // static fallback: everything visible, gauges at final value
      const el = wrap.current
      if (!el) return
      el.querySelectorAll<HTMLElement>('.gauge-value').forEach((n) => {
        n.textContent = String(n.dataset.value).padStart(3, '0')
      })
      el.querySelectorAll<HTMLElement>('.gauge-needle').forEach((n, i) => {
        n.style.transform = `rotate(${-90 + ABOUT.gauges[i].value * 1.8}deg)`
      })
      setPct(100)
      return
    }

    const ctx = gsap.context(() => {
      const specs = gsap.utils.toArray<HTMLElement>('.spec-line')

      gsap.set(specs, { autoAlpha: 0, x: -18 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => setPct(Math.round(self.progress * 100)),
        },
      })

      // spec sheet populates line by line across the whole scrub
      specs.forEach((line, i) => {
        tl.to(line, { autoAlpha: 1, x: 0, duration: 0.35 }, 0.3 + i * 0.55)
      })

      // gauges calibrate with a mechanical overshoot
      ABOUT.gauges.forEach((g, i) => {
        const proxy = { v: 0 }
        tl.to(
          `.gauge-needle-${i}`,
          { rotation: -90 + g.value * 1.8, duration: 1.2, ease: 'back.out(2.5)' },
          2.2 + i * 0.5,
        ).to(
          proxy,
          {
            v: g.value,
            duration: 1.2,
            onUpdate() {
              const nodes = wrap.current?.querySelectorAll('.gauge-value')
              const node = nodes?.[i]
              if (node) node.textContent = String(Math.round(proxy.v)).padStart(3, '0')
            },
          },
          2.2 + i * 0.5,
        )
      })
    }, wrap)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={wrap} id="about" className="relative">
      <div className="relative flex min-h-screen items-center overflow-hidden">
        <div className="bp-grid absolute inset-0 opacity-15" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8">
          {/* left — narrative phases */}
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">01 / ABOUT</p>
            <h2 className="mb-10 text-3xl font-medium text-[#201c22] md:text-4xl">
              Engineer Profile<span className="text-accent">.</span>
            </h2>
            <div>
              <h3 className="mb-4 text-xl font-medium text-[#201c22] md:text-2xl">{ABOUT.intro.title}</h3>
              <p className="max-w-md text-justify leading-relaxed text-fog [hyphens:auto]">{ABOUT.intro.body}</p>
            </div>
          </div>

          {/* right — HUD spec sheet */}
          <div className="hud-corners self-center border border-line bg-panel/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] tracking-[0.25em]">
              <span className="text-fog">ENGINEER SPECS</span>
              <span className="text-accent tabular-nums">SCRUB {String(pct).padStart(3, '0')}%</span>
            </div>
            <dl className="space-y-3">
              {ABOUT.specs.map((s) => (
                <div key={s.k} className="spec-line flex items-baseline justify-between gap-4 border-b border-line/40 pb-2 font-mono text-xs">
                  <dt className="shrink-0 tracking-[0.2em] text-ghost">{s.k}</dt>
                  <dd className="text-right tracking-wider text-[#201c22]">{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex justify-between gap-2">
              {ABOUT.gauges.map((g, i) => (
                <Gauge key={g.label} label={g.label} value={g.value} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
