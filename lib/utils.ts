import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatDatum(dateStr: string): string {
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function getPeriodeLabel(periode: string): string {
  const [jaar, maand] = periode.split('-')
  const maanden = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
  ]
  return `${maanden[parseInt(maand) - 1]} ${jaar}`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'betaald': return 'badge-betaald'
    case 'te_laat': return 'badge-te-laat'
    case 'niet_betaald': return 'badge-niet-betaald'
    case 'verwacht': return 'badge-verwacht'
    default: return 'badge-verwacht'
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'betaald': return 'Betaald'
    case 'te_laat': return 'Te laat'
    case 'niet_betaald': return 'Niet betaald'
    case 'verwacht': return 'Verwacht'
    default: return status
  }
}

export function getCurrentPeriode(): string {
  const now = new Date()
  const jaar = now.getFullYear()
  const maand = String(now.getMonth() + 1).padStart(2, '0')
  return `${jaar}-${maand}`
}
