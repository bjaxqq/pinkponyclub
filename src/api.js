import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = {
  async getAllData() {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
  },
  
  async getTasks() {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },
  
  async addTask(task) {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },
  
  async completeTask(taskId) {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/complete`);
    return response.data;
  },
  
  async updatePoints(points) {
    const response = await axios.put(`${API_URL}/points`, { points });
    return response.data;
  },
  
  async updateColor(color) {
    const response = await axios.put(`${API_URL}/color`, { color });
    return response.data;
  }
};

export default api;