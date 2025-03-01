import { Component } from '@angular/core';
import { ButtonComponent } from '../elements/button/button.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule ,ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  route: string = '';
  isLoggedIn = false;
  private authSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.route = event.url;
      });
  }

  ngOnInit() {
    this.authSubscription = this.authService.loggedInUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
