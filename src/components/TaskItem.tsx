/**
 * TaskItem Component
 * 
 * Displays individual task with actions
 * Shows task properties and provides mark complete/delete functionality
 */

import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, Trash2, Calendar, Flag, FolderOpen } from 'lucide-react';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem = ({ task, onToggleStatus, onDelete }: TaskItemProps) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'Work':
        return 'bg-primary text-primary-foreground';
      case 'Study':
        return 'bg-accent text-accent-foreground';
      case 'Personal':
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${task.status === 'Completed' ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleStatus(task.id)}
            className="mt-1 shrink-0"
          >
            {task.status === 'Completed' ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>

          <div className="flex-1 min-w-0">
            <p className={`text-base mb-2 ${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {task.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Flag className="h-3 w-3" />
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>

              <div className="flex items-center gap-1">
                <FolderOpen className="h-3 w-3" />
                <Badge variant="outline" className={getCategoryColor(task.category)}>
                  {task.category}
                </Badge>
              </div>

              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                </div>
              )}

              <span className="text-xs">ID: {task.id}</span>
            </div>

            {task.completedAt && (
              <p className="text-xs text-success mt-1">
                Completed: {format(new Date(task.completedAt), 'MMM dd, yyyy HH:mm')}
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
