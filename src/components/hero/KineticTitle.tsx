import { useEffect, useState } from 'react'

const GLYPHS = '▮▯/\\_+*#=<>[]{}01'

/** "CNC toolpath" text reveal — characters cycle through machine glyphs
 *  before locking into place, left to right. */
export default function KineticTitle({
  text,
  start,
  delay = 0,
  className = '',
  reduced,
}: {
  text: string
  start: boolean
  delay?: number
  className?: string
  reduced: boolean
}) {
  const [display, setDisplay] = useState(reduced ? text : '')
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setDisplay(text)
      setDone(true)
      return
    }
    if (!start) return
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      const t0 = performance.now()
      const LOCK_STEP = 55 // ms per character lock-in
      interval = setInterval(() => {
        const elapsed = performance.now() - t0
        const locked = Math.floor(elapsed / LOCK_STEP)
        if (locked >= text.length) {
          setDisplay(text)
          setDone(true)
          clearInterval(interval)
          return
        }
        let out = text.slice(0, locked)
        // a couple of characters "being machined" ahead of the lock point
        for (let i = locked; i < Math.min(text.length, locked + 3); i++) {
          out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
        setDisplay(out)
      }, 34)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [start, text, delay, reduced])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
      {!done && start && (
        <span aria-hidden className="text-accent">
          ▮
        </span>
      )}
    </span>
  )
}
