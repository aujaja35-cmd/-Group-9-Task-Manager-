# Group 9 Simple Task Manager Application

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS.

## Features

- **Task Management**: Create, update, and delete tasks
- **Task Properties**: Title, description, due date, priority (low/medium/high), and status (pending/in-progress/completed)
- **Filtering**: Filter tasks by status and priority
- **Local Storage**: Tasks are automatically saved to browser localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth interactions

## Technology Stack

- **React 18**: Modern React with hooks for component logic
- **TypeScript**: Type-safe code for better maintainability
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd group-9-task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Deployment to GitHub Pages

1. Update the `base` field in `vite.config.ts` with your repository name
2. Run the deployment command:

```bash
npm run deploy
```

This will build the project and deploy it to GitHub Pages.

## Project Structure

```
src/
├── components/       # React components
│   ├── TaskForm.tsx     # Form for adding new tasks
│   ├── TaskList.tsx     # List container component
│   ├── TaskCard.tsx     # Individual task card
│   └── FilterBar.tsx    # Filter controls
├── types/           # TypeScript type definitions
│   └── task.ts         # Task interface
├── utils/           # Utility functions
│   └── storage.ts      # localStorage operations
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## Usage

### Adding a Task

1. Fill in the task form at the top of the page
2. Enter a title (required) and due date (required)
3. Optionally add a description
4. Select priority level (low/medium/high)
5. Select initial status (pending/in-progress/completed)
6. Click "Add Task" button

### Updating a Task

- Use the status dropdown in each task card to change the task status

### Deleting a Task

- Click the trash icon in the top-right corner of any task card
- Confirm the deletion in the dialog

### Filtering Tasks

- Use the filter bar to show only tasks with specific status or priority
- Filters can be combined (e.g., show only "High" priority "Pending" tasks)

## Data Storage

Tasks are stored in the browser's localStorage, which means:
- Tasks persist across browser sessions
- Tasks are specific to each browser/device
- Clearing browser data will remove stored tasks
- No server or database connection is required

## License

This project is created for educational purposes.

## Contributors

Group 9
