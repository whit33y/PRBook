import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// import { ButtonComponent } from './components/elements/button/button.component';
// import { CardComponent } from './components/elements/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PRBook';

  // clickFunction(event: Event) {
  //   console.log('xd', event);
  // }
  // svg = `<svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-abacus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3v18" /><path d="M19 21v-18" /><path d="M5 7h14" /><path d="M5 15h14" /><path d="M8 13v4" /><path d="M11 13v4" /><path d="M16 13v4" /><path d="M14 5v4" /><path d="M11 5v4" /><path d="M8 5v4" /><path d="M3 21h18" /></svg>`
}
