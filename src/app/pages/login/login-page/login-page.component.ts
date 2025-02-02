import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/elements/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  register: boolean = false;
  forgot: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(private router: Router, private authService: AuthService) {}

  sendLogin() {
    this.authService.login(
      this.registerForm.value.email!,
      this.registerForm.value.password!
    );
  }

  sendRegister() {
    this.authService.register(
      this.registerForm.value.email!,
      this.registerForm.value.password!,
      this.registerForm.value.name!
    );
  }

  sendLogout() {
    this.authService.logout();
  }

  navigateToHome() {
    console.log('home');
    this.router.navigate(['/home']);
  }
}
