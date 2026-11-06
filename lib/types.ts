export type UserRole = "owner" | "customer" | "admin";

export type UserStatus = "Active" | "Suspended";

export type SalonType = "unisex" | "ladies" | "men";

export type ServiceCategory =
  | "Hair"
  | "Skin & Facial"
  | "Nails & Art"
  | "Bridal & Festive"
  | "Spa & Wellness"
  | "Beard & Men's Grooming";

export type BookingStatus = "Confirmed" | "Completed" | "Cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  salonIds?: string[];
  rewardPoints?: number;
  permissions?: string[];
}

export interface Salon {
  id: string;
  ownerId: string;
  name: string;
  type: SalonType;
  address: string;
  city: string;
  phone: string;
  rating: number;
  reviewCount: number;
  image: string;
  establishedYear: number;
}

export interface Service {
  id: string;
  salonId: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  salonId: string;
  salonName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  stylistName: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  pointsEarned?: number;
  notes?: string;
}

export interface RewardConfig {
  earnRate: number; // Points earned per ₹100 spent (e.g. 5)
  pointValueRupees: number; // Value of 1 point in ₹ (e.g. 0.5)
  minPointsToRedeem: number; // Minimum points required to redeem (e.g. 100)
  tierThresholds: {
    bronze: number;
    silver: number;
    gold: number;
  };
}

export interface Offer {
  id: string;
  salonId: string;
  code: string;
  title: string;
  discountPercent: number;
  minBillAmount: number;
  validUntil: string;
  isActive: boolean;
  description?: string;
}
