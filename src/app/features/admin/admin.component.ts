import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaxiStateService } from '../../core/services/taxi-state.service';
import { LiveMapComponent } from '../../shared/components/live-map/live-map.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, LiveMapComponent],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-8 sm:py-12 pb-24 font-sans">
      
      <!-- HERO HEADER SECTION -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Next-Gen Cloud Dispatch
        </div>

        <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Central Dispatch & <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-brand-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
            Fleet Command Center
          </span>
        </h1>

        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Intelligent computer-aided dispatch, sub-second GPS telemetry, automated trip distribution, and driver management in one unified cloud dashboard.
        </p>

        <!-- CTA Buttons -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a 
            routerLink="/pricing"
            class="px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red hover:scale-105 transition">
            Start 7-Day Free Trial
          </a>
          <a 
            href="#live-preview"
            class="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs transition shadow-sm hover:scale-105">
            View Live Radar Demo ↓
          </a>
        </div>
      </section>

      <!-- DISPATCH ADMIN DASHBOARD IMAGE SHOWCASE -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl group">
          
          <!-- Image -->
          <img 
            src="/assets/dispatch-admin.jpg" 
            alt="Red Taxi Cloud Dispatch Admin Dashboard UI" 
            class="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
          />

          <!-- Floating Live Badge 1 (Top Left) -->
          <div class="absolute top-4 left-4 sm:top-6 sm:left-6 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float-badge-left">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div class="text-left">
              <div class="text-[10px] text-slate-400 font-bold uppercase">Automated Dispatch</div>
              <div class="text-xs font-black text-slate-900 dark:text-white">14s Avg Match Latency</div>
            </div>
          </div>

          <!-- Floating Live Badge 2 (Bottom Right) -->
          <div class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float-badge-right">
            <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center font-bold text-xs">
              <svg class="w-4 h-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="text-[10px] text-slate-400 font-bold uppercase">Fleet Operations</div>
              <div class="text-xs font-black text-slate-900 dark:text-white">99.8% On-Time SLA</div>
            </div>
          </div>

        </div>
      </section>

      <!-- 4 SIMPLE OPERATIONAL PILLARS -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Enterprise Dispatch Features</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Built for High-Volume Fleets</h2>
        </div>

        <!-- Identical Monochromatic Professional Icons -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Auto CAD Dispatch</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sub-second algorithmic matching based on proximity, driver rating, and vehicle class.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Live GPS Telemetry</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Continuous 60fps vector tracking with live vehicle heading rotation and route snapping.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Driver Settlements</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated 85% payouts, daily bank deposits, GST invoices, and financial reports.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Dynamic Surge Control</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Custom zone rules, airport queues, and demand surge adjustments with 1 click.
            </p>
          </div>

        </div>
      </section>

      <!-- LIVE RADAR DEMO VIEWPORT -->
      <section id="live-preview" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400 tracking-wider">Live Simulation Console</span>
              <h3 class="text-xl font-black text-slate-900 dark:text-white">Active Metro Telemetry Radar</h3>
            </div>
            <button 
              (click)="simulateIncomingTrip()"
              class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red transition flex items-center gap-2 self-start cursor-pointer">
              <span>+ Simulate New Ride Request</span>
            </button>
          </div>

          <!-- Radar Map -->
          <div class="h-[440px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <app-live-map [drivers]="(drivers$ | async) || []"></app-live-map>
          </div>

        </div>
      </section>

      <!-- BOTTOM TRIAL CTA BANNER -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-950 to-brand-950 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center sm:text-left">
            <h3 class="text-2xl sm:text-3xl font-black">Ready to scale your taxi fleet?</h3>
            <p class="text-xs sm:text-sm text-slate-300 max-w-md">
              Start your 7-day free trial on Solo, Team, or Fleet tiers. No credit card required.
            </p>
          </div>
          <a 
            routerLink="/pricing"
            class="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-xs shadow-xl hover:scale-105 transition whitespace-nowrap">
            View All Pricing Plans →
          </a>
        </div>
      </section>

    </div>
  `
})
export class AdminComponent {
  private stateService = inject(TaxiStateService);
  themeService = inject(ThemeService);

  drivers$ = this.stateService.drivers$;

  simulateIncomingTrip() {
    const p = this.stateService.popularLocations[0];
    const d = this.stateService.popularLocations[4];
    this.stateService.requestRide({
      pickup: p,
      dropoff: d,
      category: 'sedan',
      paymentMethod: 'wallet'
    });
  }
}
