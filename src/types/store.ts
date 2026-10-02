export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type Language = 'fr' | 'en';

export interface Product {
  id: string;
  name: string;
  nameFr?: string;
  tagline: string;
  taglineFr?: string;
  price: number;
  originalPrice?: number;
  collectionId: string;
  category: 'Outerwear' | 'Blouses & Tops' | 'Trousers' | 'Knitwear' | 'Dresses' | 'Accessories';
  images: string[];
  description: string;
  descriptionFr?: string;
  details: string[];
  detailsFr?: string[];
  composition: string;
  compositionFr?: string;
  sizes: Size[];
  stock: number;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  nameFr?: string;
  slug: string;
  season: string;
  seasonFr?: string;
  tagline: string;
  taglineFr?: string;
  description: string;
  descriptionFr?: string;
  bannerImage: string;
  themeId: string;
  active: boolean;
}

export interface ThemeConfig {
  id: string;
  name: string;
  nameFr?: string;
  description: string;
  primaryColor: string; // e.g. #2C2926
  accentColor: string;  // e.g. #B8860B or #966144
  backgroundColor: string; // e.g. #FAF9F6
  surfaceColor: string; // e.g. #FFFFFF
  fontDisplay: 'Cormorant Garamond' | 'Playfair Display' | 'Bodoni Moda' | 'Plus Jakarta Sans';
  heroBanner: string;
  announcementText: string;
  announcementTextFr?: string;
  showAnnouncement: boolean;
  heroBadge: string;
  heroBadgeFr?: string;
  heroTitle: string;
  heroTitleFr?: string;
  heroSubtitle: string;
  heroSubtitleFr?: string;
}

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: Size;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  paymentMethod: 'card' | 'apple_pay' | 'paypal' | 'bank_transfer' | 'cod';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  tier: 'Bespoke VIP' | 'Preferred' | 'New Client';
  registeredDate: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // vs USD
}
