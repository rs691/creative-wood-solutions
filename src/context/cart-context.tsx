'use client';

import { useToast } from "@/hooks/use-toast";
import type { CartItem, Product } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';


type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_STATE'; payload: CartState };

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, {
          product: action.payload, quantity: 1,
          id: '',
          name: '',
          price: 0,
          imageId: ''
        }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.payload.productId)
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'SET_STATE':
        return action.payload;
    default:
      return state;
  }
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
  handleCheckout: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  handleCheckout: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
        if(state !== initialState) {
            localStorage.setItem('cart', JSON.stringify(state));
        }
    } catch (error) {
        console.error('Failed to save cart to localStorage', error);
    }
  }, [state]);

  const handleCheckout = async () => {
    if (state.items.length === 0) {
        toast({ title: 'Your cart is empty', variant: 'destructive' });
        return;
    }
    toast({ title: 'Redirecting to checkout...' });
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: state.items }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast({ title: 'Checkout Error', description: error.message, variant: 'destructive' });
      }
    } catch (error) {
      const err = error as Error;
      toast({ title: 'Checkout Error', description: err.message, variant: 'destructive' });
    }
  };


  return (
    <CartContext.Provider value={{ state, dispatch, handleCheckout }}>
      {children}
    </CartContext.Provider>
  );
};
