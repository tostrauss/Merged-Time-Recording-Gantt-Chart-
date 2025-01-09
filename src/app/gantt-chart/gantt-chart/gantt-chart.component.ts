import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import 'dhtmlx-gantt';
import { TaskService } from '../services/task.service';
import { HeaderComponent } from '../header/header.component';

declare let gantt: any;

@Component({
  standalone: true,
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
  imports: [CommonModule, HeaderComponent]
})
export class GanttChartComponent implements OnInit, OnDestroy {
  @ViewChild('ganttContainer', { static: true }) ganttContainer!: ElementRef;
  private tasksSub!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Configure gantt
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.scale_height = 50;
    gantt.config.row_height = 30;
    
    // Scale configuration
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%j, %D" }
    ];

    // Initialize gantt
    gantt.init(this.ganttContainer.nativeElement);

    // Subscribe to tasks
    this.tasksSub = this.taskService.getTasks$().subscribe(tasks => {
      if (tasks && tasks.length > 0) {
        const ganttData = {
          data: tasks.map(task => ({
            id: task.id,
            text: task.name,
            start_date: task.start_date,
            end_date: task.end_date,
            progress: task.progress || 0,
            priority: task.priority,
            dependencies: task.dependencies?.join(',') || ''
          }))
        };
        
        // Clear existing data and load new data
        gantt.clearAll();
        gantt.parse(ganttData);
      }
    });

    // Add task linking
    gantt.config.links = {
      finish_to_start: "0",
      start_to_start: "1",
      finish_to_finish: "2",
      start_to_finish: "3"
    };
  }

  ngOnDestroy(): void {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
  }
}