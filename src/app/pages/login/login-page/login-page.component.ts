import { Component } from '@angular/core';
import { InputComponent } from '../../../components/elements/input/input.component';
import { ButtonComponent } from '../../../components/elements/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  register: boolean = false;

  constructor(private router: Router) {}

  navigateToHome() {
    console.log('home');
    this.router.navigate(['/home']);
  }
}
