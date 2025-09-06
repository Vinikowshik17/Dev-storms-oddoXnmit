export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  joinedDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerUsername: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  userId: string;
  products: CartItem[];
  total: number;
  date: string;
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Furniture',
  'Toys & Games',
  'Automotive',
  'Other'
] as const;