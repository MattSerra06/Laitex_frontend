import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'laitex.workspace.theme';
  private readonly document = inject(DOCUMENT);
  private readonly isDark = signal(false);

  readonly isDarkTheme = this.isDark.asReadonly();

  constructor() {
    this.restorePreference();

    effect(() => {
      const darkMode = this.isDark();
      this.applyTheme(darkMode);
      this.persistPreference(darkMode);
    });
  }

  toggleTheme(): void {
    this.isDark.update((value) => !value);
  }

  private applyTheme(darkMode: boolean): void {
    const body = this.document?.body;
    if (!body) {
      return;
    }

    const classList = body.classList;
    classList.remove('light-theme', 'dark-theme');
    classList.add(darkMode ? 'dark-theme' : 'light-theme');
  }

  private persistPreference(darkMode: boolean): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      window.localStorage.setItem(this.storageKey, darkMode ? 'dark' : 'light');
    } catch (error) {
      console.warn('Unable to persist theme preference', error);
    }
  }

  private restorePreference(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      const stored = window.localStorage.getItem(this.storageKey);
      if (stored) {
        this.isDark.set(stored === 'dark');
        return;
      }

      const prefersDark =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : false;
      this.isDark.set(prefersDark);
    } catch (error) {
      console.warn('Unable to read theme preference', error);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
