import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const property_id = searchParams.get('property_id')
  const periode = searchParams.get('periode')

  let query = supabase
    .from('rent_payments')
    .select(`
      *,
      tenants(naam, email, telefoon),
      properties(adres, stad)
    `)
    .order('created_at', { ascending: false })

  if (property_id) query = query.eq('property_id', property_id)
  if (periode) query = query.eq('periode', periode)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tenant_id, property_id, periode, verwacht_bedrag, status, ontvangen_bedrag, betaald_op } = body

    if (!tenant_id || !property_id || !periode) {
      return NextResponse.json(
        { success: false, error: 'tenant_id, property_id en periode zijn verplicht' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('rent_payments')
      .insert({
        tenant_id,
        property_id,
        periode,
        verwacht_bedrag,
        ontvangen_bedrag,
        betaald_op,
        status: status || 'verwacht',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, ontvangen_bedrag, betaald_op } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'id is verplicht' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rent_payments')
      .update({ status, ontvangen_bedrag, betaald_op })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Send WhatsApp reminder if status is 'te_laat'
    if (status === 'te_laat') {
      // TODO: Integrate WhatsApp Business API
      // await sendWhatsAppReminder(data)
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
