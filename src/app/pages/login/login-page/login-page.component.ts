import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/elements/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  loading: boolean = false;
  error: string = '';
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  sendLogin() {
    this.loading = true;
    setTimeout(() => {
      this.authService
        .login(
          this.registerForm.value.email!,
          this.registerForm.value.password!
        )
        .then(() => {
          this.loading = false;
          console.log('Successfully registered!');
        })
        .catch((error) => {
          this.loading = false;
          console.error('Something went wrong during registration: ', error);
        });
    }, 2000);
  }

  sendRegister() {
    this.loading = true;
    if (
      this.registerForm.value.password ===
        this.registerForm.value.confirmPassword &&
      this.registerForm.valid
    ) {
      setTimeout(() => {
        this.authService
          .register(
            this.registerForm.value.email!,
            this.registerForm.value.password!,
            this.registerForm.value.name!
          )
          .then(() => {
            this.loading = false;
            console.log('Successfully registered!');
          })
          .catch((error) => {
            this.loading = false;
            console.error('Something went wrong during registration: ', error);
          });
      }, 2000);
    } else {
      this.loading = false;
      this.error = 'Please fix the errors before submitting.';
      return;
    }
  }

  sendLogout() {
    this.authService.logout();
  }

  navigateToHome() {
    console.log('home');
    this.router.navigate(['/home']);
  }
}
