import { Driver, GeoLocation, VehicleOption, PricingSettings, Booking } from '../models/taxi.model';

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'mini',
    name: 'Red Mini',
    tagline: 'Affordable, compact daily commute',
    capacity: 3,
    luggage: 2,
    baseFare: 60,
    ratePerKm: 14,
    ratePerMin: 1.5,
    image: 'car-mini',
    etaMins: 3,
    features: ['AC Cab', 'Compact & Fast', 'Pocket Friendly']
  },
  {
    id: 'sedan',
    name: 'Red Prime Sedan',
    tagline: 'Top rated drivers & premium comfort',
    capacity: 4,
    luggage: 3,
    baseFare: 90,
    ratePerKm: 18,
    ratePerMin: 2.0,
    image: 'car-sedan',
    etaMins: 4,
    features: ['Spacious Legroom', 'Extra Boot Space', 'Free In-Cab Wi-Fi']
  },
  {
    id: 'suv',
    name: 'Red XL SUV',
    tagline: 'Spacious 6-seater for family & outstation',
    capacity: 6,
    luggage: 5,
    baseFare: 140,
    ratePerKm: 24,
    ratePerMin: 2.5,
    image: 'car-suv',
    etaMins: 6,
    features: ['6-7 Seats', 'Heavy Luggage Support', 'Highway Certified']
  },
  {
    id: 'executive',
    name: 'Red Executive Luxury',
    tagline: 'Chauffeured luxury for business elites',
    capacity: 4,
    luggage: 4,
    baseFare: 250,
    ratePerKm: 35,
    ratePerMin: 4.0,
    image: 'car-luxury',
    etaMins: 8,
    features: ['Luxury Leather', 'Executive Driver', 'Complimentary Water & Mints']
  },
  {
    id: 'van',
    name: 'Red Tempo Van',
    tagline: 'Group travel & airport delegations',
    capacity: 12,
    luggage: 10,
    baseFare: 350,
    ratePerKm: 42,
    ratePerMin: 5.0,
    image: 'car-van',
    etaMins: 12,
    features: ['Large Group Travel', 'Reclining Seats', 'Huge Luggage Bay']
  }
];

export const POPULAR_LOCATIONS: GeoLocation[] = [
  {
    name: 'International Airport Terminal 1',
    address: 'Avinashi Road, Civil Aerodrome Post, Coimbatore',
    lat: 11.0300,
    lng: 77.0434,
    category: 'airport'
  },
  {
    name: 'Central Railway Junction',
    address: 'State Bank Road, Gopalapuram, Coimbatore',
    lat: 10.9983,
    lng: 76.9634,
    category: 'station'
  },
  {
    name: 'TIDEL Park IT SEZ',
    address: 'ELCOT SEZ, Civil Aerodrome Road, Peelamedu',
    lat: 11.0256,
    lng: 77.0142,
    category: 'business'
  },
  {
    name: 'Brookefields Mall',
    address: '67-71 Dr Krishnasamy Mudaliar Rd, Sukrawar Pettai',
    lat: 11.0116,
    lng: 76.9560,
    category: 'mall'
  },
  {
    name: 'Gandhipuram Central Bus Terminus',
    address: 'Cross Cut Road, Gandhipuram',
    lat: 11.0180,
    lng: 76.9678,
    category: 'station'
  },
  {
    name: 'Race Course Boulevard',
    address: 'Race Course Road, Gopalapuram',
    lat: 11.0039,
    lng: 76.9745,
    category: 'residential'
  },
  {
    name: 'RS Puram Head Post Office',
    address: 'DB Road, RS Puram West',
    lat: 11.0076,
    lng: 76.9452,
    category: 'residential'
  },
  {
    name: 'Saravanampatti Tech Zone (KGISL)',
    address: 'CHIL SEZ, Keeranatham Road, Saravanampatti',
    lat: 11.0825,
    lng: 76.9945,
    category: 'business'
  },
  {
    name: 'Fun Republic Mall',
    address: 'Avinashi Rd, Peelamedu',
    lat: 11.0270,
    lng: 77.0018,
    category: 'mall'
  },
  {
    name: 'Le Meridien Hotel',
    address: '762 Avinashi Road, Neelambur',
    lat: 11.0545,
    lng: 77.0850,
    category: 'hotel'
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'DRV-101',
    name: 'Karthik Subramanian',
    phone: '+91 98421 88301',
    email: 'karthik.s@redtaxis.in',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatarColor: 'bg-red-500',
    rating: 4.92,
    totalTrips: 3420,
    acceptanceRate: 98,
    completionRate: 99,
    status: 'online',
    isVerified: true,
    vehicle: {
      category: 'sedan',
      model: 'Toyota Etios Platinum',
      plateNumber: 'TN 38 BX 4492',
      color: 'Crimson Red / White',
      year: 2023
    },
    location: {
      lat: 11.0280,
      lng: 76.9950,
      heading: 45,
      address: 'Peelamedu Tech Zone'
    },
    todayEarnings: 2850,
    weeklyEarnings: 18450,
    todayTrips: 8
  },
  {
    id: 'DRV-102',
    name: 'Muthukumar Ramasamy',
    phone: '+91 97890 12345',
    email: 'muthu.r@redtaxis.in',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatarColor: 'bg-rose-600',
    rating: 4.88,
    totalTrips: 2150,
    acceptanceRate: 95,
    completionRate: 97,
    status: 'online',
    isVerified: true,
    vehicle: {
      category: 'suv',
      model: 'Toyota Innova Crysta',
      plateNumber: 'TN 37 CY 8812',
      color: 'Pearl White',
      year: 2022
    },
    location: {
      lat: 11.0360,
      lng: 77.0650,
      heading: 120,
      address: 'Airport Express Highway'
    },
    todayEarnings: 3600,
    weeklyEarnings: 24200,
    todayTrips: 6
  },
  {
    id: 'DRV-103',
    name: 'Anandhan Velusamy',
    phone: '+91 94432 55431',
    email: 'anandhan.v@redtaxis.in',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatarColor: 'bg-emerald-600',
    rating: 4.95,
    totalTrips: 4890,
    acceptanceRate: 99,
    completionRate: 100,
    status: 'online',
    isVerified: true,
    vehicle: {
      category: 'mini',
      model: 'Maruti Suzuki WagonR VXi',
      plateNumber: 'TN 38 CL 1098',
      color: 'Ruby Red',
      year: 2024
    },
    location: {
      lat: 10.9980,
      lng: 76.9550,
      heading: 270,
      address: 'Central Railway Junction'
    },
    todayEarnings: 1940,
    weeklyEarnings: 14100,
    todayTrips: 9
  },
  {
    id: 'DRV-104',
    name: 'Pradeep Chandran',
    phone: '+91 99945 67891',
    email: 'pradeep.c@redtaxis.in',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    avatarColor: 'bg-amber-600',
    rating: 4.97,
    totalTrips: 1800,
    acceptanceRate: 96,
    completionRate: 98,
    status: 'online',
    isVerified: true,
    vehicle: {
      category: 'executive',
      model: 'Toyota Camry Hybrid',
      plateNumber: 'TN 38 EF 0007',
      color: 'Obsidian Black',
      year: 2024
    },
    location: {
      lat: 11.0060,
      lng: 76.9850,
      heading: 180,
      address: 'Race Course Boulevard'
    },
    todayEarnings: 5200,
    weeklyEarnings: 31800,
    todayTrips: 4
  },
  {
    id: 'DRV-105',
    name: 'Suresh Narayanan',
    phone: '+91 98940 33221',
    email: 'suresh.n@redtaxis.in',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    avatarColor: 'bg-blue-600',
    rating: 4.79,
    totalTrips: 1240,
    acceptanceRate: 92,
    completionRate: 94,
    status: 'busy',
    isVerified: true,
    vehicle: {
      category: 'van',
      model: 'Force Urbania Premium 12S',
      plateNumber: 'TN 38 V 9901',
      color: 'Silver Grey',
      year: 2023
    },
    location: {
      lat: 11.0720,
      lng: 77.0150,
      heading: 90,
      address: 'Saravanampatti IT Corridor'
    },
    todayEarnings: 4100,
    weeklyEarnings: 27500,
    todayTrips: 3
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-78901',
    bookingNumber: 'RTX-9482',
    passengerName: 'Divya Ramesh',
    passengerPhone: '+91 98401 22334',
    pickup: POPULAR_LOCATIONS[0],
    dropoff: POPULAR_LOCATIONS[3],
    vehicleCategory: 'sedan',
    distanceKm: 11.4,
    durationMins: 24,
    fare: 310,
    paymentMethod: 'wallet',
    status: 'completed',
    driverId: 'DRV-101',
    driverName: 'Karthik Subramanian',
    driverPhone: '+91 98421 88301',
    vehicleModel: 'Toyota Etios Platinum',
    vehiclePlate: 'TN 38 BX 4492',
    otp: '4921',
    ratingGiven: 5,
    createdAt: new Date(Date.now() - 3600000 * 2),
    updatedAt: new Date(Date.now() - 3600000 * 1.2)
  },
  {
    id: 'BK-78902',
    bookingNumber: 'RTX-9483',
    passengerName: 'Ganesh Moorthy',
    passengerPhone: '+91 97891 44556',
    pickup: POPULAR_LOCATIONS[1],
    dropoff: POPULAR_LOCATIONS[7],
    vehicleCategory: 'mini',
    distanceKm: 9.8,
    durationMins: 21,
    fare: 215,
    paymentMethod: 'upi',
    status: 'completed',
    driverId: 'DRV-103',
    driverName: 'Anandhan Velusamy',
    driverPhone: '+91 94432 55431',
    vehicleModel: 'Maruti Suzuki WagonR VXi',
    vehiclePlate: 'TN 38 CL 1098',
    otp: '1839',
    ratingGiven: 5,
    createdAt: new Date(Date.now() - 3600000 * 4),
    updatedAt: new Date(Date.now() - 3600000 * 3.1)
  }
];

export const INITIAL_PRICING: PricingSettings = {
  surgeMultiplier: 1.0,
  nightSurcharge: 1.15,
  taxPercentage: 5,
  cancellationFee: 50,
  commissionPercentage: 15
};
