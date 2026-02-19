import { NextRequest, NextResponse } from 'next/server'
import { berekenHuurprijs, type HuurprijsInput } from '@/lib/huurprijscheck'
import { z } from 'zod'

const schema = z.object({
  type: z.enum(['appartement', 'woning', 'studio', 'kamer']),
  oppervlakte: z.number().min(5).max(1000),
  kamers: z.number().min(1).max(50),
  woz_waarde: z.number().min(10000),
  energielabel: z.enum(['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G']),
  heeft_tuin: z.boolean().default(false),
  heeft_balkon: z.boolean().default(false),
  heeft_garage: z.boolean().default(false),
  heeft_berging: z.boolean().default(false),
  heeft_lift: z.boolean().default(false),
  keuken_kwaliteit: z.enum(['basis', 'normaal', 'luxe']).default('normaal'),
  badkamer_kwaliteit: z.enum(['basis', 'normaal', 'luxe']).default('normaal'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = schema.parse(body) as HuurprijsInput
    const resultaat = berekenHuurprijs(input)

    return NextResponse.json({
      success: true,
      data: resultaat,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Ongeldige invoer', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/huurprijscheck',
    method: 'POST',
    description: 'Bereken maximale huurprijs conform Betaalbare Huurwet 2024',
    schema: {
      type: 'appartement | woning | studio | kamer',
      oppervlakte: 'number (m²)',
      kamers: 'number',
      woz_waarde: 'number (€)',
      energielabel: 'A+++ ... G',
      heeft_tuin: 'boolean',
      heeft_balkon: 'boolean',
      heeft_garage: 'boolean',
      heeft_berging: 'boolean',
      heeft_lift: 'boolean',
      keuken_kwaliteit: 'basis | normaal | luxe',
      badkamer_kwaliteit: 'basis | normaal | luxe',
    },
  })
}
