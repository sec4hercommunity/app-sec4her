// ⚠️ DATI FINTI per la pagina Eventi e "Parla con noi" ⚠️
//
// Servono solo a mostrare la grafica finché non c'è un database. Le iscrizioni fatte nel sito restano
// solo nella memoria del browser e spariscono ricaricando la pagina. Con Supabase questo file verrà
// sostituito dalla lettura del database. I link esterni sono in config/links.ts.
//
// Le date sono calcolate rispetto a "adesso", così ci sono sempre eventi futuri e passati.

import { LINKS } from '@/config/links'
import type { Evento, Piattaforma } from '@/lib/eventi'

const GIORNO = 24 * 60 * 60 * 1000

// Data tra "giorni" giorni alle ore indicate (ora locale).
function tra(giorni: number, ore: number, minuti = 0): string {
  const d = new Date(Date.now() + giorni * GIORNO)
  d.setHours(ore, minuti, 0, 0)
  return d.toISOString()
}

// Evento del mese: tra circa 12 giorni, ma se possibile ancora dentro il mese corrente.
function entroQuestoMese(giorni: number, ore: number): string {
  const ora = new Date()
  const ultimoDelMese = new Date(ora.getFullYear(), ora.getMonth() + 1, 0, ore, 0, 0, 0)
  const desiderata = new Date(tra(giorni, ore))
  if (ultimoDelMese.getTime() - ora.getTime() > 2 * GIORNO && desiderata > ultimoDelMese) return ultimoDelMese.toISOString()
  return desiderata.toISOString()
}

export const EVENTI_INIZIALI: Evento[] = [
  {
    id: 'hardware-hacking-night',
    titolo: 'Hardware Hacking Night',
    tema: 'hardware',
    inizio: entroQuestoMese(12, 18),
    durataMinuti: 180,
    modalita: 'presenza',
    descrizione:
      'Apriamo router e dispositivi IoT: troviamo la porta seriale, ci colleghiamo e leggiamo cosa racconta il firmware. Si lavora a coppie, nessuna esperienza richiesta.',
    cosaPortare: ['il tuo laptop', 'un cavo USB', 'tanta curiosità'],
    luogo: 'Sala workshop (indirizzo segnaposto), Milano',
    postiTotali: 30,
    iscritte: 18,
    inEvidenza: true,
  },
  {
    id: 'osint-trova-le-tracce',
    titolo: 'OSINT: trova le tracce',
    tema: 'osint',
    inizio: tra(20, 21),
    durataMinuti: 90,
    modalita: 'online',
    piattaforma: 'meet',
    linkCall: LINKS.callEventi.meet,
    descrizione: 'Una caccia al tesoro con sole fonti aperte: foto, metadati e social. Impariamo a ragionare come investigatrici.',
    cosaPortare: ['il tuo laptop', 'un browser aggiornato'],
    iscritte: 42,
  },
  {
    id: 'phishing-dal-vivo',
    titolo: 'Phishing dal vivo',
    tema: 'social-engineering',
    inizio: tra(27, 19),
    durataMinuti: 120,
    modalita: 'presenza',
    descrizione: 'Come nasce una campagna di phishing e come riconoscerla: analizziamo insieme email vere (anonimizzate).',
    cosaPortare: ['il tuo laptop'],
    luogo: 'Spazio coworking (indirizzo segnaposto), Roma',
    postiTotali: 20,
    iscritte: 20,
  },
  {
    id: 'privacy-fai-da-te',
    titolo: 'Privacy fai-da-te',
    tema: 'privacy',
    inizio: tra(34, 21),
    durataMinuti: 60,
    modalita: 'online',
    piattaforma: 'zoom',
    linkCall: LINKS.callEventi.zoom,
    descrizione: 'Mettiamo in sicurezza telefono e account in un\'ora: password manager, 2FA e impostazioni da cambiare subito.',
    cosaPortare: ['il tuo telefono'],
    iscritte: 27,
  },
  {
    id: 'forensics-su-una-chiavetta',
    titolo: 'Forensics su una chiavetta',
    tema: 'forensics',
    inizio: tra(-16, 18),
    durataMinuti: 150,
    modalita: 'presenza',
    descrizione: 'Recuperiamo file cancellati da una chiavetta USB e ricostruiamo cosa è successo.',
    cosaPortare: ['il tuo laptop'],
    luogo: 'Sala workshop (indirizzo segnaposto), Milano',
    postiTotali: 25,
    iscritte: 25,
  },
  {
    id: 'burp-suite-da-zero',
    titolo: 'Burp Suite da zero',
    tema: 'web',
    inizio: tra(-38, 21),
    durataMinuti: 90,
    modalita: 'online',
    piattaforma: 'discord',
    linkCall: LINKS.callEventi.discord,
    descrizione: 'Intercettiamo le richieste di un sito di prova e le modifichiamo: il primo passo del web hacking.',
    cosaPortare: ['il tuo laptop con Burp Suite Community installato'],
    iscritte: 35,
  },
]

// ---- Scheda "Parla con noi" ----

export type PersonaTeam = { nome: string; ruolo: string; argomenti: string[] }

// Nomi SEGNAPOSTO: da sostituire con quelli veri (e, più avanti, con una foto).
export const TEAM: PersonaTeam[] = [
  { nome: 'Nome Founder', ruolo: 'Founder', argomenti: ['Web hacking', 'Lab PortSwigger', 'Bug bounty'] },
  { nome: 'Nome Co-founder', ruolo: 'Co-founder', argomenti: ['CTF', 'OSINT', 'Linux'] },
]

export type TipoCall = {
  id: string
  titolo: string
  durataMinuti: number
  descrizione: string
  persone: string
  piattaforma: Piattaforma
  linkPrenotazione: string
}

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
  {
    id: 'brainstorming-lezione',
    titolo: 'Brainstorming lezione',
    durataMinuti: 30,
    descrizione: "Rivediamo i contenuti dell'ultima lezione: dubbi, approfondimenti e idee.",
    persone: "Sui contenuti dell'ultima lezione",
    piattaforma: 'discord',
    linkPrenotazione: LINKS.calcom.brainstorming,
  },
]
