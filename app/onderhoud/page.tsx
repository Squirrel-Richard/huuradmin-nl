'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wrench, Plus, AlertCircle } from 'lucide-react'

export default function OnderhoudPagina() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Onderhoud</h1>
          <p className="text-white/40 text-sm mt-1">Openstaande onderhoudsmeldingen</p>
        </div>
        <button className="btn-primary text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Melding toevoegen
        </button>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['Alle', 'Open', 'In behandeling', 'Opgelost'].map((tab, i) => (
          <button
            key={tab}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: i === 0 ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${i === 0 ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: i === 0 ? '#6366f1' : 'rgba(255,255,255,0.5)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-16 text-center"
      >
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <Wrench className="w-10 h-10 text-amber-400 animate-breathe" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">Geen onderhoudsmeldingen</h2>
        <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Zodra huurders meldingen insturen of u zelf een melding aanmaakt, verschijnt die hier.
          U kunt per melding de status bijhouden en foto&apos;s uploaden.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/60"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <AlertCircle className="w-4 h-4" />
          Beschikbaar na woning toevoegen
        </div>
      </motion.div>
    </div>
  )
}
