'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Calculator,
  Euro,
  Wrench,
  FileText,
  Bell,
  Check,
  ChevronRight,
  Building2,
  TrendingUp,
  AlertTriangle,
  Home,
  Zap,
  BarChart3,
  ArrowRight,
} from 'lucide-react'

// ─── Stars background (lightweight, no WebGL) ───
function StarsBackground() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.6 + 0.2,
  }))

  return (
    <div className="stars-bg">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ─── Scramble text hook ───
function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

  useEffect(() => {
    if (!trigger) return
    let iteration = 0
    const max = text.length * 3
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration / 3) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      iteration++
      if (iteration > max) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [trigger, text])

  return display
}

// ─── CountUp hook ───
function useCountUp(end: string, duration = 1800, trigger: boolean) {
  const [value, setValue] = useState('0')

  useEffect(() => {
    if (!trigger) return
    const numeric = parseInt(end.replace(/\D/g, ''))
    if (isNaN(numeric)) { setValue(end); return }
    const suffix = end.replace(/[\d,]/g, '')
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric)
      setValue(current.toLocaleString('nl') + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, end, duration])

  return value
}

// ─── Stat card with CountUp ───
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1600, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="glass-card p-6 text-center"
    >
      <div
        className="text-3xl font-black mb-1 tabular-nums"
        style={{ color: '#4db8ff', letterSpacing: '-0.03em' }}
      >
        {visible ? count : '—'}
      </div>
      <div className="text-sm" style={{ color: 'rgba(221,232,245,0.45)' }}>{label}</div>
    </motion.div>
  )
}

// ─── Dashboard preview card ───
function DashboardCard() {
  const properties = [
    { address: 'Keizersgracht 42', city: 'Amsterdam', rent: 1.240, punten: 187, status: 'vrij', paid: true },
    { address: 'Binnenwegplein 8', city: 'Rotterdam', rent: 695, punten: 118, status: 'gereguleerd', paid: true },
    { address: 'Markt 16', city: 'Den Haag', rent: 890, punten: 134, status: 'gereguleerd', paid: false },
  ]

  return (
    <div
      className="rounded-2xl overflow-hidden border animate-float"
      style={{
        background: 'rgba(255,255,255,0.025)',
        borderColor: 'rgba(77,184,255,0.12)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,184,255,0.06)',
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444', opacity: 0.8 }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b', opacity: 0.8 }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e', opacity: 0.8 }} />
        <span className="ml-3 text-xs" style={{ color: 'rgba(221,232,245,0.3)' }}>huuradmin.nl/dashboard</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px border-b" style={{ borderColor: 'rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.04)' }}>
        {[
          { label: 'Maandopbrengst', value: '€2.825', color: '#4db8ff' },
          { label: 'Compliance', value: '100%', color: '#22c55e' },
          { label: 'Openstaand', value: '€695', color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} className="p-3 text-center" style={{ background: 'rgba(3,8,16,0.6)' }}>
            <div className="text-lg font-bold" style={{ color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div className="text-[10px] mt-0.5" style={{ color: 'rgba(221,232,245,0.35)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Property rows */}
      <div>
        {properties.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: i < properties.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(77,184,255,0.1)' }}
            >
              <Home className="w-4 h-4" style={{ color: '#4db8ff' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: '#dde8f5' }}>{p.address}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px]" style={{ color: 'rgba(221,232,245,0.4)' }}>{p.city}</span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={p.status === 'vrij'
                    ? { background: 'rgba(77,184,255,0.12)', color: '#4db8ff' }
                    : { background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }
                  }
                >
                  {p.status} · {p.punten}pt
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs font-bold" style={{ color: '#dde8f5' }}>€{p.rent.toLocaleString('nl')}</div>
              <div
                className="text-[10px] mt-0.5 font-medium"
                style={{ color: p.paid ? '#22c55e' : '#ef4444' }}
              >
                {p.paid ? '✓ betaald' : '⚠ te laat'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ background: 'rgba(77,184,255,0.04)', borderTop: '1px solid rgba(77,184,255,0.08)' }}
      >
        <span className="text-[10px]" style={{ color: 'rgba(221,232,245,0.3)' }}>Betaalbare Huurwet 2024 compliant</span>
        <span className="text-[10px] font-semibold" style={{ color: '#4db8ff' }}>✓ Alle punten up-to-date</span>
      </div>
    </div>
  )
}

// ─── Data ───
const features = [
  {
    icon: Calculator,
    title: 'Huurprijscheck',
    desc: 'Bereken de maximale huurprijs via het actuele puntenstelsel. Betaalbare Huurwet 2024 compliant. Altijd up-to-date.',
    accent: '#4db8ff',
  },
  {
    icon: Euro,
    title: 'Betalingstracking',
    desc: 'Maandelijks overzicht van alle huurbetalingen. Automatische WhatsApp herinneringen bij achterstand.',
    accent: '#22c55e',
  },
  {
    icon: Wrench,
    title: 'Onderhoud log',
    desc: 'Bijhouden van onderhoudsmeldingen per woning. Van melding tot oplossing, inclusief foto upload.',
    accent: '#f59e0b',
  },
  {
    icon: FileText,
    title: 'Jaaroverzicht PDF',
    desc: 'Automatisch jaaroverzicht voor belastingaangifte. Inkomsten, kosten en WOZ-waarden per woning.',
    accent: '#a78bfa',
  },
  {
    icon: Bell,
    title: 'WhatsApp reminders',
    desc: 'Automatische herinneringen bij te late betalingen. Direct contact via WhatsApp zonder handmatig werk.',
    accent: '#4db8ff',
  },
  {
    icon: Shield,
    title: 'Betaalbare Huurwet',
    desc: 'Volledig compliant met de wet van juli 2024. Puntenstelsel altijd actueel. Vermijd boetes tot €90.000.',
    accent: '#22c55e',
  },
]

const pricing = [
  {
    name: 'Starter',
    price: 29,
    period: 'maand',
    desc: '1–3 woningen',
    features: ['3 woningen', 'Huurprijscheck', 'Betalingstracking', 'E-mail herinneringen', 'Dashboard'],
    cta: 'Probeer 14 dagen gratis',
    href: '/onboarding',
    highlight: false,
    yearlyPrice: 23,
  },
  {
    name: 'Pro',
    price: 69,
    period: 'maand',
    desc: 'Meest gekozen',
    features: ['10 woningen', 'WhatsApp reminders', 'Onderhoud log', 'Jaaroverzicht PDF', 'Prioriteit support', 'API toegang'],
    cta: 'Start Pro',
    href: '/onboarding',
    highlight: true,
    yearlyPrice: 55,
  },
  {
    name: 'Bureau',
    price: 149,
    period: 'maand',
    desc: 'Professionele verhuurders',
    features: ['Onbeperkt woningen', 'WhatsApp API direct', 'Multi-gebruiker', 'Eigen branding', 'Priority support', 'Uitgebreide API'],
    cta: 'Neem contact op',
    href: '/onboarding',
    highlight: false,
    yearlyPrice: 119,
  },
]

const stats = [
  { value: '300000', label: 'NL verhuurders geraakt door nieuwe wet', suffix: '+' },
  { value: '879', label: 'Max huurprijs gereguleerde sector', prefix: '€' },
  { value: '90000', label: 'Max boete bij niet-compliant verhuren', prefix: '€' },
  { value: '143', label: 'Puntengrens gereguleerd vs. vrij', suffix: 'pt' },
]

const testimonials = [
  {
    quote: 'Eindelijk weet ik zeker dat mijn huurprijs klopt. De huurprijscheck nam me 5 minuten. Eerder had ik urenlang zitten rekenen.',
    name: 'Henk de Vries',
    role: 'Verhuurder 4 woningen, Utrecht',
    initials: 'HV',
  },
  {
    quote: 'Als makelaar adviseer ik nu al mijn klanten HuurAdmin NL. Wij beheren 60+ objecten — de WhatsApp reminders alleen al zijn het waard.',
    name: 'Sandra Bakker',
    role: 'Makelaar & verhuurder, Amsterdam',
    initials: 'SB',
  },
  {
    quote: 'Mijn accountant was blij met het PDF jaaroverzicht. Alles netjes op één plek, inclusief WOZ-waarden.',
    name: 'Mark van den Berg',
    role: 'Particulier verhuurder 8 woningen, Rotterdam',
    initials: 'MB',
  },
]

// ─── Main page ───
export default function LandingPage() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false)
  const [yearlyToggle, setYearlyToggle] = useState(false)
  const heroTitle = useScramble('Verhuur beheren', scrambleTrigger)

  useEffect(() => {
    const t = setTimeout(() => setScrambleTrigger(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen relative" style={{ background: '#030810' }}>
      <StarsBackground />

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(3,8,16,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(77,184,255,0.15)', border: '1px solid rgba(77,184,255,0.2)' }}
          >
            <Building2 className="w-4 h-4" style={{ color: '#4db8ff' }} />
          </div>
          <span className="font-bold text-white tracking-tight">HuurAdmin NL</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/huurprijscheck" className="text-sm transition-colors" style={{ color: 'rgba(221,232,245,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#dde8f5')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(221,232,245,0.55)')}
          >
            Huurprijscheck
          </Link>
          <Link href="/prijzen" className="text-sm transition-colors" style={{ color: 'rgba(221,232,245,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#dde8f5')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(221,232,245,0.55)')}
          >
            Prijzen
          </Link>
          <Link href="/dashboard" className="text-sm transition-colors" style={{ color: 'rgba(221,232,245,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#dde8f5')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(221,232,245,0.55)')}
          >
            Inloggen
          </Link>
          <Link href="/onboarding" className="btn-primary text-sm px-4 py-2">
            Gratis starten
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile CTA */}
        <Link href="/onboarding" className="md:hidden btn-primary text-sm px-3 py-2">
          Starten
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-32 px-6 overflow-hidden">
        {/* Planet arc */}
        <div className="planet-arc" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Alert badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#ef4444',
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Betaalbare Huurwet 2024 — bent u compliant?
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-black leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              letterSpacing: '-0.04em',
              color: '#dde8f5',
            }}
          >
            {heroTitle}{' '}
            <span style={{ color: '#4db8ff' }}>
              zonder zorgen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(221,232,245,0.55)' }}
          >
            De enige Nederlandse verhuurbeheertool volledig compliant met de{' '}
            <strong style={{ color: 'rgba(221,232,245,0.85)' }}>Betaalbare Huurwet 2024</strong>.
            Huurprijscheck, betalingstracking en onderhoud log — voor particuliere verhuurders.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/onboarding" className="btn-primary px-8 py-4 text-base rounded-xl">
              Gratis starten — 14 dagen
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/huurprijscheck"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#dde8f5',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(77,184,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(77,184,255,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <Calculator className="w-5 h-5" style={{ color: '#4db8ff' }} />
              Gratis huurprijscheck
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-5 text-xs"
            style={{ color: 'rgba(221,232,245,0.3)' }}
          >
            Geen creditcard nodig · Binnen 2 minuten actief · iDEAL betaling
          </motion.p>
        </div>

        {/* Dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-2xl mx-auto mt-16 relative z-10"
        >
          <DashboardCard />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              value={(s.prefix || '') + s.value + (s.suffix || '')}
              label={s.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* ── Wet alert ── */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12"
            style={{ borderColor: 'rgba(239,68,68,0.15)' }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <AlertTriangle className="w-7 h-7" style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#dde8f5', letterSpacing: '-0.03em' }}>
                  De Betaalbare Huurwet 2024 — wat betekent dit voor u?
                </h2>
                <p className="mb-5 leading-relaxed" style={{ color: 'rgba(221,232,245,0.55)' }}>
                  Vanaf juli 2024 geldt het nieuwe puntenstelsel voor <strong style={{ color: '#dde8f5' }}>alle</strong> huurwoningen.
                  Woningen met minder dan 143 punten vallen in de gereguleerde sector met een wettelijk huurmaximum.
                  Verhuurders die te veel vragen riskeren boetes tot <strong style={{ color: '#ef4444' }}>€90.000</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { label: '0–143 punten: gereguleerd', sub: 'Maximum ca. €879/maand', color: '#f59e0b' },
                    { label: '144+ punten: vrije sector', sub: 'Geen wettelijk maximum', color: '#4db8ff' },
                    { label: 'Punten = m² + WOZ + energielabel', sub: 'Plus voorzieningen', color: '#4db8ff' },
                    { label: 'Boetes tot €90.000', sub: 'Bij niet-compliant verhuren', color: '#ef4444' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#dde8f5' }}>{item.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'rgba(221,232,245,0.4)' }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/huurprijscheck" className="btn-primary text-sm px-6 py-3">
                  <Calculator className="w-4 h-4" />
                  Controleer uw huurprijs — gratis
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="badge badge-blue mb-4 mx-auto">Platform functies</div>
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: '#dde8f5', letterSpacing: '-0.04em' }}
            >
              Alles wat u nodig heeft
            </h2>
            <p className="text-lg" style={{ color: 'rgba(221,232,245,0.45)' }}>
              Van huurprijscheck tot jaaroverzicht — alles in één platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass-card p-7"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${f.accent}15`, border: `1px solid ${f.accent}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: f.accent }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#dde8f5', letterSpacing: '-0.02em' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(221,232,245,0.45)' }}>{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="badge badge-blue mb-4 mx-auto">Hoe het werkt</div>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#dde8f5', letterSpacing: '-0.04em' }}>
              In 3 stappen compliant
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Account aanmaken', desc: 'Gratis starten in 2 minuten. Geen creditcard nodig voor de trial.' },
              { step: '02', title: 'Woning toevoegen', desc: 'Vul de gegevens in. We berekenen direct uw puntenscore en maximale huurprijs.' },
              { step: '03', title: 'Beheer automatiseren', desc: 'Betalingen bijhouden, WhatsApp reminders instellen, PDF jaaroverzicht genereren.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-7 relative"
              >
                <div
                  className="text-5xl font-black mb-4"
                  style={{ color: 'rgba(77,184,255,0.15)', letterSpacing: '-0.04em', lineHeight: 1 }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#dde8f5', letterSpacing: '-0.02em' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(221,232,245,0.45)' }}>{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5" style={{ color: 'rgba(77,184,255,0.3)' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="badge badge-blue mb-4 mx-auto">Verhuurders aan het woord</div>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#dde8f5', letterSpacing: '-0.04em' }}>
              Vertrouwd door Nederlandse verhuurders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-7"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, si) => (
                    <div key={si} className="w-4 h-4 mr-0.5" style={{ color: '#f59e0b', fontSize: '14px' }}>★</div>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(221,232,245,0.6)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: 'rgba(77,184,255,0.12)', color: '#4db8ff' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#dde8f5' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(221,232,245,0.4)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-6 relative z-10" id="prijzen">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="badge badge-blue mb-4 mx-auto">Prijzen</div>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#dde8f5', letterSpacing: '-0.04em' }}>
              Transparante prijzen
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(221,232,245,0.45)' }}>
              Begin gratis. Upgrade wanneer uw portfolio groeit.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setYearlyToggle(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={!yearlyToggle
                  ? { background: 'rgba(77,184,255,0.15)', color: '#4db8ff', border: '1px solid rgba(77,184,255,0.25)' }
                  : { color: 'rgba(221,232,245,0.5)' }
                }
              >
                Per maand
              </button>
              <button
                onClick={() => setYearlyToggle(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                style={yearlyToggle
                  ? { background: 'rgba(77,184,255,0.15)', color: '#4db8ff', border: '1px solid rgba(77,184,255,0.25)' }
                  : { color: 'rgba(221,232,245,0.5)' }
                }
              >
                Jaarlijks
                <span className="text-xs px-1.5 py-0.5 rounded-md font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>-20%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 relative flex flex-col"
                style={plan.highlight ? {
                  borderColor: 'rgba(77,184,255,0.3)',
                  boxShadow: '0 0 60px rgba(77,184,255,0.1)',
                } : {}}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #4db8ff, #2d9de8)', color: '#030810' }}
                  >
                    Meest gekozen
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-sm font-semibold mb-3" style={{ color: '#4db8ff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-black" style={{ color: '#dde8f5', letterSpacing: '-0.04em' }}>
                      €{yearlyToggle ? plan.yearlyPrice : plan.price}
                    </span>
                    <span className="text-sm" style={{ color: 'rgba(221,232,245,0.4)' }}>/maand</span>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(221,232,245,0.35)' }}>
                    {yearlyToggle ? 'Jaarlijks gefactureerd' : plan.desc}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(221,232,245,0.7)' }}>
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#22c55e' }} />
                      {f}
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
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-sm"
            style={{ color: 'rgba(221,232,245,0.3)' }}
          >
            Alle plannen inclusief 14 dagen gratis proberen · iDEAL beschikbaar · Geen lange contracten
          </motion.p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-8 mx-auto"
              style={{ background: 'rgba(77,184,255,0.1)', border: '1px solid rgba(77,184,255,0.2)' }}
            >
              <Zap className="w-8 h-8" style={{ color: '#4db8ff' }} />
            </div>
            <h2
              className="font-black mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#dde8f5', letterSpacing: '-0.04em' }}
            >
              Klaar om compliant te verhuren?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(221,232,245,0.5)' }}>
              Start gratis. Geen creditcard nodig. Binnen 2 minuten uw eerste woning compliant beheren.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/onboarding" className="btn-primary px-10 py-4 text-base rounded-xl">
                Gratis starten — 14 dagen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/huurprijscheck"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#dde8f5' }}
              >
                <Calculator className="w-5 h-5" style={{ color: '#4db8ff' }} />
                Huurprijscheck
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(77,184,255,0.12)', border: '1px solid rgba(77,184,255,0.2)' }}
            >
              <Building2 className="w-3.5 h-3.5" style={{ color: '#4db8ff' }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: 'rgba(221,232,245,0.5)' }}>HuurAdmin NL — AIOW BV</span>
          </div>

          <div className="flex gap-6 text-sm" style={{ color: 'rgba(221,232,245,0.3)' }}>
            {[
              { label: 'Huurprijscheck', href: '/huurprijscheck' },
              { label: 'Prijzen', href: '/prijzen' },
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Inloggen', href: '/dashboard' },
            ].map(link => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="transition-colors hover:text-white/60"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs" style={{ color: 'rgba(221,232,245,0.2)' }}>
            © 2024 AIOW BV · Betaalbare Huurwet 2024 compliant
          </p>
        </div>
      </footer>
    </div>
  )
}
