import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PLANS } from '@/lib/stripe'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const plan = searchParams.get('plan') as keyof typeof STRIPE_PLANS

  if (!plan || !STRIPE_PLANS[plan]) {
    return NextResponse.json(
      { error: 'Ongeldig plan. Kies: basis, pro of verhuurder' },
      { status: 400 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['ideal', 'card'],
      line_items: [
        {
          price: STRIPE_PLANS[plan].priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/prijzen?canceled=1`,
      locale: 'nl',
      metadata: { plan },
      subscription_data: {
        trial_period_days: 14,
        metadata: { plan },
      },
      payment_method_collection: 'if_required',
    })

    return NextResponse.redirect(session.url!, 303)
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Checkout aanmaken mislukt' },
      { status: 500 }
    )
  }
}
