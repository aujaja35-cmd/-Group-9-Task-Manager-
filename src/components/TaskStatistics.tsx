/**
 * TaskStatistics Component
 * 
 * Displays task statistics and summary information
 * Bonus feature: Provides analytics on task completion and distribution
 */

import { TaskStatistics } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, CheckCircle2, Circle, Flag, FolderOpen } from 'lucide-react';

interface TaskStatisticsProps {
  statistics: TaskStatistics;
}

export const TaskStatisticsCard = ({ statistics }: TaskStatisticsProps) => {
  const completionRate = statistics.total > 0
    ? Math.round((statistics.completed / statistics.total) * 100)
    : 0;

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Task Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completion Rate</span>
            <span className="font-semibold">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold">{statistics.total}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <p className="text-2xl font-bold text-success">{statistics.completed}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <p className="text-2xl font-bold">{statistics.pending}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <p className="text-sm font-semibold">By Priority</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">High</span>
              <span className="font-medium">{statistics.byPriority.High}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Medium</span>
              <span className="font-medium">{statistics.byPriority.Medium}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Low</span>
              <span className="font-medium">{statistics.byPriority.Low}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            <p className="text-sm font-semibold">By Category</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Work</span>
              <span className="font-medium">{statistics.byCategory.Work}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Personal</span>
              <span className="font-medium">{statistics.byCategory.Personal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Study</span>
              <span className="font-medium">{statistics.byCategory.Study}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
