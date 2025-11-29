import { Product } from '@/types/index';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Remove the global Stripe initialization.

export async function POST(req: NextRequest) {
  // 💡 SOLUTION: Initialize Stripe INSIDE the handler function.
  // This guarantees it is executed at RUNTIME, where the environment 
  // variable has been loaded by the hosting platform.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    // Check if the key is missing/undefined right here, before proceeding
    // to provide a better runtime error if deployment config is wrong.
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing from environment variables.");
      return NextResponse.json(
        { error: 'Server configuration error: Missing secret key.' },
        { status: 500 }
      );
    }

    const { items } = (await req.json()) as { items: { product: Product; quantity: number }[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: [item.product.imageUrl],
          description: item.product.description,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/orders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}