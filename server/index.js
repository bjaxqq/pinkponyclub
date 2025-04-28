import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

async function initializeDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch (error) {
    const defaultData = {
      totalPoints: 0,
      purchasedColors: [],
      currentColor: "#1E88E5",
      tasks: []
    };
    await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2));
  }
}

async function readData() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

initializeDataFile();


app.get('/api/data', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

app.put('/api/points', async (req, res) => {
  try {
    const { points } = req.body;
    const data = await readData();
    data.totalPoints = points;
    await writeData(data);
    res.json({ totalPoints: data.totalPoints });
  } catch (error) {
    res.status(500).json({ message: 'Error updating points', error: error.message });
  }
});

app.put('/api/color', async (req, res) => {
  try {
    const { color } = req.body;
    const data = await readData();
    data.currentColor = color;
    
    if (!data.purchasedColors.includes(color)) {
      data.purchasedColors.push(color);
    }
    
    await writeData(data);
    res.json({ currentColor: data.currentColor, purchasedColors: data.purchasedColors });
  } catch (error) {
    res.status(500).json({ message: 'Error updating color', error: error.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = req.body;
    const data = await readData();
    
    newTask.id = Date.now().toString();
    
    data.tasks.push(newTask);
    await writeData(data);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = await readData();
    
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    data.tasks.splice(taskIndex, 1);
    await writeData(data);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

app.post('/api/tasks/:id/complete', async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = await readData();
    
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const task = data.tasks[taskIndex];
    const pointsEarned = task.points || 5;
    
    data.totalPoints += pointsEarned;
    
    data.tasks.splice(taskIndex, 1);
    
    await writeData(data);
    res.json({ 
      message: 'Task completed successfully', 
      pointsEarned,
      totalPoints: data.totalPoints 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});