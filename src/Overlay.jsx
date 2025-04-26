"use client"
import { useState } from 'react'

export default function Overlay() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

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
          <a href="#">Add Task</a>
          <a href="#">Shop</a>
        </div>
      </div>

      {/* Sample Text */}
      <div className="overlay sample-text">
        <h3>Welcome to the 3D Environment</h3>
        <p>Use WASD or arrow keys to move around. Click on the profile button in the top right to see the menu.</p>
      </div>
    </>
  )
}