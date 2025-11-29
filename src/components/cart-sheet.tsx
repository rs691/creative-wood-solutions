"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SheetClose, SheetFooter } from "./ui/sheet";

export default function CartSheetContent() {
  const { state, dispatch, handleCheckout } = useCart();
  const { items } = state;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId: id, quantity } });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }

  return (
    <div className="flex h-full flex-col">
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <h3 className="text-lg font-medium">Your cart is empty</h3>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </SheetClose>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col gap-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start gap-4">
                  {item.product.imageUrl && (
                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                      <Image
                        src={item.product.imageUrl}
                        // alt={item.product.name}
                        alt="product card image"
                        fill
                        className="object-cover"
                        data-ai-hint={item.product.imageHint}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                       <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                       </Button>
                       <span className="w-6 text-center">{item.quantity}</span>
                       <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                       </Button>
                    </div>
                  </div>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto flex-col space-y-4 pt-4">
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-2">
                <SheetClose asChild>
                    <Button onClick={handleCheckout} className="w-full">
                        Proceed to Checkout
                    </Button>
                </SheetClose>
                 <SheetClose asChild>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/cart">View Cart</Link>
                    </Button>
                </SheetClose>
            </div>
          </SheetFooter>
        </>
      )}
    </div>
  );
}
