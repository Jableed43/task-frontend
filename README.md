# Frontend Task Manager

This is the frontend of a task management system developed with React, MUI, and React Query. The application interacts with the backend API to manage tasks and users.

## Features

- **Task Management**:
  - Create tasks
  - View tasks with status filters (pending, in-progress, completed)
  - Edit tasks
  - Delete tasks
  - Pagination of tasks
  - Filter tasks by status

## Technologies Used

- **React**: Library for building the user interface
- **Material-UI (MUI)**: Component framework for the UI
- **React Query**: For managing communication with the API and state of the data
- **React Router**: For navigating between pages
- **Vite**: Fast build tool for React

## Installation

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Vite**: Install globally if you don't have it: `npm install -g vite`

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Jableed43/task-frontend.git
cd task-frontend
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following variable:

```bash
VITE_BACKEND_ENDPOINT=http://localhost:3002/
```

### 4. Run the Project

To start the server in development mode, run:

```bash
npm run dev
```

This will open the application in [http://localhost:5173](http://localhost:5173).

---
