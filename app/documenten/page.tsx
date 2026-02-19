'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Download, Plus, FilePlus } from 'lucide-react'

export default function DocumentenPagina() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Documenten</h1>
          <p className="text-white/40 text-sm mt-1">Contracten en jaaroverzichten</p>
        </div>
        <button className="btn-primary text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
          <FilePlus className="w-4 h-4" />
          Document uploaden
        </button>
      </motion.div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { icon: FileText, label: 'Huurcontracten', count: 0, color: '#6366f1' },
          { icon: Download, label: 'Jaaroverzichten PDF', count: 0, color: '#10b981' },
        ].map((cat, i) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${cat.color}20` }}>
                <Icon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <div>
                <p className="text-white font-medium">{cat.label}</p>
                <p className="text-white/40 text-sm">{cat.count} documenten</p>
              </div>
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
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <FileText className="w-10 h-10 text-indigo-400 animate-breathe" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">Nog geen documenten</h2>
        <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Huurcontracten worden hier opgeslagen wanneer u huurders toevoegt.
          Jaaroverzichten kunt u automatisch genereren voor uw belastingaangifte (Pro plan).
        </p>
        <Link href="/prijzen" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
          <Plus className="w-4 h-4" />
          Upgrade naar Pro voor PDF jaaroverzichten
        </Link>
      </motion.div>
    </div>
  )
}
