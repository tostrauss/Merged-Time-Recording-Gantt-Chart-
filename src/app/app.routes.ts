import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  { path: '', component: NavigationComponent },
  { 
    path: 'time-recording',
    loadChildren: () => import('./time-recording/time-recording.routes')
      .then(m => m.routes)
  },
  { 
    path: 'gantt-chart',
    loadChildren: () => import('./gantt-chart/gantt-chart.routes')
      .then(m => m.routes)
  }
];

