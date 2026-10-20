// Tipi e regole della sezione Lezioni (indipendenti da dove arrivano i dati: mock oggi, Supabase domani).

import type { Evento } from './eventi'

export type Lezione = {
  slug: string // nome del file MDX in content/lezioni/<modulo>/<slug>.mdx
  titolo: string
  durataMinuti: number
  descrizione: string
}

export type Modulo = {
  numero: number
  slug: string
  titolo: string
  sottotitolo?: string // es. "OWASP Top 10"
  contenuto: string // cosa si impara (frase breve, per la mappa)
  approccio: string
  descrizione: string // testo della pagina del modulo
  aperto: boolean // false = 🔒 prossimamente
  lezioni: Lezione[]
}

export type StatoModulo = 'completato' | 'in-corso' | 'prossimamente'
export type StatoLezione = 'completata' | 'prossima' | 'da-fare'

// Sessione live settimanale: è un evento online (stessa iscrizione degli Eventi) legato a una lezione.
export type SessioneLive = Evento & { modulo: string; lezione: string }

// Identificativo unico di una lezione: "modulo/lezione".
export function idLezione(modulo: string, lezione: string): string {
  return `${modulo}/${lezione}`
}

export function lezioniCompletate(modulo: Modulo, completate: ReadonlySet<string>): number {
  return modulo.lezioni.filter((l) => completate.has(idLezione(modulo.slug, l.slug))).length
}

export function statoModulo(modulo: Modulo, completate: ReadonlySet<string>): StatoModulo {
  if (!modulo.aperto) return 'prossimamente'
  if (modulo.lezioni.length > 0 && lezioniCompletate(modulo, completate) === modulo.lezioni.length) return 'completato'
  return 'in-corso'
}

// La "prossima" è la prima lezione non ancora completata del modulo.
export function statoLezione(modulo: Modulo, lezione: Lezione, completate: ReadonlySet<string>): StatoLezione {
  if (completate.has(idLezione(modulo.slug, lezione.slug))) return 'completata'
  const prima = modulo.lezioni.find((l) => !completate.has(idLezione(modulo.slug, l.slug)))
  return prima?.slug === lezione.slug ? 'prossima' : 'da-fare'
}

// Lezione successiva nel percorso (anche nel modulo dopo, se è aperto).
export function lezioneSuccessiva(
  moduli: Modulo[],
  modulo: string,
  lezione: string,
): { modulo: Modulo; lezione: Lezione } | undefined {
  const tutte = moduli.filter((m) => m.aperto).flatMap((m) => m.lezioni.map((l) => ({ modulo: m, lezione: l })))
  const i = tutte.findIndex((x) => x.modulo.slug === modulo && x.lezione.slug === lezione)
  return i >= 0 ? tutte[i + 1] : undefined
}

// Proprietà scritte in cima al file MDX (tra ---): in Obsidian sono le "Proprietà" della nota.
export type ProprietaLezione = {
  filo?: string
  lab?: string // nome del lab
  lab_link?: string // link al lab (solo https://)
  domande: string[] // "Domande da farti": niente soluzioni pronte
  bottino: string[]
  compito?: string
  prossima?: string // anteprima della lezione successiva
}

function testo(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

function elenco(v: unknown): string[] {
  return Array.isArray(v)
    ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '').map((x) => x.trim())
    : []
}

// Accetta solo link https://, così una proprietà scritta male non diventa mai un link pericoloso (es. javascript:).
export function linkSicuro(v: unknown): string | undefined {
  const s = testo(v)
  if (!s) return undefined
  try {
    return new URL(s).protocol === 'https:' ? s : undefined
  } catch {
    return undefined
  }
}

// Legge le proprietà della lezione senza fidarsi del formato: quelle mancanti o sbagliate vengono ignorate.
export function leggiProprieta(raw: unknown): ProprietaLezione {
  const p = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  return {
    filo: testo(p.filo),
    lab: testo(p.lab),
    lab_link: linkSicuro(p.lab_link),
    domande: elenco(p.domande),
    bottino: elenco(p.bottino),
    compito: testo(p.compito),
    prossima: testo(p.prossima),
  }
}
