
import { type User as FirebaseUser } from 'firebase/auth';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  stock: number;
  woodType?: string;
  imageId: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  location?: string;
  date?: string;
 
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  location: string;
}

export interface User {
  id: string;
  uid: string;
  displayName: string | null;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  id: string;
  name: string;
  price: number;
  imageId: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
}



 
  
  export type Order = {
      id: string;
      userId: string;
      orderDate: string;
      totalAmount: number;
      status: string;
      productIds: string[];
  }
  
  

  
  export type Wood = {
      id: string;
      name: string;
      imageUrl: string;
      description: string;
      properties: string[];
  }
  