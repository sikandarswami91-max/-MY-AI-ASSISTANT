export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'today' | 'upcoming' | 'completed';

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  timeString: string;
  dueDate: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  tag?: string;
}
