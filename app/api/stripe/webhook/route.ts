import Stripe from 'stripe';
import { headers } from 'next/headers';
import { env } from '@/lib/env';
import { getSupabaseAdmin } from '@/lib/supabase';
const stripe = new Stripe(env.stripeSecretKey);
export async function POST(req: Request) {
  const sig = headers().get('stripe-signature')!;
  const payload = await req.text();
  const event = stripe.webhooks.constructEvent(payload, sig, env.stripeWebhookSecret);
  if (event.type.startsWith('customer.subscription.')) {
    const sub = event.data.object as Stripe.Subscription;
    await getSupabaseAdmin().from('subscriptions').upsert({ stripe_customer_id: sub.customer, stripe_subscription_id: sub.id, status: sub.status, plan: sub.items.data[0]?.price.id ?? 'unknown' });
  }
  return new Response('ok');
}
