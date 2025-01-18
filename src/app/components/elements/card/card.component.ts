import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() size: 'desktop' | 'mobile' = 'desktop';
  @Input() title: string = 'Title';
  @Input() description: string = 'Example description!';
  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.size === 'desktop' ? 'card-desktop' : 'card-mobile';
    return ['card', mode];
  }
}
