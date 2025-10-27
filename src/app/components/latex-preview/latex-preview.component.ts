import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-latex-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './latex-preview.component.html',
  styleUrl: './latex-preview.component.scss'
})
export class LatexPreviewComponent {
  readonly compiledAt = signal<Date | null>(null);

  readonly isLoading = signal(false);

  protected render(): void {
    this.isLoading.set(true);
    globalThis.setTimeout(() => {
      this.isLoading.set(false);
      this.compiledAt.set(new Date());
    }, 900);
  }
}
