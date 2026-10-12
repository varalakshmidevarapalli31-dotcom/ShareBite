export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isPopular: boolean;
  rating: number;
  restaurantId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  location: string;
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  placedAt: number;
  restaurantName: string;
  deliveryAddress: string;
}

export type OrderStatus =
  | 'Placed'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered';

export const ORDER_STATUSES: OrderStatus[] = [
  'Placed',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
];

export interface GroupParticipant {
  id: string;
  name: string;
  items: CartItem[];
}

export interface GroupOrder {
  code: string;
  restaurantId: string;
  restaurantName: string;
  participants: GroupParticipant[];
  createdAt: number;
}

export type PageKey =
  | 'home'
  | 'restaurant'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'group'
  | 'orders'
  | 'track'
  | 'login'
  | 'register';
