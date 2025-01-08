import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../gantt-chart/models/task.model';
import { HeaderComponent } from '../header/header.component';

interface TaskForm {
  name: string;
  start_date: string;
  end_date: string;
  progress: number;
  priority: string;
  dependencies: string;
}

@Component({
  selector: 'app-data-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  template: `
    <app-gantt-header></app-gantt-header>
    <div class="container">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h2 class="mb-0">Task Data Input</h2>
        </div>
        <div class="card-body">
          <form (ngSubmit)="onSubmit()" #taskForm="ngForm" class="needs-validation">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Task Name</label>
                <input type="text" [(ngModel)]="task.name" name="name" 
                       class="form-control" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Dependencies</label>
                <input type="text" [(ngModel)]="task.dependencies" name="dependencies" 
                       class="form-control" placeholder="e.g. 1,2">
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Start Date</label>
                <input type="date" [(ngModel)]="task.start_date" name="start_date" 
                       class="form-control" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">End Date</label>
                <input type="date" [(ngModel)]="task.end_date" name="end_date" 
                       class="form-control" required>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Priority</label>
                <select [(ngModel)]="task.priority" name="priority" class="form-control">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Progress (%)</label>
                <input type="number" [(ngModel)]="task.progress" name="progress" 
                       class="form-control" min="0" max="100">
              </div>
            </div>
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    .card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 8px;
      border: none;
    }
    
    .card-header {
      padding: 1.5rem;
      border-radius: 8px 8px 0 0;
      background: linear-gradient(45deg, #000000, #1a1a1a);
    }
    
    .card-header h2 {
      font-size: 1.8rem;
      margin: 0;
    }
    
    .card-body {
      padding: 2.5rem;
    }
    
    .form-label {
      font-weight: 600;
      font-size: 1rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .form-control {
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid #dee2e6;
      font-size: 1rem;
    }
    
    .form-control:focus {
      box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
      border-color: #000000;
    }
    
    .mb-3 {
      margin-bottom: 1.5rem !important;
    }
    
    .btn-lg {
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      background-color: #000000;
      border: none;
    }
    
    .btn-lg:hover {
      background-color: #1a1a1a;
      transform: translateY(-1px);
    }
    
    select.form-control {
      appearance: none;
      background-image: url("data:image/svg+xml,...");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px 12px;
    }
  `]
})
export class DataInputComponent {
  task: TaskForm = {
    name: '',
    start_date: '',
    end_date: '',
    progress: 0,
    priority: 'low',
    dependencies: ''
  };

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    const newTask: Task = {
      name: this.task.name,
      start_date: new Date(this.task.start_date),
      end_date: new Date(this.task.end_date),
      progress: Number(this.task.progress) / 100,
      priority: this.task.priority,
      dependencies: this.task.dependencies ? 
        this.task.dependencies.split(',').map(Number).filter(Boolean) : 
        []
    };
    
    this.taskService.addTask(newTask);
    
    // Fix navigation
    this.router.navigate(['../view-chart'], { relativeTo: this.route });
  }
}
