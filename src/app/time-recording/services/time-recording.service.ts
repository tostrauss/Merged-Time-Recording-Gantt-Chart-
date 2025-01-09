import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TimeRecord {
  userId: number;
  taskDetails: string;
  hoursWorked: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimeRecordingService {
  private records: TimeRecord[] = [];
  private recordsSubject = new BehaviorSubject<TimeRecord[]>([]);

  addRecord(record: TimeRecord): void {
    this.records.push(record);
    this.recordsSubject.next([...this.records]);
  }

  getRecords(): Observable<TimeRecord[]> {
    return this.recordsSubject.asObservable();
  }
}


