import { Routes } from '@angular/router';
import { WebsiteComponent } from './features/website/website.component';
import { ClientComponent } from './features/client/client.component';
import { DriverComponent } from './features/driver/driver.component';
import { AdminComponent } from './features/admin/admin.component';
import { PricingComponent } from './features/pricing/pricing.component';

export const routes: Routes = [
  { path: '', component: WebsiteComponent, title: 'Red Taxis | Official Booking & Fleet Portal' },
  { path: 'client', component: ClientComponent, title: 'Passenger App | Red Taxis' },
  { path: 'driver', component: DriverComponent, title: 'Driver Cockpit | Red Taxis' },
  { path: 'admin', component: AdminComponent, title: 'Central Dispatch & Admin | Red Taxis' },
  { path: 'pricing', component: PricingComponent, title: 'Pricing & Plans | Red Taxis Dispatch' },
  { path: '**', redirectTo: '' }
];
