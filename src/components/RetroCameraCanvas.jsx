import { useEffect, useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Preload all models the site uses so the first scene-switch is instant.
useGLTF.preload('/models/retro-camera.glb')
useGLTF.preload('/models/movie-camera.glb')
useGLTF.preload('/models/retro-computer.glb')

function Model({
  modelPath,
  scrollProgressRef,
  position = [0, 0, 0],
  offsetMultiplier = 1,
  baseRotation = 0,
}) {
  const { scene } = useGLTF(modelPath)
  // Clone per-instance — the same THREE.Object3D can only live in one scene
  // graph at a time, so multiple canvases sharing the cached GLB would steal
  // it from each other.
  const clonedScene = useMemo(() => scene.clone(true), [scene])
  const groupRef = useRef()
  const innerRef = useRef()

  useEffect(() => {
    if (!innerRef.current || !clonedScene) return
    const box = new THREE.Box3().setFromObject(clonedScene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 2.2
    const fit = maxDim > 0 ? targetSize / maxDim : 1
    innerRef.current.scale.setScalar(fit)
    innerRef.current.position.set(-center.x * fit, -center.y * fit, -center.z * fit)
  }, [clonedScene])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const scroll = scrollProgressRef?.current ?? 0
    groupRef.current.rotation.y = baseRotation + t * 0.3 + scroll * Math.PI * offsetMultiplier
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08 - scroll * 0.2
    groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.1
  })

  return (
    <group ref={groupRef} position={position}>
      <group ref={innerRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

export default function RetroCameraCanvas({
  scrollProgressRef,
  modelPath = '/models/retro-camera.glb',
  cameraPos = [0, 0, 6],
  fov = 45,
  modelPos = [0, 0, 0],
  scrollOffsetMultiplier = 1.5,
  baseRotation = 0,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: cameraPos, fov }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#88aaff" />
        <pointLight position={[0, 2, 4]} intensity={1.5} distance={10} />
        <Suspense fallback={null}>
          <Environment preset="studio" background={false} />
          <Model
            modelPath={modelPath}
            scrollProgressRef={scrollProgressRef}
            position={modelPos}
            offsetMultiplier={scrollOffsetMultiplier}
            baseRotation={baseRotation}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
