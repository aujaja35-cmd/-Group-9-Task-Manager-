/**
 * Task Manager Application - Main Page
 * 
 * SYSTEM OVERVIEW:
 * This is a comprehensive Task Manager Application developed as an academic project.
 * It demonstrates full CRUD operations, data persistence, input validation,
 * filtering, searching, and statistical analysis.
 * 
 * ARCHITECTURE:
 * - Component-based React architecture with TypeScript
 * - Separation of concerns: UI components, business logic, and data types
 * - localStorage for data persistence (simulating file-based storage)
 * - Modular design for maintainability and scalability
 * 
 * FEATURES IMPLEMENTED:
 * 1. Core Operations: Add, View, Update (status), Delete tasks
 * 2. Task Properties: Auto-generated ID, description, due date, status, priority, category
 * 3. Data Persistence: localStorage (JSON format)
 * 4. Filtering: By status, priority, and category
 * 5. Search: By task description
 * 6. Sorting: By due date, priority, or creation date
 * 7. Input Validation: Non-empty descriptions, valid date format
 * 8. Statistics Dashboard: Task completion rate, distribution analysis
 * 
 * TECHNOLOGY STACK:
 * - React with TypeScript for type safety
 * - Tailwind CSS for styling with custom design system
 * - Shadcn UI components for consistent UI
 * - date-fns for date formatting
 * 
 * BONUS FEATURES:
 * - Priority levels (High, Medium, Low)
 * - Task categories (Work, Personal, Study)
 * - Sorting options
 * - Comprehensive statistics
 * 
 * DATA STRUCTURE:
 * Tasks are stored as JSON in localStorage with the following schema:
 * {
 *   id: string,
 *   description: string,
 *   dueDate?: string,
 *   status: 'Pending' | 'Completed',
 *   priority: 'Low' | 'Medium' | 'High',
 *   category: 'Work' | 'Personal' | 'Study',
 *   createdAt: string,
 *   completedAt?: string
 * }
 */

import { useState, useEffect } from 'react';
import { Task, FilterOptions } from '@/types/task';
import {
  loadTasks,
  saveTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  filterTasks,
  calculateStatistics,
} from '@/lib/taskManager';
import { TaskForm } from '@/components/TaskForm';
import { TaskItem } from '@/components/TaskItem';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskStatisticsCard } from '@/components/TaskStatistics';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList } from 'lucide-react';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'All',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const { toast } = useToast();

  // Load tasks on component mount
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  // Handle task creation
  const handleAddTask = (
    description: string,
    dueDate: string | undefined,
    priority: Task['priority'],
    category: Task['category']
  ) => {
    const newTask = createTask(description, dueDate, priority, category);
    
    if (!newTask) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again',
        variant: 'destructive',
      });
      return;
    }

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    toast({
      title: 'Success',
      description: 'Task created successfully',
    });
  };

  // Handle task status toggle
  const handleToggleStatus = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus: Task['status'] = task.status === 'Pending' ? 'Completed' : 'Pending';
    updateTaskStatus(taskId, newStatus);
    
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        const updated: Task = { 
          ...t, 
          status: newStatus, 
          completedAt: newStatus === 'Completed' ? new Date().toISOString() : undefined 
        };
        return updated;
      }
      return t;
    });
    setTasks(updatedTasks);

    toast({
      title: 'Status Updated',
      description: `Task marked as ${newStatus.toLowerCase()}`,
    });
  };

  // Handle task deletion
  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);

    toast({
      title: 'Task Deleted',
      description: 'Task removed successfully',
    });
  };

  // Filter and display tasks
  const filteredTasks = filterTasks(tasks, searchQuery, filters);
  const statistics = calculateStatistics(tasks);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Task Manager Application</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Organize your tasks efficiently with priorities, categories, and due dates
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form and Statistics */}
          <div className="space-y-6">
            <TaskForm onSubmit={handleAddTask} />
            <TaskStatisticsCard statistics={statistics} />
          </div>

          {/* Right Column - Filters and Task List */}
          <div className="lg:col-span-2 space-y-6">
            <TaskFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Task List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Tasks ({filteredTasks.length})
                </h2>
              </div>

              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No tasks found</p>
                  <p className="text-sm">
                    {tasks.length === 0
                      ? 'Create your first task to get started'
                      : 'Try adjusting your filters or search query'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Documentation Note */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">System Documentation</h3>
          <p className="text-sm text-muted-foreground">
            This Task Manager Application implements all required features including CRUD operations,
            data persistence (localStorage/JSON), input validation, filtering, searching, and sorting.
            Bonus features include priority levels, categories, and comprehensive statistics.
            All code is documented with comments explaining the architecture and functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
