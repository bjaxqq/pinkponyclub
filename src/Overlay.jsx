"use client"
import { useState, useEffect } from 'react'; // Import useEffect
async function getTasks() {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('http://localhost:3000/tasks', requestOptions);
    const data = await response.json();
    return data[0].taskName;
  } catch (error) {
    alert('An error occurred while fetching tasks.');
    console.error(error);
    return null; // Or a suitable fallback value
  }
}
// console.log(num)
async function addTask(taskName,link,points) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('http://localhost:3000/addTask', requestOptions);
    const data = await response.json();
    return data[0].taskNames;
  } catch (error) {
    alert('An error occurred while fetching tasks.');
    console.error(error);
    return null; // Or a suitable fallback value
  }
}
getTasks()

export default function Overlay() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const num = getTasks()
  const [points, setPoints] = useState(null); // State to hold the fetched points
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const fetchedPoints = await getTasks();
      setPoints(fetchedPoints);
      setLoading(false); // Stop loading after data is fetched
    };
    fetchData();
  }, []);
  const [showAddTask, setShowAddTask] = useState(false)
  const [formData, setFormData] = useState({
    task: '',
    link: '',
    category: 'general',
    difficulty: 'medium',
    urgent: 'no'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Task submitted:', formData)
    setShowAddTask(false)
    // Reset form
    setFormData({
      task: '',
      link: '',
      category: 'general',
      difficulty: 'medium',
      urgent: 'no'
    })
  }

  return (
    <>
      {/* Profile Dropdown */}
      <div className="overlay profile-menu">
        <button
          className="profile-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          User Profile
        </button>
        <div className={`profile-dropdown ${dropdownOpen ? 'show' : ''}`}>
          <a href="#"onClick={() => setDropdownOpen(!dropdownOpen)} onClick={() => {
            setShowAddTask(true)
            setDropdownOpen(false)
          }}>Add Task</a>
          <a href="#">Shop{points}</a>
        </div>
      </div>

      {/* Sample Text */}
      <div className="overlay sample-text">
        <h3>Welcome to the  Environment</h3>
        <p>Use WASD or arrow keys to move around. Click on the profile button in the top right to see the menu.</p>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="overlay add-task-modal">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setShowAddTask(false)}
            >
              ×
            </button>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="task">Task Name</label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="link">Link (optional)</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="urgent">Urgent?</label>
                <select
                  id="urgent"
                  name="urgent"
                  value={formData.urgent}
                  onChange={handleInputChange}
                >
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
    </>
  )
}