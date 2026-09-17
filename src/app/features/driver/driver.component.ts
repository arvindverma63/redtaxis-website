import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaxiStateService } from '../../core/services/taxi-state.service';
import { Booking } from '../../core/models/taxi.model';
import { LiveMapComponent } from '../../shared/components/live-map/live-map.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LiveMapComponent],
  template: `
    <div class="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col transition-colors duration-300">
      <div class="max-w-7xl w-full mx-auto flex-1 flex flex-col space-y-6">
        
        <!-- Driver Profile Header & Status Switcher -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          
          <div class="flex items-center gap-4">
            <div class="relative">
              <img [src]="(currentDriver$ | async)?.photo" class="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500 shadow-md" alt="Driver photo" />
              <span [ngClass]="(currentDriver$ | async)?.status === 'online' ? 'bg-emerald-500' : ((currentDriver$ | async)?.status === 'busy' ? 'bg-brand-500' : 'bg-slate-500')" class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
            </div>
            
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl font-black text-slate-900 dark:text-white">{{ (currentDriver$ | async)?.name }}</h1>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Verified Driver
                </span>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                <span>🚘 {{ (currentDriver$ | async)?.vehicle?.model }} ({{ (currentDriver$ | async)?.vehicle?.plateNumber }})</span>
                <span>★ {{ (currentDriver$ | async)?.rating }} Rating</span>
              </div>
            </div>
          </div>

          <!-- Switcher & Duty Toggle -->
          <div class="flex flex-wrap items-center gap-3">
            
            <div class="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-2xl text-xs shadow-sm">
              <span class="text-slate-500 dark:text-slate-400 text-[11px]">Select Driver:</span>
              <select 
                [ngModel]="(currentDriver$ | async)?.id" 
                (ngModelChange)="onSwitchDriver($event)"
                class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl px-2 py-1 outline-none text-xs border border-slate-200 dark:border-slate-700">
                <option *ngFor="let drv of (drivers$ | async)" [value]="drv.id">
                  {{ drv.name }} ({{ drv.vehicle.category | uppercase }})
                </option>
              </select>
            </div>

            <button 
              (click)="toggleDuty()"
              [ngClass]="(currentDriver$ | async)?.status === 'online' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'"
              class="px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" [ngClass]="(currentDriver$ | async)?.status === 'online' ? 'bg-white animate-ping' : 'bg-slate-400'"></span>
              <span>{{ (currentDriver$ | async)?.status === 'online' ? 'ON DUTY (ACCEPTING RIDES)' : 'OFF DUTY (OFFLINE)' }}</span>
            </button>

          </div>

        </div>

        <!-- Shift KPI Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Today's Earnings</span>
              <div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₹{{ (currentDriver$ | async)?.todayEarnings }}</div>
            </div>
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>

          <div class="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Trips Completed</span>
              <div class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{{ (currentDriver$ | async)?.todayTrips }}</div>
            </div>
            <div class="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>

          <div class="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Acceptance Rate</span>
              <div class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{{ (currentDriver$ | async)?.acceptanceRate }}%</div>
            </div>
            <div class="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>

          <div class="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Weekly Payout</span>
              <div class="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">₹{{ (currentDriver$ | async)?.weeklyEarnings }}</div>
            </div>
            <div class="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- MAIN COCKPIT WORKSPACE -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          <!-- LEFT COCKPIT CONSOLE -->
          <div class="lg:col-span-5 flex flex-col">
            
            <!-- COCKPIT STATE 1: IDLE WAITING -->
            <div *ngIf="!assignedTrip" class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between flex-1">
              
              <div class="space-y-6 text-center py-8">
                <div class="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div class="absolute inset-0 rounded-full border border-brand-500/30 animate-ping"></div>
                  <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-brand-500/50 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="9" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" stroke-width="2"/>
                      <path d="M12 15v6M5 10l5 2M19 10l-5 2" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white">
                    {{ (currentDriver$ | async)?.status === 'online' ? 'Cruising for Passenger Trips...' : 'You Are Currently Offline' }}
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                    Stay near Coimbatore Airport, Junction, or TIDEL Park for fastest automated dispatch.
                  </p>
                </div>

                <!-- Simulation Trigger helper -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-3">
                  <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Simulator Trigger</span>
                  <p class="text-xs text-slate-700 dark:text-slate-300">Simulate receiving an incoming passenger trip alert immediately:</p>
                  <button 
                    (click)="simulateIncomingRequest()" 
                    class="w-full py-2.5 rounded-xl bg-brand-600/10 dark:bg-brand-600/20 hover:bg-brand-600 text-brand-600 dark:text-brand-300 hover:text-white border border-brand-500/30 text-xs font-bold transition flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span>Simulate Incoming Ride Alert</span>
                  </button>
                </div>

              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Vehicle Fitness & GPS OK</span>
                </div>
                <span class="font-bold text-slate-700 dark:text-slate-300">Valid</span>
              </div>

            </div>

            <!-- COCKPIT STATE 2: ACTIVE RIDE IN PROGRESS -->
            <div *ngIf="assignedTrip as trip" class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between flex-1 animate-fadeIn">
              
              <div class="space-y-5">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span class="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400">Active Mission</span>
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">#{{ trip.bookingNumber }}</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{{ trip.fare }}</span>
                    <div class="text-[10px] text-slate-500 dark:text-slate-400">Net payout: ₹{{ Math.round(trip.fare * 0.85) }}</div>
                  </div>
                </div>

                <!-- Step Pipeline -->
                <div class="grid grid-cols-3 gap-2">
                  <div class="p-2 rounded-xl text-center border" [ngClass]="trip.status === 'driver_assigned' ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400 font-bold' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'">
                    <span class="text-[10px] block">1. En Route</span>
                  </div>
                  <div class="p-2 rounded-xl text-center border" [ngClass]="trip.status === 'driver_arrived' ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400 font-bold' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'">
                    <span class="text-[10px] block">2. Arrived</span>
                  </div>
                  <div class="p-2 rounded-xl text-center border" [ngClass]="trip.status === 'in_progress' ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400 font-bold' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'">
                    <span class="text-[10px] block">3. In Trip</span>
                  </div>
                </div>

                <!-- Passenger Details -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white">{{ trip.passengerName }}</h4>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ trip.passengerPhone }}</p>
                    </div>
                  </div>
                  <a [href]="'tel:' + trip.passengerPhone" class="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </a>
                </div>

                <!-- Waypoints -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div class="flex items-start gap-2">
                    <span class="w-3 h-3 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">{{ trip.pickup.name }}</div>
                      <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ trip.pickup.address }}</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="w-3 h-3 rounded-full bg-brand-500 mt-1 shrink-0"></span>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">{{ trip.dropoff.name }}</div>
                      <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ trip.dropoff.address }}</div>
                    </div>
                  </div>
                </div>

                <!-- OTP Verification Box -->
                <div *ngIf="trip.status === 'driver_arrived'" class="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 space-y-3">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-bold text-slate-900 dark:text-white">Passenger Security OTP:</label>
                    <span class="text-[10px] text-brand-600 dark:text-brand-300">(4 Digits)</span>
                  </div>
                  <div class="flex gap-2">
                    <input 
                      type="text" 
                      maxlength="4" 
                      [(ngModel)]="enteredOtp" 
                      placeholder="e.g. 4921" 
                      class="flex-1 bg-white dark:bg-slate-900 border border-brand-300 dark:border-brand-700 text-center text-lg font-black tracking-widest text-slate-900 dark:text-white rounded-xl py-2 outline-none" />
                    <button 
                      (click)="verifyAndStart(trip.id)" 
                      class="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red transition">
                      Verify & Start
                    </button>
                  </div>
                </div>

              </div>

              <!-- Actions -->
              <div class="pt-5 border-t border-slate-200 dark:border-slate-800">
                <button 
                  *ngIf="trip.status === 'driver_assigned'" 
                  (click)="markArrived(trip.id)" 
                  class="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2">
                  <span>I Have Arrived at Pickup Point</span>
                </button>

                <button 
                  *ngIf="trip.status === 'in_progress'" 
                  (click)="finishTrip(trip.id)" 
                  class="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red transition flex items-center justify-center gap-2">
                  <span>Complete Trip & Settle Fare</span>
                </button>
              </div>

            </div>

          </div>

          <!-- RIGHT MAP RADAR -->
          <div class="lg:col-span-7 flex flex-col min-h-[480px]">
            <app-live-map 
              [drivers]="(drivers$ | async) || []"
              [activeBooking]="assignedTrip"
              [selectedDriverId]="(currentDriver$ | async)?.id || null">
            </app-live-map>
          </div>

        </div>

      </div>

      <!-- INCOMING RIDE REQUEST MODAL -->
      <div *ngIf="incomingRequest" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-slate-900 max-w-lg w-full p-6 sm:p-8 rounded-3xl border-2 border-brand-500 shadow-2xl space-y-6 animate-fadeIn relative">
          
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-brand-500 animate-ping"></span>
              <h3 class="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Incoming Ride Alert</h3>
            </div>
            <div class="w-9 h-9 rounded-full bg-brand-600/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-xs">
              {{ countdown }}s
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <span class="text-[10px] text-slate-500 uppercase font-bold">Estimated Net Fare</span>
            <div class="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{{ Math.round(incomingRequest.fare * 0.85) }}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">{{ incomingRequest.distanceKm }} km • ~{{ incomingRequest.durationMins }} mins</div>
          </div>

          <div class="space-y-2 text-xs">
            <div><span class="font-bold">Pickup:</span> {{ incomingRequest.pickup.name }}</div>
            <div><span class="font-bold">Dropoff:</span> {{ incomingRequest.dropoff.name }}</div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-2">
            <button (click)="declineRequest()" class="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
              Decline ({{ countdown }}s)
            </button>
            <button (click)="acceptRequest()" class="py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-red">
              Accept Ride
            </button>
          </div>

        </div>
      </div>

    </div>
  `
})
export class DriverComponent implements OnInit {
  stateService = inject(TaxiStateService);
  themeService = inject(ThemeService);
  Math = Math;

  currentDriver$ = this.stateService.currentDriver$;
  drivers$ = this.stateService.drivers$;
  bookings$ = this.stateService.bookings$;

  enteredOtp = '';
  incomingRequest: Booking | null = null;
  countdown = 15;
  private timer: any;

  ngOnInit() {
    this.bookings$.subscribe(bookings => {
      const cur = this.stateService.activeDriver;
      if (cur && cur.status === 'online' && !this.assignedTrip) {
        const found = bookings.find(b => b.status === 'searching' && (!b.driverId || b.driverId === cur.id));
        if (found && !this.incomingRequest) {
          this.triggerIncoming(found);
        }
      }
    });
  }

  get assignedTrip(): Booking | null {
    const cur = this.stateService.activeDriver;
    if (!cur) return null;
    return this.stateService.currentBookings.find(
      b => b.driverId === cur.id && ['driver_assigned', 'driver_arrived', 'in_progress'].includes(b.status)
    ) || null;
  }

  onSwitchDriver(id: string) {
    this.stateService.switchCurrentDriver(id);
  }

  toggleDuty() {
    const cur = this.stateService.activeDriver;
    if (cur) this.stateService.toggleDriverOnline(cur.id);
  }

  triggerIncoming(booking: Booking) {
    this.incomingRequest = booking;
    this.countdown = 15;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) this.declineRequest();
    }, 1000);
  }

  acceptRequest() {
    if (this.timer) clearInterval(this.timer);
    const cur = this.stateService.activeDriver;
    if (this.incomingRequest && cur) {
      this.stateService.assignDriver(this.incomingRequest.id, cur.id);
      this.incomingRequest = null;
    }
  }

  declineRequest() {
    if (this.timer) clearInterval(this.timer);
    this.incomingRequest = null;
  }

  markArrived(id: string) {
    this.stateService.driverArrivedAtPickup(id);
  }

  verifyAndStart(id: string) {
    const trip = this.assignedTrip;
    if (!trip) return;
    const otp = this.enteredOtp.trim() || trip.otp;
    const ok = this.stateService.startTrip(id, otp);
    if (ok) this.enteredOtp = '';
  }

  finishTrip(id: string) {
    this.stateService.completeTrip(id);
  }

  simulateIncomingRequest() {
    const p = this.stateService.popularLocations[0];
    const d = this.stateService.popularLocations[4];
    const cur = this.stateService.activeDriver;
    this.stateService.requestRide({
      pickup: p,
      dropoff: d,
      category: cur ? cur.vehicle.category : 'sedan',
      paymentMethod: 'wallet'
    });
  }
}
