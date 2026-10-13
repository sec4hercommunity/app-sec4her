// Tipi della pagina Meeting (indipendenti da dove arrivano i dati: mock oggi, Supabase domani).

import type { Piattaforma } from './eventi'

export type PersonaTeam = { nome: string; ruolo: string; argomenti: string[] }

export type TipoCall = {
  id: string
  titolo: string
  durataMinuti: number
  descrizione: string
  persone: string
  piattaforma: Piattaforma
  linkPrenotazione: string // pagina Cal.com (da config/links.ts)
}
