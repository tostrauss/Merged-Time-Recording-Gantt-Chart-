import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gantt-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToDataInput(): void {
    this.router.navigate(['/gantt-chart/data-input']);
  }

  goToGanttChart(): void {
    this.router.navigate(['/gantt-chart/chart']);
  }

  isRoute(path: string): boolean {
    return this.router.url === path;
  }
} 