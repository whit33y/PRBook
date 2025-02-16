import { Routes } from '@angular/router';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';
import { PrHistoryPageComponent } from './pages/pr-history-page/pr-history-page.component';
import { NewRecordPageComponent } from './pages/new-record-page/new-record-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: 'PRBook- home',
    canActivate: [AuthGuard],
  },
  {
    path: 'new-record',
    component: NewRecordPageComponent,
    title: 'PRBook- new record',
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    component: PrHistoryPageComponent,
    title: 'PRBook- history',
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    component: StartingPageComponent,
    title: 'Welcome to PRBook',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'PRBook login',
    canActivate: [NoAuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
