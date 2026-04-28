import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { env } from '@/lib/env';
const stripe = new Stripe(env.stripeSecretKey);
export async function POST(req: Request) {
  const { customerId } = await req.json();
  const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: `${env.appUrl}/billing` });
  return NextResponse.json({ url: session.url });
}
