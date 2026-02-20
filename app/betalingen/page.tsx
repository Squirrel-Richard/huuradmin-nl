'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Euro, Plus, Calendar, CheckCircle } from 'lucide-react'

export default function BetalingenPagina() {
  const huidigeMaand = new Date().toLocaleString('nl-NL', { month: 'long', year: 'numeric' })

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Betalingen</h1>
          <p className="text-white/40 text-sm mt-1 capitalize">{huidigeMaand}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/60 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Calendar className="w-4 h-4" />
            Maand kiezen
          </button>
          <Link href="/onboarding" className="btn-primary text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Woning toevoegen
          </Link>
        </div>
      </motion.div>

      {/* Status overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Betaald', value: '—', color: '#10b981', cls: 'badge-betaald' },
          { label: 'Te laat', value: '—', color: '#f59e0b', cls: 'badge-te-laat' },
          { label: 'Verwacht', value: '—', color: '#4db8ff', cls: 'badge-verwacht' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 text-center"
          >
            <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
            <span className={s.cls}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-16 text-center"
      >
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <Euro className="w-10 h-10 text-green-400 animate-breathe" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">Geen betalingen deze maand</h2>
        <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Zodra u woningen en huurders heeft toegevoegd, ziet u hier automatisch het maandoverzicht.
          Betalingen worden bijgehouden en u krijgt automatisch een melding bij achterstand.
        </p>
        <Link href="/onboarding" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
          <CheckCircle className="w-4 h-4" />
          Eerste woning instellen
        </Link>
      </motion.div>
    </div>
  )
}
