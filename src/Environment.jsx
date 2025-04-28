"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

function TaskCube({ task, index, onCompleteTask }) {
  const groupRef = useRef()
  const cubeRef = useRef()
  const [hovered, setHovered] = useState(false)

  const position = [Math.sin(index * 1.5) * 5, 1, Math.cos(index * 1.5) * 5]

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time + index) * 0.2
      cubeRef.current.rotation.y = time * 0.5
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    if (task.link) {
      window.open(task.link, "_blank")
    }
  }

  const handleCheckboxClick = (e) => {
    e.stopPropagation()
    onCompleteTask(task)
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer"
        setHovered(true)
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto"
        setHovered(false)
      }}
    >
      <Text position={[0, 1.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle" maxWidth={2}>
        {task.task}
      </Text>

      <Text position={[0, 1.1, 0]} fontSize={0.25} color="#FFEB3B" anchorX="center" anchorY="middle">
        {task.points || 5} pts
      </Text>

      <group position={[1.2, 1.5, 0]} onClick={handleCheckboxClick}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.3, 0.1]} />
          <meshStandardMaterial color={hovered ? "#4CAF50" : "white"} />
        </mesh>

        <Text position={[0.5, 0, 0]} fontSize={0.2} color="white" anchorX="left" anchorY="middle">
          Complete
        </Text>
      </group>

      <mesh ref={cubeRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={task.urgent === "yes" ? "#f44336" : "#2196F3"} />
      </mesh>
    </group>
  )
}

export default function Environment({ onAddTaskClick, tasks, onCompleteTask, currentColor }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="grey" />
      </mesh>

      <group position={[0, 1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 2, 0.5]} />
          <meshStandardMaterial color={currentColor || "#1E88E5"} />
        </mesh>

        <mesh position={[-0.7, 0.3, 0.26]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <mesh position={[0.7, 0.3, 0.26]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <mesh position={[0, -0.4, 0.26]} castShadow>
          <boxGeometry args={[1.2, 0.2, 0.1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>

      {tasks.map((task, index) => (
        <TaskCube key={task.id || index} task={task} index={index} onCompleteTask={onCompleteTask} />
      ))}
    </>
  )
}