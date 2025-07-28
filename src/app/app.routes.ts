import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';

export const routes: Routes = [
  { path: '', redirectTo: 'helpers/1', pathMatch: 'full' },
  { path: 'helpers/:id', component: MainContentComponent },
];