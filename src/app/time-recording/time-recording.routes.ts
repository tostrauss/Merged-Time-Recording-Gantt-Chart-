import { Routes } from '@angular/router';
import { TimeRecordingComponent } from './time-recording/time-recording.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
  { path: 'input', component: TimeRecordingComponent },
  { path: 'graph', component: GraphComponent },
  { path: '', redirectTo: 'input', pathMatch: 'full' }
]; 