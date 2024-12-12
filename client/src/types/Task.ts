export interface Task {
  id: number
  title: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  completed: boolean
}
