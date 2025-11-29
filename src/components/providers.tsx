'use client';

import { ReactNode } from 'react';
import { FirebaseClientProvider } from '@/firebase';
import { CartProvider } from '@/contexts/cart-context';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </FirebaseClientProvider>
  );
}
