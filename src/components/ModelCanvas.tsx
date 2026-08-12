/* The three.js half of ModelViewer, split into its own chunk so the 3D
   bundle is only fetched when a model actually comes into view. */
import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, OrbitControls, useGLTF } from '@react-three/drei'
import type { Group } from 'three'

function Model({
  src,
  spin,
  interactive,
  onReady,
}: {
  src: string
  spin: number
  interactive: boolean
  onReady: () => void
}) {
  /* useGLTF enables the meshopt decoder by default, which is what these files
     are compressed with — no external decoder files, nothing from a CDN. */
  const { scene } = useGLTF(src)
  const ref = useRef<Group>(null)

  /* useGLTF suspends until the file is parsed, so reaching this effect means
     there is something real to draw — that's the cue to drop the still image
     underneath, which would otherwise show through the transparent canvas. */
  useEffect(onReady, [onReady])

  useFrame((_, dt) => {
    if (ref.current && !interactive) ref.current.rotation.y += dt * spin * 0.25
  })

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

export default function ModelCanvas({
  src,
  mode,
  spin,
  onReady,
}: {
  src: string
  mode: 'card' | 'inspect'
  spin: number
  onReady: () => void
}) {
  const interactive = mode === 'inspect'
  return (
    <Canvas
      /* cap the pixel ratio: a retina phone would otherwise render ~3x the
         pixels for no visible gain on a card-sized viewport */
      dpr={[1, 1.5]}
      camera={{ position: [3, 2, 4], fov: 45 }}
      /* the card must stay clickable — it opens the project detail view */
      className={interactive ? '' : 'pointer-events-none'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      {/* explicit lights rather than drei's <Environment>, which would pull an
          HDR map off a CDN */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={2.0} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} />

      {/* Bounds re-frames whatever the model's scale happens to be — STEP
          exports arrive in millimetres, metres or anything else. */}
      <Bounds fit clip observe margin={interactive ? 1.1 : 1.35}>
        <Model src={src} spin={spin} interactive={interactive} onReady={onReady} />
      </Bounds>

      {interactive && (
        <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.08} />
      )}
    </Canvas>
  )
}
