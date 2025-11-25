import { Task } from '@/types/task';
import { Trash2, Calendar, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-5 border border-border hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-foreground flex-1 pr-2">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-destructive hover:text-destructive/80 transition-colors p-1"
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {task.description && (
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
        <Calendar size={16} />
        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]} border`}>
          <AlertCircle size={12} className="inline mr-1" />
          {task.priority.toUpperCase()}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="pt-3 border-t border-border">
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Update Status:
        </label>
        <select
          value={task.status}
          onChange={(e) => onUpdate(task.id, { status: e.target.value as Task['status'] })}
          className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};
