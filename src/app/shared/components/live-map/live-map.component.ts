import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver, GeoLocation, Booking } from '../../../core/models/taxi.model';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-live-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full min-h-[440px] bg-slate-100 dark:bg-[#060a12] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col select-none transition-colors duration-300">
      
      <!-- Map Canvas Area -->
      <div class="relative flex-1 w-full h-full overflow-hidden">
        
        <!-- SVG Map Vector Layer -->
        <svg class="w-full h-full absolute inset-0 bg-[#f8fafc] dark:bg-[#060a12] transition-colors duration-300" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <!-- Map Coordinate Grid -->
            <pattern id="cad-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" class="stroke-slate-300/40 dark:stroke-slate-800/60" stroke-width="0.75"/>
              <circle cx="0" cy="0" r="1" class="fill-slate-400/40 dark:fill-slate-700/60" />
            </pattern>

            <!-- Telemetry Crosshair Pattern -->
            <pattern id="crosshairs" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 95 100 L 105 100 M 100 95 L 100 105" class="stroke-slate-400/30 dark:stroke-slate-700/40" stroke-width="1"/>
            </pattern>

            <!-- Vehicle Heading Cone Gradient -->
            <radialGradient id="headingCone" cx="50%" cy="100%" r="100%">
              <stop offset="0%" stop-color="#e11d48" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
            </radialGradient>

            <!-- Radar Sweep Gradient -->
            <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#e11d48" stop-opacity="0.15" />
              <stop offset="70%" stop-color="#e11d48" stop-opacity="0.03" />
              <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
            </radialGradient>

            <!-- Route Active Gradient -->
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" />
              <stop offset="50%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#e11d48" />
            </linearGradient>

            <!-- Glow Filters -->
            <filter id="telemetry-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 1. Background Fill & CAD Coordinate Grids -->
          <rect width="1000" height="700" class="fill-[#f8fafc] dark:fill-[#070b14]" />
          <rect width="1000" height="700" fill="url(#cad-grid)" />
          <rect width="1000" height="700" fill="url(#crosshairs)" />

          <!-- 2. Concentric Radar Distance Rings (Mission Control Style) -->
          <g class="stroke-slate-300/40 dark:stroke-slate-800/70 pointer-events-none" fill="none" stroke-width="1">
            <circle cx="500" cy="350" r="140" stroke-dasharray="3, 5" />
            <circle cx="500" cy="350" r="260" stroke-dasharray="4, 6" />
            <circle cx="500" cy="350" r="380" stroke-dasharray="4, 8" />
          </g>

          <!-- Range Labels -->
          <g class="fill-slate-400/70 dark:fill-slate-600 font-mono text-[8px] font-bold tracking-widest pointer-events-none">
            <text x="508" y="215">RANGE 2.5 KM</text>
            <text x="508" y="95">RANGE 6.0 KM</text>
          </g>

          <!-- 3. Animated Radar Sweep Beam -->
          <g class="pointer-events-none animate-radar-sweep">
            <path d="M 500 350 L 500 -50 A 400 400 0 0 1 850 350 Z" fill="url(#radarSweepGrad)" />
            <line x1="500" y1="350" x2="850" y2="350" stroke="#e11d48" stroke-width="1" stroke-opacity="0.4" />
          </g>

          <!-- 4. Geometric Urban Districts & Zones -->
          <g class="transition-colors">
            <!-- Aerodrome Precinct -->
            <polygon points="680,60 960,60 940,240 720,220" class="fill-slate-200/50 dark:fill-slate-800/30 stroke-slate-300/70 dark:stroke-slate-800/70" stroke-width="1" />
            <!-- Tech SEZ Zone -->
            <polygon points="400,180 620,160 640,320 420,340" class="fill-slate-200/40 dark:fill-slate-800/25 stroke-slate-300/60 dark:stroke-slate-800/60" stroke-width="1" />
            <!-- Central Business District -->
            <polygon points="120,240 320,220 340,440 140,460" class="fill-slate-200/40 dark:fill-slate-800/25 stroke-slate-300/60 dark:stroke-slate-800/60" stroke-width="1" />
            <!-- South Residential Sector -->
            <polygon points="260,480 480,460 500,640 280,660" class="fill-slate-200/35 dark:fill-slate-800/20 stroke-slate-300/50 dark:stroke-slate-800/50" stroke-width="1" />
            <!-- North Innovation Zone -->
            <polygon points="460,40 680,30 660,140 440,150" class="fill-slate-200/35 dark:fill-slate-800/20 stroke-slate-300/50 dark:stroke-slate-800/50" stroke-width="1" />
          </g>

          <!-- 5. Modern Road & Expressway Arterials -->
          <!-- Secondary City Grid Lines -->
          <g class="stroke-slate-300/60 dark:stroke-slate-800/60" stroke-width="1.5" fill="none">
            <path d="M 0 150 L 1000 150" />
            <path d="M 0 350 L 1000 350" />
            <path d="M 0 540 L 1000 540" />
            <path d="M 220 0 L 220 700" />
            <path d="M 460 0 L 460 700" />
            <path d="M 720 0 L 720 700" />
          </g>

          <!-- Major Highways (Dual Layer Telemetry Conduits) -->
          <g class="stroke-slate-300 dark:stroke-slate-800" stroke-width="8" fill="none" stroke-linecap="round">
            <!-- Avinashi Express Highway (Diagonal East-West) -->
            <path d="M -50 420 C 250 380, 550 260, 1050 140" />
            <!-- North-South Metro Corridor -->
            <path d="M 520 -50 C 510 250, 480 450, 450 750" />
            <!-- Airport Bypass Ring -->
            <path d="M 150 -50 C 220 280, 520 540, 880 750" />
          </g>

          <!-- Highway Centerline Illumination -->
          <g class="stroke-brand-500/30 dark:stroke-brand-500/25" stroke-width="2" fill="none" stroke-linecap="round">
            <path d="M -50 420 C 250 380, 550 260, 1050 140" stroke-dasharray="10, 8" />
            <path d="M 520 -50 C 510 250, 480 450, 450 750" stroke-dasharray="10, 8" />
          </g>

          <!-- 6. Professional District & Waypoint Typography -->
          <g font-family="monospace" font-size="9" font-weight="700" letter-spacing="1.5" class="fill-slate-400 dark:fill-slate-500 pointer-events-none select-none">
            <text x="730" y="110">AIRPORT TERMINAL 1</text>
            <text x="440" y="240">TIDEL IT PARK</text>
            <text x="160" y="300">CENTRAL RAIL JUNCTION</text>
            <text x="300" y="550">RACE COURSE BOULEVARD</text>
            <text x="480" y="80">SARAVANAMPATTI IT SEZ</text>
          </g>

          <!-- 7. Active Booking Route Visualization -->
          <g *ngIf="pickupCoord && dropoffCoord">
            <!-- Route Outer Ambient Glow -->
            <path 
              [attr.d]="generateRoutePath(pickupCoord, dropoffCoord)" 
              fill="none" 
              stroke="#e11d48" 
              stroke-width="8" 
              stroke-opacity="0.25"
              stroke-linecap="round"
            />
            <!-- Animated Flowing Route Curve -->
            <path 
              [attr.d]="generateRoutePath(pickupCoord, dropoffCoord)" 
              fill="none" 
              stroke="url(#routeGradient)" 
              stroke-width="3.5" 
              stroke-linecap="round"
              class="animate-dash-flow"
            />
          </g>

          <!-- Assigned Driver Route to Pickup -->
          <g *ngIf="assignedDriverCoord && pickupCoord && activeBooking?.status === 'driver_assigned'">
            <path 
              [attr.d]="generateRoutePath(assignedDriverCoord, pickupCoord)" 
              fill="none" 
              stroke="#0ea5e9" 
              stroke-width="3" 
              class="animate-dash-flow"
              stroke-linecap="round"
            />
          </g>

          <!-- Pickup Marker Beacon -->
          <g *ngIf="pickupCoord" class="cursor-pointer transition-transform duration-300 hover:scale-110">
            <circle [attr.cx]="pickupCoord.x" [attr.cy]="pickupCoord.y" r="14" fill="rgba(16, 185, 129, 0.25)" filter="url(#telemetry-glow)" />
            <circle [attr.cx]="pickupCoord.x" [attr.cy]="pickupCoord.y" r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" />
            <rect [attr.x]="pickupCoord.x - 36" [attr.y]="pickupCoord.y - 28" width="72" height="18" rx="6" class="fill-slate-900 stroke-emerald-500" stroke-width="1.2" />
            <text [attr.x]="pickupCoord.x" [attr.y]="pickupCoord.y - 16" fill="#10b981" font-size="8.5" font-weight="800" font-family="monospace" text-anchor="middle">PICKUP</text>
          </g>

          <!-- Dropoff Marker Beacon -->
          <g *ngIf="dropoffCoord" class="cursor-pointer transition-transform duration-300 hover:scale-110">
            <circle [attr.cx]="dropoffCoord.x" [attr.cy]="dropoffCoord.y" r="14" fill="rgba(225, 29, 72, 0.25)" filter="url(#telemetry-glow)" />
            <circle [attr.cx]="dropoffCoord.x" [attr.cy]="dropoffCoord.y" r="6" fill="#e11d48" stroke="#ffffff" stroke-width="2" />
            <rect [attr.x]="dropoffCoord.x - 38" [attr.y]="dropoffCoord.y - 28" width="76" height="18" rx="6" class="fill-slate-900 stroke-brand-500" stroke-width="1.2" />
            <text [attr.x]="dropoffCoord.x" [attr.y]="dropoffCoord.y - 16" fill="#fb7185" font-size="8.5" font-weight="800" font-family="monospace" text-anchor="middle">DROPOFF</text>
          </g>

          <!-- 8. HIGH-END MODERN VEHICLE TELEMETRY PUCKS -->
          <g *ngFor="let driver of drivers" (click)="onSelectDriver(driver)" class="cursor-pointer group">
            <g [attr.transform]="'translate(' + getCanvasX(driver.location.lng) + ',' + getCanvasY(driver.location.lat) + ')'">
              
              <!-- Subtle Heading Spotlight Cone -->
              <g [attr.transform]="'rotate(' + (driver.location.heading || 0) + ')'">
                <path d="M 0 0 L -14 -38 A 38 38 0 0 1 14 -38 Z" fill="url(#headingCone)" />
              </g>

              <!-- Outer Active Radar Pulse on Busy / Selected -->
              <circle 
                *ngIf="driver.status === 'busy' || selectedDriverId === driver.id"
                cx="0" cy="0" r="18" 
                [attr.fill]="driver.status === 'busy' ? 'rgba(225, 29, 72, 0.2)' : 'rgba(14, 165, 233, 0.2)'"
                [attr.stroke]="driver.status === 'busy' ? '#e11d48' : '#0ea5e9'"
                stroke-width="1.5"
                class="animate-pulse"
              />

              <!-- Sleek Modern Telemetry Vehicle Puck -->
              <g [attr.transform]="'rotate(' + (driver.location.heading || 0) + ')'">
                <!-- Outer Ring Halo -->
                <circle cx="0" cy="0" r="11" [attr.fill]="driver.status === 'busy' ? '#e11d48' : '#0f172a'" stroke="#ffffff" stroke-width="2" class="shadow-md" />
                <!-- Directional Arrow Node -->
                <polygon points="0,-6 4.5,4.5 0,2 -4.5,4.5" fill="#ffffff" />
              </g>

              <!-- Sleek Monospace License Plate Tag -->
              <g transform="translate(0, 20)">
                <rect x="-38" y="-7.5" width="76" height="15" rx="4" class="fill-slate-900/95 stroke-slate-700/80" stroke-width="1" />
                <circle cx="-30" cy="0" r="2.5" [attr.fill]="driver.status === 'online' ? '#10b981' : '#e11d48'" />
                <text x="-23" y="3" fill="#f8fafc" font-size="7.5" font-weight="700" font-family="monospace">{{ driver.vehicle.plateNumber }}</text>
              </g>

              <!-- Hover Tooltip Card -->
              <g class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" transform="translate(0, -32)">
                <rect x="-65" y="-14" width="130" height="26" rx="6" class="fill-slate-950 stroke-brand-500" stroke-width="1" />
                <text x="0" y="0" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">{{ driver.name }}</text>
                <text x="0" y="9" fill="#94a3b8" font-size="7.5" text-anchor="middle">★ {{ driver.rating }} • {{ driver.vehicle.model }}</text>
              </g>

            </g>
          </g>

        </svg>

        <!-- Top Left Radar Status Overlay -->
        <div class="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-lg border border-slate-200 dark:border-slate-800 pointer-events-auto transition-colors">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Live GPS Radar
              </span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                {{ onlineDriverCount }} Cabs Active in Coimbatore Metro
              </span>
            </div>
          </div>

          <!-- Active Trip Pill -->
          <div *ngIf="activeBooking" class="bg-brand-50 dark:bg-brand-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-brand-300 dark:border-brand-800 flex items-center gap-2 pointer-events-auto">
            <span class="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono">#{{ activeBooking.bookingNumber }}</span>
            <span class="text-xs text-slate-700 dark:text-slate-300">• {{ getStatusLabel(activeBooking.status) }}</span>
          </div>
        </div>

        <!-- Legend (Bottom Right) -->
        <div class="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold flex items-center gap-3.5 text-slate-600 dark:text-slate-400 shadow-md pointer-events-none">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-brand-500"></span>
            <span>On Trip</span>
          </div>
        </div>

      </div>

    </div>
  `
})
export class LiveMapComponent {
  @Input() drivers: Driver[] = [];
  @Input() activeBooking: Booking | null = null;
  @Input() pickup: GeoLocation | null = null;
  @Input() dropoff: GeoLocation | null = null;
  @Input() selectedDriverId: string | null = null;

  @Output() driverSelected = new EventEmitter<Driver>();
  @Output() mapClicked = new EventEmitter<{ lat: number; lng: number }>();

  themeService = inject(ThemeService);

  private minLat = 10.9700;
  private maxLat = 11.1000;
  private minLng = 76.9200;
  private maxLng = 77.1000;

  get onlineDriverCount(): number {
    return this.drivers.filter(d => d.status === 'online' || d.status === 'busy').length;
  }

  get pickupCoord(): { x: number; y: number } | null {
    const loc = this.pickup || this.activeBooking?.pickup;
    if (!loc) return null;
    return { x: this.getCanvasX(loc.lng), y: this.getCanvasY(loc.lat) };
  }

  get dropoffCoord(): { x: number; y: number } | null {
    const loc = this.dropoff || this.activeBooking?.dropoff;
    if (!loc) return null;
    return { x: this.getCanvasX(loc.lng), y: this.getCanvasY(loc.lat) };
  }

  get assignedDriverCoord(): { x: number; y: number } | null {
    if (!this.activeBooking?.driverId) return null;
    const drv = this.drivers.find(d => d.id === this.activeBooking?.driverId);
    if (!drv) return null;
    return { x: this.getCanvasX(drv.location.lng), y: this.getCanvasY(drv.location.lat) };
  }

  getCanvasX(lng: number): number {
    const norm = (lng - this.minLng) / (this.maxLng - this.minLng);
    return Math.max(60, Math.min(940, Math.round(norm * 880 + 60)));
  }

  getCanvasY(lat: number): number {
    const norm = (this.maxLat - lat) / (this.maxLat - this.minLat);
    return Math.max(60, Math.min(640, Math.round(norm * 580 + 60)));
  }

  generateRoutePath(start: { x: number; y: number }, end: { x: number; y: number }): string {
    const midX = (start.x + end.x) / 2 + (start.y > end.y ? 30 : -30);
    const midY = (start.y + end.y) / 2 + (start.x > end.x ? -20 : 20);
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'searching': return 'Finding Red Taxi...';
      case 'driver_assigned': return 'Driver En Route';
      case 'driver_arrived': return 'Driver Waiting Outside';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Trip Completed';
      default: return status;
    }
  }

  onSelectDriver(driver: Driver) {
    this.driverSelected.emit(driver);
  }
}
