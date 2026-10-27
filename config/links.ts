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

  // Canale Discord delle domande sulle lezioni (pulsante "Fai una domanda su Discord ↗" nelle Lezioni).
  discordDomande: 'https://discord.com/channels/SOSTITUISCI',

  // Pagina di prenotazione Cal.com della call 1:1 (pagina /meeting).
  calcom: {
    call11: 'https://cal.com/SOSTITUISCI/call-1-1',
  },

  // Link delle call per gli eventi online, per piattaforma. Visibili solo dopo l'iscrizione.
  // Con Supabase ogni evento avrà il suo link salvato nel database.
  callEventi: {
    zoom: 'https://zoom.us/j/SOSTITUISCI',
    meet: 'https://meet.google.com/SOSTITUISCI',
    discord: 'https://discord.gg/SOSTITUISCI',
  },

  // Web Security Academy di PortSwigger: i lab gratuiti dove si fa pratica vera (riquadro "Allenati sul lab"
  // nelle lezioni del Modulo 2). Sono URL pubblici reali, non segnaposto. Le stesse URL sono usate nei file MDX.
  portswigger: {
    accessControl: 'https://portswigger.net/web-security/access-control',
    authentication: 'https://portswigger.net/web-security/authentication',
    xss: 'https://portswigger.net/web-security/cross-site-scripting',
    sqlInjection: 'https://portswigger.net/web-security/sql-injection',
    nosqlInjection: 'https://portswigger.net/web-security/nosql-injection',
    ssrf: 'https://portswigger.net/web-security/ssrf',
    ssti: 'https://portswigger.net/web-security/server-side-template-injection',
    jwt: 'https://portswigger.net/web-security/jwt',
    pathTraversal: 'https://portswigger.net/web-security/file-path-traversal',
    tuttiILab: 'https://portswigger.net/web-security/all-labs',
  },
} as const

// Attributi da mettere su ogni link esterno: si apre in una nuova scheda senza passare informazioni al sito aperto.
export const LINK_ESTERNO = { target: '_blank', rel: 'noopener noreferrer' } as const
