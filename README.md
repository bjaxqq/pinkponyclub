# Team Pink Pony Club - Hack QU Spring 2025

## Contributors

[Riley Damasco](https://github.com/DrabAdario)
[Brooks Jackson](https://github.com/bjaxqq)

## 🏆 Travelers Award Winner

We're proud to announce that our project won the Travelers Award at Hack QU Spring 2025!

## Project Overview

Taskbot is a gamified task management application that transforms your to-do list into an interactive 3D experience. Built around the hackathon theme of "gamify something," our application turns mundane task management into an engaging game where completing tasks earns you points that can be spent on customizations.

## Features

- **Interactive 3D Environment**: Navigate a 3D world where your tasks are represented as interactive cubes
- **Task Management**: Add, view, and complete tasks in a gamified interface
- **Point System**: Earn points by completing tasks based on difficulty and urgency
- **Customization Shop**: Spend earned points to customize your character's appearance
- **Responsive Design**: Works on both desktop and mobile devices

## Technologies Used

- **Frontend**:
  - React.js for UI components
  - Three.js/React Three Fiber for 3D rendering
  - Tailwind CSS for styling

- **Backend**:
  - Node.js with Express for the API
  - JSON file-based data storage

## How It Works

1. **Task Creation**: Users can create tasks with different attributes:
   - Task name and optional link
   - Category (general, work, personal, learning)
   - Difficulty (easy, medium, hard)
   - Urgency (yes/no)

2. **Point System**:
   - Easy tasks: 3 points
   - Medium tasks: 5 points
   - Hard tasks: 10 points
   - Urgent tasks: +2 bonus points

3. **Customization Shop**:
   - Spend earned points on different character colors
   - Prices range from 10-50 points based on rarity

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/taskbot.git
   cd taskquest3d
   ```
   
2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
  npm install

  # Install backend dependencies
  cd server
  npm install
  ```

3. Start the backend server:
  ```bash
  cd server
  npm start
  ```
4. Start the frontend development server:
   ```bash
   npm start
   ```
 
 5. Open your browser and navigate to `http://localhost:3000`

## What We Learned

- Integrating 3D graphics with a web application using Three.js
- Building a gamification system with points and rewards
- Creating an intuitive user experience for task management
- Developing a full-stack application with React and Node.js

## Acknowledgements

- Special thanks to Travelers for recognizing our project with their award!
