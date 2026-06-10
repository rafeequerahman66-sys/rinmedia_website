import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Blockwee-style cube tunnel: a grid of dark blue blocks on either side of a
 * central walkway, with two glowing blue light beams running down the middle.
 *
 * Architecture:
 *  - InstancedMesh of ~120 cubes (left + right banks) — single draw call.
 *  - Two thin emissive planes act as the center beams.
 *  - Subtle camera sway over time gives it life without needing scroll input.
 *  - Soft blue point lights on the beams cast a rim onto the cubes.
 */

function CubeTunnel() {
  const meshRef = useRef(null)
  const cameraOscRef = useRef(0)

  // Build cube positions/scales once.
  const { matrices, count } = useMemo(() => {
    const arr = []
    // Two banks of cubes: left (x < 0) and right (x > 0). Walkway in the middle.
    const ROWS = 11
    const COLS_PER_BANK = 6
    const X_INNER = 1.8       // closest cube to the central walkway
    const X_STEP = 1.3
    const Z_START = 2
    const Z_STEP = -2.5

    for (let r = 0; r < ROWS; r++) {
      const z = Z_START + r * Z_STEP
      for (let c = 0; c < COLS_PER_BANK; c++) {
        // Slight pseudo-random variation per cube (deterministic via index)
        const seed = r * 13 + c * 7
        const jitter = Math.sin(seed) * 0.15
        const heightVar = 1 + (Math.sin(seed * 2.3) * 0.5 + 0.5) * 1.4
        // Both banks
        for (const sign of [-1, 1]) {
          const x = sign * (X_INNER + c * X_STEP + jitter)
          // Sit cubes on the ground (y = heightVar/2)
          const y = heightVar / 2 - 1.4
          const m = new THREE.Matrix4()
          m.compose(
            new THREE.Vector3(x, y, z + jitter),
            new THREE.Quaternion(),
            new THREE.Vector3(0.95, heightVar, 0.95)
          )
          arr.push(m)
        }
      }
    }
    return { matrices: arr, count: arr.length }
  }, [])

  // Write matrices into the InstancedMesh once it mounts.
  const handleRef = (mesh) => {
    meshRef.current = mesh
    if (!mesh) return
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m))
    mesh.instanceMatrix.needsUpdate = true
  }

  // Gentle camera sway + cube subtle drift for life.
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    // Sway camera slightly left/right
    camera.position.x = Math.sin(t * 0.15) * 0.18
    camera.position.y = 1.55 + Math.sin(t * 0.22) * 0.05
    camera.lookAt(0, 0.4, -10)
    cameraOscRef.current = t
  })

  return (
    <>
      <instancedMesh ref={handleRef} args={[null, null, count]} castShadow={false} receiveShadow={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#2a3a55"
          metalness={0.55}
          roughness={0.42}
          emissive="#0e1a35"
          emissiveIntensity={0.4}
        />
      </instancedMesh>

      {/* Central walkway beams — emissive planes give the bloomy blue lines */}
      <CenterBeam x={-0.32} />
      <CenterBeam x={0.32} />

      {/* Bright ambient so cubes are visible against black background */}
      <ambientLight intensity={0.7} color="#5e8cd8" />
      {/* Cool key light from above-front */}
      <directionalLight position={[2, 6, 4]} intensity={1.6} color="#aabfe8" />
      <directionalLight position={[-2, 4, 2]} intensity={0.8} color="#7ea4e0" />
      {/* Strong rim from the blue beams */}
      <pointLight position={[0, 0.8, -2]} intensity={6} distance={12} color="#3a90ff" />
      <pointLight position={[0, 0.8, -8]} intensity={7} distance={18} color="#2f7dff" />
      <pointLight position={[0, 0.8, -16]} intensity={6} distance={20} color="#1e63d8" />
      <pointLight position={[0, 2, 3]} intensity={2.5} distance={6} color="#5aa0ff" />
    </>
  )
}

function CenterBeam({ x }) {
  // Long thin emissive plane along Z — reads as a glowing line.
  return (
    <mesh position={[x, -1.32, -10]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.06, 30]} />
      <meshBasicMaterial
        color="#3a90ff"
        toneMapped={false}
        transparent
        opacity={1}
      />
    </mesh>
  )
}

export default function HeroBackground3D() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.55, 3], fov: 62, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#000000', 8, 26]} />
          <CubeTunnel />
        </Suspense>
      </Canvas>

      {/* CSS bloom-ish blur layer to soften the beam lines into a glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 40% 80% at 50% 75%, rgba(58,144,255,0.18), transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Vignette at edges to focus the eye */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  )
}
