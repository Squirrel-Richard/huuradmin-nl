import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PLAN_LIMITS: Record<string, number> = {
  basis: 3,
  pro: 10,
  verhuurder: 999,
  gratis: 1,
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Webhook fout' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as { metadata?: Record<string, string>; customer_email?: string; subscription?: string }
      const plan = session.metadata?.plan || 'gratis'
      const email = session.customer_email

      if (email) {
        // Find landlord by email and update subscription
        const { data: landlord } = await supabase
          .from('landlords')
          .select('id')
          .eq('email', email)
          .single()

        if (landlord) {
          await supabase.from('subscriptions').upsert({
            landlord_id: landlord.id,
            plan,
            stripe_subscription_id: session.subscription as string,
            max_properties: PLAN_LIMITS[plan] || 1,
            geldig_tot: null, // subscription based, no end date
          })
        }
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as { id: string }
      // Downgrade to gratis
      await supabase
        .from('subscriptions')
        .update({ plan: 'gratis', max_properties: 1, stripe_subscription_id: null })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as { id: string; metadata?: Record<string, string>; status: string }
      const plan = subscription.metadata?.plan || 'gratis'
      if (subscription.status === 'active') {
        await supabase
          .from('subscriptions')
          .update({ plan, max_properties: PLAN_LIMITS[plan] || 1 })
          .eq('stripe_subscription_id', subscription.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
