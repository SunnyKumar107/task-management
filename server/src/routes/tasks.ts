import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '../models/Task'

const router = Router()

let tasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Task 1',
    priority: 'High',
    dueDate: '2024-06-30',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Task 2',
    priority: 'Medium',
    dueDate: '2024-07-05',
    completed: true
  }
]

router.get('/', (_req: Request, res: Response) => {
  res.json(tasks)
})

router.post('/', (req: Request, res: Response) => {
  const { title, priority, dueDate, completed } = req.body
  const newTask: Task = {
    id: uuidv4(),
    title,
    priority,
    dueDate,
    completed
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const { title, priority, dueDate, completed } = req.body
  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex !== -1) {
    tasks[taskIndex] = { id, title, priority, dueDate, completed }
    res.json(tasks[taskIndex])
  } else {
    res.status(404).json({ message: 'Task not found' })
  }
})

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const initialLength = tasks.length
  tasks = tasks.filter((task) => task.id !== id)

  if (tasks.length < initialLength) {
    res.json({ message: 'Task deleted successfully' })
  } else {
    res.status(404).json({ message: 'Task not found' })
  }
})

export default router
