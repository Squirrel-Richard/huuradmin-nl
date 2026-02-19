import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://huuradmin.nl'
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/huurprijscheck', priority: '0.9', changefreq: 'monthly' },
    { loc: '/prijzen', priority: '0.8', changefreq: 'monthly' },
    { loc: '/dashboard', priority: '0.7', changefreq: 'daily' },
    { loc: '/betalingen', priority: '0.6', changefreq: 'daily' },
    { loc: '/onderhoud', priority: '0.6', changefreq: 'daily' },
    { loc: '/documenten', priority: '0.5', changefreq: 'weekly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
