'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WebGLBackground from '@/components/WebGLBackground'
import { berekenHuurprijs } from '@/lib/huurprijscheck'
import {
  Building2,
  Users,
  Euro,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
} from 'lucide-react'

type Step = 'woning' | 'huurprijs' | 'huurder' | 'klaar'

export default function OnboardingPagina() {
  const [stap, setStap] = useState<Step>('woning')
  const [woning, setWoning] = useState({
    adres: '',
    postcode: '',
    stad: '',
    type: 'appartement',
    oppervlakte: '',
    kamers: '',
    woz_waarde: '',
  })
  const [huurder, setHuurder] = useState({
    naam: '',
    email: '',
    telefoon: '',
    huurprijs: '',
    ingangsdatum: '',
  })

  const stappen = [
    { id: 'woning', label: 'Woning', icon: Building2 },
    { id: 'huurprijs', label: 'Huurprijs', icon: Euro },
    { id: 'huurder', label: 'Huurder', icon: Users },
    { id: 'klaar', label: 'Klaar', icon: Check },
  ]

  const stapIndex = stappen.findIndex(s => s.id === stap)

  const maxHuurprijs = woning.oppervlakte && woning.woz_waarde
    ? berekenHuurprijs({
        type: woning.type as 'appartement' | 'woning' | 'studio' | 'kamer',
        oppervlakte: Number(woning.oppervlakte),
        kamers: Number(woning.kamers) || 1,
        woz_waarde: Number(woning.woz_waarde),
        energielabel: 'C',
        heeft_tuin: false,
        heeft_balkon: false,
        heeft_garage: false,
        heeft_berging: false,
        heeft_lift: false,
        keuken_kwaliteit: 'normaal',
        badkamer_kwaliteit: 'normaal',
      })
    : null

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ background: '#06060f' }}>
      <WebGLBackground />

      <div className="w-full max-w-lg">
        {/* Back */}
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Terug naar dashboard
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {stappen.map((s, i) => {
            const Icon = s.icon
            const done = i < stapIndex
            const active = i === stapIndex
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div
                  className="flex items-center gap-2"
                  style={{ opacity: i <= stapIndex ? 1 : 0.3 }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: done ? 'rgba(16,185,129,0.2)' : active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${done ? 'rgba(16,185,129,0.4)' : active ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {done
                      ? <Check className="w-4 h-4 text-green-400" />
                      : <Icon className="w-4 h-4" style={{ color: active ? '#6366f1' : 'rgba(255,255,255,0.4)' }} />
                    }
                  </div>
                  <span className="text-xs hidden sm:block"
                    style={{ color: active ? 'white' : 'rgba(255,255,255,0.4)' }}>
                    {s.label}
                  </span>
                </div>
                {i < stappen.length - 1 && (
                  <div className="flex-1 h-px mx-2" style={{ background: i < stapIndex ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {stap === 'woning' && (
            <motion.div
              key="woning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 space-y-5"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Woning toevoegen</h2>
                <p className="text-white/40 text-sm">Voer de gegevens van uw huurwoning in</p>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Adres *</label>
                <input
                  type="text"
                  value={woning.adres}
                  onChange={e => setWoning(p => ({ ...p, adres: e.target.value }))}
                  placeholder="Damstraat 1"
                  className="w-full px-3 py-2.5 text-white text-sm"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Postcode</label>
                  <input
                    type="text"
                    value={woning.postcode}
                    onChange={e => setWoning(p => ({ ...p, postcode: e.target.value }))}
                    placeholder="1234 AB"
                    className="w-full px-3 py-2.5 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Stad</label>
                  <input
                    type="text"
                    value={woning.stad}
                    onChange={e => setWoning(p => ({ ...p, stad: e.target.value }))}
                    placeholder="Amsterdam"
                    className="w-full px-3 py-2.5 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Type woning</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['appartement', 'woning', 'studio', 'kamer'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setWoning(p => ({ ...p, type: t }))}
                      className="py-2 px-3 rounded-xl text-sm font-medium capitalize transition-all"
                      style={{
                        background: woning.type === t ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${woning.type === t ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: woning.type === t ? '#6366f1' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Oppervlakte (m²)</label>
                  <input
                    type="number"
                    value={woning.oppervlakte}
                    onChange={e => setWoning(p => ({ ...p, oppervlakte: e.target.value }))}
                    placeholder="70"
                    className="w-full px-3 py-2.5 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Kamers</label>
                  <input
                    type="number"
                    value={woning.kamers}
                    onChange={e => setWoning(p => ({ ...p, kamers: e.target.value }))}
                    placeholder="3"
                    className="w-full px-3 py-2.5 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">WOZ-waarde (€)</label>
                  <input
                    type="number"
                    value={woning.woz_waarde}
                    onChange={e => setWoning(p => ({ ...p, woz_waarde: e.target.value }))}
                    placeholder="250000"
                    className="w-full px-3 py-2.5 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <button
                onClick={() => setStap('huurprijs')}
                disabled={!woning.adres}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-40"
              >
                Volgende: Huurprijs
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {stap === 'huurprijs' && (
            <motion.div
              key="huurprijs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 space-y-5"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Huurprijscheck</h2>
                <p className="text-white/40 text-sm">Conform de Betaalbare Huurwet 2024</p>
              </div>

              {maxHuurprijs && (
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: maxHuurprijs.sector === 'gereguleerd' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                    border: `1px solid ${maxHuurprijs.sector === 'gereguleerd' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-xs mb-1">Berekende max huurprijs</p>
                      <p className="text-2xl font-bold text-white">
                        {maxHuurprijs.sector === 'gereguleerd'
                          ? `€${maxHuurprijs.max_huurprijs.toFixed(0)}/m`
                          : 'Vrije sector'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-xs mb-1">Punten</p>
                      <p className="text-xl font-bold" style={{ color: '#6366f1' }}>{maxHuurprijs.punten}p</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Huurprijs per maand (€) *</label>
                <input
                  type="number"
                  value={huurder.huurprijs}
                  onChange={e => setHuurder(p => ({ ...p, huurprijs: e.target.value }))}
                  placeholder="750"
                  className="w-full px-3 py-2.5 text-white text-sm"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                />
                {maxHuurprijs?.sector === 'gereguleerd' && huurder.huurprijs && Number(huurder.huurprijs) > maxHuurprijs.max_huurprijs && (
                  <p className="text-red-400 text-xs mt-1">
                    ⚠️ Let op: deze huurprijs overschrijdt het wettelijke maximum van €{maxHuurprijs.max_huurprijs.toFixed(0)}/m
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStap('woning')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/60 transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Terug
                </button>
                <button
                  onClick={() => setStap('huurder')}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  Volgende: Huurder
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {stap === 'huurder' && (
            <motion.div
              key="huurder"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 space-y-5"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Huurder toevoegen</h2>
                <p className="text-white/40 text-sm">Optioneel — kunt u later ook invullen</p>
              </div>

              {[
                { key: 'naam', label: 'Naam huurder', placeholder: 'Jan de Vries', type: 'text' },
                { key: 'email', label: 'E-mailadres', placeholder: 'jan@example.nl', type: 'email' },
                { key: 'telefoon', label: 'Telefoonnummer', placeholder: '+31 6 12345678', type: 'tel' },
                { key: 'ingangsdatum', label: 'Ingangsdatum huurcontract', placeholder: '', type: 'date' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-sm text-white/60 mb-1.5 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={huurder[field.key as keyof typeof huurder]}
                    onChange={e => setHuurder(p => ({ ...p, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  onClick={() => setStap('huurprijs')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/60 transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Terug
                </button>
                <button
                  onClick={() => setStap('klaar')}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  Voltooien
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {stap === 'klaar' && (
            <motion.div
              key="klaar"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="glass-card p-10 text-center"
              style={{ borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(16,185,129,0.15)' }}
              >
                <Check className="w-10 h-10 text-green-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-3">Woning ingesteld!</h2>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                <strong className="text-white/70">{woning.adres}</strong> is toegevoegd aan uw portfolio.
                {huurder.naam && ` ${huurder.naam} is als huurder gekoppeld.`}
              </p>
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                  Naar dashboard
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setStap('woning')
                    setWoning({ adres: '', postcode: '', stad: '', type: 'appartement', oppervlakte: '', kamers: '', woz_waarde: '' })
                    setHuurder({ naam: '', email: '', telefoon: '', huurprijs: '', ingangsdatum: '' })
                  }}
                  className="w-full py-3 rounded-xl text-sm text-white/50 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Nog een woning toevoegen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
