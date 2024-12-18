export interface Task {
  id: string
  title: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  completed: boolean
}
