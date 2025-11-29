'use client';

import { useContext } from 'react';
import Link from 'next/link';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CartContext } from '@/contexts/cart-context';
import { CartItem } from './cart-item';

export function CartSheet() {
  const { state } = useContext(CartContext);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>Cart ({state.items.length})</SheetTitle>
      </SheetHeader>
      <Separator />
      {state.items.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-6">
              {state.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="p-6">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SheetClose asChild>
                  <Button asChild variant="outline">
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}
