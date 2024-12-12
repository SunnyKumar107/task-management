# Task Management App

This is a simple task management application built with React and TypeScript. The app allows users to manage tasks by adding, editing, and deleting tasks. It features pagination, state management with React hooks, API integration using Axios, and a polished UI with Ant Design components.

---

## Live Demo

You can view the live demo of the project here: [Task Management](https://task-management-seven-sage.vercel.app/)

---

## Features

### 1. UI Features

- **Add New Task Form**

  - **Fields**:
    - **Task Title**: Text input
    - **Priority**: Dropdown (High, Medium, Low)
    - **Due Date**: Date picker
    - **Status**: Toggle switch (Completed/Not Completed)
  - Form validation using Ant Design's `Form` component.

- **Task List Table**

  - **Columns**:
    - Task Title
    - Priority
    - Due Date
    - Status
    - Actions (Edit/Delete)
  - Pagination implemented using Ant Design's `Table` component.

- **Notifications**
  - User feedback via Ant Design's `Notification` component (e.g., "Task added successfully").

### 2. API Integration

- Uses a custom Node.js mock server.
- **Endpoints**:

  - `GET /tasks` - Fetch all tasks.
  - `POST /tasks` - Add a new task.
  - `PUT /tasks/:id` - Update a task.
  - `DELETE /tasks/:id` - Delete a task.

- API requests are handled with Axios.

### 3. State Management

- React's `useState` and `useEffect` hooks are used to manage local state.

### 4. TypeScript

- All components, props, and state are strongly typed for better type safety and code quality.

### 5. Styling

- Ant Design components are used for building the UI:
  - `Table` for task list display with pagination
  - `Form`, `Input`, `Select`, `DatePicker`, `Switch`, and `Button` for the task form
  - `Modal` for editing tasks
  - `Notification` for user feedback

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/SunnyKumar107/task-management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-management
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License.
