import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaxiStateService } from '../../core/services/taxi-state.service';
import { ThemeService } from '../../core/services/theme.service';

interface AiScenario {
  id: string;
  badge: string;
  title: string;
  query: string;
  response: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
  steps: string[];
}

interface SoftwareModule {
  id: string;
  name: string;
  category: string;
  tagline: string;
  badge: string;
  rating: number;
  image: string;
  specs: { label: string; value: string; color?: string }[];
  highlights: string[];
  routeLink: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 overflow-x-hidden font-sans">
      
      <!-- HERO SECTION WITH RICH HOMIE-STYLE VECTOR ANIMATIONS & 3D SHOWCASE -->
      <section class="relative pt-6 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden border-b border-slate-200 dark:border-slate-800">
        
        <!-- Giant Background Watermark with Gentle Floating Animation -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-40 dark:opacity-20 overflow-hidden">
          <span class="text-[20vw] font-black tracking-tighter leading-none text-slate-200 dark:text-slate-800 whitespace-nowrap animate-watermark-drift">
            RED TAXI
          </span>
        </div>

        <!-- Ambient Glow Pulses -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-brand-500/15 via-rose-500/5 to-transparent blur-3xl pointer-events-none z-0"></div>
        <div class="absolute top-10 right-10 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center space-y-8">
          
          <!-- Animated Top Pill Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold shadow-sm hover:border-brand-500/40 transition-all duration-300 animate-hero-title">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>Next-Gen Cloud Dispatch & Ride Network</span>
          </div>

          <!-- Hero Headline with Staggered Fade Up Animation -->
          <div class="space-y-4 max-w-4xl">
            <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] animate-hero-title">
              Smarter taxi dispatch.<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-rose-600 to-red-600 dark:from-brand-500 dark:via-rose-500 dark:to-red-500">
                Built for pure velocity.
              </span>
            </h1>

            <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal animate-hero-sub">
              Modern taxi dispatch software for on-demand bookings, active driver tracking, fleet intelligence, and reliable passenger service.
            </p>
          </div>

          <!-- Action Buttons with Staggered Entry -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-2 animate-hero-cta">
            <a 
              routerLink="/client"
              class="relative inline-flex items-center gap-0 border border-brand-600 bg-brand-600 text-white rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 hover:scale-105 cursor-pointer">
              <span class="text-sm font-semibold pr-3 relative z-10">Start Riding in App</span>
              <span class="w-9 h-9 rounded-full bg-white text-brand-600 flex items-center justify-center relative z-10 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
            </a>

            <a 
              routerLink="/admin"
              class="relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 shadow-sm hover:scale-105">
              <span>Launch Dispatch Radar</span>
            </a>
          </div>

          <!-- ANIMATED 3D INTERACTIVE DEVICE SHOWCASE (ISOLATED PHONE MOCKUP WITH NO BACKGROUND BOX) -->
          <div class="w-full max-w-2xl pt-6 relative select-none">
            
            <!-- Radar Ripple Waves behind device -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-brand-500/20 animate-radar-ring pointer-events-none"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-rose-500/10 animate-radar-ring pointer-events-none" style="animation-delay: 1.5s;"></div>

            <!-- Floating Realistic 3D Smartphone (Zero Outer Box) -->
            <div class="relative w-full max-w-[310px] sm:max-w-[330px] mx-auto rounded-[3rem] p-3 bg-slate-900 dark:bg-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(225,29,72,0.2)] border-4 border-slate-800 dark:border-slate-700 animate-float-phone">
              
              <!-- Dynamic Island & Camera Notch -->
              <div class="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-between px-2">
                <div class="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></div>
                <div class="w-2 h-2 rounded-full bg-slate-900 border border-emerald-500/60"></div>
              </div>

              <!-- Smartphone Screen Content -->
              <div class="rounded-[2.4rem] bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 flex flex-col pt-5 pb-3">
                
                <!-- Screen Top App Bar -->
                <div class="px-4 py-2 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div class="flex items-center gap-1.5">
                    <div class="w-5 h-5 rounded-lg bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold">R</div>
                    <span class="text-xs font-black tracking-tight text-slate-900 dark:text-white">RED TAXI</span>
                  </div>
                  <span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">● Live GPS</span>
                </div>

                <!-- Screen Live Vector Route Map -->
                <div class="relative h-56 bg-slate-100 dark:bg-slate-900/80 overflow-hidden flex items-center justify-center">
                  <!-- Grid dots -->
                  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>

                  <!-- Vector Route Curve -->
                  <svg class="absolute inset-0 w-full h-full" viewBox="0 0 300 220">
                    <path d="M 40 180 Q 120 160 150 110 T 260 40" fill="none" stroke="#cbd5e1" class="dark:stroke-slate-800" stroke-width="16" stroke-linecap="round"/>
                    <path d="M 40 180 Q 120 160 150 110 T 260 40" fill="none" stroke="#e11d48" stroke-width="3.5" class="animate-dash-flow"/>
                  </svg>

                  <!-- Moving Chauffeur Marker -->
                  <div class="absolute top-20 left-28 flex flex-col items-center animate-pulse">
                    <div class="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shadow-glow-red border-2 border-white">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                    <span class="text-[8px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded-md mt-0.5 whitespace-nowrap">2 min away</span>
                  </div>

                  <!-- User Pickup Pin -->
                  <div class="absolute bottom-5 left-6 flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-[9px] font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Pickup: You</span>
                  </div>

                  <!-- Destination Pin -->
                  <div class="absolute top-5 right-6 flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-[9px] font-bold text-slate-900 dark:text-white">
                    <svg class="w-3 h-3 text-brand-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>Airport Terminal</span>
                  </div>
                </div>

                <!-- Screen Bottom Ride Details Card -->
                <div class="p-3 bg-white dark:bg-slate-900 space-y-2 border-t border-slate-200 dark:border-slate-800">
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-[9px] text-slate-400 uppercase font-bold">Chauffeur Assigned</div>
                      <div class="text-xs font-black text-slate-900 dark:text-white">Suresh K. • Sedan</div>
                    </div>
                    <div class="px-2 py-0.5 rounded-md bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-bold">
                      OTP: 4971
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-brand-600 h-full rounded-full w-3/4 animate-pulse"></div>
                  </div>

                  <!-- Bottom Fare & Security Info -->
                  <div class="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
                    <span>Fare: <b class="text-slate-900 dark:text-white">₹310 Locked</b></span>
                    <span class="text-slate-900 dark:text-white font-bold flex items-center gap-1">
                      <svg class="w-3 h-3 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      4.98 Verified
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <!-- Floating Status Badge Left -->
            <div class="absolute top-12 -left-2 sm:-left-8 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-3 z-30 animate-float-badge-left text-left">
              <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center font-bold text-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-bold">Chauffeur Assigned</div>
                <div class="text-xs font-black text-slate-900 dark:text-white">Toyota Camry • 4.9 ★</div>
              </div>
            </div>

            <!-- Floating Status Badge Right -->
            <div class="absolute bottom-12 -right-2 sm:-right-8 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-3 z-30 animate-float-badge-right text-left">
              <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center font-bold text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-bold">Security Passcode</div>
                <div class="text-xs font-black text-slate-900 dark:text-white tracking-wider">PIN: #4971</div>
              </div>
            </div>

          </div>

          <!-- Live Trust Telemetry Pill -->
          <div class="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 dark:text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-bold text-slate-900 dark:text-white">5 Active Drivers</span> in Coimbatore
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Average response: <b class="text-slate-900 dark:text-white">&lt; 3 mins</b></span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span><b class="text-slate-900 dark:text-white">4.9 / 5.0</b> Rider Rating</span>
            </div>
          </div>

        </div>

      </section>

      <!-- AUTONOMOUS AI DISPATCH ASSISTANT & CAD TELEMETRY SECTION -->
      <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div class="rounded-3xl p-6 sm:p-10 lg:p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 relative overflow-hidden">
          
          <!-- Background Ambient Accents -->
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Header Bar with Live Indicator & Action Button -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 relative z-10">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
                <span class="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
                Autonomous AI Dispatch Assistant & CAD Engine
              </div>
              <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Autonomous AI Dispatch Copilot
              </h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Sub-second proximity matching, live neural rerouting, cryptographic OTP handshakes, and intelligent zero-surge fleet balancing.
              </p>
            </div>

            <!-- Homie Style Pill Action Button -->
            <div class="flex items-center gap-3 shrink-0">
              <a 
                routerLink="/admin"
                class="relative inline-flex items-center gap-0 border border-slate-300 dark:border-slate-700 rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer">
                <span class="text-xs sm:text-sm font-bold pr-3 relative z-10">
                  Open Mission Console
                </span>
                <span class="w-8 h-8 rounded-full flex items-center justify-center relative z-10 bg-brand-600 text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <!-- Main Console Grid (Left Control Pillars + Right Animated AI Assistant) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            
            <!-- Left 3 Feature Modules with Identical Monochromatic Professional Icons -->
            <div class="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              <!-- Module 1: Telemetry Positioning -->
              <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="6"/>
                        <circle cx="12" cy="12" r="2"/>
                      </svg>
                    </div>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white">Precision GPS Telemetry</h3>
                  </div>
                  <span class="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    0.4s Latency
                  </span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Real-time 60fps vector tracking with continuous vehicle heading gyro and road network snapping.
                </p>
                <div class="flex items-center gap-2 pt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">● 99.98% Accuracy</span>
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">● 5 Active Cabs</span>
                </div>
              </div>

              <!-- Module 2: Automated Dispatch AI -->
              <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </div>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white">Proximity Cluster Dispatch</h3>
                  </div>
                  <span class="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    &lt; 3s Match
                  </span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instantaneous 15-second radial offer broadcast to the closest top-rated driver with automated fallback.
                </p>
                <div class="flex items-center gap-2 pt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">● 15s Request Timer</span>
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">● 4-Digit OTP</span>
                </div>
              </div>

              <!-- Module 3: Dynamic Surge Protection -->
              <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white">Dynamic Surge Protection</h3>
                  </div>
                  <span class="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    1.0x Base
                  </span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Transparent distance calculations without sudden surge shocks during rush hours or rain.
                </p>
                <div class="flex items-center gap-2 pt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">● 85% Driver Payout</span>
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">● GST Invoices</span>
                </div>
              </div>

            </div>

            <!-- Right Animated AI Dispatch Assistant Viewport (Harmonious Light & Dark Mode) -->
            <div class="lg:col-span-7 flex flex-col rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white shadow-lg dark:shadow-2xl relative min-h-[520px] justify-between transition-colors">
              
              <!-- Ambient AI Glows inside console -->
              <div class="absolute -top-12 -right-12 w-64 h-64 bg-brand-500/10 dark:bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-500/10 dark:bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Top Console HUD Bar -->
              <div class="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-20 transition-colors">
                <div class="flex items-center gap-2.5">
                  <span class="relative flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span class="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    RED COPILOT • NEURAL DISPATCH ENGINE v4.2
                  </span>
                </div>
                
                <!-- Live Soundwave Equalizer Telemetry -->
                <div class="flex items-center gap-3">
                  <div class="hidden sm:flex items-center gap-1 h-5 px-2 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                    <span class="w-1 bg-brand-500 rounded-full animate-wave-1"></span>
                    <span class="w-1 bg-rose-500 rounded-full animate-wave-2"></span>
                    <span class="w-1 bg-emerald-500 rounded-full animate-wave-3"></span>
                    <span class="w-1 bg-brand-400 rounded-full animate-wave-4"></span>
                    <span class="w-1 bg-rose-400 rounded-full animate-wave-5"></span>
                    <span class="w-1 bg-emerald-400 rounded-full animate-wave-6"></span>
                    <span class="w-1 bg-brand-500 rounded-full animate-wave-7"></span>
                    <span class="w-1 bg-rose-500 rounded-full animate-wave-8"></span>
                  </div>
                  <span class="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-2 py-0.5 rounded">
                    12ms Latency
                  </span>
                </div>
              </div>

              <!-- Central AI Interactive Arena -->
              <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6 relative z-10">
                
                <!-- Center Core: Driver AI Assistant Illustration & Interactive Dialogue -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pb-1">
                  
                  <!-- Driver AI Assistant Illustration Card with Interactive Floating Badges -->
                  <div class="md:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm group">
                    <img 
                      src="/assets/driver-ai-assistant.jpg" 
                      alt="Driver AI Dispatch Assistant" 
                      class="w-full h-48 sm:h-52 object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    <!-- Top Left AI Active Badge -->
                    <div class="absolute top-2.5 left-2.5 backdrop-blur-md bg-white/90 dark:bg-slate-950/85 border border-slate-200 dark:border-slate-700/80 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-slate-800 dark:text-white flex items-center gap-1.5 shadow-md">
                      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>AI COPILOT ACTIVE</span>
                    </div>

                    <!-- Bottom Right Telemetry Latency Pill -->
                    <div class="absolute bottom-2.5 right-2.5 backdrop-blur-md bg-brand-600 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold shadow-md">
                      0.4s Latency
                    </div>
                  </div>

                  <!-- Assistant State & Interactive Query Card -->
                  <div class="md:col-span-7 space-y-2.5 text-left">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="px-2.5 py-0.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 dark:border-brand-500/40 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {{ currentScenario.badge }}
                      </span>
                      <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Mode: <b class="text-slate-900 dark:text-white">{{ currentScenario.title }}</b>
                      </span>
                    </div>

                    <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left space-y-2 shadow-sm">
                      <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <svg class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <polyline points="4 17 10 11 4 5"/>
                          <line x1="12" y1="19" x2="20" y2="19"/>
                        </svg>
                        <span class="truncate text-slate-700 dark:text-slate-300">{{ currentScenario.query }}</span>
                      </div>

                      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                        <div class="w-5 h-5 rounded-md bg-brand-50 dark:bg-brand-600/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                          {{ currentScenario.response }}
                          <span class="inline-block w-1.5 h-3 bg-brand-500 ml-1 animate-cursor"></span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- 4 Live Telemetry Output Metrics -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div 
                    *ngFor="let m of currentScenario.metrics"
                    class="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-left shadow-xs">
                    <div class="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase font-bold tracking-wider">{{ m.label }}</div>
                    <div class="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">{{ m.value }}</div>
                    <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 truncate">{{ m.sub }}</div>
                  </div>
                </div>

                <!-- Autonomous Execution Step Pills -->
                <div class="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-xs">
                  <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span class="font-bold text-slate-700 dark:text-slate-300">Pipeline:</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span 
                      *ngFor="let st of currentScenario.steps; let idx = index"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300">
                      <span class="w-3.5 h-3.5 rounded-full bg-brand-500/15 text-brand-600 dark:bg-brand-500/30 dark:text-brand-400 flex items-center justify-center text-[9px] font-bold">{{ idx + 1 }}</span>
                      <span>{{ st }}</span>
                    </span>
                  </div>
                </div>

                <!-- Interactive Scenario Pill Buttons -->
                <div class="pt-1">
                  <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 flex items-center justify-between">
                    <span>⚡ Try AI Copilot Scenarios:</span>
                    <span class="text-[10px] text-brand-600 dark:text-brand-400">Click to switch mode</span>
                  </div>
                  
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button 
                      *ngFor="let s of aiScenarios"
                      (click)="selectScenario(s.id)"
                      [ngClass]="selectedScenarioId === s.id ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs'"
                      class="px-3 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center">
                      <span class="truncate">{{ s.title }}</span>
                    </button>
                  </div>
                </div>

              </div>

              <!-- Bottom Live Ticker HUD -->
              <div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] z-20 transition-colors">
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 truncate">
                  <span class="text-brand-600 dark:text-brand-400 font-bold">● Live Neural Stream:</span>
                  <span class="truncate text-slate-500 dark:text-slate-400">Autonomous CAD agent monitoring 5 active cabs across Coimbatore Metro</span>
                </div>
                <span class="text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider whitespace-nowrap ml-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded">
                  100% OPERATIONAL
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- MODULAR 2D VECTOR SOFTWARE SUITE SECTION -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-900/40 border-t border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div class="max-w-7xl mx-auto">
          
          <!-- Section Title & Badge -->
          <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-brand-500"></span>
              COMPLETE SOFTWARE ECOSYSTEM
            </div>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Modular software for taxi & fleet operators
            </h2>

            <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Enterprise white-label apps, real-time driver mobile terminals, and autonomous cloud dispatch consoles — fully customizable under your brand.
            </p>
          </div>

          <!-- 3-Column Visual Software Module Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            <div 
              *ngFor="let mod of softwareModules"
              class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-brand-500/50 transition-all duration-300 overflow-hidden flex flex-col group">
              
              <!-- Card Top Image Container with High-Res SaaS Visual -->
              <div class="relative h-56 sm:h-60 bg-slate-100 dark:bg-slate-950 overflow-hidden group">
                <img 
                  [src]="mod.image" 
                  [alt]="mod.name" 
                  class="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-500 ease-out"
                />

                <!-- Top Badge (Rating & Product Class) -->
                <div class="absolute top-3.5 left-3.5 backdrop-blur-md bg-slate-950/80 text-white px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-md flex items-center gap-1.5 z-10">
                  <span class="text-amber-400">★</span>
                  <span>{{ mod.rating }}</span>
                  <span class="text-slate-400">•</span>
                  <span>{{ mod.badge }}</span>
                </div>

                <!-- Product Platform Pill -->
                <div class="absolute bottom-3.5 right-3.5 backdrop-blur-md bg-brand-600/90 text-white px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-md z-10">
                  {{ mod.category }}
                </div>
              </div>

              <!-- Card Body Content -->
              <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                
                <div>
                  <div class="flex items-center justify-between">
                    <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ mod.name }}</h3>
                    <span class="text-xs font-bold font-mono text-brand-600 dark:text-brand-400 uppercase tracking-wider">{{ mod.badge }}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{{ mod.tagline }}</p>
                </div>

                <!-- Specs Pill Bar -->
                <div class="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800/80 text-center">
                  <div 
                    *ngFor="let spec of mod.specs" 
                    class="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800">
                    <div class="text-[10px] text-slate-400 uppercase font-bold font-mono">{{ spec.label }}</div>
                    <div class="text-xs font-black mt-0.5" [ngClass]="spec.color || 'text-slate-800 dark:text-slate-200'">{{ spec.value }}</div>
                  </div>
                </div>

                <!-- Feature Highlights -->
                <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-sans">
                  <li *ngFor="let h of mod.highlights" class="flex items-center gap-2">
                    <span class="text-emerald-500 font-bold">✓</span>
                    <span>{{ h }}</span>
                  </li>
                </ul>

                <!-- Homie Style Action Button -->
                <div class="pt-2">
                  <a 
                    [routerLink]="mod.routeLink"
                    class="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md group-hover:shadow-glow-red cursor-pointer">
                    <span>{{ mod.buttonLabel }}</span>
                    <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>

              </div>

            </div>

          </div>

          <!-- Bottom Software Enterprise Trust Banner -->
          <div class="mt-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-sm">
            
            <div class="flex items-center justify-center sm:justify-start gap-3.5">
              <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-xs font-black text-slate-900 dark:text-white">15-Min Cloud Deployment</div>
                <div class="text-[11px] text-slate-500">Instant tenant provisioning with database</div>
              </div>
            </div>

            <div class="flex items-center justify-center sm:justify-start gap-3.5">
              <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-xs font-black text-slate-900 dark:text-white">100% White-Label Branding</div>
                <div class="text-[11px] text-slate-500">Your logo, domain & app store listings</div>
              </div>
            </div>

            <div class="flex items-center justify-center sm:justify-start gap-3.5">
              <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-xs font-black text-slate-900 dark:text-white">99.99% Guaranteed SLA</div>
                <div class="text-[11px] text-slate-500">Multi-region cloud cluster with auto-failover</div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  `
})
export class WebsiteComponent {
  private stateService = inject(TaxiStateService);
  themeService = inject(ThemeService);

  drivers$ = this.stateService.drivers$;

  aiScenarios: AiScenario[] = [
    {
      id: 'match',
      badge: 'PROXIMITY ENGINE',
      title: 'Auto-Match Nearest Cab',
      query: 'Optimize 3km dispatch radius for pickup request at Gandhipuram Cross Cut Road.',
      response: 'Candidate pool analyzed (6 available cabs). Snapped TN 38 BR 9081 (Red Prime Sedan, Anand) at 0.8 km (2.1 mins away). Radial broadcast locked.',
      metrics: [
        { label: 'MATCH SPEED', value: '0.9s', sub: 'Sub-second lock' },
        { label: 'PROXIMITY', value: '0.8 km', sub: 'Gandhipuram North' },
        { label: 'DISPATCH ETA', value: '2.1 min', sub: 'Immediate pickup' },
        { label: 'CONFIDENCE', value: '99.98%', sub: 'Zero-drop SLA' }
      ],
      steps: ['Radial Cluster Scan', 'Traffic Telemetry Snapping', 'Instant MDT Dispatch']
    },
    {
      id: 'otp',
      badge: 'SECURITY PASSCODE',
      title: 'Biometric PIN & OTP Shield',
      query: 'Validate rider start-trip handshake for Booking #RT-9410.',
      response: 'Dynamic 4-digit PIN #4971 cross-verified with Driver MDT via encrypted cellular token. Anti-spoofing checks clear. Trip authorized.',
      metrics: [
        { label: 'TOKEN STATUS', value: 'Signed', sub: 'SHA-256 Encrypted' },
        { label: 'ANTI-SPOOF', value: 'Passed', sub: '100% Verified' },
        { label: 'FRAUD RISK', value: '0.00%', sub: 'Clean audit score' },
        { label: 'AUTH LATENCY', value: '84 ms', sub: 'Real-time sync' }
      ],
      steps: ['BLE Token Exchange', 'Cryptographic Handshake', 'Trip Authorized']
    },
    {
      id: 'surge',
      badge: 'DYNAMIC FARE SHIELD',
      title: 'Dynamic Zero-Surge Cap',
      query: 'Analyze peak evening demand multiplier across Coimbatore East corridor.',
      response: 'Demand spike (+34%) mitigated by smart fleet rebalancing from Singanallur depot. Surge multiplier locked at flat 1.0x. Transparent rider fare preserved.',
      metrics: [
        { label: 'SURGE CAP', value: '1.0x Base', sub: 'No hidden spikes' },
        { label: 'FLEET REBALANCE', value: '+12 Cabs', sub: 'Repositioned' },
        { label: 'FARE VARIANCE', value: '₹0.00', sub: 'Guaranteed flat rate' },
        { label: 'RIDER SAVINGS', value: '28% Avg', sub: 'Compared to peers' }
      ],
      steps: ['Corridor Demand Heatmap', 'Fleet Depot Rebalancing', 'Fixed Fare Locked']
    },
    {
      id: 'reroute',
      badge: 'TELEMETRIC BYPASS',
      title: 'Live Weather & Traffic Reroute',
      query: 'Heavy rainfall detected on Avinashi flyover corridor. Optimize transit route.',
      response: 'Telemetric rerouting active via Race Course Road bypass. Diverted 14 in-transit cabs around waterlogging, reducing average trip transit delay by 11.4 mins.',
      metrics: [
        { label: 'TIME SAVED', value: '11.4 min', sub: 'Avg transit saving' },
        { label: 'CONGESTION DELTA', value: '-2.3 km', sub: 'Avoided bottleneck' },
        { label: 'SAFETY INDEX', value: '100%', sub: 'Safe road corridors' },
        { label: 'CABS REROUTED', value: '14 Active', sub: 'Real-time telemetry' }
      ],
      steps: ['Monsoon Sensor Alert', 'Geospatial Grid Recalculation', 'Turn-by-Turn Update']
    }
  ];

  selectedScenarioId = 'match';
  isSimulating = false;

  get currentScenario(): AiScenario {
    return this.aiScenarios.find(s => s.id === this.selectedScenarioId) || this.aiScenarios[0];
  }

  selectScenario(id: string): void {
    if (this.selectedScenarioId === id) return;
    this.isSimulating = true;
    this.selectedScenarioId = id;
    setTimeout(() => {
      this.isSimulating = false;
    }, 200);
  }

  softwareModules: SoftwareModule[] = [
    {
      id: 'driver-app',
      name: 'Driver Cockpit MDT',
      category: 'Native Mobile SDK',
      tagline: 'High-speed driver mobile terminal with turn-by-turn navigation & instant dispatch',
      image: '/assets/vector-driver-app.jpg',
      badge: 'Driver App',
      rating: 4.98,
      specs: [
        { label: 'TELEMETRY', value: '60fps Gyro', color: 'text-brand-600 dark:text-brand-400' },
        { label: 'AUTO-OFFER', value: '15s Fallback' },
        { label: 'PAYOUTS', value: 'Instant UPI', color: 'text-emerald-600 dark:text-emerald-400' }
      ],
      highlights: [
        'Turn-by-turn routing with traffic choke avoidance',
        'Cryptographic 4-digit OTP & BLE rider handshake',
        'Daily earnings ledger & automated bank settlements',
        'Offline-resilient queue sync with zero trip drop'
      ],
      routeLink: '/client',
      buttonLabel: 'Explore Driver App'
    },
    {
      id: 'passenger-app',
      name: 'Passenger Ride Suite',
      category: 'White-Label Mobile & Web',
      tagline: 'Custom-branded rider mobile apps & web booking engine built for high conversion',
      image: '/assets/app-screens.jpg',
      badge: 'Passenger App',
      rating: 4.96,
      specs: [
        { label: 'MATCH SPEED', value: '< 1.2s Lock', color: 'text-brand-600 dark:text-brand-400' },
        { label: 'SECURITY', value: '256-Bit SSL' },
        { label: 'SURGE SHIELD', value: '0% Spikes', color: 'text-emerald-600 dark:text-emerald-400' }
      ],
      highlights: [
        'Instant upfront fare estimates with zero surge shocks',
        '60fps real-time vehicle movement vector radar',
        'Scheduled outstation & airport transfer reservations',
        'In-app digital wallet, UPI, cards & split fare'
      ],
      routeLink: '/client',
      buttonLabel: 'Explore Passenger App'
    },
    {
      id: 'dispatch-erp',
      name: 'Central CAD & Fleet ERP',
      category: 'Mission Control Web',
      tagline: 'Autonomous multi-tenant dispatch center with live radar & revenue analytics',
      image: '/assets/dispatch-admin.jpg',
      badge: 'Cloud Console',
      rating: 4.99,
      specs: [
        { label: 'SLA UPTIME', value: '99.99%', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'FLEET SCALE', value: '10,000+ Cabs' },
        { label: 'DISPATCH', value: 'Autonomous CAD', color: 'text-brand-600 dark:text-brand-400' }
      ],
      highlights: [
        'Geospatial proximity cluster auto-dispatch algorithm',
        'Driver shift audit, KYC onboarding & remote MDT lock',
        'Dynamic surge pricing thresholds & corridor rules',
        'Automated GST/VAT invoicing & bank reconciliation'
      ],
      routeLink: '/admin',
      buttonLabel: 'Launch Mission Console'
    }
  ];
}

