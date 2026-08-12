import { useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/hero/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { useSmoothScroll, usePrefersReducedMotion, useIsMobile } from './lib/scroll'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const [booted, setBooted] = useState(false)

  // Lenis smooth scroll (skipped when the user prefers reduced motion)
  useSmoothScroll(!reduced)

  return (
    <>
      <Loader onDone={() => setBooted(true)} skip={reduced} />
      <Cursor enabled={!mobile && !reduced} />
      <ScrollProgress />
      <Navbar ready={booted} />

      <main>
        <Hero started={booted} reduced={reduced} mobile={mobile} />
        <About reduced={reduced} />
        <Experience reduced={reduced} />
        <Projects />
        <Skills reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
    </>
  )
}
