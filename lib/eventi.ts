// Tipi e regole della sezione Eventi (indipendenti da dove arrivano i dati: mock oggi, Supabase domani).

export const TEMI = {
  web: 'Web',
  forensics: 'Forensics',
  osint: 'OSINT',
  hardware: 'Hardware/Device hacking',
  'social-engineering': 'Social engineering',
  privacy: 'Privacy',
} as const

export type Tema = keyof typeof TEMI
export type Modalita = 'online' | 'presenza'

export const PIATTAFORME = {
  zoom: 'Zoom',
  meet: 'Google Meet',
  discord: 'Discord',
} as const

export type Piattaforma = keyof typeof PIATTAFORME

export type Evento = {
  id: string
  titolo: string
  tema: Tema
  inizio: string // data e ora in formato ISO
  durataMinuti: number
  modalita: Modalita
  descrizione: string
  cosaPortare: string[]
  // Online: piattaforma e link della call (mostrato solo dopo l'iscrizione).
  piattaforma?: Piattaforma
  linkCall?: string
  // In presenza: luogo e posti.
  luogo?: string
  postiTotali?: number
  // Quante persone (oltre all'utente attuale) sono già iscritte. Pubblico solo il NUMERO, mai i nomi.
  iscritte: number
  inEvidenza?: boolean
}

export type Iscrizione = { nome: string; cognome: string }

export function fineEvento(e: Evento): number {
  return Date.parse(e.inizio) + e.durataMinuti * 60_000
}

export function eventoPassato(e: Evento, ora: number): boolean {
  return fineEvento(e) <= ora
}

export function eventoInCorso(e: Evento, ora: number): boolean {
  return Date.parse(e.inizio) <= ora && ora < fineEvento(e)
}

export function soldOut(e: Evento, iscrittiTotali: number): boolean {
  return e.postiTotali !== undefined && iscrittiTotali >= e.postiTotali
}

// "2h", "1h 30m", "45 min"
export function durataTesto(minuti: number): string {
  const h = Math.floor(minuti / 60)
  const m = minuti % 60
  if (h === 0) return `${m} min`
  return m ? `${h}h ${m}m` : `${h}h`
}

// Conto alla rovescia stile terminale: "12g 04h 33m".
export function contoAllaRovescia(ms: number): string {
  const minuti = Math.max(0, Math.floor(ms / 60_000))
  const g = Math.floor(minuti / 1440)
  const h = Math.floor((minuti % 1440) / 60)
  const m = minuti % 60
  const p = (n: number) => String(n).padStart(2, '0')
  return `${g}g ${p(h)}h ${p(m)}m`
}

const DATA = new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
const ORA = new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit' })

export function dataEvento(iso: string): string {
  return DATA.format(new Date(iso))
}

export function oraEvento(iso: string): string {
  return ORA.format(new Date(iso))
}

export function validaIscrizione(d: Iscrizione): Partial<Record<keyof Iscrizione, string>> {
  const errori: Partial<Record<keyof Iscrizione, string>> = {}
  if (!d.nome.trim()) errori.nome = 'Inserisci il tuo nome.'
  else if (d.nome.trim().length < 2) errori.nome = 'Il nome deve contenere almeno 2 caratteri.'
  if (!d.cognome.trim()) errori.cognome = 'Inserisci il tuo cognome.'
  else if (d.cognome.trim().length < 2) errori.cognome = 'Il cognome deve contenere almeno 2 caratteri.'
  return errori
}
