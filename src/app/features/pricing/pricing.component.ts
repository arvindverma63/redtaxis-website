import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaxiStateService } from '../../core/services/taxi-state.service';

interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  subtitle: string;
  trialTag?: string;
  isPopular?: boolean;
  ctaText: string;
  isCustom?: boolean;
  drivers: string;
  bookings: string;
  features: string[];
}

interface FeatureComparisonRow {
  category: string;
  items: {
    name: string;
    solo: string | boolean;
    team: string | boolean;
    fleet: string | boolean;
    enterprise: string | boolean;
  }[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-8 sm:py-12 pb-24 font-sans">
      
      <!-- 1. HERO HEADER -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-brand-500"></span>
          Transparent Cloud Pricing
        </div>

        <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Predictable plans for <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-brand-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
            fleets of any scale.
          </span>
        </h1>

        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Zero setup fees, sub-second GPS dispatch, and automated driver payouts. Start your 7-day free trial on any tier today.
        </p>

        <!-- Billing Frequency Toggle Switch -->
        <div class="pt-4 flex items-center justify-center gap-3">
          <span 
            (click)="billingCycle = 'monthly'"
            [ngClass]="billingCycle === 'monthly' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400 font-normal'"
            class="text-xs sm:text-sm cursor-pointer select-none transition-colors">
            Monthly Billing
          </span>

          <!-- Pill Toggle Button -->
          <button 
            (click)="toggleBilling()"
            type="button"
            class="relative w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer"
            aria-label="Toggle billing frequency">
            <span 
              [ngClass]="billingCycle === 'annual' ? 'translate-x-6 bg-brand-600' : 'translate-x-0 bg-white dark:bg-slate-200'"
              class="inline-block w-5 h-5 rounded-full shadow transition-transform duration-200 ease-in-out">
            </span>
          </button>

          <span 
            (click)="billingCycle = 'annual'"
            [ngClass]="billingCycle === 'annual' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400 font-normal'"
            class="text-xs sm:text-sm cursor-pointer select-none transition-colors flex items-center gap-1.5">
            Annual Billing
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      <!-- 2. 4-TIER PRICING CARDS MATRIX -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          <div 
            *ngFor="let plan of plans"
            [ngClass]="{
              'border-2 border-brand-600 dark:border-brand-500 bg-white dark:bg-slate-900 rounded-3xl shadow-xl relative ring-4 ring-brand-500/10': plan.isPopular,
              'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300': !plan.isPopular
            }"
            class="p-6 sm:p-7 flex flex-col justify-between">
            
            <!-- Most Popular Pill Badge -->
            <div 
              *ngIf="plan.isPopular" 
              class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold shadow-md uppercase tracking-wider whitespace-nowrap">
              Most Popular
            </div>

            <!-- Top Header & Price -->
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ plan.name }}</h3>

              <!-- Price Display -->
              <div class="flex items-baseline gap-1 pt-1">
                <span class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {{ billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice }}
                </span>
                <span *ngIf="!plan.isCustom" class="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  / month
                </span>
              </div>

              <!-- Subtitle -->
              <p class="text-xs text-slate-500 dark:text-slate-400 min-h-[32px] leading-relaxed">{{ plan.subtitle }}</p>

              <!-- Trial Tag -->
              <div class="min-h-[20px]">
                <span *ngIf="plan.trialTag" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {{ plan.trialTag }}
                </span>
              </div>

              <!-- Action Button -->
              <div class="pt-2 pb-3">
                <button 
                  (click)="handleSelectPlan(plan)"
                  [ngClass]="{
                    'w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red transition-all duration-200 cursor-pointer hover:scale-102': plan.isPopular,
                    'w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-750 transition-all duration-200 cursor-pointer': !plan.isPopular
                  }">
                  {{ plan.ctaText }}
                </button>
              </div>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

            <!-- Features -->
            <div class="space-y-3.5 flex-1 flex flex-col justify-start">
              
              <!-- Driver & Booking Cap -->
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
                <div class="text-xs font-black text-slate-900 dark:text-white">{{ plan.drivers }}</div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{{ plan.bookings }}</div>
              </div>

              <!-- Feature Bullet Items -->
              <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                <li *ngFor="let feat of plan.features" class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">✓</span>
                  <span class="leading-relaxed">{{ feat }}</span>
                </li>
              </ul>

            </div>

          </div>

        </div>
      </section>

      <!-- 3. INTERACTIVE FLEET ESTIMATOR / ROI CALCULATOR -->
      <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-8">
          
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Fleet Cost & Capacity Calculator</span>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Estimate Your Recommended Plan</h2>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Drag the slider to match your current active fleet size.</p>
          </div>

          <!-- Slider Control -->
          <div class="space-y-4 max-w-2xl mx-auto">
            <div class="flex items-center justify-between text-xs font-mono font-bold">
              <span class="text-slate-500">Active Vehicles:</span>
              <span class="text-base font-black text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-xl">
                {{ fleetSize }} Drivers
              </span>
            </div>

            <input 
              type="range" 
              min="1" 
              max="150" 
              step="1" 
              [(ngModel)]="fleetSize" 
              class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />

            <div class="flex justify-between text-[10px] font-mono text-slate-400">
              <span>1 Driver (Solo)</span>
              <span>20 Drivers (Team)</span>
              <span>50 Drivers (Fleet)</span>
              <span>150+ (Enterprise)</span>
            </div>
          </div>

          <!-- Calculation Summary Output Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-center">
            
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
              <div class="text-[10px] uppercase font-bold text-slate-400">Recommended Tier</div>
              <div class="text-lg font-black text-slate-900 dark:text-white">{{ getRecommendedPlan().name }}</div>
              <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                {{ billingCycle === 'annual' ? getRecommendedPlan().annualPrice : getRecommendedPlan().monthlyPrice }} / mo
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
              <div class="text-[10px] uppercase font-bold text-slate-400">Monthly Trip Capacity</div>
              <div class="text-lg font-black text-slate-900 dark:text-white">{{ (fleetSize * 450).toLocaleString() }}+</div>
              <div class="text-[11px] text-slate-500">Sub-second CAD Matching</div>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
              <div class="text-[10px] uppercase font-bold text-slate-400">Avg. Operational Savings</div>
              <div class="text-lg font-black text-slate-900 dark:text-white">~34%</div>
              <div class="text-[11px] text-slate-500">Zero Idle Telemetry Routing</div>
            </div>

          </div>

        </div>
      </section>

      <!-- 4. FULL FEATURE COMPARISON MATRIX TABLE -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Comprehensive Comparison</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Compare Plan Specifications</h2>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Detailed feature breakdown across all 4 subscription tiers.</p>
        </div>

        <div class="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <table class="w-full text-left text-xs border-collapse">
            
            <!-- Table Header -->
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-950/75">
                <th class="p-4 sm:p-5 font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Feature Capabilities</th>
                <th class="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 text-center">Solo Starter</th>
                <th class="p-4 sm:p-5 font-bold text-brand-600 dark:text-brand-400 text-center bg-brand-500/5">Team</th>
                <th class="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 text-center">Fleet</th>
                <th class="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 text-center">Enterprise</th>
              </tr>
            </thead>

            <!-- Table Body Grouped by Category -->
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/80">
              <ng-container *ngFor="let group of featureComparison">
                
                <!-- Category Heading Row -->
                <tr class="bg-slate-100/50 dark:bg-slate-800/40">
                  <td colspan="5" class="p-3 sm:p-4 font-black uppercase text-[10px] tracking-wider text-slate-500 dark:text-slate-400">
                    {{ group.category }}
                  </td>
                </tr>

                <!-- Feature Item Rows -->
                <tr *ngFor="let row of group.items" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td class="p-4 sm:p-5 font-medium text-slate-800 dark:text-slate-200">
                    {{ row.name }}
                  </td>

                  <!-- Solo -->
                  <td class="p-4 sm:p-5 text-center text-slate-600 dark:text-slate-400 font-medium">
                    <span *ngIf="row.solo === true" class="text-brand-600 font-bold">✓</span>
                    <span *ngIf="row.solo === false" class="text-slate-300 dark:text-slate-700">—</span>
                    <span *ngIf="row.solo !== true && row.solo !== false">{{ row.solo }}</span>
                  </td>

                  <!-- Team (Highlighted Column) -->
                  <td class="p-4 sm:p-5 text-center text-slate-900 dark:text-white font-bold bg-brand-500/5">
                    <span *ngIf="row.team === true" class="text-brand-600 font-bold">✓</span>
                    <span *ngIf="row.team === false" class="text-slate-300 dark:text-slate-700">—</span>
                    <span *ngIf="row.team !== true && row.team !== false">{{ row.team }}</span>
                  </td>

                  <!-- Fleet -->
                  <td class="p-4 sm:p-5 text-center text-slate-600 dark:text-slate-400 font-medium">
                    <span *ngIf="row.fleet === true" class="text-brand-600 font-bold">✓</span>
                    <span *ngIf="row.fleet === false" class="text-slate-300 dark:text-slate-700">—</span>
                    <span *ngIf="row.fleet !== true && row.fleet !== false">{{ row.fleet }}</span>
                  </td>

                  <!-- Enterprise -->
                  <td class="p-4 sm:p-5 text-center text-slate-600 dark:text-slate-400 font-medium">
                    <span *ngIf="row.enterprise === true" class="text-brand-600 font-bold">✓</span>
                    <span *ngIf="row.enterprise === false" class="text-slate-300 dark:text-slate-700">—</span>
                    <span *ngIf="row.enterprise !== true && row.enterprise !== false">{{ row.enterprise }}</span>
                  </td>
                </tr>

              </ng-container>
            </tbody>

          </table>
        </div>
      </section>

      <!-- 5. 3 TRUST & SECURITY PILLARS -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Zero Hidden Charges</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Transparent per-tier pricing. No per-booking surcharges, cancellation penalties, or lock-in contracts.
            </p>
          </div>

          <div class="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Instant Cloud Onboarding</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deploy your fleet in &lt; 15 minutes. Import drivers, configure zone pricing, and distribute mobile apps instantly.
            </p>
          </div>

          <div class="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">99.99% Enterprise SLA</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Continuous multi-region telemetry failover, ISO-grade encryption, and dedicated 24/7 technical assistance.
            </p>
          </div>

        </div>
      </section>

      <!-- 6. EXPANDED FAQ ACCORDION -->
      <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div class="text-center mb-8 space-y-1">
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Everything you need to know about starting your trial and billing.</p>
        </div>

        <div class="space-y-3">
          <div 
            *ngFor="let faq of faqs" 
            class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition" 
            (click)="faq.open = !faq.open">
            <div class="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              <span>{{ faq.q }}</span>
              <span class="text-slate-400 transform transition-transform text-xs" [ngClass]="{'rotate-180 text-brand-600': faq.open}">▼</span>
            </div>
            <p *ngIf="faq.open" class="text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </section>

      <!-- 7. BOTTOM TRIAL CTA BANNER -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-950 to-brand-950 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center sm:text-left">
            <h3 class="text-2xl sm:text-3xl font-black">Ready to scale your taxi fleet?</h3>
            <p class="text-xs sm:text-sm text-slate-300 max-w-md">
              Start your 7-day free trial on Solo, Team, or Fleet tiers. No credit card required.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <a 
              routerLink="/admin"
              class="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-xs shadow-xl hover:scale-105 transition whitespace-nowrap">
              Launch Dispatch Demo →
            </a>
          </div>
        </div>
      </section>

      <!-- PLAN SELECTION / 7-DAY TRIAL MODAL -->
      <div *ngIf="selectedPlanForModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div class="bg-white dark:bg-slate-900 max-w-md w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
          
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] font-bold uppercase text-brand-600 dark:text-brand-400">Selected Plan</span>
              <h3 class="text-base font-black text-slate-900 dark:text-white">{{ selectedPlanForModal.name }}</h3>
            </div>
            <button (click)="selectedPlanForModal = null" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center">✕</button>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Subscription Rate:</span>
              <span class="font-black text-slate-900 dark:text-white">
                {{ billingCycle === 'annual' ? selectedPlanForModal.annualPrice : selectedPlanForModal.monthlyPrice }}
                <span *ngIf="!selectedPlanForModal.isCustom">/ month</span>
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Driver Quota:</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ selectedPlanForModal.drivers }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Free Trial Period:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">7 Days Unlimited Included</span>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Click continue to activate your 7-day trial and launch your Cloud CAD dispatch console immediately.
          </p>

          <div class="space-y-2 pt-2">
            <a 
              routerLink="/admin"
              (click)="selectedPlanForModal = null"
              class="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red transition flex items-center justify-center gap-2">
              <span>Activate 7-Day Trial & Launch Console</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
            <button 
              (click)="selectedPlanForModal = null"
              class="w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
              Cancel
            </button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class PricingComponent {
  stateService = inject(TaxiStateService);

  billingCycle: 'monthly' | 'annual' = 'monthly';
  selectedPlanForModal: PricingTier | null = null;
  fleetSize: number = 20;

  plans: PricingTier[] = [
    {
      id: 'solo',
      name: 'Solo Starter',
      monthlyPrice: '£0.99',
      annualPrice: '£0.79',
      subtitle: 'For small operators getting started with cloud dispatch',
      trialTag: '7-day free trial included',
      ctaText: 'Start Free Trial',
      drivers: '5 drivers included',
      bookings: '1,500 bookings/month',
      features: [
        'Cloud Dispatch Console',
        'Driver Mobile App (Android/iOS)',
        'Basic Telemetry Reports',
        'Standard Email Support'
      ]
    },
    {
      id: 'team',
      name: 'Team',
      monthlyPrice: '£1',
      annualPrice: '£0.80',
      subtitle: 'For growing taxi companies & regional fleets',
      trialTag: '7-day free trial included',
      isPopular: true,
      ctaText: 'Start Free Trial',
      drivers: '20 drivers included',
      bookings: '5,000 bookings/month',
      features: [
        'Full Dispatch + Fleet Admin',
        'Driver Cockpit App',
        'Live Proximity Auto-CAD',
        'Automated SMS & WhatsApp Alerts',
        'Priority Technical Support'
      ]
    },
    {
      id: 'fleet',
      name: 'Fleet',
      monthlyPrice: '£1.99',
      annualPrice: '£1.59',
      subtitle: 'For established high-volume commercial fleets',
      trialTag: '7-day free trial included',
      ctaText: 'Start Free Trial',
      drivers: '50 drivers included',
      bookings: '15,000 bookings/month',
      features: [
        'All Applications & Portals',
        'Sub-Second GPS Telemetry',
        'In-App Payment Links & Settlement',
        'Automated 85% Bank Payouts',
        'Dedicated Fleet Account Manager'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      subtitle: 'For national transport networks & airport fleets',
      isCustom: true,
      ctaText: 'Contact Enterprise',
      drivers: 'Unlimited drivers',
      bookings: 'Unlimited bookings/month',
      features: [
        'All Apps & White-label Branding',
        'Custom REST APIs & Webhooks',
        'Dedicated Infrastructure & Domain',
        '99.99% Guaranteed SLA Uptime',
        '24/7 Dedicated Support Hotline'
      ]
    }
  ];

  featureComparison: FeatureComparisonRow[] = [
    {
      category: 'Dispatch & Fleet Telemetry',
      items: [
        { name: 'Web CAD Dispatch Console', solo: true, team: true, fleet: true, enterprise: true },
        { name: 'Sub-Second Proximity Matching', solo: false, team: true, fleet: true, enterprise: true },
        { name: 'Live GPS Vector Radar (60fps)', solo: 'Basic', team: 'Standard', fleet: 'Full Ultra', enterprise: 'Dedicated Telemetry' },
        { name: 'Multi-Zone Surge Rules', solo: false, team: true, fleet: true, enterprise: true },
        { name: 'Automated 15s Driver Queue Fallback', solo: false, team: true, fleet: true, enterprise: true }
      ]
    },
    {
      category: 'Mobile Applications & Booking',
      items: [
        { name: 'Driver Partner Cockpit App', solo: true, team: true, fleet: true, enterprise: true },
        { name: 'Passenger Mobile App', solo: true, team: true, fleet: true, enterprise: true },
        { name: 'Web Embedded Booking Widget', solo: false, team: true, fleet: true, enterprise: true },
        { name: '4-Digit Cryptographic OTP', solo: true, team: true, fleet: true, enterprise: true },
        { name: 'Custom White-label App Store Branding', solo: false, team: false, fleet: false, enterprise: true }
      ]
    },
    {
      category: 'Payments, Financials & Payouts',
      items: [
        { name: 'In-App Digital Wallet', solo: true, team: true, fleet: true, enterprise: true },
        { name: 'Instant Payment Links (SMS/WhatsApp)', solo: false, team: false, fleet: true, enterprise: true },
        { name: 'Automated 85% Daily Driver Payouts', solo: false, team: true, fleet: true, enterprise: true },
        { name: 'Automated GST / VAT Invoices', solo: true, team: true, fleet: true, enterprise: true }
      ]
    },
    {
      category: 'Support & Infrastructure',
      items: [
        { name: 'Technical Support SLA', solo: 'Email (24h)', team: 'Priority (4h)', fleet: 'Dedicated (1h)', enterprise: '24/7 Hotline' },
        { name: 'Uptime SLA Guarantee', solo: '99.9%', team: '99.95%', fleet: '99.99%', enterprise: '99.99% Custom' },
        { name: 'REST API & Webhook Access', solo: false, team: false, fleet: 'Standard', enterprise: 'Full Access' }
      ]
    }
  ];

  faqs = [
    {
      q: 'How does the 7-day free trial work?',
      a: 'You receive instant access to all features of your selected tier for 7 full days without paying anything upfront. You can test live CAD dispatch, connect test drivers, and cancel anytime before the trial ends.',
      open: true
    },
    {
      q: 'Can I upgrade or scale my driver quota anytime?',
      a: 'Yes, our dispatch platform is elastic. As your fleet expands or contracts seasonally, your subscription automatically updates without any system downtime or manual migration.',
      open: false
    },
    {
      q: 'Are there any setup fees or hidden hardware requirements?',
      a: 'No setup fees at all. Drivers can use any standard Android or iOS smartphone. No dedicated hardware or proprietary in-vehicle meter boxes are required.',
      open: false
    },
    {
      q: 'How are driver payouts and card settlements processed?',
      a: 'Red Taxi integrates direct bank API settlements. Driver commissions (e.g. 85%) are automatically computed and deposited directly to the driver partner’s bank account daily.',
      open: false
    },
    {
      q: 'Do you offer white-label custom app branding?',
      a: 'Yes, on the Enterprise plan, we build, sign, and publish custom passenger and driver mobile apps under your own taxi brand name on the Apple App Store and Google Play.',
      open: false
    },
    {
      q: 'What happens if we exceed our monthly booking limit?',
      a: 'We never stop or interrupt live customer rides. If you cross your monthly booking allotment, you will simply be prompted to upgrade to the next tier or continue with nominal overage rates.',
      open: false
    }
  ];

  toggleBilling() {
    this.billingCycle = this.billingCycle === 'monthly' ? 'annual' : 'monthly';
  }

  handleSelectPlan(plan: PricingTier) {
    this.selectedPlanForModal = plan;
  }

  getRecommendedPlan(): PricingTier {
    if (this.fleetSize <= 5) return this.plans[0];
    if (this.fleetSize <= 25) return this.plans[1];
    if (this.fleetSize <= 75) return this.plans[2];
    return this.plans[3];
  }
}

