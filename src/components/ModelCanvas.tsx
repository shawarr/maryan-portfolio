/* The three.js half of ModelViewer, split into its own chunk so the 3D
   bundle is only fetched when a model actually comes into view. */
import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, Center, Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei'
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

  /* <Center> shifts the geometry so its bounding-box centre sits on the group's
     origin. Without it the model orbits the scene origin — which for a STEP
     export is wherever the CAD origin happened to be, often well outside the
     part — and swings out of frame instead of turning on the spot. */
  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} />
      </Center>
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
      {/* Two directional lights left some angles almost black as the model
          turned. This wraps it in light from every side instead — the same
          Lightformer approach the hero scene uses, which builds the
          environment map procedurally rather than downloading an HDR. */}
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#fdf2f6', '#c9c3c7', 1.1]} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} color="#fff8fa" />
      <directionalLight position={[-5, 2, -4]} intensity={0.8} color="#d6d0d4" />
      <directionalLight position={[0, -5, 2]} intensity={0.45} />
      <Environment resolution={128}>
        <Lightformer intensity={1.6} position={[0, 4, 6]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} position={[0, 2, -6]} rotation-y={Math.PI} scale={[10, 4, 1]} />
        <Lightformer intensity={1} color="#d6d0d4" position={[-6, 1, 0]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer intensity={1} color="#fff8fa" position={[6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer intensity={0.8} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>

      {/* Bounds re-frames whatever the model's scale happens to be — STEP
          exports arrive in millimetres, metres or anything else. No `observe`:
          it would re-fit as the model turns, making the view pump in and out.
          Margins are tight — the model should fill the frame. Now that it
          turns about its own centre, the card only needs enough slack for the
          silhouette at the diagonal, not the old generous padding. */}
      <Bounds fit clip margin={interactive ? 0.95 : 1.18}>
        <Model src={src} spin={spin} interactive={interactive} onReady={onReady} />
      </Bounds>

      {interactive && (
        <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.08} />
      )}
    </Canvas>
  )
}
