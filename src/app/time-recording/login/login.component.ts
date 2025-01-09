import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeRecordingService } from '../services/time-recording.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h2 class="mb-0">Time Recording Login</h2>
        </div>
        <div class="card-body">
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input type="text" [(ngModel)]="username" name="username" 
                     class="form-control" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" [(ngModel)]="password" name="password" 
                     class="form-control" required>
            </div>
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 500px;
      margin: 4rem auto;
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
      color: white;
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
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private timeRecordingService: TimeRecordingService, 
    private router: Router
  ) {}

  onSubmit() {
    if (this.username && this.password) {
      // Comment out library call and use simple navigation
      // this.timeRecordingService.login({
      //   username: this.username,
      //   password: this.password
      // }).subscribe(...);
      
      // For now, just navigate on any input
      this.router.navigate(['/time-recording/input']);
    }
  }
}
