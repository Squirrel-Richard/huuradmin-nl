'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Euro,
  Wrench,
  TrendingUp,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Shield,
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: '#dde8f5', letterSpacing: '-0.03em' }}
          >
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(221,232,245,0.4)' }}>
            Overzicht van uw verhuurportfolio
          </p>
        </div>
        <Link href="/woning" className="btn-primary text-sm px-4 py-2.5 rounded-xl">
          <Plus className="w-4 h-4" />
          Woning toevoegen
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: Building2,
            label: 'Woningen',
            value: '—',
            sub: 'Voeg uw eerste woning toe',
            color: '#4db8ff',
          },
          {
            icon: Euro,
            label: 'Huur ontvangen',
            value: '—',
            sub: 'Deze maand',
            color: '#22c55e',
          },
          {
            icon: AlertCircle,
            label: 'Betalingen te laat',
            value: '—',
            sub: 'Actie vereist',
            color: '#f59e0b',
          },
          {
            icon: Wrench,
            label: 'Onderhoud open',
            value: '—',
            sub: 'Openstaande meldingen',
            color: '#ef4444',
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <div
                className="text-2xl font-black mb-1"
                style={{ color: '#dde8f5', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-medium" style={{ color: 'rgba(221,232,245,0.5)' }}>{stat.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(221,232,245,0.25)' }}>{stat.sub}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="glass-card p-14 text-center mb-6"
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-breathe"
          style={{
            background: 'rgba(77,184,255,0.08)',
            border: '1px solid rgba(77,184,255,0.15)',
          }}
        >
          <Building2 className="w-10 h-10" style={{ color: '#4db8ff' }} />
        </div>
        <h2
          className="text-xl font-black mb-3"
          style={{ color: '#dde8f5', letterSpacing: '-0.03em' }}
        >
          Welkom bij HuurAdmin NL
        </h2>
        <p className="text-sm max-w-md mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(221,232,245,0.45)' }}>
          U heeft nog geen woningen toegevoegd. Voeg uw eerste woning toe om te beginnen met
          het bijhouden van huurbetalingen, onderhoud en compliance met de Betaalbare Huurwet 2024.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link href="/woning" className="btn-primary text-sm px-6 py-3">
            <Plus className="w-4 h-4" />
            Eerste woning toevoegen
          </Link>
          <Link
            href="/huurprijscheck"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#dde8f5',
            }}
          >
            Gratis huurprijscheck
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4 text-left">
          {[
            {
              step: '1',
              title: 'Woning toevoegen',
              desc: 'Voer adres, type en m² in. We berekenen direct uw puntenscore.',
              icon: Building2,
              href: '/woning',
            },
            {
              step: '2',
              title: 'Huurder koppelen',
              desc: 'Koppel huurder, huurcontract en huurprijs aan de woning.',
              icon: CheckCircle,
              href: '/huurders',
            },
            {
              step: '3',
              title: 'Automatiseren',
              desc: 'Stel WhatsApp reminders in en ontvang maandelijkse overzichten.',
              icon: Clock,
              href: '/betalingen',
            },
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <Link
                key={i}
                href={step.href}
                className="glass-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(77,184,255,0.12)', color: '#4db8ff', border: '1px solid rgba(77,184,255,0.2)' }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#dde8f5' }}>{step.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(221,232,245,0.4)' }}>{step.desc}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* Compliance banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-4"
        style={{ borderColor: 'rgba(77,184,255,0.12)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(77,184,255,0.1)', border: '1px solid rgba(77,184,255,0.15)' }}
          >
            <Shield className="w-4 h-4" style={{ color: '#4db8ff' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#dde8f5' }}>Betaalbare Huurwet 2024 compliant</p>
            <p className="text-xs" style={{ color: 'rgba(221,232,245,0.4)' }}>
              Huurprijzen worden automatisch getoetst aan het actuele puntenstelsel
            </p>
          </div>
          <Link
            href="/huurprijscheck"
            className="text-sm font-semibold flex items-center gap-1 flex-shrink-0 transition-opacity hover:opacity-70"
            style={{ color: '#4db8ff' }}
          >
            Check nu
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
