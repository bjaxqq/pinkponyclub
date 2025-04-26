import axios from 'axios';
import { readJsonFile, writeJsonFile } from './utils.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors({
        orgin: 'http://127.0.0.1:5500'
}))
app.use(express.json());

app.listen(port, () => {
        console.log(`Server running on port ${port}`);
})

app.get('/tasks', async (req, res) => {
        try {
                const task = await readJsonFile('tasks.json');
                return res.status(200).json(task);


        } catch (error) {
                console.error('Error reading file', error);
                return res.status(404).json({ error: 'reading file' });


        }
});

app.post('/addTask', async (req, res) => {
        try {
                const task = await readJsonFile('tasks.json');
                const newTask = req.body;
                newTask.points = 5
                console.log(newTask)
                task.push(newTask);
                console.log(task)

                await writeJsonFile('tasks.json', task);

                return res.status(200).json(task);


        } catch (error) {
                console.error('Error reading file', error);
                return res.status(404).json({ error: 'reading file' });


        }
});
