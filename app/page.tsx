'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WebGLBackground from '@/components/WebGLBackground'
import {
  Shield,
  Calculator,
  Euro,
  Wrench,
  FileText,
  Bell,
  Check,
  ChevronRight,
  Star,
  Building2,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'

const features = [
  {
    icon: Calculator,
    title: 'Huurprijscheck',
    desc: 'Bereken de maximale huurprijs conform het nieuwe puntenstelsel. Betaalbare Huurwet 2024 compliant.',
    color: '#6366f1',
  },
  {
    icon: Euro,
    title: 'Betalingstracking',
    desc: 'Maandelijks overzicht van alle huurbetalingen. Automatische WhatsApp herinneringen bij achterstand.',
    color: '#10b981',
  },
  {
    icon: Wrench,
    title: 'Onderhoud log',
    desc: 'Bijhouden van onderhoudsmeldingen per woning. Van melding tot oplossing, met foto upload.',
    color: '#f59e0b',
  },
  {
    icon: FileText,
    title: 'Jaaroverzicht PDF',
    desc: 'Automatisch jaaroverzicht voor uw belastingaangifte. Inkomsten, kosten en WOZ-waarden per woning.',
    color: '#22d3ee',
  },
  {
    icon: Bell,
    title: 'WhatsApp reminders',
    desc: 'Automatische herinneringen via WhatsApp bij te late huurbetalingen. Direct contact met huurders.',
    color: '#8b5cf6',
  },
  {
    icon: Shield,
    title: 'Compliant 2024',
    desc: 'Volledig compliant met de Betaalbare Huurwet van juli 2024. Puntenstelsel altijd up-to-date.',
    color: '#ef4444',
  },
]

const prijzen = [
  {
    name: 'Gratis',
    price: '€0',
    period: '/maand',
    desc: 'Voor verhuurders met 1 woning',
    features: [
      '1 woning',
      'Huurprijscheck onbeperkt',
      'Basisbeheer',
    ],
    cta: 'Start gratis',
    href: '/onboarding',
    highlight: false,
  },
  {
    name: 'Basis',
    price: '€14',
    period: '/maand',
    desc: 'Voor kleine verhuurders',
    features: [
      '3 woningen',
      'Betalingstracking',
      'E-mail herinneringen',
      'Huurdersbeheer',
    ],
    cta: 'Probeer 14 dagen gratis',
    href: '/prijzen',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '€29',
    period: '/maand',
    desc: 'Meest gekozen',
    features: [
      '10 woningen',
      'Onderhoud log',
      'Jaaroverzicht PDF',
      'WhatsApp reminders',
      'Prioriteit support',
    ],
    cta: 'Start Pro',
    href: '/prijzen',
    highlight: true,
  },
  {
    name: 'Verhuurder',
    price: '€59',
    period: '/maand',
    desc: 'Voor professionele verhuurders',
    features: [
      'Onbeperkt woningen',
      'WhatsApp API reminders',
      'API toegang',
      'Priority support',
      'Jaaroverzicht PDF',
    ],
    cta: 'Neem contact op',
    href: '/prijzen',
    highlight: false,
  },
]

const stats = [
  { value: '300K+', label: 'NL verhuurders geraakt door nieuwe wet' },
  { value: '€879', label: 'Max huurprijs gereguleerde sector' },
  { value: 'Juli 2024', label: 'Betaalbare Huurwet ingegaan' },
  { value: '100%', label: 'Compliant met puntenstelsel 2024' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#06060f' }}>
      <WebGLBackground />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(6,6,15,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}>
            H
          </div>
          <span className="font-semibold text-white">HuurAdmin NL</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/huurprijscheck" className="text-white/60 hover:text-white text-sm transition-colors">
            Huurprijscheck
          </Link>
          <Link href="/prijzen" className="text-white/60 hover:text-white text-sm transition-colors">
            Prijzen
          </Link>
          <Link href="/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">
            Login
          </Link>
          <Link
            href="/onboarding"
            className="btn-primary text-sm px-4 py-2 rounded-xl"
          >
            Gratis starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center"
        >
          {/* Alert badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
            }}
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Betaalbare Huurwet van kracht — bent u compliant?</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Verhuur beheren{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              zonder zorgen
            </span>
          </h1>

          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            De enige verhuurbeheertool volledig compliant met de{' '}
            <strong className="text-white/80">Betaalbare Huurwet 2024</strong>.
            Huurprijscheck, betalingstracking en onderhoud log voor Nederlandse particuliere verhuurders.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/onboarding"
              className="btn-primary text-base px-8 py-4 rounded-xl inline-flex items-center gap-2"
            >
              Gratis starten
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/huurprijscheck"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-white transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <Calculator className="w-5 h-5" />
              Gratis huurprijscheck
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Wet alert section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
            style={{ borderColor: 'rgba(239,68,68,0.2)' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.15)' }}>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  De Betaalbare Huurwet 2024 — wat betekent dit voor u?
                </h2>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Vanaf juli 2024 geldt het nieuwe puntenstelsel voor alle huurwoningen. 
                  Woningen met minder dan 143 punten vallen in de gereguleerde sector met 
                  een maximum huurprijs. Zit u hierboven? Dan bent u vrije sector verhuurder.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    '0-143 punten: gereguleerde sector — max ca. €879/maand',
                    '144+ punten: vrije sector — geen wettelijk maximum',
                    'Punten bepaald door m², WOZ-waarde, energielabel en voorzieningen',
                    'Verhuurders die te veel vragen riskeren boetes tot €90.000',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/huurprijscheck"
                  className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
                >
                  <Calculator className="w-4 h-4" />
                  Controleer uw huurprijs gratis
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Alles wat u nodig heeft
            </h2>
            <p className="text-white/50 text-lg">
              Van huurprijscheck tot jaaroverzicht — in één platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6" id="prijzen">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Eenvoudige, transparante prijzen
            </h2>
            <p className="text-white/50 text-lg">
              Begin gratis. Upgrade wanneer uw portfolio groeit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prijzen.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 relative"
                style={plan.highlight ? {
                  borderColor: 'rgba(99,102,241,0.4)',
                  boxShadow: '0 0 40px rgba(99,102,241,0.15)',
                } : {}}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  >
                    Meest gekozen
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-white/50 text-sm mb-1">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">{plan.desc}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                    plan.highlight
                      ? 'btn-primary'
                      : 'text-white'
                  }`}
                  style={!plan.highlight ? {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  } : {}}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Klaar om compliant te verhuren?
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Start gratis. Geen creditcard nodig. Binnen 2 minuten uw eerste woning beheren.
            </p>
            <Link
              href="/onboarding"
              className="btn-primary text-base px-10 py-4 rounded-xl inline-flex items-center gap-2"
            >
              Gratis starten
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}>H</div>
            <span className="text-white/40 text-sm">HuurAdmin NL — AIOW BV</span>
          </div>
          <div className="flex gap-6 text-sm text-white/30">
            <Link href="/huurprijscheck" className="hover:text-white/60 transition-colors">Huurprijscheck</Link>
            <Link href="/prijzen" className="hover:text-white/60 transition-colors">Prijzen</Link>
            <Link href="/dashboard" className="hover:text-white/60 transition-colors">Login</Link>
          </div>
          <p className="text-white/20 text-xs">
            © 2024 AIOW BV. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  )
}
