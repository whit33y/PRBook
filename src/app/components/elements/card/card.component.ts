import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  @Input() color: string = 'purple';
  @Output() onClick = new EventEmitter<Event>();
  @Input() set svgContent(content: string) {
    this._svgContent = content || this._svgContent;
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(content);
  }

  private _svgContent: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M2 12h1" />
            <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" />
            <path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
            <path d="M9 12h6" />
            <path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
            <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" />
            <path d="M22 12h-1" />
        </svg>`;
  safeSvgContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {
    this.safeSvgContent = this.sanitizer.bypassSecurityTrustHtml(
      this._svgContent
    );
  }

  get svgContent(): string {
    return this._svgContent;
  }

  public get classes(): string[] {
    const mode = this.size === 'desktop' ? 'card-desktop' : 'card-mobile';
    return ['card', mode, `card-${this.color}`];
  }
}
