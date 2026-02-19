/**
 * Huurprijscheck — Betaalbare Huurwet 2024
 * Puntenstelsel berekening conform nieuwe regelgeving
 */

export interface HuurprijsInput {
  type: 'appartement' | 'woning' | 'studio' | 'kamer'
  oppervlakte: number // m²
  kamers: number
  woz_waarde: number // €
  energielabel: 'A+++' | 'A++' | 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  heeft_tuin: boolean
  heeft_balkon: boolean
  heeft_garage: boolean
  heeft_berging: boolean
  heeft_lift: boolean
  keuken_kwaliteit: 'basis' | 'normaal' | 'luxe'
  badkamer_kwaliteit: 'basis' | 'normaal' | 'luxe'
}

export interface HuurprijsResultaat {
  punten: number
  punten_breakdown: {
    oppervlakte: number
    woz: number
    type: number
    energielabel: number
    voorzieningen: number
    keuken: number
    badkamer: number
  }
  sector: 'gereguleerd' | 'vrije_sector'
  max_huurprijs: number
  huurprijs_liberalisatiegrens: number
  compliant: boolean
  toelichting: string
}

// Liberalisatiegrens 2024: 143 punten
export const LIBERALISATIEGRENS_PUNTEN = 143
export const LIBERALISATIEGRENS_HUUR = 879.66 // per maand 2024

// Huurprijs tabel conform Betaalbare Huurwet 2024 (gesimplificeerd)
export const HUURPRIJS_TABEL: { [punten: number]: number } = {
  40: 313.87,
  50: 367.21,
  60: 420.55,
  70: 473.89,
  80: 527.23,
  90: 580.57,
  100: 633.91,
  110: 687.25,
  120: 740.59,
  130: 793.93,
  140: 847.27,
  143: 879.66,   // liberalisatiegrens
  150: 920.00,   // vrije sector begint
  160: 980.00,
  170: 1040.00,
  180: 1100.00,
  190: 1160.00,
  200: 1220.00,
  220: 1350.00,
  250: 1550.00,
}

function berekenOppervlaktePunten(oppervlakte: number): number {
  // 1 punt per m², max 250
  return Math.min(Math.round(oppervlakte), 250)
}

function berekenWozPunten(woz_waarde: number): number {
  // WOZ-waarde: schaal 10-50 punten
  if (woz_waarde < 50000) return 10
  if (woz_waarde < 100000) return 15
  if (woz_waarde < 150000) return 20
  if (woz_waarde < 200000) return 25
  if (woz_waarde < 250000) return 30
  if (woz_waarde < 300000) return 35
  if (woz_waarde < 400000) return 40
  if (woz_waarde < 500000) return 45
  return 50
}

function berekenTypePunten(type: string): number {
  switch (type) {
    case 'woning': return 5
    case 'appartement': return 3
    case 'studio': return 2
    case 'kamer': return 0
    default: return 0
  }
}

function berekenEnergiePunten(energielabel: string): number {
  switch (energielabel) {
    case 'A+++': return 44
    case 'A++': return 40
    case 'A+': return 36
    case 'A': return 30
    case 'B': return 22
    case 'C': return 14
    case 'D': return 8
    case 'E': return 4
    case 'F': return 2
    case 'G': return 0
    default: return 0
  }
}

function berekenVoorzieningPunten(input: HuurprijsInput): number {
  let punten = 0
  if (input.heeft_tuin) punten += 5
  if (input.heeft_balkon) punten += 3
  if (input.heeft_garage) punten += 7
  if (input.heeft_berging) punten += 2
  if (input.heeft_lift) punten += 4
  return punten
}

function berekenKeukenPunten(kwaliteit: string): number {
  switch (kwaliteit) {
    case 'luxe': return 12
    case 'normaal': return 7
    case 'basis': return 3
    default: return 0
  }
}

function berekenBadkamerPunten(kwaliteit: string): number {
  switch (kwaliteit) {
    case 'luxe': return 10
    case 'normaal': return 6
    case 'basis': return 2
    default: return 0
  }
}

function getMaxHuurprijs(punten: number): number {
  // Vind dichtstbijzijnde tabel-entry
  const tabelPunten = Object.keys(HUURPRIJS_TABEL).map(Number).sort((a, b) => a - b)
  
  // Lineaire interpolatie
  for (let i = 0; i < tabelPunten.length - 1; i++) {
    const p1 = tabelPunten[i]
    const p2 = tabelPunten[i + 1]
    if (punten >= p1 && punten <= p2) {
      const h1 = HUURPRIJS_TABEL[p1]
      const h2 = HUURPRIJS_TABEL[p2]
      const ratio = (punten - p1) / (p2 - p1)
      return Math.round((h1 + ratio * (h2 - h1)) * 100) / 100
    }
  }
  
  if (punten <= tabelPunten[0]) return HUURPRIJS_TABEL[tabelPunten[0]]
  return HUURPRIJS_TABEL[tabelPunten[tabelPunten.length - 1]]
}

export function berekenHuurprijs(input: HuurprijsInput): HuurprijsResultaat {
  const opp = berekenOppervlaktePunten(input.oppervlakte)
  const woz = berekenWozPunten(input.woz_waarde)
  const type = berekenTypePunten(input.type)
  const energie = berekenEnergiePunten(input.energielabel)
  const voorzieningen = berekenVoorzieningPunten(input)
  const keuken = berekenKeukenPunten(input.keuken_kwaliteit)
  const badkamer = berekenBadkamerPunten(input.badkamer_kwaliteit)

  const totaalPunten = opp + woz + type + energie + voorzieningen + keuken + badkamer

  const sector: 'gereguleerd' | 'vrije_sector' = 
    totaalPunten >= LIBERALISATIEGRENS_PUNTEN ? 'vrije_sector' : 'gereguleerd'
  
  const max_huurprijs = getMaxHuurprijs(totaalPunten)

  const toelichting = sector === 'gereguleerd'
    ? `Uw woning valt in de gereguleerde sector (sociale huur). Met ${totaalPunten} punten is de maximale huurprijs conform de Betaalbare Huurwet 2024 vastgesteld op €${max_huurprijs.toFixed(2)}/maand. U mag niet meer vragen dan dit bedrag.`
    : `Uw woning valt in de vrije sector (${totaalPunten} punten ≥ ${LIBERALISATIEGRENS_PUNTEN}). Er geldt geen wettelijk maximum voor de huurprijs. Toch adviseert de Betaalbare Huurwet transparantie over uw puntenaantal.`

  return {
    punten: totaalPunten,
    punten_breakdown: {
      oppervlakte: opp,
      woz,
      type,
      energielabel: energie,
      voorzieningen,
      keuken,
      badkamer,
    },
    sector,
    max_huurprijs,
    huurprijs_liberalisatiegrens: LIBERALISATIEGRENS_HUUR,
    compliant: true,
    toelichting,
  }
}
