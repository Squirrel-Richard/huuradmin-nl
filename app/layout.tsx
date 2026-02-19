import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'HuurAdmin NL — Slimste verhuurbeheertool | Betaalbare Huurwet 2024 compliant',
    template: '%s | HuurAdmin NL',
  },
  description:
    'Beheer al uw huurwoningen eenvoudig. Huurprijscheck conform Betaalbare Huurwet 2024, betalingstracking, onderhoud log en jaaroverzicht PDF. Voor Nederlandse particuliere verhuurders.',
  keywords: [
    'huur beheren app NL',
    'Betaalbare Huurwet 2024 tool',
    'huurprijscheck puntenstelsel',
    'verhuurder software Nederland',
    'huuradministratie particulier',
    'maximale huurprijs berekenen',
    'puntenstelsel huur',
    'huurwoning beheer',
    'sociale huur calculator',
    'verhuurder app',
  ],
  authors: [{ name: 'AIOW BV' }],
  creator: 'AIOW BV',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://huuradmin.nl',
    siteName: 'HuurAdmin NL',
    title: 'HuurAdmin NL — Verhuurbeheertool Betaalbare Huurwet 2024',
    description: 'De compleet Nederlandse verhuurbeheertool. Huurprijscheck, betalingen, onderhoud. Compliant met de Betaalbare Huurwet 2024.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HuurAdmin NL — Verhuurbeheertool',
    description: 'Betaalbare Huurwet 2024 compliant. Huurprijscheck, betalingstracking, onderhoud log.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://huuradmin.nl',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: '#06060f' }}>
        {children}
      </body>
    </html>
  )
}
