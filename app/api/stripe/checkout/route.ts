import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { env } from '@/lib/env';
const stripe = new Stripe(env.stripeSecretKey);
export async function POST(req: Request) {
  const { plan } = await req.json();
  const price = plan === 'pro' ? process.env.STRIPE_PRICE_PRO_MONTHLY : process.env.STRIPE_PRICE_STARTER_MONTHLY;
  const session = await stripe.checkout.sessions.create({ mode: 'subscription', line_items: [{ price, quantity: 1 }], success_url: `${env.appUrl}/billing?success=true`, cancel_url: `${env.appUrl}/billing?canceled=true` });
  return NextResponse.json({ url: session.url });
}
