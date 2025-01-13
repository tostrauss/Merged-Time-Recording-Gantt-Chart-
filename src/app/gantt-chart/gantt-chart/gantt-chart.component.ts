import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import 'dhtmlx-gantt';
import { TaskService } from '../services/task.service';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

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
  private ApiLink = 'http://localhost:4000'; // Replace with your actual API link

  constructor(private taskService: TaskService, private http: HttpClient) {}

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

  // Implementing takeAction method
  takeAction(action: any, payload: any): Observable<any> {
    return this.http.post(`${this.ApiLink}/api/action`, { action, payload });
  }

  // Retrieve time clock data
  retrieveTimeClockData() {
    const action = { "CALL": 'retrieveTimeClockData' };
    const payload = true;

    this.takeAction(action, payload).pipe(take(1)).subscribe(
      (response) => {
        console.log('Time Clock Data:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Retrieve Gantt data
  retrieveGanttData() {
    const action = { "CALL": 'retrieveGanttData' };
    const payload = true;

    this.takeAction(action, payload).pipe(take(1)).subscribe(
      (response) => {
        console.log('Gantt Data:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Update Gantt data
  updateGanttData(data: any) {
    const action = { "CALL": 'updateGanttData', ...data };
    const payload = true;

    this.takeAction(action, payload).pipe(take(1)).subscribe(
      (response) => {
        console.log('Update Gantt Data Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Update time clock data
  updateTimeClockData(data: any) {
    const action = { "CALL": 'updateTimeClockData', ...data };
    const payload = true;

    this.takeAction(action, payload).pipe(take(1)).subscribe(
      (response) => {
        console.log('Update Time Clock Data Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Delete Gantt data
  deleteGanttData(id: string) {
    const action = { "CALL": 'deleteGanttData', id };
    const payload = true;

    this.takeAction(action, payload).pipe(take(1)).subscribe(
      (response) => {
        console.log('Delete Gantt Data Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Delete time clock data
  deleteTimeClockData(id: string) {
    const action = { "CALL": 'deleteTimeClockData', id };
    const payload = true;

    this.takeAction(action, payload).pipe(take(1)).subscribe(
      (response) => {
        console.log('Delete Time Clock Data Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}