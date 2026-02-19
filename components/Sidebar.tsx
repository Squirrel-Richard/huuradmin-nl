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
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/huurprijscheck', label: 'Huurprijscheck', icon: Calculator },
  { href: '/huurders', label: 'Huurders', icon: Users },
  { href: '/betalingen', label: 'Betalingen', icon: Euro },
  { href: '/onderhoud', label: 'Onderhoud', icon: Wrench },
  { href: '/documenten', label: 'Documenten', icon: FileText },
  { href: '/prijzen', label: 'Upgrade', icon: Tag },
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
        background: 'rgba(6, 6, 15, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="p-6 mb-2">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
          >
            H
          </div>
          <div>
            <span className="font-semibold text-white text-sm block leading-tight">HuurAdmin</span>
            <span className="text-white/30 text-xs">.nl</span>
          </div>
        </Link>
      </div>

      {/* Add property button */}
      <div className="px-4 mb-4">
        <Link
          href="/onboarding"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.1))',
            border: '1px solid rgba(99,102,241,0.3)',
          }}
        >
          <PlusCircle className="w-4 h-4" />
          Woning toevoegen
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <div
          className="glass-card p-3 text-center"
          style={{ borderRadius: '12px' }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Building2 className="w-3 h-3 text-white/40" />
            <p className="text-xs text-white/40">Gratis plan</p>
          </div>
          <p className="text-xs text-white/60">1 van 1 woningen</p>
          <Link
            href="/prijzen"
            className="block mt-2 text-xs font-semibold"
            style={{ color: 'var(--primary)' }}
          >
            Upgrade →
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}
