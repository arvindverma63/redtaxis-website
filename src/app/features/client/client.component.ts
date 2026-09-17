import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaxiStateService } from '../../core/services/taxi-state.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-8 sm:py-12 pb-24 font-sans">
      
      <!-- HERO HEADER -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          Red Taxi Mobile Ecosystem
        </div>

        <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          One Platform. <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-brand-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
            Two Powerful Apps.
          </span>
        </h1>

        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Simple on-demand booking for passengers. Real-time navigation and transparent earnings for driver partners.
        </p>

        <!-- Simple App Switcher Pills -->
        <div class="pt-4 flex items-center justify-center gap-2">
          <button 
            (click)="selectedApp = 'passenger'"
            [ngClass]="selectedApp === 'passenger' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span>Passenger App</span>
          </button>
          <button 
            (click)="selectedApp = 'driver'"
            [ngClass]="selectedApp === 'driver' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
            <span>Driver Partner App</span>
          </button>
        </div>
      </section>

      <!-- 1. PASSENGER APP SHOWCASE (REDESIGNED TO BE ULTRA-CLEAN & PROFESSIONAL) -->
      <section *ngIf="selectedApp === 'passenger'" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <!-- Left Info & Feature Cards -->
            <div class="lg:col-span-6 p-8 sm:p-12 space-y-6">
              
              <div class="space-y-2">
                <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  For Riders & Daily Commuters
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Red Taxi Passenger App
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Fastest cab booking in town with sub-second matching, live GPS tracking, and locked upfront fares.
                </p>
              </div>

              <!-- 2x2 Clean Feature Grid with Identical Monochromatic Professional Icons -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">1-Tap Instant Hail</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Matches the nearest cab in &lt; 3s</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Live GPS Tracking</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Real-time location & ETAs</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">4-Digit Security OTP</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Cryptographic ride validation</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Zero Surge Shocks</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">100% guaranteed locked fares</div>
                  </div>
                </div>

              </div>

              <!-- Professional SVG App Store & Google Play Badges -->
              <div class="pt-4 flex flex-wrap items-center gap-3">
                <a href="#download" class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:scale-105 transition shadow-sm">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.93.04-2.02.63-2.67 1.38-.56.65-1.06 1.71-.99 2.76 1.04.08 2.05-.53 2.65-1.27z"/>
                  </svg>
                  <div class="text-left">
                    <div class="text-[9px] uppercase opacity-80 leading-none">Download on</div>
                    <div class="text-xs font-black leading-tight">App Store</div>
                  </div>
                </a>

                <a href="#download" class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:scale-105 transition shadow-sm">
                  <svg class="w-5 h-5 fill-current text-brand-500" viewBox="0 0 24 24">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.35 0 .69.12.96.35l14.28 8.5c.67.4 1.08 1.12 1.08 1.9s-.41 1.5-1.08 1.9l-14.28 8.5c-.27.23-.61.35-.96.35-.83 0-1.5-.67-1.5-1.5zm2-15.14v13.28l11.16-6.64L5 5.36z"/>
                  </svg>
                  <div class="text-left">
                    <div class="text-[9px] uppercase opacity-80 leading-none">Get it on</div>
                    <div class="text-xs font-black leading-tight">Google Play</div>
                  </div>
                </a>

                <span class="text-xs text-slate-500 dark:text-slate-400 pl-2">★ 4.9 Rating (120k+ Reviews)</span>
              </div>

            </div>

            <!-- Right App Visual Showcase (Clean, Integrated & Vector-Aligned) -->
            <div class="lg:col-span-6 p-6 sm:p-10 flex items-center justify-center relative">
              
              <!-- Ambient Glow behind Mockup -->
              <div class="absolute inset-0 bg-gradient-to-tr from-brand-500/10 via-rose-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

              <div class="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                <img 
                  src="/assets/passenger-experience.jpg" 
                  alt="Red Taxi Passenger App UI Screens" 
                  class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <!-- Floating Live Chauffeur Tag -->
                <div class="absolute top-4 left-4 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="text-[11px] font-bold text-slate-900 dark:text-white">Toyota Camry • 2 mins away</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- 2. DRIVER PARTNER APP SHOWCASE -->
      <section *ngIf="selectedApp === 'driver'" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <!-- Left Info & Sign-up -->
            <div class="lg:col-span-6 p-8 sm:p-12 space-y-6">
              <div class="space-y-2">
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  For Chauffeurs & Fleet Owners
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Red Taxi Driver Cockpit
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Earn more with zero idle downtime, instant trip alerts, daily bank payouts, and 24/7 partner support.
                </p>
              </div>

              <!-- 2x2 Clean Feature Grid with Identical Monochromatic Professional Icons -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">15s Instant Trip Alerts</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Accept bookings with 1 tap</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                      <line x1="9" y1="3" x2="9" y2="18"/>
                      <line x1="15" y1="6" x2="15" y2="21"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Built-in Navigation</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Turn-by-turn guidance to pickup</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">85% High Payout</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Automated daily bank payouts</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                      <line x1="12" y1="2" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Flexible Duty Toggle</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Go online or offline anytime</div>
                  </div>
                </div>

              </div>

              <!-- Action Buttons -->
              <div class="pt-4 flex flex-wrap items-center gap-3">
                <a routerLink="/pricing" class="px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red hover:scale-105 transition">
                  Join as Driver Partner
                </a>
                <button class="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  Download Driver APK
                </button>
              </div>
            </div>

            <!-- Right Driver Mockup Image (2D Vector Illustration) -->
            <div class="lg:col-span-6 p-6 sm:p-10 flex items-center justify-center relative">
              <div class="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                <img 
                  src="/assets/vector-driver-app.jpg" 
                  alt="Red Taxi Driver Cockpit App 2D Vector UI" 
                  class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div class="absolute bottom-4 left-4 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="text-[11px] font-bold text-slate-900 dark:text-white">Active Shift: ₹2,850 Today</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. "EVERYTHING YOU NEED TO RUN YOUR FLEET" 6-CARD GRID (MATCHING USER SPECIFICATION) -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <h2 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Run Your Fleet
          </h2>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            From dispatch to payments, Red Taxi gives you the tools to manage your taxi business efficiently.
          </p>
        </div>

        <!-- 6 Clean Professional Information Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Card 1: Real-Time Dispatch -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-start space-y-3 group">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 02 2h10a2 2 0 0 02-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Real-Time Dispatch
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Live dispatch board with drag-and-drop allocation. See every job, every driver, in real time.
            </p>
          </div>

          <!-- Card 2: Driver App -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-start space-y-3 group">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Driver App
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Android app for drivers with GPS tracking, job offers, navigation, and earnings overview.
            </p>
          </div>

          <!-- Card 3: Payment Links -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-start space-y-3 group">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Payment Links
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Send payment links via SMS and track card payments. Get paid faster with zero hassle.
            </p>
          </div>

          <!-- Card 4: Reports & Analytics -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-start space-y-3 group">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Reports & Analytics
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Revenue, profitability, and driver performance reports. Make data-driven decisions.
            </p>
          </div>

          <!-- Card 5: Customer Notifications -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-start space-y-3 group">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Customer Notifications
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Automated SMS, email, and WhatsApp booking confirmations. Keep customers informed.
            </p>
          </div>

          <!-- Card 6: Web Booking Portal -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-start space-y-3 group">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Web Booking Portal
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Let customers book online through your website. Embedded booking widget included.
            </p>
          </div>

        </div>

      </section>

      <!-- 4. BOTTOM TRIAL CTA BANNER -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-950 to-brand-950 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center sm:text-left">
            <h3 class="text-2xl sm:text-3xl font-black">Experience the Red Taxi ecosystem</h3>
            <p class="text-xs sm:text-sm text-slate-300 max-w-md">
              Download the passenger or driver partner app today. Available across iOS, Android, and Web.
            </p>
          </div>
          <a 
            routerLink="/pricing"
            class="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-xs shadow-xl hover:scale-105 transition whitespace-nowrap">
            Start 7-Day Free Trial →
          </a>
        </div>
      </section>

    </div>
  `
})
export class ClientComponent {
  stateService = inject(TaxiStateService);
  selectedApp: 'passenger' | 'driver' = 'passenger';
}
