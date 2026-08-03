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
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="origin-center transition-transform duration-500 group-hover:rotate-90"
            >
              <circle r="5.5" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(45)" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(90)" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(135)" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(180)" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(225)" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(270)" />
              <path d="M-1.4 -5.5 L-0.8 -8.2 Q0 -8.8 0.8 -8.2 L1.4 -5.5" transform="rotate(315)" />
            </g>
          </svg>
          <span className="font-mono text-xs tracking-[0.25em] text-[#201c22]">
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
                className="group font-mono text-[11px] tracking-[0.2em] text-fog transition-colors hover:text-[#201c22]"
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
          EMAIL
        </a>
        <span className="font-mono text-[10px] tracking-widest text-ghost md:hidden">
          {IDENTITY.location}
        </span>
      </nav>
    </motion.header>
  )
}
