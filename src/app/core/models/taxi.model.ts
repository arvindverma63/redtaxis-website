export type VehicleCategory = 'mini' | 'sedan' | 'suv' | 'executive' | 'van';

export interface VehicleOption {
  id: VehicleCategory;
  name: string;
  tagline: string;
  capacity: number;
  luggage: number;
  baseFare: number;
  ratePerKm: number;
  ratePerMin: number;
  image: string;
  etaMins: number;
  features: string[];
}

export interface GeoLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
  category?: 'airport' | 'station' | 'hotel' | 'mall' | 'business' | 'residential';
}

export type BookingStatus = 
  | 'draft'
  | 'searching'
  | 'driver_assigned'
  | 'driver_arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  bookingNumber: string;
  passengerName: string;
  passengerPhone: string;
  pickup: GeoLocation;
  dropoff: GeoLocation;
  vehicleCategory: VehicleCategory;
  distanceKm: number;
  durationMins: number;
  fare: number;
  paymentMethod: 'cash' | 'card' | 'wallet' | 'upi';
  status: BookingStatus;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverPhoto?: string;
  driverRating?: number;
  vehicleModel?: string;
  vehiclePlate?: string;
  driverLocation?: { lat: number; lng: number; heading: number };
  otp: string;
  createdAt: Date;
  updatedAt: Date;
  etaMins?: number;
  notes?: string;
  ratingGiven?: number;
  feedback?: string;
}

export type DriverStatus = 'online' | 'busy' | 'offline';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  avatarColor: string;
  rating: number;
  totalTrips: number;
  acceptanceRate: number;
  completionRate: number;
  status: DriverStatus;
  isVerified: boolean;
  vehicle: {
    category: VehicleCategory;
    model: string;
    plateNumber: string;
    color: string;
    year: number;
  };
  location: {
    lat: number;
    lng: number;
    heading: number;
    address: string;
  };
  todayEarnings: number;
  weeklyEarnings: number;
  todayTrips: number;
  activeBookingId?: string;
}

export interface PricingSettings {
  surgeMultiplier: number;
  nightSurcharge: number;
  taxPercentage: number;
  cancellationFee: number;
  commissionPercentage: number;
}

export interface DispatchStat {
  activeRides: number;
  availableDrivers: number;
  totalRevenueToday: number;
  completedTripsToday: number;
  avgResponseTimeSecs: number;
  fleetUtilizationPercent: number;
}
