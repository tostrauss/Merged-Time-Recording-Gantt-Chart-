import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeRecordingService } from '../services/time-recording.service';
import { Router } from '@angular/router';
import { TimeRecordingHeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-time-recording',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeRecordingHeaderComponent],
  templateUrl: './time-recording.component.html',
  styleUrls: ['./time-recording.component.css']
})
export class TimeRecordingComponent {
  record = {
    userId: 0,
    taskDetails: '',
    hoursWorked: 0,
    date: new Date().toISOString().split('T')[0]
  };

  constructor(
    private timeRecordingService: TimeRecordingService,
    private router: Router
  ) {}

  addRecord(recordForm: any): void {
    if (recordForm.valid) {
      console.log('Adding record:', this.record);
      this.timeRecordingService.addRecord({...this.record});
      recordForm.reset();
      this.record = {
        userId: 0,
        taskDetails: '',
        hoursWorked: 0,
        date: new Date().toISOString().split('T')[0]
      };
      this.router.navigate(['/time-recording/graph']);
    }
  }
}

