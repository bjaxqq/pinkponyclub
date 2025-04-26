import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

async function getTasks() {
  try {
    const requestOptions = { // Define requestOptions if you need them
      method: 'GET', // Assuming it's a GET request
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('http://localhost:3000/tasks', requestOptions);
    console.log(response);
    const data = await response.json();
    console.log(data); // Log the fetched tasks
    // You can store this data in a state variable and pass it to your components
  } catch (error) {
    alert('An error occurred while fetching tasks.');
    console.error(error);
  }
}

getTasks();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
