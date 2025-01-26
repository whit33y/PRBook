import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/elements/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starting-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './starting-page.component.html',
  styleUrl: './starting-page.component.scss',
})
export class StartingPageComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
