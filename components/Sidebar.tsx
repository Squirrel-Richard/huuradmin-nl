'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Calculator,
  Users,
  Euro,
  Wrench,
  FileText,
  Tag,
  PlusCircle,
  Building2,
  Home,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/huurprijscheck', label: 'Huurprijscheck', icon: Calculator },
  { href: '/huurders', label: 'Huurders', icon: Users },
  { href: '/betalingen', label: 'Betalingen', icon: Euro },
  { href: '/onderhoud', label: 'Onderhoud', icon: Wrench },
  { href: '/documenten', label: 'Documenten', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed left-0 top-0 h-full w-56 z-40 flex flex-col"
      style={{
        background: 'rgba(3,8,16,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div className="p-5 mb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(77,184,255,0.12)', border: '1px solid rgba(77,184,255,0.2)' }}
          >
            <Building2 className="w-4 h-4" style={{ color: '#4db8ff' }} />
          </div>
          <div>
            <span className="font-bold text-white text-sm block leading-tight tracking-tight">HuurAdmin</span>
            <span className="text-xs" style={{ color: 'rgba(221,232,245,0.3)' }}>NL</span>
          </div>
        </Link>
      </div>

      {/* Add property button */}
      <div className="px-3 py-3">
        <Link
          href="/woning"
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'rgba(77,184,255,0.1)',
            border: '1px solid rgba(77,184,255,0.2)',
            color: '#4db8ff',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(77,184,255,0.18)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(77,184,255,0.1)'
          }}
        >
          <PlusCircle className="w-4 h-4" />
          Woning toevoegen
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={active ? {
                background: 'rgba(77,184,255,0.1)',
                color: '#4db8ff',
                border: '1px solid rgba(77,184,255,0.15)',
              } : {
                color: 'rgba(221,232,245,0.5)',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.color = '#dde8f5'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.color = 'rgba(221,232,245,0.5)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade card */}
      <div className="px-3 pb-3">
        <div
          className="p-4 rounded-xl mb-2"
          style={{
            background: 'rgba(77,184,255,0.06)',
            border: '1px solid rgba(77,184,255,0.12)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-3.5 h-3.5" style={{ color: 'rgba(221,232,245,0.4)' }} />
            <p className="text-xs font-medium" style={{ color: 'rgba(221,232,245,0.4)' }}>Gratis plan</p>
          </div>
          <p className="text-xs mb-3" style={{ color: 'rgba(221,232,245,0.6)' }}>1 van 1 woningen</p>
          <div className="progress-bar mb-3">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
          <Link
            href="/prijzen"
            className="block text-center py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{ background: 'rgba(77,184,255,0.15)', color: '#4db8ff', border: '1px solid rgba(77,184,255,0.25)' }}
          >
            Upgrade naar Pro →
          </Link>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors w-full"
          style={{ color: 'rgba(221,232,245,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(221,232,245,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(221,232,245,0.3)' }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Uitloggen
        </Link>
      </div>
    </motion.aside>
  )
}
