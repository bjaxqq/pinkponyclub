"use client"
import { useState, useEffect } from "react"

async function getTasks() {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch("http://localhost:3000/tasks", requestOptions)
    const data = await response.json()
    return data[0].taskName
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return null
  }
}

async function addTask(taskData) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    }
    const response = await fetch("http://localhost:3000/addTask", requestOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding task:", error)
    return null
  }
}

export default function Overlay({ 
  showAddTask, 
  setShowAddTask, 
  addNewTask, 
  totalPoints,
  showShop,
  setShowShop,
  onColorPurchase
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [points, setPoints] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const fetchedPoints = await getTasks()
      setPoints(fetchedPoints)
      setLoading(false)
    }
    fetchData()
  }, [])

  const [formData, setFormData] = useState({
    task: "",
    link: "",
    category: "general",
    difficulty: "medium",
    urgent: "no",
    points: 5,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let taskPoints = 5

    if (formData.difficulty === "easy") taskPoints = 3
    if (formData.difficulty === "medium") taskPoints = 5
    if (formData.difficulty === "hard") taskPoints = 10
    if (formData.urgent === "yes") taskPoints += 2

    const taskWithPoints = {
      ...formData,
      points: taskPoints,
    }

    try {
      await addTask(taskWithPoints)
    } catch (error) {
      console.error("Error submitting task:", error)
    }

    addNewTask(taskWithPoints)
    setShowAddTask(false)
    setFormData({
      task: "",
      link: "",
      category: "general",
      difficulty: "medium",
      urgent: "no",
      points: 5,
    })
  }

  const colorOptions = [
    { name: "Red", value: "#f44336", cost: 10 },
    { name: "Blue", value: "#2196F3", cost: 10 },
    { name: "Green", value: "#4CAF50", cost: 10 },
    { name: "Gold", value: "#FFD700", cost: 50 },
    { name: "Purple", value: "#9C27B0", cost: 20 },
    { name: "Pink", value: "#E91E63", cost: 15 },
  ]

  return (
    <>
      <div className="overlay points-counter">
        <div className="points-display">
          <span className="points-value">{totalPoints}</span>
          <span className="points-label">POINTS</span>
        </div>
      </div>

      <div className="overlay profile-menu">
        <button className="profile-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          User Profile
        </button>
        <div className={`profile-dropdown ${dropdownOpen ? "show" : ""}`}>
          <a
            href="#"
            onClick={() => {
              setShowAddTask(true)
              setDropdownOpen(false)
            }}
          >
            Add Task
          </a>
          <a 
            href="#"
            onClick={() => {
              setShowShop(true)
              setDropdownOpen(false)
            }}
          >
            Shop
          </a>
        </div>
      </div>

      <div className="overlay sample-text">
        <h3>Welcome to the Task Environment</h3>
        <p>
          Use WASD or arrow keys to move around. Click on the cubes to visit task links or check the box to complete
          tasks.
        </p>
      </div>

      {showAddTask && (
        <div className="overlay add-task-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowAddTask(false)}>
              ×
            </button>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="task">Task Name</label>
                <input type="text" id="task" name="task" value={formData.task} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="link">Link (optional)</label>
                <input type="url" id="link" name="link" value={formData.link} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleInputChange}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="urgent">Urgent?</label>
                <select id="urgent" name="urgent" value={formData.urgent} onChange={handleInputChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <button type="submit" className="submit-button">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      {showShop && (
        <div className="overlay add-task-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowShop(false)}>
              ×
            </button>
            <h2>Color Shop</h2>
            <div className="shop-content">
              <div className="shop-items">
                {colorOptions.map((color) => (
                  <div 
                    key={color.value} 
                    className={`shop-item ${totalPoints >= color.cost ? '' : 'disabled'}`}
                    onClick={() => totalPoints >= color.cost && onColorPurchase(color.value, color.cost)}
                  >
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="item-details">
                      <h3>{color.name}</h3>
                      <p>{color.cost} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}