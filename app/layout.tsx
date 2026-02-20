import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'HuurAdmin NL — Verhuur beheren zonder zorgen | Betaalbare Huurwet 2024',
    template: '%s | HuurAdmin NL',
  },
  description:
    'De enige NL-first verhuurbeheertool volledig compliant met de Betaalbare Huurwet 2024. Huurprijscheck puntenstelsel, betalingstracking, WhatsApp reminders en jaaroverzicht PDF. Voor Nederlandse particuliere verhuurders.',
  keywords: [
    'huur beheren app Nederland',
    'Betaalbare Huurwet 2024 tool',
    'huurprijscheck puntenstelsel',
    'verhuurder software NL',
    'huuradministratie particulier',
    'maximale huurprijs berekenen',
    'puntenstelsel huurwoning',
    'huurwoning beheer app',
    'verhuurder app Nederland',
    'gereguleerde sector huurprijs',
    'huurrecht compliant',
    'iDEAL verhuurder betaling',
  ],
  authors: [{ name: 'AIOW BV' }],
  creator: 'AIOW BV',
  metadataBase: new URL('https://huuradmin.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://huuradmin.nl',
    siteName: 'HuurAdmin NL',
    title: 'HuurAdmin NL — Verhuur beheren zonder zorgen',
    description: 'Compliant met de Betaalbare Huurwet 2024. Huurprijscheck, betalingstracking, WhatsApp reminders en PDF jaaroverzicht voor NL verhuurders.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'HuurAdmin NL — Verhuur beheren zonder zorgen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HuurAdmin NL — Verhuur beheren zonder zorgen',
    description: 'Betaalbare Huurwet 2024 compliant. Huurprijscheck, betalingstracking, WhatsApp reminders voor NL verhuurders.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://huuradmin.nl',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: '#030810', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
