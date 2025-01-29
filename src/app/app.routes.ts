import { Routes } from '@angular/router';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: StartingPageComponent,
    title: 'Welcome to PRBook',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'PRBook login',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'PRBook- home',
  },
];
