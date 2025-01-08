import { Routes } from '@angular/router';
import { TimeRecordingComponent } from './time-recording/time-recording/time-recording.component';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'time-recording', component: TimeRecordingComponent },
  { 
    path: 'gantt-chart',
    loadChildren: () => import('./gantt-chart/gantt-chart.routes').then(m => m.ganttChartRoutes)
  }
];

