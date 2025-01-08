import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeRecordingService } from '../services/time-recording.service';

@Component({
  selector: 'app-time-recording',
  templateUrl: './time-recording.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TimeRecordingComponent {
  message: any;
  constructor(private timeRecordingService: TimeRecordingService) {}

  addRecord(recordForm: any): void {
    if (recordForm.valid) {
      const { taskDetails, hoursWorked, date } = recordForm.value;

      const record = {
        taskDetails,
        hoursWorked,
        date,
      };

      this.timeRecordingService.addRecord(record).subscribe(
        () => {
          console.log('Record added successfully');
          recordForm.reset(); // Clear the form after submission
        },
        (error) => {
          console.error('Error adding record:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}

