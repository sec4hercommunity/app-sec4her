// Tipi e regole della sezione Lezioni (indipendenti da dove arrivano i dati: mock oggi, Supabase domani).

import type { Evento } from './eventi'

export type DomandaQuiz = { domanda: string; opzioni: string[]; corretta: number; spiegazione?: string }

// Prova finale di una lezione: superarla completa la lezione, dà gli XP e sblocca la successiva.
// ⚠️ SOLO MOCK: risposte giuste e flag arrivano nel browser. In produzione vanno verificate lato server (Supabase).
export type Prova =
  { tipo: 'quiz'; soglia: number; domande: DomandaQuiz[] } | { tipo: 'flag'; flag: string; suggerimento?: string }

export type Lezione = {
  slug: string // nome del file MDX in content/lezioni/<modulo>/<slug>.mdx
  titolo: string
  durataMinuti: number
  xp: number
  ordine: number
  livello?: string // es. "Da zero", "Avanzato"
  avanzata?: boolean // true = lezione avanzata: si sblocca solo quando tutte le lezioni base del modulo sono fatte
  descrizione?: string
  sessioneLive?: string // id di una sessione in SESSIONI_LIVE
  prossima?: string // slug della lezione successiva nello stesso modulo
  prova?: Prova // senza prova: pulsante "Segna come completata"
  haContenuto: boolean // false = il file MDX non c'è ancora ("note in preparazione")
}

export type Modulo = {
  numero: number
  slug: string // nome della cartella in content/lezioni/
  titolo: string
  sottotitolo?: string // es. "OWASP Top 10"
  contenuto: string // cosa si impara (frase breve, per la mappa)
  approccio: string
  descrizione: string // testo della pagina del modulo
  aperto: boolean // false = 🔒 prossimamente
  lezioni: Lezione[]
}

export type StatoModulo = 'completato' | 'in-corso' | 'prossimamente'
export type StatoLezione = 'completata' | 'prossima' | 'da-fare' | 'bloccata'

// Sessione live settimanale: è un evento online (stessa iscrizione degli Eventi) legato a un modulo.
export type SessioneLive = Evento & { modulo: string }

// Identificativo unico di una lezione: "modulo/lezione".
export function idLezione(modulo: string, lezione: string): string {
  return `${modulo}/${lezione}`
}

export function lezioniCompletate(modulo: Modulo, completate: ReadonlySet<string>): number {
  return modulo.lezioni.filter((l) => completate.has(idLezione(modulo.slug, l.slug))).length
}

// "anteprima" (solo sviluppo, vedi config/anteprima.ts): con true un modulo chiuso risulta comunque apribile.
// Con il valore di default (false) la logica è identica a prima.
export function statoModulo(modulo: Modulo, completate: ReadonlySet<string>, anteprima = false): StatoModulo {
  if (!modulo.aperto) return anteprima ? 'in-corso' : 'prossimamente'
  if (modulo.lezioni.length > 0 && lezioniCompletate(modulo, completate) === modulo.lezioni.length) return 'completato'
  return 'in-corso'
}

// true se restano lezioni BASE (non avanzate) del modulo ancora da completare.
// Le lezioni avanzate si sbloccano solo quando questo è false ("completa prima le basi del modulo").
export function basiDaCompletare(modulo: Modulo, completate: ReadonlySet<string>): boolean {
  return modulo.lezioni.some((l) => !l.avanzata && !completate.has(idLezione(modulo.slug, l.slug)))
}

// Lucchetti: la prima lezione di un modulo aperto è sempre libera; le altre si sbloccano
// quando la lezione precedente è completata (per le lezioni con prova: quando la prova è superata).
// Le lezioni avanzate hanno un vincolo in più: restano bloccate finché non sono fatte tutte le basi del modulo.
// "anteprima" (solo sviluppo, vedi config/anteprima.ts): con true ogni lezione esistente è sbloccata.
// Con il valore di default (false) la logica è identica a prima.
export function lezioneSbloccata(
  modulo: Modulo,
  slug: string,
  completate: ReadonlySet<string>,
  anteprima = false,
): boolean {
  const i = modulo.lezioni.findIndex((l) => l.slug === slug)
  if (i < 0) return false
  if (anteprima) return true
  if (!modulo.aperto) return false
  if (modulo.lezioni[i].avanzata && basiDaCompletare(modulo, completate)) return false
  if (i === 0) return true
  return completate.has(idLezione(modulo.slug, modulo.lezioni[i - 1].slug))
}

// La "prossima" è la prima lezione sbloccata e non ancora completata del modulo.
// "anteprima" (solo sviluppo): con true nessuna lezione risulta "bloccata". Default false = logica identica a prima.
export function statoLezione(
  modulo: Modulo,
  lezione: Lezione,
  completate: ReadonlySet<string>,
  anteprima = false,
): StatoLezione {
  if (completate.has(idLezione(modulo.slug, lezione.slug))) return 'completata'
  if (!lezioneSbloccata(modulo, lezione.slug, completate, anteprima)) return 'bloccata'
  const prima = modulo.lezioni.find((l) => !completate.has(idLezione(modulo.slug, l.slug)))
  return prima?.slug === lezione.slug ? 'prossima' : 'da-fare'
}

// XP guadagnati: la somma degli XP delle lezioni completate.
export function xpTotali(moduli: Modulo[], completate: ReadonlySet<string>): number {
  return moduli
    .flatMap((m) => m.lezioni.filter((l) => completate.has(idLezione(m.slug, l.slug))))
    .reduce((somma, l) => somma + l.xp, 0)
}

// Quante risposte giuste servono per superare un quiz (es. 70% di 5 domande = 4).
export function risposteNecessarie(prova: { soglia: number; domande: unknown[] }): number {
  return Math.ceil((prova.soglia / 100) * prova.domande.length)
}

// ---------- Lettura del frontmatter (le proprietà in cima al file MDX, come in Obsidian) ----------

function testo(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

function numero(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

function elenco(v: unknown): string[] {
  return Array.isArray(v)
    ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '').map((x) => x.trim())
    : []
}

// "15 min" → 15, "1h 30m" → 90, 20 → 20
export function minuti(v: unknown): number {
  if (typeof v === 'number') return v
  const s = testo(v) ?? ''
  const ore = Number(s.match(/(\d+)\s*h/)?.[1] ?? 0)
  const min = Number(s.match(/(\d+)\s*(min|m\b)/)?.[1] ?? (ore ? 0 : (s.match(/\d+/)?.[0] ?? 0)))
  return ore * 60 + min
}

function leggiProva(v: unknown): Prova | undefined {
  if (!v || typeof v !== 'object') return undefined
  const p = v as Record<string, unknown>
  if (p.tipo === 'flag') {
    const flag = testo(p.flag)
    return flag ? { tipo: 'flag', flag, suggerimento: testo(p.suggerimento) } : undefined
  }
  if (p.tipo === 'quiz' && Array.isArray(p.domande)) {
    const domande = p.domande.flatMap((d): DomandaQuiz[] => {
      if (!d || typeof d !== 'object') return []
      const q = d as Record<string, unknown>
      const opzioni = elenco(q.opzioni)
      const corretta = numero(q.corretta)
      const domanda = testo(q.domanda)
      if (!domanda || opzioni.length < 2 || corretta === undefined || !opzioni[corretta]) return []
      return [{ domanda, opzioni, corretta, spiegazione: testo(q.spiegazione) }]
    })
    const soglia = Math.min(100, Math.max(0, numero(p.soglia) ?? 70))
    return domande.length ? { tipo: 'quiz', soglia, domande } : undefined
  }
  return undefined
}

// Trasforma il frontmatter di una lezione in una Lezione, senza fidarsi del formato:
// le proprietà mancanti o scritte male prendono un valore di riserva invece di rompere la pagina.
export function lezioneDaFrontmatter(raw: unknown, slugFile: string): Lezione {
  const p = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  return {
    slug: slugFile,
    titolo: testo(p.titolo) ?? slugFile,
    durataMinuti: minuti(p.durata),
    xp: numero(p.xp) ?? 0,
    ordine: numero(p.ordine) ?? 999,
    livello: testo(p.livello),
    avanzata: testo(p.livello)?.toLowerCase() === 'avanzato',
    sessioneLive: testo(p.sessioneLive),
    prossima: testo(p.prossima),
    prova: leggiProva(p.prova),
    haContenuto: true,
  }
}
