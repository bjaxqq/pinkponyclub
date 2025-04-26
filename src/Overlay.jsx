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
          <a href="#"onClick={() => setDropdownOpen(!dropdownOpen)}>Add Task</a>
          <a href="#">Shop{points}</a>
        </div>
      </div>

      {/* Sample Text */}
      <div className="overlay sample-text">
        <h3>Welcome to the  Environment</h3>
        <p>Use WASD or arrow keys to move around. Click on the profile button in the top right to see the menu.</p>
      </div>
    </>
  )
}