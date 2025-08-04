import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AddHelperComponent } from './components/add-helper/add-helper.component';

export const routes: Routes = [
  { path: '', redirectTo: 'helpers/1', pathMatch: 'full' },
  { path: 'helpers/add', component: AddHelperComponent },
  { path: 'helpers/edit/:id', component: AddHelperComponent },
  { path: 'helpers/:id', component: MainContentComponent },
];