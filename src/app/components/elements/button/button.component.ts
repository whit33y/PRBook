import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() label: string = 'Button';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() cutCornerLeft: boolean = false;
  @Input() cutCornerRight: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateButtonSize();
  }

  ngOnInit() {
    this.updateButtonSize();
  }

  updateButtonSize() {
    if (window.innerWidth <= 768) {
      this.size = 'small';
    } else if (window.innerWidth <= 1024) {
      this.size = 'medium';
    } else {
      this.size = 'large';
    }
  }

  public get classes(): string[] {
    const mode = !this.disabled ? 'button-active' : 'button-disabled';
    const cutCornerLeft = this.cutCornerLeft ? 'cut-left' : '';
    const cutCornerRight = this.cutCornerRight ? 'cut-right' : '';
    return ['button', mode, this.size, cutCornerLeft, cutCornerRight];
  }
}
