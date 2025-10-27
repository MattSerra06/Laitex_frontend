import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly mediaQuery = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  private readonly theme = signal<ThemeMode>(this.mediaQuery?.matches ? 'dark' : 'light');

  readonly mode = computed(() => this.theme());

  constructor() {
    this.applyTheme(this.theme());
    if (this.mediaQuery) {
      this.mediaQuery.addEventListener('change', ({ matches }) => {
        this.setTheme(matches ? 'dark' : 'light');
      });
    }
  }

  toggle(): void {
    const next: ThemeMode = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    this.applyTheme(mode);
  }

  private applyTheme(mode: ThemeMode): void {
    this.document.body.dataset['theme'] = mode;
  }
}
