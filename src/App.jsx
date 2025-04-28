"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import Environment from "./Environment"
import ThirdPersonController from "./ThirdPersonController"
import Overlay from "./Overlay"
import api from "./api"

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentColor, setCurrentColor] = useState("#1E88E5")
  const [showShop, setShowShop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await api.getAllData()
        setTasks(data.tasks)
        setTotalPoints(data.totalPoints)
        setCurrentColor(data.currentColor)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  const addNewTask = async (taskData) => {
    try {
      const newTask = await api.addTask(taskData)
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const completeTask = async (task) => {
    try {
      const result = await api.completeTask(task.id)
      setTotalPoints(result.totalPoints)
      setTasks(tasks.filter((t) => t.id !== task.id))
      console.log(`Task completed! Earned ${result.pointsEarned} points.`)
    } catch (error) {
      console.error("Error completing task:", error)
    }
  }

  const handleColorPurchase = async (color, cost) => {
    if (totalPoints >= cost) {
      try {
        const newPoints = totalPoints - cost
        await api.updatePoints(newPoints)
        setTotalPoints(newPoints)
        
        await api.updateColor(color)
        setCurrentColor(color)
        setShowShop(false)
      } catch (error) {
        console.error("Error purchasing color:", error)
      }
    } else {
      alert("Not enough points!")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
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