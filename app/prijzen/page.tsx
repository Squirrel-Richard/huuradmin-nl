'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WebGLBackground from '@/components/WebGLBackground'
import { Check, ArrowLeft, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Gratis',
    price: '€0',
    period: '',
    desc: 'Start direct, geen creditcard',
    color: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.1)',
    features: [
      '1 woning',
      'Huurprijscheck onbeperkt',
      'Basisbeheer',
      'Lege states overzicht',
    ],
    notIncluded: [
      'Betalingstracking',
      'WhatsApp reminders',
      'Onderhoud log',
      'Jaaroverzicht PDF',
    ],
    cta: 'Gratis starten',
    href: '/onboarding',
    highlight: false,
    stripePriceId: null,
  },
  {
    name: 'Basis',
    price: '€14',
    period: '/maand',
    desc: 'Voor verhuurders met 2-3 woningen',
    color: 'rgba(99,102,241,0.05)',
    border: 'rgba(99,102,241,0.15)',
    features: [
      '3 woningen',
      'Huurprijscheck onbeperkt',
      'Betalingstracking',
      'E-mail herinneringen',
      'Huurdersbeheer',
    ],
    notIncluded: [
      'WhatsApp reminders',
      'Onderhoud log',
      'Jaaroverzicht PDF',
    ],
    cta: 'Probeer 14 dagen gratis',
    href: '/api/checkout?plan=basis',
    highlight: false,
    stripePriceId: 'price_basis',
  },
  {
    name: 'Pro',
    price: '€29',
    period: '/maand',
    desc: 'Meest gekozen — alles inbegrepen',
    color: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.35)',
    features: [
      '10 woningen',
      'Huurprijscheck onbeperkt',
      'Betalingstracking',
      'WhatsApp reminders',
      'Onderhoud log + foto upload',
      'Jaaroverzicht PDF',
      'Huurdersbeheer',
    ],
    notIncluded: [],
    cta: 'Start Pro — 14 dagen gratis',
    href: '/api/checkout?plan=pro',
    highlight: true,
    stripePriceId: 'price_pro',
  },
  {
    name: 'Verhuurder',
    price: '€59',
    period: '/maand',
    desc: 'Voor professionele verhuurders',
    color: 'rgba(34,211,238,0.05)',
    border: 'rgba(34,211,238,0.15)',
    features: [
      'Onbeperkt woningen',
      'Alles uit Pro',
      'WhatsApp Business API',
      'API toegang',
      'Priority support',
      'Accountmanager',
    ],
    notIncluded: [],
    cta: 'Neem contact op',
    href: 'mailto:info@huuradmin.nl',
    highlight: false,
    stripePriceId: 'price_verhuurder',
  },
]

export default function PrijzenPagina() {
  return (
    <div className="min-h-screen" style={{ background: '#06060f' }}>
      <WebGLBackground />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(6,6,15,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}>H</div>
          <span className="font-semibold text-white">HuurAdmin NL</span>
        </Link>
        <Link href="/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">
          Dashboard
        </Link>
      </nav>

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eenvoudige, transparante prijzen
          </h1>
          <p className="text-white/50 text-lg">
            Begin gratis. Upgrade wanneer u klaar bent. Altijd opzegbaar.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 relative flex flex-col"
              style={{
                background: plan.color,
                borderColor: plan.border,
                boxShadow: plan.highlight ? '0 0 40px rgba(99,102,241,0.12)' : undefined,
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  <Zap className="w-3 h-3" />
                  Meest gekozen
                </div>
              )}

              <div className="mb-6">
                <p className="text-white/50 text-sm mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/40 text-xs">{plan.desc}</p>
              </div>

              <div className="flex-1 space-y-2 mb-6">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
                {plan.notIncluded.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2 text-sm text-white/25 line-through">
                    <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white/20">—</span>
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlight ? 'btn-primary' : ''
                }`}
                style={!plan.highlight ? {
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                } : {}}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-center">Veelgestelde vragen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'Kan ik op elk moment opzeggen?',
                a: 'Ja, u kunt maandelijks opzeggen. Er zijn geen langlopende contracten.',
              },
              {
                q: 'Hoe werkt de gratis proefperiode?',
                a: '14 dagen volledig gratis. Daarna automatisch afboekend — of stoppen.',
              },
              {
                q: 'Welke betaalmethoden accepteren jullie?',
                a: 'iDEAL, creditcard en automatische incasso via Stripe.',
              },
              {
                q: 'Is de huurprijscheck altijd up-to-date?',
                a: 'Ja, we volgen actief de wetgeving rondom de Betaalbare Huurwet 2024 en updaten direct.',
              },
            ].map((faq, i) => (
              <div key={i} className="space-y-1">
                <p className="text-white font-medium text-sm">{faq.q}</p>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
