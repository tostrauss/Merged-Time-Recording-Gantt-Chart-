import { Routes } from '@angular/router';
import { TimeRecordingComponent } from './time-recording.component';
import { GanttChartComponent } from './gantt-chart.component';

export const routes: Routes = [
  { path: 'time-recording', component: TimeRecordingComponent },
  { path: 'gantt-chart', component: GanttChartComponent },
  { path: '', redirectTo: 'time-recording', pathMatch: 'full' },
];
