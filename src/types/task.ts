/**
 * Task Management System - Type Definitions
 * 
 * This file defines the core data structures for the Task Manager Application.
 * These types ensure type safety throughout the application.
 */

export type TaskStatus = 'Pending' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskCategory = 'Work' | 'Personal' | 'Study';

/**
 * Task Interface
 * Represents a single task in the system with all its properties
 */
export interface Task {
  id: string;                    // Auto-generated unique identifier
  description: string;           // Task description (required)
  dueDate?: string;              // Optional due date in ISO format
  status: TaskStatus;            // Current status: Pending or Completed
  priority: TaskPriority;        // Task priority level
  category: TaskCategory;        // Task category
  createdAt: string;             // Timestamp when task was created
  completedAt?: string;          // Timestamp when task was completed
}

/**
 * Filter Options Interface
 * Defines available filtering and sorting options
 */
export interface FilterOptions {
  status: 'All' | TaskStatus;
  priority?: TaskPriority;
  category?: TaskCategory;
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

/**
 * Task Statistics Interface
 * Provides summary information about tasks
 */
export interface TaskStatistics {
  total: number;
  completed: number;
  pending: number;
  byPriority: Record<TaskPriority, number>;
  byCategory: Record<TaskCategory, number>;
}
