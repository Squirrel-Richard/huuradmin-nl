'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowLeft, Building2, Zap, X } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 23,
    desc: '1–3 woningen',
    features: [
      '3 woningen',
      'Huurprijscheck onbeperkt',
      'Betalingstracking',
      'E-mail herinneringen',
      'Huurdersbeheer',
      'Dashboard',
    ],
    notIncluded: [
      'WhatsApp reminders',
      'Jaaroverzicht PDF',
      'API toegang',
    ],
    cta: 'Probeer 14 dagen gratis',
    href: '/api/checkout?plan=starter',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 69,
    yearlyPrice: 55,
    desc: 'Meest gekozen — alles inbegrepen',
    features: [
      '10 woningen',
      'Huurprijscheck onbeperkt',
      'Betalingstracking',
      'WhatsApp reminders',
      'Onderhoud log + foto upload',
      'Jaaroverzicht PDF',
      'API toegang',
      'Prioriteit support',
    ],
    notIncluded: [],
    cta: 'Start Pro — 14 dagen gratis',
    href: '/api/checkout?plan=pro',
    highlight: true,
  },
  {
    name: 'Bureau',
    monthlyPrice: 149,
    yearlyPrice: 119,
    desc: 'Professionele verhuurders',
    features: [
      'Onbeperkt woningen',
      'Alles uit Pro',
      'WhatsApp Business API',
      'Multi-gebruiker (5 seats)',
      'Eigen branding',
      'Uitgebreide API',
      'Priority support',
      'Accountmanager',
    ],
    notIncluded: [],
    cta: 'Neem contact op',
    href: 'mailto:info@huuradmin.nl',
    highlight: false,
  },
]

const faq = [
  { q: 'Kan ik op elk moment opzeggen?', a: 'Ja, maandelijks opzegbaar. Geen langlopende contracten of boeteclausules.' },
  { q: 'Hoe werkt de gratis proefperiode?', a: '14 dagen volledig gratis toegang tot het gekozen plan. Geen automatisch verlengen zonder bevestiging.' },
  { q: 'Welke betaalmethoden accepteren jullie?', a: 'iDEAL, creditcard en automatische incasso via Stripe. Altijd veilig.' },
  { q: 'Is de huurprijscheck altijd actueel?', a: 'Ja, we volgen de wetgeving rondom de Betaalbare Huurwet 2024 actief en updaten het puntenstelsel direct.' },
  { q: 'Kan ik van plan wisselen?', a: 'Ja, op elk moment upgraden of downgraden. Verschil wordt pro rata verrekend.' },
  { q: 'Is er korting voor meerdere gebruikers?', a: 'Bureau-plan inclusief 5 seats. Meer? Neem contact op voor maatwerk.' },
]

export default function PrijzenPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#030810' }}>
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              borderRadius: '50%',
              background: 'white',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(3,8,16,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'rgba(221,232,245,0.5)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#dde8f5' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(221,232,245,0.5)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(77,184,255,0.12)', border: '1px solid rgba(77,184,255,0.2)' }}
          >
            <Building2 className="w-3.5 h-3.5" style={{ color: '#4db8ff' }} />
          </div>
          <span className="font-bold text-white text-sm tracking-tight">HuurAdmin NL</span>
        </Link>
        <Link href="/dashboard" className="text-sm transition-colors" style={{ color: 'rgba(221,232,245,0.5)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#dde8f5' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(221,232,245,0.5)' }}
        >
          Dashboard
        </Link>
      </nav>

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="badge badge-blue mb-4 mx-auto">Prijzen</div>
          <h1
            className="font-black mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#dde8f5', letterSpacing: '-0.04em' }}
          >
            Transparante prijzen
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(221,232,245,0.45)' }}>
            Begin gratis. Upgrade wanneer u klaar bent. Altijd opzegbaar.
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center gap-3 p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <button
              onClick={() => setYearly(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={!yearly
                ? { background: 'rgba(77,184,255,0.15)', color: '#4db8ff', border: '1px solid rgba(77,184,255,0.25)' }
                : { color: 'rgba(221,232,245,0.45)' }
              }
            >
              Per maand
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              style={yearly
                ? { background: 'rgba(77,184,255,0.15)', color: '#4db8ff', border: '1px solid rgba(77,184,255,0.25)' }
                : { color: 'rgba(221,232,245,0.45)' }
              }
            >
              Jaarlijks
              <span
                className="text-xs px-1.5 py-0.5 rounded-md font-bold"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
              >
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="glass-card p-8 relative flex flex-col"
              style={plan.highlight ? {
                borderColor: 'rgba(77,184,255,0.3)',
                boxShadow: '0 0 60px rgba(77,184,255,0.1)',
              } : {}}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #4db8ff, #2d9de8)', color: '#030810' }}
                >
                  <Zap className="w-3 h-3" />
                  Meest gekozen
                </div>
              )}

              <div className="mb-6">
                <div
                  className="text-xs font-bold mb-3 tracking-widest uppercase"
                  style={{ color: '#4db8ff' }}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-5xl font-black"
                    style={{ color: '#dde8f5', letterSpacing: '-0.04em' }}
                  >
                    €{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(221,232,245,0.4)' }}>/maand</span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(221,232,245,0.35)' }}>
                  {yearly ? 'Jaarlijks gefactureerd' : plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(221,232,245,0.7)' }}>
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#22c55e' }} />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(221,232,245,0.2)' }}>
                    <X className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(221,232,245,0.2)' }} />
                    <span className="line-through">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className="block text-center py-3 rounded-xl text-sm font-bold transition-all"
                style={plan.highlight
                  ? { background: 'linear-gradient(135deg, #4db8ff, #2d9de8)', color: '#030810' }
                  : { background: 'rgba(255,255,255,0.06)', color: '#dde8f5', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm mb-16"
          style={{ color: 'rgba(221,232,245,0.3)' }}
        >
          Alle plannen inclusief 14 dagen gratis trial · iDEAL, creditcard & incasso · Geen verborgen kosten
        </motion.p>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10"
        >
          <h2
            className="text-2xl font-black text-center mb-8"
            style={{ color: '#dde8f5', letterSpacing: '-0.03em' }}
          >
            Veelgestelde vragen
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faq.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <p className="text-sm font-semibold" style={{ color: '#dde8f5' }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(221,232,245,0.5)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
