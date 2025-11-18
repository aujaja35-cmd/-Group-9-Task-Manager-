/**
 * Task Manager Core Logic
 * 
 * This module handles all task operations including CRUD functionality,
 * data persistence, validation, and filtering.
 * 
 * Data Storage: Uses localStorage to simulate file-based storage (JSON format)
 */

import { Task, TaskStatus, FilterOptions, TaskStatistics } from '@/types/task';

const STORAGE_KEY = 'taskManagerData';

/**
 * Generates a unique task ID using timestamp and random number
 * Format: TASK-[timestamp]-[random]
 */
export const generateTaskId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TASK-${timestamp}-${random}`;
};

/**
 * Validates task description
 * Requirements: Non-empty, maximum 500 characters
 */
export const validateTaskDescription = (description: string): boolean => {
  const trimmed = description.trim();
  return trimmed.length > 0 && trimmed.length <= 500;
};

/**
 * Validates date format (ISO 8601)
 */
export const validateDateFormat = (date: string): boolean => {
  if (!date) return true; // Date is optional
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
};

/**
 * Loads tasks from localStorage
 * Returns empty array if no data exists or on error
 */
export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

/**
 * Saves tasks to localStorage
 * Implements data persistence for the application
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

/**
 * Creates a new task with validation
 * Returns the created task or null if validation fails
 */
export const createTask = (
  description: string,
  dueDate: string | undefined,
  priority: Task['priority'],
  category: Task['category']
): Task | null => {
  // Input validation
  if (!validateTaskDescription(description)) {
    return null;
  }
  
  if (dueDate && !validateDateFormat(dueDate)) {
    return null;
  }

  const newTask: Task = {
    id: generateTaskId(),
    description: description.trim(),
    dueDate,
    status: 'Pending',
    priority,
    category,
    createdAt: new Date().toISOString(),
  };

  return newTask;
};

/**
 * Updates task status (mark as completed/pending)
 */
export const updateTaskStatus = (taskId: string, status: TaskStatus): void => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    tasks[taskIndex].status = status;
    if (status === 'Completed') {
      tasks[taskIndex].completedAt = new Date().toISOString();
    } else {
      delete tasks[taskIndex].completedAt;
    }
    saveTasks(tasks);
  }
};

/**
 * Deletes a task by ID
 */
export const deleteTask = (taskId: string): void => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(t => t.id !== taskId);
  saveTasks(filteredTasks);
};

/**
 * Filters tasks based on search query and filter options
 */
export const filterTasks = (
  tasks: Task[],
  searchQuery: string,
  filters: FilterOptions
): Task[] => {
  let filtered = [...tasks];

  // Filter by status
  if (filters.status !== 'All') {
    filtered = filtered.filter(t => t.status === filters.status);
  }

  // Filter by priority
  if (filters.priority) {
    filtered = filtered.filter(t => t.priority === filters.priority);
  }

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  // Search by description
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(t => 
      t.description.toLowerCase().includes(query)
    );
  }

  // Sort tasks
  filtered.sort((a, b) => {
    let compareValue = 0;

    switch (filters.sortBy) {
      case 'dueDate':
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        compareValue = dateA - dateB;
        break;
      case 'priority':
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        compareValue = priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      case 'createdAt':
        compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return filters.sortOrder === 'asc' ? compareValue : -compareValue;
  });

  return filtered;
};

/**
 * Calculates task statistics for dashboard
 */
export const calculateStatistics = (tasks: Task[]): TaskStatistics => {
  const stats: TaskStatistics = {
    total: tasks.length,
    completed: 0,
    pending: 0,
    byPriority: { Low: 0, Medium: 0, High: 0 },
    byCategory: { Work: 0, Personal: 0, Study: 0 },
  };

  tasks.forEach(task => {
    if (task.status === 'Completed') {
      stats.completed++;
    } else {
      stats.pending++;
    }
    stats.byPriority[task.priority]++;
    stats.byCategory[task.category]++;
  });

  return stats;
};
