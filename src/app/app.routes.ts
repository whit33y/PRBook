import { Routes } from '@angular/router';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: StartingPageComponent,
    title: 'Welcome to PRBook',
  },
];
