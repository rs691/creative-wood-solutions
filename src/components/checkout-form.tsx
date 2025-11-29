'use client';

import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { CartContext } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  cardNumber: z.string().regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/, 'Invalid card number'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvc: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVC'),
});

interface CheckoutFormProps {
    total: number;
}

export function CheckoutForm({ total }: CheckoutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { dispatch } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', cardNumber: '', expiry: '', cvc: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simulate API call to /api/checkout_sessions
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        const response = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: total }),
        });

        if (!response.ok) {
            throw new Error('Payment processing failed');
        }

        // Simulate successful payment
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        dispatch({ type: 'CLEAR_CART' });
        
        toast({
            title: 'Payment Successful!',
            description: 'Your order has been placed.',
        });

        router.push('/');
        router.refresh();

    } catch (error) {
        console.error(error);
        toast({
            title: 'Payment Failed',
            description: 'There was an issue processing your payment. Please try again.',
            variant: 'destructive',
        });
        setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Payment Details</CardTitle>
        <CardDescription>This is a simulated checkout. No real payment will be processed.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name on Card</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="cardNumber" render={({ field }) => (
                <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="expiry" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Expiry (MM/YY)</FormLabel>
                        <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl><Input placeholder="•••" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Pay ${total.toFixed(2)}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
