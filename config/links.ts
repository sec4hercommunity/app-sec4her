// ⚠️ LINK ESTERNI DEL SITO — VALORI SEGNAPOSTO DA SOSTITUIRE ⚠️
//
// Il sito non costruisce strumenti: porta le persone su quelli che esistono già
// (Cal.com per le prenotazioni, Zoom / Google Meet / Discord per le call, Discord per la community).
// Tutti i link esterni stanno qui, in un unico posto. Ogni valore con "SOSTITUISCI" è un segnaposto:
// sostituiscilo con il link vero prima di pubblicare il sito.

export const SEGNAPOSTO = 'SOSTITUISCI'

// true se il link è ancora un segnaposto (utile per mostrarlo in modo diverso).
export function linkSegnaposto(link: string): boolean {
  return link.includes(SEGNAPOSTO)
}

export const LINKS = {
  // Invito al server Discord della community (footer + riquadro "Unisciti alla community").
  discord: 'https://discord.gg/SOSTITUISCI',

  // Pagine di prenotazione Cal.com, una per tipo di call (scheda "Parla con noi").
  calcom: {
    call11: 'https://cal.com/SOSTITUISCI/call-1-1',
    qaGruppo: 'https://cal.com/SOSTITUISCI/qa-di-gruppo',
    brainstorming: 'https://cal.com/SOSTITUISCI/brainstorming-lezione',
  },

  // Link delle call per gli eventi online, per piattaforma. Visibili solo dopo l'iscrizione.
  // Con Supabase ogni evento avrà il suo link salvato nel database.
  callEventi: {
    zoom: 'https://zoom.us/j/SOSTITUISCI',
    meet: 'https://meet.google.com/SOSTITUISCI',
    discord: 'https://discord.gg/SOSTITUISCI',
  },
} as const
