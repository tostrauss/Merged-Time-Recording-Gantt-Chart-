import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss']
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
    this.router.navigate(['/gantt-chart/chart']);
  }
}
