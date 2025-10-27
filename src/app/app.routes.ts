import { Routes } from '@angular/router';
import { WorkspaceComponent } from './features/workspace/workspace.component';

export const routes: Routes = [
  { path: '', component: WorkspaceComponent },
  { path: '**', redirectTo: '' }
];
