import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { 
  Booking, 
  BookingStatus, 
  Driver, 
  DriverStatus, 
  GeoLocation, 
  PricingSettings, 
  VehicleCategory, 
  VehicleOption,
  DispatchStat
} from '../models/taxi.model';
import { 
  INITIAL_BOOKINGS, 
  INITIAL_DRIVERS, 
  INITIAL_PRICING, 
  POPULAR_LOCATIONS, 
  VEHICLE_OPTIONS 
} from '../mock/initial-data';

export interface InAppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  role: 'all' | 'client' | 'driver' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class TaxiStateService {
  // Master lists
  private driversSubject = new BehaviorSubject<Driver[]>(INITIAL_DRIVERS);
  public drivers$ = this.driversSubject.asObservable();

  private bookingsSubject = new BehaviorSubject<Booking[]>(INITIAL_BOOKINGS);
  public bookings$ = this.bookingsSubject.asObservable();

  private activeClientBookingSubject = new BehaviorSubject<Booking | null>(null);
  public activeClientBooking$ = this.activeClientBookingSubject.asObservable();

  // Active logged-in driver session for Driver App
  private currentDriverSubject = new BehaviorSubject<Driver>(INITIAL_DRIVERS[0]);
  public currentDriver$ = this.currentDriverSubject.asObservable();

  // Pricing & Configuration
  private pricingSubject = new BehaviorSubject<PricingSettings>(INITIAL_PRICING);
  public pricing$ = this.pricingSubject.asObservable();

  // Notifications
  private notificationsSubject = new BehaviorSubject<InAppNotification[]>([
    {
      id: 'nt-1',
      type: 'info',
      title: 'Dispatch Center Online',
      message: 'Red Taxis automated smart dispatch telemetry active.',
      timestamp: new Date(),
      role: 'all'
    }
  ]);
  public notifications$ = this.notificationsSubject.asObservable();

  // Passenger Wallet balance
  public userWalletBalance = signal<number>(850);
  public userName = signal<string>('Alex Johnson');
  public userPhone = signal<string>('+91 98402 11990');

  // Simulation timer for GPS updates & trip progress
  private simulationInterval: any;

  constructor() {
    this.startGpsSimulation();
  }

  // --- GETTERS ---
  get vehicleOptions(): VehicleOption[] {
    return VEHICLE_OPTIONS;
  }

  get popularLocations(): GeoLocation[] {
    return POPULAR_LOCATIONS;
  }

  get currentDrivers(): Driver[] {
    return this.driversSubject.getValue();
  }

  get currentBookings(): Booking[] {
    return this.bookingsSubject.getValue();
  }

  get currentPricing(): PricingSettings {
    return this.pricingSubject.getValue();
  }

  get activeClientBooking(): Booking | null {
    return this.activeClientBookingSubject.getValue();
  }

  get activeDriver(): Driver {
    return this.currentDriverSubject.getValue();
  }

  // Computed Dispatch Stats
  getDispatchStats(): DispatchStat {
    const drivers = this.currentDrivers;
    const bookings = this.currentBookings;
    const active = bookings.filter(b => ['searching', 'driver_assigned', 'driver_arrived', 'in_progress'].includes(b.status));
    const completedToday = bookings.filter(b => b.status === 'completed');
    const revenue = completedToday.reduce((acc, b) => acc + b.fare, 0) + 14850;
    const onlineDrivers = drivers.filter(d => d.status === 'online' || d.status === 'busy').length;
    const busyDrivers = drivers.filter(d => d.status === 'busy').length;

    return {
      activeRides: active.length,
      availableDrivers: drivers.filter(d => d.status === 'online').length,
      totalRevenueToday: revenue,
      completedTripsToday: completedToday.length + 38,
      avgResponseTimeSecs: 14,
      fleetUtilizationPercent: onlineDrivers > 0 ? Math.round((busyDrivers / onlineDrivers) * 100) : 0
    };
  }

  // --- FARE CALCULATION ---
  calculateEstimate(
    category: VehicleCategory, 
    pickup: GeoLocation, 
    dropoff: GeoLocation
  ): { distanceKm: number; durationMins: number; fare: number; baseFare: number } {
    const vehicle = VEHICLE_OPTIONS.find(v => v.id === category) || VEHICLE_OPTIONS[0];
    const pricing = this.currentPricing;

    // Calculate approximate distance using Haversine formula
    const dLat = (dropoff.lat - pickup.lat) * (Math.PI / 180);
    const dLng = (dropoff.lng - pickup.lng) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pickup.lat * (Math.PI / 180)) * Math.cos(dropoff.lat * (Math.PI / 180)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const rawKm = 6371 * c;
    const distanceKm = Number(Math.max(2.5, (rawKm * 1.35)).toFixed(1)); // road routing factor
    const durationMins = Math.round(distanceKm * 2.2 + 4);

    const calculatedFare = Math.round(
      (vehicle.baseFare + (distanceKm * vehicle.ratePerKm) + (durationMins * vehicle.ratePerMin)) * 
      pricing.surgeMultiplier * 
      (1 + pricing.taxPercentage / 100)
    );

    return {
      distanceKm,
      durationMins,
      fare: calculatedFare,
      baseFare: vehicle.baseFare
    };
  }

  // --- BOOKING WORKFLOW ---

  /**
   * Passenger creates a new ride request
   */
  requestRide(data: {
    pickup: GeoLocation;
    dropoff: GeoLocation;
    category: VehicleCategory;
    paymentMethod: 'cash' | 'card' | 'wallet' | 'upi';
    notes?: string;
  }): Booking {
    const estimate = this.calculateEstimate(data.category, data.pickup, data.dropoff);
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const randomIdNum = Math.floor(1000 + Math.random() * 9000);

    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-5)}`,
      bookingNumber: `RTX-${randomIdNum}`,
      passengerName: this.userName(),
      passengerPhone: this.userPhone(),
      pickup: data.pickup,
      dropoff: data.dropoff,
      vehicleCategory: data.category,
      distanceKm: estimate.distanceKm,
      durationMins: estimate.durationMins,
      fare: estimate.fare,
      paymentMethod: data.paymentMethod,
      status: 'searching',
      otp: randomOtp,
      createdAt: new Date(),
      updatedAt: new Date(),
      etaMins: 4,
      notes: data.notes
    };

    // Update state
    const allBookings = [newBooking, ...this.currentBookings];
    this.bookingsSubject.next(allBookings);
    this.activeClientBookingSubject.next(newBooking);

    this.pushNotification({
      type: 'info',
      title: 'New Ride Requested',
      message: `Passenger ${newBooking.passengerName} requested ${data.category.toUpperCase()} to ${data.dropoff.name}`,
      role: 'admin'
    });

    // Auto-match after 3.5s if not manually dispatched or handled by driver
    setTimeout(() => {
      const current = this.activeClientBookingSubject.getValue();
      if (current && current.id === newBooking.id && current.status === 'searching') {
        const availableDriver = this.currentDrivers.find(
          d => d.status === 'online' && d.vehicle.category === data.category
        ) || this.currentDrivers.find(d => d.status === 'online');

        if (availableDriver) {
          this.assignDriver(newBooking.id, availableDriver.id);
        }
      }
    }, 3800);

    return newBooking;
  }

  /**
   * Assign driver to booking (Admin or Auto Dispatch)
   */
  assignDriver(bookingId: string, driverId: string) {
    const driver = this.currentDrivers.find(d => d.id === driverId);
    if (!driver) return;

    // Update Driver status
    const updatedDrivers = this.currentDrivers.map(d => {
      if (d.id === driverId) {
        return {
          ...d,
          status: 'busy' as DriverStatus,
          activeBookingId: bookingId
        };
      }
      return d;
    });
    this.driversSubject.next(updatedDrivers);

    // Update Booking
    const updatedBookings = this.currentBookings.map(b => {
      if (b.id === bookingId) {
        const updated: Booking = {
          ...b,
          status: 'driver_assigned' as BookingStatus,
          driverId: driver.id,
          driverName: driver.name,
          driverPhone: driver.phone,
          driverPhoto: driver.photo,
          driverRating: driver.rating,
          vehicleModel: driver.vehicle.model,
          vehiclePlate: driver.vehicle.plateNumber,
          driverLocation: { ...driver.location },
          etaMins: 4,
          updatedAt: new Date()
        };
        return updated;
      }
      return b;
    });

    this.bookingsSubject.next(updatedBookings);

    // Sync active client booking
    const active = this.activeClientBooking;
    if (active && active.id === bookingId) {
      const matching = updatedBookings.find(b => b.id === bookingId);
      if (matching) this.activeClientBookingSubject.next(matching);
    }

    // Sync current logged driver session if matching
    const currentDrv = this.activeDriver;
    if (currentDrv.id === driverId) {
      this.currentDriverSubject.next({
        ...currentDrv,
        status: 'busy',
        activeBookingId: bookingId
      });
    }

    this.pushNotification({
      type: 'success',
      title: 'Driver Assigned',
      message: `${driver.name} (${driver.vehicle.plateNumber}) assigned to trip ${bookingId}`,
      role: 'all'
    });
  }

  /**
   * Driver reports arrived at pickup location
   */
  driverArrivedAtPickup(bookingId: string) {
    this.updateBookingStatus(bookingId, 'driver_arrived');
    this.pushNotification({
      type: 'info',
      title: 'Driver Arrived at Pickup',
      message: 'Your Red Taxi is waiting outside your pickup spot.',
      role: 'client'
    });
  }

  /**
   * Driver starts the trip after OTP verification
   */
  startTrip(bookingId: string, enteredOtp?: string): boolean {
    const booking = this.currentBookings.find(b => b.id === bookingId);
    if (!booking) return false;

    if (enteredOtp && enteredOtp.trim() !== booking.otp.trim()) {
      this.pushNotification({
        type: 'alert',
        title: 'Incorrect OTP',
        message: 'The OTP entered by driver does not match passenger security code.',
        role: 'driver'
      });
      return false;
    }

    this.updateBookingStatus(bookingId, 'in_progress');
    this.pushNotification({
      type: 'success',
      title: 'Trip Started',
      message: `En route to ${booking.dropoff.name}. Have a safe journey!`,
      role: 'all'
    });
    return true;
  }

  /**
   * Driver completes the ride
   */
  completeTrip(bookingId: string) {
    const booking = this.currentBookings.find(b => b.id === bookingId);
    if (!booking) return;

    this.updateBookingStatus(bookingId, 'completed');

    // Free driver & credit earnings
    const updatedDrivers = this.currentDrivers.map(d => {
      if (d.id === booking.driverId) {
        const fareEarnings = Math.round(booking.fare * 0.85); // 85% to driver
        return {
          ...d,
          status: 'online' as DriverStatus,
          activeBookingId: undefined,
          todayEarnings: d.todayEarnings + fareEarnings,
          weeklyEarnings: d.weeklyEarnings + fareEarnings,
          todayTrips: d.todayTrips + 1
        };
      }
      return d;
    });
    this.driversSubject.next(updatedDrivers);

    // If client paid by wallet, deduct
    if (booking.paymentMethod === 'wallet') {
      this.userWalletBalance.update(b => Math.max(0, b - booking.fare));
    }

    // Refresh current driver session
    const curDrv = this.activeDriver;
    if (curDrv.id === booking.driverId) {
      const found = updatedDrivers.find(d => d.id === curDrv.id);
      if (found) this.currentDriverSubject.next(found);
    }

    this.pushNotification({
      type: 'success',
      title: 'Trip Completed Successfully',
      message: `Receipt generated: ₹${booking.fare}. Thank you for riding Red Taxis!`,
      role: 'all'
    });
  }

  /**
   * Cancel booking
   */
  cancelBooking(bookingId: string, reason: string = 'User cancelled') {
    const booking = this.currentBookings.find(b => b.id === bookingId);
    if (!booking) return;

    this.updateBookingStatus(bookingId, 'cancelled');

    // Free driver if assigned
    if (booking.driverId) {
      const updatedDrivers = this.currentDrivers.map(d => {
        if (d.id === booking.driverId) {
          return {
            ...d,
            status: 'online' as DriverStatus,
            activeBookingId: undefined
          };
        }
        return d;
      });
      this.driversSubject.next(updatedDrivers);
    }

    if (this.activeClientBooking?.id === bookingId) {
      this.activeClientBookingSubject.next(null);
    }

    this.pushNotification({
      type: 'warning',
      title: 'Booking Cancelled',
      message: `Trip ${booking.bookingNumber} was cancelled. Reason: ${reason}`,
      role: 'all'
    });
  }

  /**
   * Reset client active booking
   */
  clearActiveClientBooking() {
    this.activeClientBookingSubject.next(null);
  }

  /**
   * Driver toggles online / offline
   */
  toggleDriverOnline(driverId: string): DriverStatus {
    let nextStatus: DriverStatus = 'online';
    const updated = this.currentDrivers.map(d => {
      if (d.id === driverId) {
        nextStatus = d.status === 'offline' ? 'online' : 'offline';
        return { ...d, status: nextStatus };
      }
      return d;
    });

    this.driversSubject.next(updated);
    const updatedCur = updated.find(d => d.id === driverId);
    if (updatedCur) this.currentDriverSubject.next(updatedCur);

    return nextStatus;
  }

  /**
   * Switch active driver viewpoint (for demoing different drivers)
   */
  switchCurrentDriver(driverId: string) {
    const driver = this.currentDrivers.find(d => d.id === driverId);
    if (driver) {
      this.currentDriverSubject.next(driver);
    }
  }

  /**
   * Update dynamic pricing
   */
  updatePricing(newPricing: Partial<PricingSettings>) {
    const updated = { ...this.currentPricing, ...newPricing };
    this.pricingSubject.next(updated);
    this.pushNotification({
      type: 'info',
      title: 'Pricing Settings Updated',
      message: `Surge multiplier set to ${updated.surgeMultiplier}x`,
      role: 'admin'
    });
  }

  /**
   * Top up wallet
   */
  topUpWallet(amount: number) {
    this.userWalletBalance.update(bal => bal + amount);
    this.pushNotification({
      type: 'success',
      title: 'Wallet Recharged',
      message: `₹${amount} added successfully to your Red Taxis Wallet.`,
      role: 'client'
    });
  }

  // --- HELPERS ---
  private updateBookingStatus(bookingId: string, status: BookingStatus) {
    const updatedBookings = this.currentBookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status, updatedAt: new Date() };
      }
      return b;
    });
    this.bookingsSubject.next(updatedBookings);

    const active = this.activeClientBooking;
    if (active && active.id === bookingId) {
      const matching = updatedBookings.find(b => b.id === bookingId);
      if (matching) this.activeClientBookingSubject.next(matching);
    }
  }

  public pushNotification(notif: Omit<InAppNotification, 'id' | 'timestamp'>) {
    const newNotif: InAppNotification = {
      ...notif,
      id: `nt-${Date.now()}`,
      timestamp: new Date()
    };
    this.notificationsSubject.next([newNotif, ...this.notificationsSubject.getValue().slice(0, 19)]);
  }

  // GPS Simulation engine - keeps cars gently moving on live map
  private startGpsSimulation() {
    this.simulationInterval = setInterval(() => {
      const drivers = this.currentDrivers;
      const bookings = this.currentBookings;

      const updatedDrivers = drivers.map(drv => {
        if (drv.status === 'offline') return drv;

        // If driver has active trip, step towards target
        if (drv.activeBookingId) {
          const trip = bookings.find(b => b.id === drv.activeBookingId);
          if (trip) {
            const target = (trip.status === 'driver_assigned') ? trip.pickup : trip.dropoff;
            const step = 0.00035;
            const dLat = target.lat - drv.location.lat;
            const dLng = target.lng - drv.location.lng;
            const dist = Math.sqrt(dLat * dLat + dLng * dLng);

            if (dist > 0.0005) {
              const nextLat = drv.location.lat + (dLat / dist) * step;
              const nextLng = drv.location.lng + (dLng / dist) * step;
              const heading = Math.round((Math.atan2(dLng, dLat) * 180) / Math.PI + 360) % 360;

              return {
                ...drv,
                location: {
                  ...drv.location,
                  lat: nextLat,
                  lng: nextLng,
                  heading
                }
              };
            }
          }
        }

        // Idle drift
        const jitterLat = (Math.random() - 0.5) * 0.0001;
        const jitterLng = (Math.random() - 0.5) * 0.0001;
        return {
          ...drv,
          location: {
            ...drv.location,
            lat: drv.location.lat + jitterLat,
            lng: drv.location.lng + jitterLng,
            heading: (drv.location.heading + (Math.random() * 10 - 5) + 360) % 360
          }
        };
      });

      this.driversSubject.next(updatedDrivers);
    }, 2000);
  }
}
