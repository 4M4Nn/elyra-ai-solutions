"use client"
import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Torus } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    if (ring1Ref.current) ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.5
    if (ring2Ref.current) ring2Ref.current.rotation.x = state.clock.elapsedTime * 0.3
  })

  const nodeColors = ["#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF", "#00FFB2"]

  return (
    <group ref={groupRef}>
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.3} roughness={0.3} metalness={0.8} />
      </Sphere>
      <group ref={ring1Ref}>
        <Torus args={[2, 0.02, 8, 100]}>
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} transparent opacity={0.4} />
        </Torus>
        {[0, 1].map((i) => {
          const angle = (i / 2) * Math.PI * 2
          return (
            <Sphere key={i} args={[0.15, 16, 16]} position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]}>
              <meshStandardMaterial color={nodeColors[i]} emissive={nodeColors[i]} emissiveIntensity={0.8} />
            </Sphere>
          )
        })}
      </group>
      <group ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <Torus args={[3, 0.02, 8, 100]}>
          <meshStandardMaterial color="#6E44FF" emissive="#6E44FF" emissiveIntensity={0.5} transparent opacity={0.4} />
        </Torus>
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2
          return (
            <Sphere key={i} args={[0.12, 16, 16]} position={[Math.cos(angle) * 3, Math.sin(angle) * 3, 0]}>
              <meshStandardMaterial color={nodeColors[i + 2]} emissive={nodeColors[i + 2]} emissiveIntensity={0.8} />
            </Sphere>
          )
        })}
      </group>
    </group>
  )
}

function Scene() {
  const { mouse } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (mouse.y * 0.05 - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y += (mouse.x * 0.05 - groupRef.current.rotation.y) * 0.05
    }
  })
  return (
    <group ref={groupRef}>
      <OrbitalSystem />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00D4FF" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#6E44FF" />
    </group>
  )
}

export default function OrbitalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 60 }}>
      <Scene />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.2} />
      </EffectComposer>
    </Canvas>
  )
}
