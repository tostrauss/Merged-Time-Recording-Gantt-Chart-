export interface Task {
  id?: number;
  name: string;
  start_date: Date;
  end_date: Date;
  progress?: number;
  priority?: string;
  dependencies?: number[];
} 