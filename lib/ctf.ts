// Tipi e regole della sezione CTF Groups (indipendenti da dove arrivano i dati: mock oggi, Supabase domani).

import { FORMATI, LIVELLI, PREFISSO_CTFTIME } from '@/config/ctf'

export type Formato = (typeof FORMATI)[number]
export type Livello = (typeof LIVELLI)[number]

export type Ctf = {
  id: string
  nome: string
  linkCtftime: string
  inizio: string // data e ora in formato ISO
  fine: string
  formato: Formato
  livello: Livello
  descrizione: string
}

export type Membro = { email: string; nome: string }

export type Gruppo = {
  id: string
  ctfId: string
  nome: string
  nota: string
  membri: Membro[]
}

export type StatoCtf = 'in-arrivo' | 'in-corso' | 'concluso'

export function statoCtf(ctf: Ctf, ora: number): StatoCtf {
  if (ora < Date.parse(ctf.inizio)) return 'in-arrivo'
  if (ora < Date.parse(ctf.fine)) return 'in-corso'
  return 'concluso'
}

// Durata in forma breve: "3g 4h", "5h 20m", "12m".
export function durataBreve(ms: number): string {
  const minuti = Math.max(1, Math.floor(ms / 60_000))
  const g = Math.floor(minuti / 1440)
  const h = Math.floor((minuti % 1440) / 60)
  const m = minuti % 60
  if (g > 0) return h > 0 ? `${g}g ${h}h` : `${g}g`
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`
  return `${m}m`
}

const FORMATO_DATA = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formattaData(iso: string): string {
  return FORMATO_DATA.format(new Date(iso))
}

// Iniziali per gli avatar: "Giulia Rossi" → "GR", "test" → "TE".
export function iniziali(nome: string): string {
  const parole = nome.trim().split(/\s+/).filter(Boolean)
  if (parole.length >= 2) return (parole[0][0] + parole[1][0]).toUpperCase()
  return (parole[0] ?? '?').slice(0, 2).toUpperCase()
}

// Nome mostrato per l'utente di test (finché non ci sono profili veri): "test@sec4her.com" → "Test".
export function nomeDaEmail(email: string): string {
  const base = email.split('@')[0] || email
  return base.charAt(0).toUpperCase() + base.slice(1)
}

// Identificativo leggibile per gli indirizzi: "CTF Hunter" → "ctf-hunter-k3x9".
export function nuovoId(testo: string): string {
  const slug = testo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  return `${slug || 'id'}-${Math.random().toString(36).slice(2, 6)}`
}

// ---- Validazione dei moduli ----

export type DatiNuovoCtf = {
  nome: string
  linkCtftime: string
  inizio: string // valore di <input type="datetime-local">
  fine: string
  formato: string
  livello: string
  descrizione: string
}

export const DESCRIZIONE_MAX = 200
export const NOTA_MAX = 120

export function validaNuovoCtf(d: DatiNuovoCtf): Partial<Record<keyof DatiNuovoCtf, string>> {
  const errori: Partial<Record<keyof DatiNuovoCtf, string>> = {}
  if (!d.nome.trim()) errori.nome = 'Inserisci il nome del CTF.'
  else if (d.nome.trim().length < 2) errori.nome = 'Il nome deve contenere almeno 2 caratteri.'

  const link = d.linkCtftime.trim()
  if (!link) errori.linkCtftime = 'Inserisci il link di CTFtime.'
  else if (!link.startsWith(PREFISSO_CTFTIME) || link.length === PREFISSO_CTFTIME.length)
    errori.linkCtftime = `Il link deve iniziare con ${PREFISSO_CTFTIME}`

  if (!d.inizio) errori.inizio = 'Inserisci la data di inizio.'
  if (!d.fine) errori.fine = 'Inserisci la data di fine.'
  else if (d.inizio && Date.parse(d.fine) <= Date.parse(d.inizio))
    errori.fine = 'La data di fine deve essere dopo la data di inizio.'

  if (!(FORMATI as readonly string[]).includes(d.formato)) errori.formato = 'Scegli il formato.'
  if (!(LIVELLI as readonly string[]).includes(d.livello)) errori.livello = 'Scegli il livello.'
  if (d.descrizione.trim().length > DESCRIZIONE_MAX)
    errori.descrizione = `La descrizione può avere al massimo ${DESCRIZIONE_MAX} caratteri.`
  return errori
}

export function validaNomeGruppo(nome: string, gruppiEsistenti: Gruppo[]): string {
  const pulito = nome.trim()
  if (!pulito) return 'Inserisci il nome del gruppo.'
  if (pulito.length < 2) return 'Il nome deve contenere almeno 2 caratteri.'
  if (pulito.length > 30) return 'Il nome può avere al massimo 30 caratteri.'
  if (gruppiEsistenti.some((g) => g.nome.toLowerCase() === pulito.toLowerCase()))
    return 'Esiste già un gruppo con questo nome.'
  return ''
}
