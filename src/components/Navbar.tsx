import { motion } from 'framer-motion'
import { IDENTITY, NAV } from '../data/content'
import { scrollToSection } from '../lib/scroll'

export default function Navbar({ ready }: { ready: boolean }) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-60 border-b border-line/60 bg-ink/70 backdrop-blur-md"
      initial={{ y: -64, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0 })}
          data-cursor="link"
          className="group flex items-center gap-3"
          aria-label="Back to top"
        >
          <svg width="22" height="22" viewBox="-11 -11 22 22" aria-hidden>
            <g
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              fill="none"
              className="origin-center transition-transform duration-500 group-hover:rotate-90"
            >
              <circle r="5" />
              <path d="M0 -9v3M0 6v3M-9 0h3M6 0h3M-6.4 -6.4l2.2 2.2M4.2 4.2l2.2 2.2M6.4 -6.4l-2.2 2.2M-4.2 4.2l-2.2 2.2" />
            </g>
          </svg>
          <span className="font-mono text-xs tracking-[0.25em] text-white">
            {IDENTITY.firstName}
            <span className="text-accent">.SYS</span>
          </span>
        </button>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                data-cursor="link"
                className="group font-mono text-[11px] tracking-[0.2em] text-fog transition-colors hover:text-white"
              >
                <span className="mr-1.5 text-accent/70 group-hover:text-accent">
                  {item.num}/
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${IDENTITY.email}`}
          data-cursor="link"
          className="hidden border border-accent/50 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-ink md:block"
        >
          HIRE
        </a>
        <span className="font-mono text-[10px] tracking-widest text-ghost md:hidden">
          {IDENTITY.location}
        </span>
      </nav>
    </motion.header>
  )
}
