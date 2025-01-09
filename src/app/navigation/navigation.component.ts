import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="nav-container">
      <h1>Project Navigation</h1>
      <div class="nav-buttons">
        <a routerLink="/time-recording" class="nav-button">Time Recording</a>
        <a routerLink="/gantt-chart" class="nav-button">Gantt Chart</a>
      </div>
    </div>
  `,
  styles: [`
    .nav-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .nav-buttons {
      display: flex;
      gap: 20px;
    }
    .nav-button {
      padding: 15px 30px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 18px;
    }
    .nav-button:hover {
      background-color: #0056b3;
    }
  `]
})
export class NavigationComponent {
  constructor(private router: Router) {}

  goToGanttChart(): void {
    this.router.navigate(['/gantt-chart']);
  }
} 