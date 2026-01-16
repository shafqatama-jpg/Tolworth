
export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  GUEST = 'GUEST'
}

export type ServiceCategory = 'standard' | 'intensive' | 'test-prep';

export interface Service {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  category: ServiceCategory;
  popular?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  postcode: string;
  transmission: 'Manual' | 'Automatic';
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
  approved: boolean;
}

export interface SiteImages {
  heroBg: string;
  features: string;
  areasBg: string;
  areasMap: string;
}

export interface SiteSettings {
  siteName: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryColor: string; // Hex
  images: SiteImages;
  googleReviewsUrl: string;
  gallery: string[]; // Array of image URLs
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  status: 'Draft' | 'Published';
}
