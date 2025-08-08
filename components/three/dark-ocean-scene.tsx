'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function WaterPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = { uTime: { value: 0 } }

  const onBeforeCompile = (shader: THREE.Shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
       uniform float uTime;`
    )
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       float wave = sin(position.x * 0.6 + uTime*0.9)*0.06 + cos(position.y*0.8 + uTime*0.6)*0.04;
       transformed.z += wave;`
    )
  }

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2
      meshRef.current.position.y = -0.4
      meshRef.current.position.z = -4
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[30, 30, 256, 256]} />
      <meshStandardMaterial
        color={'#0e1635'}
        metalness={0.7}
        roughness={0.25}
        envMapIntensity={0.6}
        onBeforeCompile={onBeforeCompile}
        transparent
        opacity={0.95}
      />
    </mesh>
  )
}

function Moon() {
  const core = useRef<THREE.Mesh>(null)
  const halo = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (core.current) {
      core.current.position.y = 2.2 + Math.sin(t * 0.4) * 0.12
    }
    if (halo.current) {
      const s = 1.5 + Math.sin(t * 0.3) * 0.03
      halo.current.scale.set(s, s, s)
    }
  })

  return (
    <group position={[0, 2.4, -6]}>
      <mesh ref={core}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={'#eef0ff'} emissive={'#cfd6ff'} emissiveIntensity={1.8} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color={'#c2cbff'} transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

export default function DarkOceanScene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 1.2, 3], fov: 60 }}>
        <color attach="background" args={['#050814']} />
        <fog attach="fog" args={['#050814', 8, 18]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 3, -2]} intensity={0.9} color={'#cdd8ff'} />
        <Stars radius={50} depth={20} count={1500} factor={2} fade speed={0.6} />
        <Moon />
        <WaterPlane />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
