"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

// TaskCube component for each individual task
function TaskCube({ task, index }) {
  const groupRef = useRef()
  const cubeRef = useRef()

  // Calculate position based on index to spread cubes out
  const position = [
    Math.sin(index * 1.5) * 5, // X position in a circle
    1, // Y position (height) - lowered from 2 to 1
    Math.cos(index * 1.5) * 5, // Z position in a circle
  ]

  // Animate cube
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      // Move the entire group up and down
      groupRef.current.position.y = position[1] + Math.sin(time + index) * 0.2 // Floating effect
      // Only rotate the cube, not the text
      cubeRef.current.rotation.y = time * 0.5 // Spinning
    }
  })

  // Handle cube click
  const handleClick = (e) => {
    e.stopPropagation()
    if (task.link) {
      window.open(task.link, "_blank")
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Task name - positioned relative to the group */}
      <Text position={[0, 1.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle" maxWidth={2}>
        {task.task}
      </Text>

      {/* Points - positioned relative to the group */}
      <Text position={[0, 1.1, 0]} fontSize={0.25} color="#FFEB3B" anchorX="center" anchorY="middle">
        {task.points || 5} pts
      </Text>

      {/* The cube itself */}
      <mesh ref={cubeRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={task.urgent === "yes" ? "#f44336" : "#2196F3"} />
      </mesh>
    </group>
  )
}

export default function Environment({ onAddTaskClick, tasks }) {
  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8BC34A" />
      </mesh>

      {/* Grid for reference */}
      <gridHelper args={[100, 100, "#444444", "#222222"]} />

      {/* Render all task cubes */}
      {tasks.map((task, index) => (
        <TaskCube key={index} task={task} index={index} />
      ))}
    </>
  )
}
