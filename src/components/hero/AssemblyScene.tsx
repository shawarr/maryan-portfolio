/* ==========================================================================
   HERO 3D SCENE — placeholder parametric gearbox.
   SWAP POINT: to use a real CAD model, export it as a Draco-compressed .glb,
   drop it in /public/models/, and replace the <GearboxAssembly> below with
   drei's useGLTF — keep the <Part> wrappers if you want the exploded-view
   scroll behaviour (one <Part> per node, with an `off` explode vector).
   ========================================================================== */
import { useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Html, Edges, RoundedBox, Grid } from '@react-three/drei'
import * as THREE from 'three'

export type HeroAnim = {
  /** 1 → parts scattered off-screen (page load), 0 → assembled */
  intro: number
  /** scroll-driven exploded view, 0 assembled → 1 exploded */
  explode: number
}

type Mats = Record<'steel' | 'graphite' | 'anodized', {
  color: string
  metalness: number
  roughness: number
}>

/* Desktop gets high-metalness surfaces lit by a procedural environment map.
   iOS Safari renders that env map unreliably (half-float framebuffers), and
   metallic surfaces without an env map go black — so mobile uses lower
   metalness and is lit by direct lights only. */
const DESKTOP_MATS: Mats = {
  steel: { color: '#c7c1c6', metalness: 0.9, roughness: 0.28 },
  graphite: { color: '#2b2830', metalness: 0.7, roughness: 0.45 },
  anodized: { color: '#db2777', metalness: 0.55, roughness: 0.32 },
}
const MOBILE_MATS: Mats = {
  steel: { color: '#cec7cc', metalness: 0.35, roughness: 0.42 },
  graphite: { color: '#332f37', metalness: 0.25, roughness: 0.55 },
  anodized: { color: '#db2777', metalness: 0.3, roughness: 0.45 },
}

/* ---------- parametric gear geometry ---------- */
function useGearGeometry(teeth: number, radius: number, depth: number, holeR: number) {
  return useMemo(() => {
    const shape = new THREE.Shape()
    const root = radius * 0.84
    const step = (Math.PI * 2) / teeth
    for (let i = 0; i < teeth; i++) {
      const a = i * step
      const profile: [number, number][] = [
        [root, a],
        [root, a + step * 0.24],
        [radius, a + step * 0.34],
        [radius, a + step * 0.56],
        [root, a + step * 0.66],
      ]
      profile.forEach(([r, ang], j) => {
        const x = Math.cos(ang) * r
        const y = Math.sin(ang) * r
        if (i === 0 && j === 0) shape.moveTo(x, y)
        else shape.lineTo(x, y)
      })
    }
    shape.closePath()
    const hole = new THREE.Path()
    hole.absarc(0, 0, holeR, 0, Math.PI * 2, true)
    shape.holes.push(hole)
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 1,
      curveSegments: 6,
    })
    geo.center()
    return geo
  }, [teeth, radius, depth, holeR])
}

/* ---------- annotation label rendered next to a part ---------- */
function Annotation({
  text,
  side,
  refCb,
}: {
  text: string
  side: 'left' | 'right'
  refCb: RefObject<HTMLDivElement | null>
}) {
  // wrapperClass hides drei's portaled wrapper too — without it the zero-width
  // wrapper still tracks the exploded part past the right screen edge and makes
  // the whole page scroll sideways on mobile.
  return (
    <Html zIndexRange={[30, 0]} center style={{ pointerEvents: 'none' }} wrapperClass="hidden md:block">
      <div
        ref={refCb}
        className="select-none"
        style={{ opacity: 0, transition: 'opacity 0.15s linear' }}
      >
        <div
          className={`flex items-center gap-0 ${
            side === 'left' ? 'flex-row-reverse translate-x-[-50%]' : 'translate-x-[50%]'
          }`}
        >
          <span className="block size-1.5 rounded-full bg-accent" />
          <span className="block h-px w-12 bg-accent/60" />
          <span className="whitespace-nowrap border border-line bg-ink/85 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.15em] text-fog backdrop-blur-sm">
            {text}
          </span>
        </div>
      </div>
    </Html>
  )
}

/* ---------- one exploded-view part ---------- */
function Part({
  anim,
  pos,
  off,
  tumble = [0.4, 0.6, 0.3],
  spin = 0,
  label,
  labelSide = 'right',
  children,
}: {
  anim: RefObject<HeroAnim>
  pos: [number, number, number]
  /** displacement at full explosion */
  off: [number, number, number]
  /** extra rotation (rad) applied while scattered/exploded */
  tumble?: [number, number, number]
  /** continuous rotation speed around Z (gears/shafts) */
  spin?: number
  label?: string
  labelSide?: 'left' | 'right'
  children: ReactNode
}) {
  const outer = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useFrame((_, dt) => {
    const { intro, explode } = anim.current
    const k = explode + intro * 2.6 // combined displacement factor
    const g = outer.current
    if (g) {
      g.position.set(pos[0] + off[0] * k, pos[1] + off[1] * k, pos[2] + off[2] * k)
      const r = explode * 0.5 + intro * 1.6
      g.rotation.set(tumble[0] * r, tumble[1] * r, tumble[2] * r)
    }
    if (inner.current && spin) inner.current.rotation.z += spin * dt
    if (labelRef.current) {
      const o = Math.min(1, Math.max(0, (explode - 0.3) / 0.45)) * (1 - intro)
      labelRef.current.style.opacity = o.toFixed(2)
    }
  })

  return (
    <group ref={outer}>
      <group ref={inner}>{children}</group>
      {label && <Annotation text={label} side={labelSide} refCb={labelRef} />}
    </group>
  )
}

/* ---------- bolt ---------- */
function Bolt({ m }: { m: Mats }) {
  return (
    <group>
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.085, 0.085, 0.07, 6]} />
        <meshStandardMaterial {...m.steel} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.04, 0.04, 0.26, 12]} />
        <meshStandardMaterial {...m.steel} roughness={0.4} />
      </mesh>
    </group>
  )
}

/* ---------- the full placeholder assembly ---------- */
function GearboxAssembly({
  anim,
  reduced,
  mobile,
  m,
}: {
  anim: RefObject<HeroAnim>
  reduced: boolean
  mobile: boolean
  m: Mats
}) {
  const root = useRef<THREE.Group>(null)
  const mainGearGeo = useGearGeometry(20, 0.95, 0.26, 0.16)
  const pinionGeo = useGearGeometry(11, 0.5, 0.26, 0.1)

  /* Push the assembly off-center so it shares the frame with the headline
     text instead of sitting under it: right on desktop (text takes the
     left column), down on mobile (text sits above, in the cleared band). */
  const offsetX = mobile ? 0 : 1.5
  const offsetY = mobile ? -0.55 : 0

  useFrame((state, dt) => {
    const g = root.current
    if (!g) return
    const t = state.clock.elapsedTime
    const step = Math.min(dt, 0.05) // clamp tab-switch spikes
    const { explode } = anim.current
    // idle auto-rotation + mouse parallax, damped
    const targetY = (reduced ? 0 : Math.sin(t * 0.18) * 0.35) + state.pointer.x * 0.18 + 0.15
    const targetX = -state.pointer.y * 0.1 + 0.12 + explode * 0.12
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.4, step)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.4, step)
    g.position.y = offsetY + (reduced ? 0 : Math.sin(t * 0.5) * 0.05)
  })

  const gearSpin = reduced ? 0 : 0.55
  const boltPositions: [number, number, number][] = [
    [-1.3, 0.9, 0.68],
    [1.3, 0.9, 0.68],
    [-1.3, -0.9, 0.68],
    [1.3, -0.9, 0.68],
    [0, 1.0, 0.68],
    [0, -1.0, 0.68],
  ]

  return (
    <group ref={root} scale={1.05} position={[offsetX, 0, 0]}>
      {/* back housing plate */}
      <Part anim={anim} pos={[0, 0, -0.55]} off={[0, -0.3, -1.7]} tumble={[0.3, 0.2, 0.1]}>
        <RoundedBox args={[3.3, 2.4, 0.14]} radius={0.06}>
          <meshStandardMaterial {...m.graphite} />
          <Edges color="#4f4a52" />
        </RoundedBox>
      </Part>

      {/* main spur gear */}
      <Part
        anim={anim}
        pos={[-0.55, -0.12, 0]}
        off={[-0.8, -0.35, 0.7]}
        spin={gearSpin}
        label="SPUR GEAR — 20T · MOD 2.0"
        labelSide="left"
      >
        <mesh geometry={mainGearGeo}>
          <meshStandardMaterial {...m.steel} />
        </mesh>
      </Part>

      {/* pinion gear (accent anodized) */}
      <Part
        anim={anim}
        pos={[0.72, 0.28, 0]}
        off={[1.0, 0.7, 0.9]}
        spin={-gearSpin * (20 / 11)}
        label="PINION — 11T · ±0.02mm"
      >
        <mesh geometry={pinionGeo}>
          <meshStandardMaterial {...m.anodized} />
        </mesh>
      </Part>

      {/* drive shaft through main gear */}
      <Part
        anim={anim}
        pos={[-0.55, -0.12, 0]}
        off={[-0.3, 0.1, -1.3]}
        spin={gearSpin}
        label="DRIVE SHAFT — ⌀12 h6"
        labelSide="left"
      >
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 1.8, 24]} />
          <meshStandardMaterial {...m.steel} roughness={0.2} />
        </mesh>
        {/* keyway collar */}
        <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.1, 24]} />
          <meshStandardMaterial {...m.anodized} />
        </mesh>
      </Part>

      {/* pinion shaft */}
      <Part anim={anim} pos={[0.72, 0.28, 0]} off={[0.5, 0.2, 1.5]} spin={-gearSpin * (20 / 11)}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 1.5, 20]} />
          <meshStandardMaterial {...m.steel} roughness={0.2} />
        </mesh>
      </Part>

      {/* bearings on the drive shaft */}
      <Part
        anim={anim}
        pos={[-0.55, -0.12, 0.72]}
        off={[0, 0.9, 1.1]}
        label="BEARING 6204-2RS"
        labelSide="left"
      >
        <mesh>
          <torusGeometry args={[0.21, 0.07, 12, 32]} />
          <meshStandardMaterial {...m.steel} roughness={0.35} />
        </mesh>
      </Part>
      <Part anim={anim} pos={[-0.55, -0.12, -0.72]} off={[0, -1.0, -0.9]}>
        <mesh>
          <torusGeometry args={[0.21, 0.07, 12, 32]} />
          <meshStandardMaterial {...m.steel} roughness={0.35} />
        </mesh>
      </Part>

      {/* translucent front housing plate */}
      <Part
        anim={anim}
        pos={[0, 0, 0.55]}
        off={[0, 0.25, 1.9]}
        tumble={[0.25, 0.15, 0.1]}
        label="HOUSING — AL 6061-T6"
      >
        <RoundedBox args={[3.3, 2.4, 0.1]} radius={0.06}>
          <meshStandardMaterial
            color="#f9a8d4"
            metalness={0.1}
            roughness={0.1}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
          <Edges color="#f472b6" />
        </RoundedBox>
      </Part>

      {/* fasteners */}
      {boltPositions.map((p, i) => (
        <Part
          key={i}
          anim={anim}
          pos={p}
          off={[p[0] * 0.55, p[1] * 0.55, 1.4 + i * 0.12]}
          tumble={[0.8, 0.5, 0.9]}
          label={i === 1 ? 'M8 HEX BOLT — QTY 6' : undefined}
        >
          <group rotation={[Math.PI / 2, 0, 0]}>
            <Bolt m={m} />
          </group>
        </Part>
      ))}
    </group>
  )
}

/* ---------- canvas wrapper ---------- */
export default function AssemblyScene({
  anim,
  reduced,
  mobile,
  onFail,
}: {
  anim: RefObject<HeroAnim>
  reduced: boolean
  mobile: boolean
  /** called if the WebGL context is lost — parent swaps in a static fallback */
  onFail?: () => void
}) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.5, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      eventSource={document.body}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          'webglcontextlost',
          (e) => {
            e.preventDefault()
            onFail?.()
          },
          false,
        )
      }}
    >
      <ambientLight intensity={mobile ? 0.5 : 0.25} />
      <hemisphereLight args={['#fdf2f6', '#efe9ec', mobile ? 1.2 : 0.4]} />
      <directionalLight position={[4, 6, 5]} intensity={mobile ? 2.2 : 0.8} color="#fff8fa" />
      {mobile && <directionalLight position={[-4, 2, -3]} intensity={0.9} color="#d6d0d4" />}
      <pointLight position={[-5, -2, 3]} intensity={12} color="#ec1f77" distance={12} />
      <GearboxAssembly anim={anim} reduced={reduced} mobile={mobile} m={mobile ? MOBILE_MATS : DESKTOP_MATS} />
      {!mobile && (
        <Grid
          position={[0, -2.1, 0]}
          args={[24, 24]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#e7dfe4"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor="#c9c0c6"
          fadeDistance={16}
          fadeStrength={2.5}
          infiniteGrid
        />
      )}
      {/* local, procedural environment map — no network fetch.
          Skipped on mobile: iOS Safari handles the required half-float
          render target unreliably, and mobile is lit directly instead. */}
      {!mobile && (
        <Environment resolution={128}>
          <Lightformer intensity={1.8} position={[0, 4, 5]} scale={[9, 3, 1]} />
          <Lightformer intensity={0.9} color="#d6d0d4" position={[-6, 1, -2]} rotation-y={-Math.PI / 2} scale={[7, 2, 1]} />
          <Lightformer intensity={1} color="#ec1f77" position={[6, -1, 1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        </Environment>
      )}
    </Canvas>
  )
}
