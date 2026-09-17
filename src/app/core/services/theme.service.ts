import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDark = signal<boolean>(false); // Default is LIGHT mode

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const saved = localStorage.getItem('red_taxis_theme');
    if (saved === 'dark') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      this.isDark.set(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  public toggleTheme() {
    const next = !this.isDark();
    this.isDark.set(next);
    if (next) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('red_taxis_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('red_taxis_theme', 'light');
    }
  }
}
