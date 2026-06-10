import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, Torus } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function AbstractForm() {
  const meshRef = useRef()
  const inner = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.18
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.12
    if (inner.current) {
      inner.current.rotation.y = -t * 0.3
      inner.current.rotation.z = t * 0.15
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Outer torus */}
        <Torus args={[1.6, 0.04, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.25}
          />
        </Torus>

        {/* Tilted ring */}
        <Torus args={[1.6, 0.04, 16, 120]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.15}
          />
        </Torus>

        {/* Inner distorted sphere */}
        <mesh ref={inner}>
          <icosahedronGeometry args={[0.9, 4]} />
          <MeshDistortMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.05}
            distort={0.35}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer wireframe */}
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>

        {/* Point lights orbiting */}
        <pointLight color="#a0a0ff" intensity={3} distance={5} position={[2, 0, 0]} />
        <pointLight color="#ffffff" intensity={2} distance={4} position={[-2, 1, 1]} />
      </group>
    </Float>
  )
}

function Particles() {
  const count = 180
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2.5 + Math.random() * 1.5
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }

  const meshRef = useRef()
  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.018} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function Scene05Reveal() {
  return (
    <section
      id="scene-05"
      style={{
        background: '#000',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '10vh 0',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', zIndex: 2, padding: '0 8vw', marginBottom: '4rem' }}
      >
        <p style={{
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '1.5rem',
        }}>
          — Est. 2023
        </p>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 7vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          color: '#fff',
        }}>
          We Are Rin Media.
        </h2>
      </motion.div>

      {/* 3D Canvas */}
      <div style={{ width: '100%', height: '55vh', position: 'relative' }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#6060ff" />
          <Suspense fallback={null}>
            <Environment preset="night" />
            <AbstractForm />
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '520px',
          lineHeight: 1.7,
          padding: '0 8vw',
          marginTop: '2rem',
        }}
      >
        A creative studio for ambitious brands,<br />founders, builders, and communities.
      </motion.p>
    </section>
  )
}
