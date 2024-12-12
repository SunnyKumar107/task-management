import axios from 'axios'
import { Task } from '../types/Task'

const API_URL = 'https://task-management-mkrq.onrender.com'

export const getTasks = async () => axios.get<Task[]>(`${API_URL}/tasks`)

export const addTask = async (task: Partial<Task>) =>
  axios.post<Task>(`${API_URL}/tasks`, task)

export const updateTask = async (id: number, task: Partial<Task>) =>
  axios.put<Task>(`${API_URL}/tasks/${id}`, task)

export const deleteTask = async (id: number) =>
  axios.delete(`${API_URL}/tasks/${id}`)
