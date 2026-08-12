/* ==========================================================================
   INTERACTIVE CAD VIEWER — renders the .glb files converted from the STEP
   exports in /public/models.

   Two modes:
     card    — a slowly turning preview on a project card. Uses the tiny
               <name>-preview.glb twin and ignores pointer events, so the
               card's own tilt/click behaviour still works.
     inspect — the full-detail model in the project detail view, with
               drag-to-rotate and scroll-to-zoom.

   The projects grid renders every card at once, so a naive implementation
   would spin up six WebGL contexts with multi-megabyte models on one page.
   Three things stop that: the canvas is only mounted while the card is
   actually on screen, the pixel ratio is capped, and phones/reduced-motion
   users get the static image instead of WebGL at all.
   ========================================================================== */
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { usePrefersReducedMotion, useIsMobile } from '../lib/scroll'

/* three.js is a ~1.1 MB chunk — keep it out of the initial page load */
const ModelCanvas = lazy(() => import('./ModelCanvas'))

class ModelBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** Swap ".glb" for "-preview.glb" — the heavily simplified card twin. */
export function previewSrc(src: string) {
  return src.replace(/\.glb$/, '-preview.glb')
}

export default function ModelViewer({
  src,
  mode = 'card',
  fallback,
  className = '',
}: {
  src: string
  mode?: 'card' | 'inspect'
  /* shown on phones, reduced-motion, WebGL failure or a bad model file —
     never an empty box */
  fallback: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()

  /* Mount the canvas only while this card is on screen, and tear it down
     when it leaves, so at most a couple of contexts are ever alive. */
  useEffect(() => {
    if (reduced || mobile || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: '200px' }, // start loading just before it scrolls in
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, mobile])

  if (reduced || mobile) return <>{fallback}</>

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* the still image sits underneath until the model has drawn, so the
          slot is never blank while the chunk and .glb download */}
      <div className="absolute inset-0">{fallback}</div>
      {visible && (
        <ModelBoundary fallback={<></>}>
          <Suspense fallback={null}>
            <ModelCanvas src={src} mode={mode} spin={hovered ? 2.4 : 0.5} />
          </Suspense>
        </ModelBoundary>
      )}
    </div>
  )
}
