// Indice della sezione Note, costruito SUL SERVER dal catalogo delle lezioni (lib/catalogo.ts) e da config/note.ts.
// Contiene solo dati "da vetrina" (titolo, tag, argomenti): mai le prove (risposte dei quiz, flag).

import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import { AREE_NOTE, NOTE_INFO, type Area } from '@/config/note'
import { caricaCatalogo } from '@/lib/catalogo'
import type { Modulo } from '@/lib/lezioni'

export type Nota = {
  area: string // id dell'area
  slug: string // nome del file MDX
  modulo: string // cartella in content/lezioni/
  titolo: string
  breve: string
  livello?: string
  durataMinuti: number
  tag: string[]
  argomenti: string[] // titoli delle sezioni (## e ###), per l'anteprima e la ricerca
}

export type AreaConNote = Area & { note: Nota[] }

// Titoli "di servizio" che si ripetono in ogni lezione: non dicono nulla sull'argomento.
const TITOLI_GENERICI = /^(il filo( rosso| conduttore)?|il filo.*|payload|html risultante|contesto trovato)$/i

function argomenti(modulo: string, slug: string): string[] {
  try {
    const testo = fs.readFileSync(path.join(process.cwd(), 'content', 'lezioni', modulo, `${slug}.mdx`), 'utf8')
    const titoli = [...testo.matchAll(/^#{2,3}\s+(.+)$/gm)]
      .map((r) => r[1].replace(/[*_`]/g, '').trim())
      .filter((t) => t && !TITOLI_GENERICI.test(t.split(':')[0]))
    return [...new Set(titoli)]
  } catch {
    return []
  }
}

function notaDaLezione(area: Area, modulo: Modulo, i: number): Nota {
  const l = modulo.lezioni[i]
  const info = NOTE_INFO[`${modulo.slug}/${l.slug}`]
  return {
    area: area.id,
    slug: l.slug,
    modulo: modulo.slug,
    titolo: l.titolo,
    breve: info?.breve ?? '',
    livello: l.livello,
    durataMinuti: l.durataMinuti,
    tag: info?.tag ?? [],
    argomenti: argomenti(modulo.slug, l.slug),
  }
}

// Tutte le aree, ognuna con le sue note (solo le lezioni che hanno davvero un file MDX).
export const caricaNote = cache(async (): Promise<AreaConNote[]> => {
  const catalogo = await caricaCatalogo()
  return AREE_NOTE.map((area) => {
    const modulo = catalogo.find((m) => m.slug === area.modulo)
    const note = modulo
      ? modulo.lezioni.map((l, i) => (l.haContenuto ? notaDaLezione(area, modulo, i) : null)).filter((n) => n !== null)
      : []
    return { ...area, note }
  })
})

// Catalogo da dare al browser nelle pagine delle note: uguale a quello delle lezioni ma SENZA le prove,
// così risposte dei quiz e flag non finiscono nell'HTML.
export async function catalogoSenzaProve(): Promise<Modulo[]> {
  return (await caricaCatalogo()).map((m) => ({ ...m, lezioni: m.lezioni.map(({ prova: _prova, ...l }) => l) }))
}
