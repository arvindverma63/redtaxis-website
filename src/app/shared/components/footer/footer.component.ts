import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-8 sm:pt-12">
      
      <!-- 1. GIANT PANORAMIC LANDSCAPE HERO BANNER WITH MASSIVE "RED TAXI" TYPOGRAPHY (HOMIE STYLE) -->
      <div class="max-w-[1400px] mx-auto px-3 sm:px-6 mb-12 sm:mb-16">
        <div class="relative w-full h-48 sm:h-72 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80 group select-none">
          
          <!-- Scenic Landscape Image -->
          <img 
            src="/assets/footer-landscape.jpg" 
            alt="Scenic Landscape Panorama" 
            class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          <!-- Ambient Gradient Overlay for text contrast -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <!-- Giant Bold "RED TAXI" Typography Spanning Across Banner -->
          <div class="absolute inset-0 flex items-end justify-center pb-2 sm:pb-4 md:pb-6 pointer-events-none px-4">
            <h2 class="text-[15vw] sm:text-[16vw] md:text-[15vw] font-black tracking-tighter text-white uppercase leading-none text-center drop-shadow-2xl">
              RED TAXI
            </h2>
          </div>

        </div>
      </div>

      <!-- 2. MINIMAL 5-COLUMN FOOTER NAVIGATION (HOMIE SPECIFICATION) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-slate-200 dark:border-slate-800/80">
          
          <!-- Column 1: Brand, Tagline & Social Icons -->
          <div class="md:col-span-4 space-y-5">
            
            <a routerLink="/" class="inline-flex items-center gap-2.5 group cursor-pointer">
              <div class="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <span class="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Red Taxi
              </span>
            </a>

            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed font-normal">
              Peer-to-peer rides, cloud dispatch & intelligent mobility, simplified.
            </p>

            <!-- Circular Social Media Icon Buttons -->
            <div class="flex items-center gap-2 pt-1">
              <a href="#" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-sm" aria-label="Twitter">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a href="#" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-sm" aria-label="LinkedIn">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              <a href="#" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-sm" aria-label="Instagram">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a href="#" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-sm" aria-label="Facebook">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.405 0 22.675 0z"/>
                </svg>
              </a>
            </div>

          </div>

          <!-- Column 2: PRODUCT -->
          <div class="md:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Product
            </h4>
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-normal">
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Platform</a></li>
              <li><a routerLink="/client" class="hover:text-slate-900 dark:hover:text-white transition">Mobile Apps</a></li>
              <li><a routerLink="/admin" class="hover:text-slate-900 dark:hover:text-white transition">Dispatch Center</a></li>
              <li><a routerLink="/pricing" class="hover:text-slate-900 dark:hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          <!-- Column 3: COMPANY -->
          <div class="md:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h4>
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-normal">
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">About</a></li>
              <li><a routerLink="/pricing" class="hover:text-slate-900 dark:hover:text-white transition">Fleet Network</a></li>
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Careers</a></li>
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Press</a></li>
            </ul>
          </div>

          <!-- Column 4: LEGAL -->
          <div class="md:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal
            </h4>
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-normal">
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Terms</a></li>
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Privacy</a></li>
              <li><a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Cookies</a></li>
            </ul>
          </div>

          <!-- Column 5: SUPPORT -->
          <div class="md:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Support
            </h4>
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-normal">
              <li><a routerLink="/pricing" class="hover:text-slate-900 dark:hover:text-white transition">Help Center</a></li>
              <li><a routerLink="/admin" class="hover:text-slate-900 dark:hover:text-white transition">Contact</a></li>
              <li><a routerLink="/pricing" class="hover:text-slate-900 dark:hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

        </div>

        <!-- 3. BOTTOM BAR -->
        <div class="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div>
            © 2026 Red Taxi. All rights reserved.
          </div>
          <div class="text-right text-slate-400 dark:text-slate-600">
            Red Taxi Inc. — Registered dispatch & transport operator
          </div>
        </div>

      </div>

    </footer>
  `
})
export class FooterComponent {}
