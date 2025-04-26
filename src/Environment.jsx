"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from '@react-three/drei'

export default function Environment({ onAddTaskClick }) {
  const cubeRef = useRef()
  const groupRef = useRef()

  // Animate cube
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (cubeRef.current) {
      cubeRef.current.position.y = Math.sin(time) * 0.2 // Subtle float
      groupRef.current.rotation.y = time * 0.5 // Rotate the whole group
    }
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

      {/* Floating cube with text */}
      <group 
        ref={groupRef} 
        position={[0, 2, 5]}
        onClick={(e) => {
          e.stopPropagation()
          onAddTaskClick()
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <mesh ref={cubeRef} castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Text on front face */}
        <Text
          position={[0, 0, 0.76]}
          rotation={[0, Math.PI, 0]} // Fixes backward text
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Add Task
        </Text>
        {/* Text on back face */}
        <Text
          position={[0, 0, -0.76]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Add Task
        </Text>
      </group>
    </>
  )
}