export const API_BASE_URL = 'http://localhost:8080/api';

export const USER_ROLES = {
  USER: 'ROLE_USER',
  RECYCLER: 'ROLE_RECYCLER',
  ADMIN: 'ROLE_ADMIN'
};

export const DEVICE_CATEGORIES = [
  { id: 'smartphones', name: 'Smartphone & Tablets', baseRatePerKg: 350, icon: 'Smartphone' },
  { id: 'laptops', name: 'Laptops & MacBooks', baseRatePerKg: 420, icon: 'Laptop' },
  { id: 'desktops', name: 'Desktop CPUs & Monitors', baseRatePerKg: 280, icon: 'Monitor' },
  { id: 'batteries', name: 'Lithium & Inverter Batteries', baseRatePerKg: 180, icon: 'BatteryCharging' },
  { id: 'appliances', name: 'Home Appliances (Microwave, AC, TV)', baseRatePerKg: 120, icon: 'Tv' },
  { id: 'accessories', name: 'Cables, Chargers & Peripherals', baseRatePerKg: 80, icon: 'Cpu' }
];

export const DEVICE_CONDITIONS = [
  { id: 'working', label: 'Working / Good Condition', multiplier: 1.4 },
  { id: 'used', label: 'Used / Minor Issues', multiplier: 1.0 },
  { id: 'broken', label: 'Broken / For Scrap Extraction', multiplier: 0.65 }
];

export const PICKUP_STATUS = {
  REQUESTED: 'REQUESTED',
  SCHEDULED: 'SCHEDULED',
  ASSIGNED: 'ASSIGNED',
  PICKED_UP: 'PICKED_UP',
  PROCESSING: 'PROCESSING',
  RECYCLED: 'RECYCLED',
  CANCELLED: 'CANCELLED'
};
