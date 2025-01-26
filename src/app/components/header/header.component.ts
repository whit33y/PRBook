import { Component } from '@angular/core';
import { ButtonComponent } from '../elements/button/button.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  route: string = '';
  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.route = event.url;
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
