import { Component } from '@angular/core';
import { InputComponent } from '../../../components/elements/input/input.component';
import { ButtonComponent } from '../../../components/elements/button/button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
