// ⚠️ DATI FINTI per la pagina Meeting ⚠️
//
// Nomi del team SEGNAPOSTO e tipi di call di esempio, finché non c'è un database.
// Con Supabase questo file verrà sostituito dalla lettura del database.
// Le prenotazioni NON passano dal sito: avvengono tutte su Cal.com (link in config/links.ts).

import { LINKS } from '@/config/links'
import type { PersonaTeam, TipoCall } from '@/lib/meeting'

// Da sostituire con i nomi veri (e, più avanti, con una foto).
export const TEAM: PersonaTeam[] = [
  { nome: 'Nome Founder', ruolo: 'Founder', argomenti: ['Web hacking', 'Lab PortSwigger', 'Bug bounty'] },
  { nome: 'Nome Co-founder', ruolo: 'Co-founder', argomenti: ['CTF', 'OSINT', 'Linux'] },
]

export const TIPI_CALL: TipoCall[] = [
  {
    id: 'call-1-1',
    titolo: 'Call 1:1',
    durataMinuti: 20,
    descrizione: 'Bloccata su un lab o su un concetto? Lo guardiamo insieme.',
    persone: 'Individuale',
    piattaforma: 'meet',
    linkPrenotazione: LINKS.calcom.call11,
  },
  {
    id: 'qa-di-gruppo',
    titolo: 'Q&A di gruppo',
    durataMinuti: 45,
    descrizione: 'Porta le tue domande: si risponde insieme e si impara anche da quelle delle altre.',
    persone: 'Fino a 5 persone',
    piattaforma: 'zoom',
    linkPrenotazione: LINKS.calcom.qaGruppo,
  },
]
