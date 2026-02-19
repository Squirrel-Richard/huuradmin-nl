import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export const STRIPE_PLANS = {
  basis: {
    name: 'Basis',
    price: 1400, // €14.00 in cents
    priceId: process.env.STRIPE_PRICE_BASIS || 'price_basis_test',
    max_properties: 3,
    features: ['3 woningen', 'Betalingstracking', 'Herinnering per e-mail'],
  },
  pro: {
    name: 'Pro',
    price: 2900, // €29.00 in cents
    priceId: process.env.STRIPE_PRICE_PRO || 'price_pro_test',
    max_properties: 10,
    features: ['10 woningen', 'Onderhoud log', 'Jaaroverzicht PDF', 'WhatsApp reminders'],
  },
  verhuurder: {
    name: 'Verhuurder',
    price: 5900, // €59.00 in cents
    priceId: process.env.STRIPE_PRICE_VERHUURDER || 'price_verhuurder_test',
    max_properties: 999,
    features: ['Onbeperkt woningen', 'WhatsApp API reminders', 'API toegang', 'Priority support'],
  },
}
