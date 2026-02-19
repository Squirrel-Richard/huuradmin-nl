import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      landlords: {
        Row: {
          id: string
          user_id: string
          naam: string
          email: string | null
          telefoon: string | null
          iban: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['landlords']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['landlords']['Insert']>
      }
      properties: {
        Row: {
          id: string
          landlord_id: string
          adres: string
          postcode: string | null
          stad: string | null
          type: string | null
          oppervlakte: number | null
          kamers: number | null
          woz_waarde: number | null
          punten: number | null
          max_huurprijs: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['properties']['Insert']>
      }
      tenants: {
        Row: {
          id: string
          property_id: string
          naam: string
          email: string | null
          telefoon: string | null
          iban: string | null
          huurprijs: number | null
          huurprijs_incl_service: number | null
          ingangsdatum: string | null
          einddatum: string | null
          contract_url: string | null
          actief: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>
      }
      rent_payments: {
        Row: {
          id: string
          tenant_id: string
          property_id: string
          periode: string
          verwacht_bedrag: number | null
          ontvangen_bedrag: number | null
          betaald_op: string | null
          status: 'verwacht' | 'betaald' | 'te_laat' | 'niet_betaald'
          herinnering_verstuurd: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['rent_payments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['rent_payments']['Insert']>
      }
      maintenance_requests: {
        Row: {
          id: string
          property_id: string
          tenant_id: string | null
          titel: string
          omschrijving: string | null
          prioriteit: 'laag' | 'normaal' | 'hoog' | 'urgent'
          status: 'open' | 'in_behandeling' | 'opgelost'
          foto_urls: string[]
          opgelost_op: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['maintenance_requests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['maintenance_requests']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          landlord_id: string
          plan: string
          stripe_subscription_id: string | null
          max_properties: number
          geldig_tot: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
    }
  }
}
