import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  goToGithub() {
    window.open('https://github.com/whit33y');
  }

  goToLinkedin() {
    window.open('https://www.linkedin.com/in/jakub-bryska-b905b0279/');
  }
}
