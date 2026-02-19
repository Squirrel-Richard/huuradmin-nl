import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /
Allow: /huurprijscheck
Allow: /prijzen
Disallow: /api/
Disallow: /dashboard
Disallow: /betalingen
Disallow: /onderhoud
Disallow: /documenten
Disallow: /huurders

Sitemap: https://huuradmin.nl/sitemap.xml`

  return new NextResponse(robots, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
