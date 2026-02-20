'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WebGLBackground from '@/components/WebGLBackground'
import { berekenHuurprijs, type HuurprijsInput, LIBERALISATIEGRENS_PUNTEN } from '@/lib/huurprijscheck'
import { formatEuro } from '@/lib/utils'
import {
  Calculator,
  Home,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  Info,
  ArrowLeft,
} from 'lucide-react'

const energielabels = ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as const

export default function HuurprijscheckPage() {
  const [form, setForm] = useState<HuurprijsInput>({
    type: 'appartement',
    oppervlakte: 70,
    kamers: 3,
    woz_waarde: 250000,
    energielabel: 'C',
    heeft_tuin: false,
    heeft_balkon: false,
    heeft_garage: false,
    heeft_berging: false,
    heeft_lift: false,
    keuken_kwaliteit: 'normaal',
    badkamer_kwaliteit: 'normaal',
  })

  const [resultaat, setResultaat] = useState<ReturnType<typeof berekenHuurprijs> | null>(null)
  const [loading, setLoading] = useState(false)

  const handleBerekenen = () => {
    setLoading(true)
    setTimeout(() => {
      const r = berekenHuurprijs(form)
      setResultaat(r)
      setLoading(false)
    }, 600)
  }

  const update = (key: keyof HuurprijsInput, value: unknown) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setResultaat(null) // reset result on change
  }

  return (
    <div className="min-h-screen" style={{ background: '#030810' }}>
      <WebGLBackground />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(3,8,16,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'rgba(77,184,255,0.15)' }}>H</div>
          <span className="font-semibold text-white">HuurAdmin NL</span>
        </Link>
        <Link href="/onboarding" className="btn-primary text-sm px-4 py-2 rounded-xl">
          Gratis starten
        </Link>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(77,184,255,0.1)', border: '1px solid rgba(77,184,255,0.2)' }}>
            <Calculator className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Gratis tool — Betaalbare Huurwet 2024</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Huurprijscheck
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Bereken de maximale huurprijs van uw woning conform het nieuwe puntenstelsel.
            100% conform de Betaalbare Huurwet 2024.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-400" />
                Woning gegevens
              </h2>

              {/* Type */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Type woning</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['appartement', 'woning', 'studio', 'kamer'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => update('type', t)}
                      className="py-2 px-3 rounded-xl text-sm font-medium capitalize transition-all"
                      style={{
                        background: form.type === t ? 'rgba(77,184,255,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${form.type === t ? 'rgba(77,184,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: form.type === t ? '#4db8ff' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Oppervlakte & Kamers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Oppervlakte (m²)</label>
                  <input
                    type="number"
                    value={form.oppervlakte}
                    onChange={e => update('oppervlakte', Number(e.target.value))}
                    min={10}
                    max={500}
                    className="w-full px-3 py-2 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Aantal kamers</label>
                  <input
                    type="number"
                    value={form.kamers}
                    onChange={e => update('kamers', Number(e.target.value))}
                    min={1}
                    max={20}
                    className="w-full px-3 py-2 text-white text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              {/* WOZ-waarde */}
              <div>
                <label className="text-sm text-white/60 mb-2 block flex items-center gap-1">
                  WOZ-waarde (€)
                  <Info className="w-3 h-3 inline" />
                </label>
                <input
                  type="number"
                  value={form.woz_waarde}
                  onChange={e => update('woz_waarde', Number(e.target.value))}
                  min={50000}
                  step={10000}
                  className="w-full px-3 py-2 text-white text-sm"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                />
                <p className="text-xs text-white/30 mt-1">Te vinden in uw WOZ-beschikking van de gemeente</p>
              </div>

              {/* Energielabel */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Energielabel</label>
                <div className="flex gap-1 flex-wrap">
                  {energielabels.map(label => (
                    <button
                      key={label}
                      onClick={() => update('energielabel', label)}
                      className="py-1 px-2.5 rounded-lg text-xs font-bold transition-all"
                      style={{
                        background: form.energielabel === label ? 'rgba(77,184,255,0.3)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${form.energielabel === label ? 'rgba(77,184,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        color: form.energielabel === label ? '#4db8ff' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voorzieningen */}
              <div>
                <label className="text-sm text-white/60 mb-3 block">Voorzieningen</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'heeft_tuin', label: 'Tuin' },
                    { key: 'heeft_balkon', label: 'Balkon' },
                    { key: 'heeft_garage', label: 'Garage' },
                    { key: 'heeft_berging', label: 'Berging' },
                    { key: 'heeft_lift', label: 'Lift' },
                  ].map(item => (
                    <button
                      key={item.key}
                      onClick={() => update(item.key as keyof HuurprijsInput, !form[item.key as keyof HuurprijsInput])}
                      className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm transition-all"
                      style={{
                        background: form[item.key as keyof HuurprijsInput] ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${form[item.key as keyof HuurprijsInput] ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                        color: form[item.key as keyof HuurprijsInput] ? '#10b981' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center ${form[item.key as keyof HuurprijsInput] ? 'bg-green-500' : 'border border-white/20'}`}>
                        {form[item.key as keyof HuurprijsInput] && <span className="text-white text-xs">✓</span>}
                      </div>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keuken & Badkamer */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'keuken_kwaliteit', label: 'Keuken kwaliteit' },
                  { key: 'badkamer_kwaliteit', label: 'Badkamer kwaliteit' },
                ].map(item => (
                  <div key={item.key}>
                    <label className="text-sm text-white/60 mb-2 block">{item.label}</label>
                    <select
                      value={form[item.key as keyof HuurprijsInput] as string}
                      onChange={e => update(item.key as keyof HuurprijsInput, e.target.value)}
                      className="w-full px-3 py-2 text-white text-sm"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                    >
                      <option value="basis">Basis</option>
                      <option value="normaal">Normaal</option>
                      <option value="luxe">Luxe</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* Bereken button */}
              <button
                onClick={handleBerekenen}
                disabled={loading}
                className="btn-primary w-full py-4 text-base font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Bereken maximale huurprijs
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Result */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {resultaat ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="space-y-4"
                >
                  {/* Main result */}
                  <div
                    className="glass-card p-8 text-center"
                    style={{
                      borderColor: resultaat.sector === 'gereguleerd'
                        ? 'rgba(239,68,68,0.2)'
                        : 'rgba(16,185,129,0.2)',
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      {resultaat.sector === 'gereguleerd' ? (
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ background: 'rgba(239,68,68,0.15)' }}>
                          <AlertTriangle className="w-8 h-8 text-red-400" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ background: 'rgba(16,185,129,0.15)' }}>
                          <TrendingUp className="w-8 h-8 text-green-400" />
                        </div>
                      )}
                    </div>

                    <div className="text-5xl font-bold text-white mb-2">
                      {resultaat.sector === 'gereguleerd'
                        ? formatEuro(resultaat.max_huurprijs)
                        : 'Vrije sector'
                      }
                    </div>
                    <p className="text-white/50 text-sm mb-4">
                      {resultaat.sector === 'gereguleerd' ? 'Maximale huurprijs per maand' : 'Geen wettelijk maximum'}
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{
                        background: resultaat.sector === 'gereguleerd' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                        border: `1px solid ${resultaat.sector === 'gereguleerd' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                        color: resultaat.sector === 'gereguleerd' ? '#ef4444' : '#10b981',
                      }}
                    >
                      {resultaat.sector === 'gereguleerd' ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {resultaat.sector === 'gereguleerd' ? 'Gereguleerde sector' : 'Vrije sector'}
                      </span>
                    </div>

                    <p className="text-white/40 text-sm mt-4 leading-relaxed">
                      {resultaat.toelichting}
                    </p>
                  </div>

                  {/* Punten breakdown */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Puntentelling</h3>
                      <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                        {resultaat.punten} punten
                      </span>
                    </div>

                    {/* Points progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-white/40 mb-1">
                        <span>0</span>
                        <span>{LIBERALISATIEGRENS_PUNTEN} (grens)</span>
                        <span>300</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min((resultaat.punten / 300) * 100, 100)}%`,
                            background: resultaat.punten >= LIBERALISATIEGRENS_PUNTEN
                              ? 'linear-gradient(90deg, #10b981, #4db8ff)'
                              : 'linear-gradient(90deg, #4db8ff, #f59e0b)',
                          }}
                        />
                      </div>
                      <div
                        className="flex justify-end mt-1"
                        style={{ marginLeft: `${(LIBERALISATIEGRENS_PUNTEN / 300) * 100}%` }}
                      >
                        <div className="w-px h-3 bg-white/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(resultaat.punten_breakdown).map(([key, value]) => {
                        const labels: Record<string, string> = {
                          oppervlakte: 'Oppervlakte',
                          woz: 'WOZ-waarde',
                          type: 'Type woning',
                          energielabel: 'Energielabel',
                          voorzieningen: 'Voorzieningen',
                          keuken: 'Keuken',
                          badkamer: 'Badkamer',
                        }
                        return (
                          <div key={key} className="flex items-center justify-between py-1.5 text-sm">
                            <span className="text-white/60">{labels[key] || key}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${Math.min((value / 50) * 100, 100)}%`,
                                    background: 'linear-gradient(90deg, #4db8ff, #4db8ff)',
                                  }}
                                />
                              </div>
                              <span className="text-white font-medium w-8 text-right">{value}p</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="glass-card p-6 text-center">
                    <p className="text-white/60 text-sm mb-4">
                      Wilt u uw huurprijscheck opslaan en uw woning beheren?
                    </p>
                    <Link href="/onboarding" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
                      Gratis account aanmaken
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(77,184,255,0.1)' }}>
                    <Calculator className="w-8 h-8 text-blue-400 animate-breathe" />
                  </div>
                  <p className="text-white/40 text-sm">
                    Vul de woning gegevens in en klik op &ldquo;Bereken&rdquo; om de maximale huurprijs te zien.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info box */}
            <div className="glass-card p-4" style={{ borderColor: 'rgba(77,184,255,0.1)' }}>
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-white/50 leading-relaxed">
                  <strong className="text-white/70">Let op:</strong> Deze berekening is indicatief op basis van 
                  het vereenvoudigde puntenstelsel. Voor een officiële huurprijscheck kunt u terecht bij 
                  de Huurcommissie. De Betaalbare Huurwet 2024 kan worden bijgewerkt.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
