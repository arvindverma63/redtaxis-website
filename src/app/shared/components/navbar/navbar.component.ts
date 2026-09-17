import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaxiStateService } from '../../../core/services/taxi-state.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Floating Animated Pill Header -->
    <header class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-3 sm:pt-5 pointer-events-none transition-all duration-500 ease-out animate-header-entry">
      <div 
        [ngClass]="{
          'shadow-2xl shadow-slate-950/10 border-slate-300/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-950/90 py-2.5 sm:py-3.5 max-w-6xl': isScrolled,
          'border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 py-3.5 sm:py-4.5 max-w-7xl': !isScrolled
        }"
        class="mx-auto rounded-3xl backdrop-blur-2xl border px-5 sm:px-7 pointer-events-auto transition-all duration-500 ease-out flex flex-col">
        
        <div class="flex items-center justify-between">
          
          <!-- Logo Brand with Animated Glow -->
          <a routerLink="/" class="flex items-center gap-3 group cursor-pointer select-none">
            <div class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-rose-500 flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform duration-300">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>

            <div class="flex flex-col">
              <span class="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                RED <span class="text-brand-600 dark:text-brand-500">TAXI</span>
              </span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/70 shadow-inner backdrop-blur-md">
            
            <a 
              routerLink="/" 
              routerLinkActive="bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm font-bold" 
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-5 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-200 whitespace-nowrap">
              Platform
            </a>

            <a 
              routerLink="/client" 
              routerLinkActive="bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm font-bold"
              class="px-5 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-200 whitespace-nowrap">
              Mobile Apps
            </a>

            <a 
              routerLink="/admin" 
              routerLinkActive="bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm font-bold"
              class="px-5 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-200 whitespace-nowrap">
              Dispatch Center
            </a>

            <a 
              routerLink="/pricing" 
              routerLinkActive="bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm font-bold"
              class="px-5 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-200 whitespace-nowrap">
              Pricing
            </a>
          </nav>

          <!-- Right Action Center -->
          <div class="flex items-center gap-3 sm:gap-4">
            
            <!-- Animated Theme Toggle -->
            <button 
              (click)="themeService.toggleTheme()"
              title="Toggle Light / Dark Mode"
              class="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm cursor-pointer flex items-center justify-center">
              <svg *ngIf="themeService.isDark()" class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <svg *ngIf="!themeService.isDark()" class="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </button>

            <!-- Homie-Style "Start free trial" Pill Button -->
            <button 
              (click)="showTrialModal = true"
              class="relative inline-flex items-center gap-0 border border-slate-300 dark:border-slate-700 rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden bg-white/50 dark:bg-slate-900/50 shadow-sm hover:border-black dark:hover:border-white cursor-pointer">
              <span class="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-out bg-slate-900 dark:bg-white"></span>
              
              <span class="text-xs sm:text-sm font-bold pr-3 sm:pr-4 relative z-10 transition-colors duration-300 text-slate-900 dark:text-white group-hover:text-white dark:group-hover:text-slate-950">
                Start free trial
              </span>
              
              <span class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center relative z-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:text-slate-900 dark:group-hover:text-white transition-all duration-300 shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
            </button>

            <!-- Mobile Hamburger Button -->
            <button 
              (click)="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all duration-200 active:scale-90">
              <svg *ngIf="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="4" x2="20" y1="12" y2="12" stroke-width="2" stroke-linecap="round"/>
                <line x1="4" x2="20" y1="6" y2="6" stroke-width="2" stroke-linecap="round"/>
                <line x1="4" x2="20" y1="18" y2="18" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <svg *ngIf="mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

          </div>

        </div>

        <!-- Mobile Menu Drawer -->
        <div 
          *ngIf="mobileMenuOpen" 
          class="md:hidden pt-4 pb-3 border-t border-slate-200/80 dark:border-slate-800/80 mt-3 space-y-1.5 animate-fadeIn">
          
          <a 
            (click)="mobileMenuOpen = false" 
            routerLink="/" 
            routerLinkActive="bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>Platform</span>
          </a>

          <a 
            (click)="mobileMenuOpen = false" 
            routerLink="/client" 
            routerLinkActive="bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold"
            class="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span>Mobile Apps</span>
          </a>

          <a 
            (click)="mobileMenuOpen = false" 
            routerLink="/admin" 
            routerLinkActive="bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold"
            class="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Dispatch Center</span>
          </a>

          <a 
            (click)="mobileMenuOpen = false" 
            routerLink="/pricing" 
            routerLinkActive="bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold"
            class="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            <span>Pricing</span>
          </a>

        </div>

      </div>
    </header>

    <!-- Trial Modal -->
    <div *ngIf="showTrialModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div class="bg-white dark:bg-slate-900 max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-brand-500 animate-ping"></span>
            <h3 class="text-lg font-black text-slate-900 dark:text-white">Start 7-Day Free Trial</h3>
          </div>
          <button (click)="showTrialModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg">✕</button>
        </div>

        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Get full access to Red Taxi's cloud dispatch engine, GPS tracking, passenger booking app, driver cockpit, and automated billing. No credit card required.
        </p>

        <div class="space-y-3">
          <a 
            routerLink="/pricing" 
            (click)="showTrialModal = false"
            class="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red transition flex items-center justify-center gap-2">
            <span>View All Fleet Plans & Start Trial</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>

          <a 
            routerLink="/admin" 
            (click)="showTrialModal = false"
            class="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs text-center transition block">
            Launch Live Dispatch Console
          </a>
        </div>
      </div>
    </div>
  `
})
export class NavbarComponent {
  stateService = inject(TaxiStateService);
  themeService = inject(ThemeService);

  mobileMenuOpen = false;
  isScrolled = false;
  showTrialModal = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
