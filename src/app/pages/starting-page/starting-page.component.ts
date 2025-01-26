import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/elements/button/button.component';

@Component({
  selector: 'app-starting-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './starting-page.component.html',
  styleUrl: './starting-page.component.scss',
})
export class StartingPageComponent {}
