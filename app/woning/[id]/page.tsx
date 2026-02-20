'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Building2, Euro, Wrench, Users, Calculator } from 'lucide-react'

export default function WoningDetailPagina({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Woning {params.id}</h1>
          <p className="text-white/40 text-sm mt-1">Woning detail</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Woning info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(77,184,255,0.15)' }}>
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-white font-semibold">Woning gegevens</h2>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ['Adres', '—'],
              ['Postcode', '—'],
              ['Type', '—'],
              ['Oppervlakte', '—'],
              ['WOZ-waarde', '—'],
              ['Max huurprijs', '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-white/50">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Huurder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.15)' }}>
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-white font-semibold">Huurder</h2>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ['Naam', '—'],
              ['E-mail', '—'],
              ['Telefoon', '—'],
              ['Huurprijs', '—'],
              ['Ingangsdatum', '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-white/50">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {[
            { icon: Euro, label: 'Betalingen', href: '/betalingen', color: '#10b981' },
            { icon: Wrench, label: 'Onderhoud', href: '/onderhoud', color: '#f59e0b' },
            { icon: Calculator, label: 'Huurprijscheck', href: '/huurprijscheck', color: '#4db8ff' },
          ].map((action, i) => {
            const Icon = action.icon
            return (
              <Link
                key={i}
                href={action.href}
                className="glass-card p-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${action.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: action.color }} />
                </div>
                <span className="text-white text-sm font-medium">{action.label}</span>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
