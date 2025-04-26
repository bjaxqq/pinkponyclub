"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

// TaskCube component for each individual task
function TaskCube({ task, index }) {
  const cubeRef = useRef()

  // Calculate position based on index to spread cubes out
  const position = [
    Math.sin(index * 1.5) * 5, // X position in a circle
    2, // Y position (height)
    Math.cos(index * 1.5) * 5, // Z position in a circle
  ]

  // Animate cube
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (cubeRef.current) {
      cubeRef.current.position.y = position[1] + Math.sin(time + index) * 0.2 // Floating effect
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
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh ref={cubeRef} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={task.urgent === "yes" ? "#f44336" : "#2196F3"} />
      </mesh>

      {/* Task name */}
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle" maxWidth={2}>
        {task.task}
      </Text>

      {/* Points */}
      <Text position={[0, 0.8, 0]} fontSize={0.25} color="#FFEB3B" anchorX="center" anchorY="middle">
        {task.points || 5} pts
      </Text>
    </group>
  )
}

export default function Environment({ onAddTaskClick, tasks }) {
  // Create a floating "Add Task" button
  const addButtonRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (addButtonRef.current) {
      addButtonRef.current.position.y = 2 + Math.sin(time) * 0.2 // Subtle float
      addButtonRef.current.rotation.y = time * 0.5 // Rotate
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

      {/* Add Task Button */}
      <group
        ref={addButtonRef}
        position={[0, 2, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onAddTaskClick && onAddTaskClick()
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <mesh castShadow receiveShadow>
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
        <Text position={[0, 0, -0.76]} fontSize={0.3} color="black" anchorX="center" anchorY="middle">
          Add Task
        </Text>
      </group>

      {/* Render all task cubes */}
      {tasks.map((task, index) => (
        <TaskCube key={index} task={task} index={index} />
      ))}
    </>
  )
}
