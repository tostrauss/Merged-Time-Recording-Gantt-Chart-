import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-gantt-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-dark">
      <div class="container-fluid">
        <div class="nav-left">
          <a class="back-button" routerLink="/">
            <i class="fas fa-home"></i> Home
          </a>
          <span class="navbar-brand">GanttChartApp</span>
        </div>
        <div class="nav-buttons">
          <a class="nav-button" 
             routerLink="../data-input" 
             routerLinkActive="active">
             Data Input
          </a>
          <a class="nav-button" 
             routerLink="../view-chart" 
             routerLinkActive="active">
             View Chart
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #000000;
      padding: 1rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .nav-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .navbar-brand {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: default;
    }
    
    .back-button {
      color: white;
      text-decoration: none;
      padding: 0.4rem 1rem;
      border-radius: 4px;
      background-color: rgba(255,255,255,0.1);
      transition: all 0.15s ease;
      font-size: 0.9rem;
      margin-left: -1rem;
    }
    
    .back-button:hover {
      background-color: rgba(255,255,255,0.15);
    }
    
    .nav-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .nav-button {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
      background-color: rgba(255,255,255,0.1);
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .nav-button:hover {
      transform: scale(1.02);
      background-color: rgba(255,255,255,0.15);
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
    
    .nav-button.active {
      background-color: rgba(255,255,255,0.2);
      font-weight: bold;
    }
    
    .container-fluid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class HeaderComponent {} 