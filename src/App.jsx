"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import Environment from "./Environment"
import ThirdPersonController from "./ThirdPersonController"
import Overlay from "./Overlay"

async function updatePoints(points) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points }),
    }
    const response = await fetch("http://localhost:3000/updatePoints", requestOptions)
    return await response.json()
  } catch (error) {
    console.error("Error updating points:", error)
    return null
  }
}

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentColor, setCurrentColor] = useState("#1E88E5")
  const [showShop, setShowShop] = useState(false)

  const addNewTask = (taskData) => {
    setTasks([...tasks, taskData])
  }

  const completeTask = async (task) => {
    try {
      const newPoints = totalPoints + (task.points || 5)
      setTotalPoints(newPoints)
      setTasks(tasks.filter((t) => t !== task))
      await updatePoints(newPoints)
      console.log(`Task completed! Earned ${task.points || 5} points.`)
    } catch (error) {
      console.error("Error completing task:", error)
    }
  }

  const handleColorPurchase = (color, cost) => {
    if (totalPoints >= cost) {
      setCurrentColor(color)
      setTotalPoints(totalPoints - cost)
      setShowShop(false)
    } else {
      alert("Not enough points!")
    }
  }

  return (
    <div className="scene-container">
      <Canvas
        shadows
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 5, 10],
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 20, 10]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Environment 
          onAddTaskClick={() => setShowAddTask(true)} 
          tasks={tasks} 
          onCompleteTask={completeTask} 
          currentColor={currentColor}
        />
        <ThirdPersonController />
      </Canvas>

      <Overlay
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        addNewTask={addNewTask}
        totalPoints={totalPoints}
        showShop={showShop}
        setShowShop={setShowShop}
        onColorPurchase={handleColorPurchase}
      />
    </div>
  )
}