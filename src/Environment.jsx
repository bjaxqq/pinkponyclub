"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Environment() {
  // Create a grid of cubes for visual reference
  const cubes = []
  const cubeRefs = useRef([])

  // Create a 5x5 grid of cubes
  for (let x = -10; x <= 10; x += 5) {
    for (let z = -10; z <= 10; z += 5) {
      if (x === 0 && z === 0) continue // Skip center where character starts
      cubes.push({ position: [x, 1, z], color: `hsl(${((x + 10) * (z + 10)) % 360}, 70%, 60%)` })
    }
  }

  // Animate cubes
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    cubeRefs.current.forEach((cube, i) => {
      if (cube) {
        cube.position.y = 1 + Math.sin(time + i * 0.5) * 0.5
        cube.rotation.y = time * 0.2 + i * 0.1
      }
    })
  })

  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8BC34A" />
      </mesh>

      {/* Grid for reference */}
      <gridHelper args={[100, 100, "#444444", "#222222"]} />

      {/* Cubes */}
      {cubes.map((cube, i) => (
        <mesh key={i} ref={(el) => (cubeRefs.current[i] = el)} position={cube.position} castShadow receiveShadow>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color={cube.color} />
        </mesh>
      ))}
    </>
  )
}
