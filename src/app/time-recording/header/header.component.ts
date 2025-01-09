import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-recording-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class TimeRecordingHeaderComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToRecordTime(): void {
    this.router.navigate(['/time-recording/input']);
  }

  goToGraph(): void {
    this.router.navigate(['/time-recording/graph']);
  }

  isRoute(path: string): boolean {
    return this.router.url === path;
  }
} 