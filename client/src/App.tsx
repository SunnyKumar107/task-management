import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Popconfirm,
  notification,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker
} from 'antd'
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import { getTasks, deleteTask, updateTask, addTask } from './api/tasks'
import { Task } from './types/Task'
import dayjs from 'dayjs'

import type { ColumnsType } from 'antd/es/table'
import Header from './components/Header'

const { Option } = Select

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [form] = Form.useForm()
  const [createForm] = Form.useForm()

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await getTasks()
      setTasks(response.data)
    } catch (error) {
      notification.error({
        message: 'Failed to fetch tasks',
        description: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      notification.success({ message: 'Task deleted successfully' })
      fetchTasks()
    } catch (error) {
      notification.error({
        message: 'Failed to delete task',
        description: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const showEditModal = (task: Task) => {
    setCurrentTask(task)
    setIsEditModalVisible(true)
    form.setFieldsValue({
      title: task.title,
      priority: task.priority,
      dueDate: dayjs(task.dueDate),
      completed: task.completed
    })
  }

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields()
      const updatedTask = {
        ...currentTask,
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD')
      }
      await updateTask(updatedTask.id, updatedTask)
      notification.success({ message: 'Task updated successfully' })
      setIsEditModalVisible(false)
      fetchTasks()
    } catch (error) {
      notification.error({
        message: 'Failed to update task',
        description: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields()
      const newTask = {
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD')
      }
      await addTask(newTask)
      notification.success({ message: 'Task added successfully' })
      setIsCreateModalVisible(false)
      createForm.resetFields()
      fetchTasks()
    } catch (error) {
      notification.error({
        message: 'Failed to add task',
        description: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
    form.resetFields()
  }

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false)
    createForm.resetFields()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'red'
      case 'Medium':
        return 'orange'
      case 'Low':
        return 'green'
      default:
        return 'blue'
    }
  }

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, completed) => (
        <span className='flex items-center space-x-2'>
          <span className='font-semibold'>{text}</span>
          {completed && (
            <CheckOutlined className='text-xl font-bold text-green-600' />
          )}
        </span>
      )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)} className='font-semibold'>
          {priority}
        </Tag>
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate: string) => (
        <span className='text-gray-600'>
          {dayjs(dueDate).format('DD MMM YYYY')}
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Task) => (
        <span className='flex flex-col md:flex-row items-center gap-2'>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title='Are you sure to delete this task?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <div className='bg-gray-50 h-screen'>
      <Header onSetIsCreateModalVisible={setIsCreateModalVisible} />

      <Table
        dataSource={tasks}
        columns={columns}
        loading={loading}
        rowKey='id'
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title='Edit Task'
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={handleEditCancel}
        okText='Update'
        cancelText='Cancel'
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='title' label='Title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='priority'
            label='Priority'
            rules={[{ required: true }]}
          >
            <Select>
              <Option value='High'>High</Option>
              <Option value='Medium'>Medium</Option>
              <Option value='Low'>Low</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='dueDate'
            label='Due Date'
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Create Task'
        visible={isCreateModalVisible}
        onOk={handleCreate}
        onCancel={handleCreateCancel}
        okText='Create'
        cancelText='Cancel'
      >
        <Form form={createForm} layout='vertical'>
          <Form.Item name='title' label='Title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='priority'
            label='Priority'
            rules={[{ required: true }]}
          >
            <Select>
              <Option value='High'>High</Option>
              <Option value='Medium'>Medium</Option>
              <Option value='Low'>Low</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='dueDate'
            label='Due Date'
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
