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
} from 'lucide-react'

// Empty state dashboard — geen mockdata
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
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Overzicht van uw verhuurportfolio</p>
        </div>
        <Link
          href="/onboarding"
          className="btn-primary text-sm px-4 py-2.5 rounded-xl flex items-center gap-2"
        >
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
            color: '#6366f1',
          },
          {
            icon: Euro,
            label: 'Huur ontvangen',
            value: '—',
            sub: 'Deze maand',
            color: '#10b981',
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
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
              <div className="text-xs text-white/25 mt-0.5">{stat.sub}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-16 text-center"
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.1))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <Building2 className="w-10 h-10 text-indigo-400 animate-breathe" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">
          Welkom bij HuurAdmin NL
        </h2>
        <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          U heeft nog geen woningen toegevoegd. Voeg uw eerste woning toe om te beginnen met 
          het bijhouden van huurbetalingen, onderhoud en compliance met de Betaalbare Huurwet 2024.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/onboarding"
            className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
          >
            <Plus className="w-4 h-4" />
            Eerste woning toevoegen
          </Link>
          <Link
            href="/huurprijscheck"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Gratis huurprijscheck
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4 mt-12 text-left">
          {[
            {
              step: '1',
              title: 'Woning toevoegen',
              desc: 'Voeg uw woning toe met adres, type en m²',
              icon: Building2,
              href: '/onboarding',
            },
            {
              step: '2',
              title: 'Huurder koppelen',
              desc: 'Koppel huurder, contract en huurprijs',
              icon: CheckCircle,
              href: '/onboarding',
            },
            {
              step: '3',
              title: 'Betalingen bijhouden',
              desc: 'Automatisch maandelijks overzicht',
              icon: Clock,
              href: '/betalingen',
            },
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <Link
                key={i}
                href={step.href}
                className="glass-card p-4 hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.2)', color: '#6366f1' }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">{step.title}</p>
                    <p className="text-white/40 text-xs">{step.desc}</p>
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
        transition={{ delay: 0.5 }}
        className="mt-6 glass-card p-4"
        style={{ borderColor: 'rgba(99,102,241,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Betaalbare Huurwet 2024 compliant</p>
            <p className="text-white/40 text-xs">Uw huurprijzen worden automatisch getoetst aan het nieuwe puntenstelsel</p>
          </div>
          <Link
            href="/huurprijscheck"
            className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            Check nu
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
