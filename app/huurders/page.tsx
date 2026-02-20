'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Plus, ChevronRight, UserPlus } from 'lucide-react'

export default function HuurdersPagina() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Huurders</h1>
          <p className="text-white/40 text-sm mt-1">Overzicht van al uw huurders</p>
        </div>
        <Link href="/onboarding" className="btn-primary text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Huurder toevoegen
        </Link>
      </motion.div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-16 text-center"
      >
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(77,184,255,0.1)', border: '1px solid rgba(77,184,255,0.2)' }}>
          <Users className="w-10 h-10 text-blue-400 animate-breathe" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">Nog geen huurders</h2>
        <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Voeg uw eerste woning toe en koppel een huurder om betalingen en contracten bij te houden.
        </p>
        <Link href="/onboarding" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
          <UserPlus className="w-4 h-4" />
          Woning & huurder toevoegen
        </Link>
      </motion.div>
    </div>
  )
}
