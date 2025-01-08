import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../gantt-chart/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  getTasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    // Add an ID if not present
    const newTask = {
      ...task,
      id: this.tasks.length + 1,
      // Ensure dates are properly formatted
      start_date: new Date(task.start_date),
      end_date: new Date(task.end_date),
      // Ensure progress is between 0 and 1
      progress: Math.min(1, Math.max(0, task.progress || 0))
    };
    
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);

    // Log for debugging
    console.log('Current tasks:', this.tasks);
  }

  // Optional: Add method to clear tasks
  clearTasks(): void {
    this.tasks = [];
    this.tasksSubject.next([]);
  }
} 