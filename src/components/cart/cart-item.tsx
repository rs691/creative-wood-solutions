'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartContext } from '@/contexts/cart-context';
import type { CartItem as CartItemType } from '@/types';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useContext(CartContext);

  const handleQuantityChange = (newQuantity: number) => {
    const quantity = Math.max(0, newQuantity);
    if (isNaN(quantity)) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId: item.product.id, quantity },
    });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.product.id });
  };
  
  return (
    <div className="flex items-start gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.product.imageUrl}
          // alt={item.product.name}
          alt="product card image"
          fill
          className="object-cover"
          data-ai-hint={item.product.imageHint}
        />
      </div>
      <div className="flex-1">
        <Link href={`/products/${item.product.id}`} className="font-semibold hover:underline">
          {item.product.name}
        </Link>
        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="h-8 w-14 text-center mx-2"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="mt-2 h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
