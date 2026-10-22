// Catalogo delle lezioni, letto SUL SERVER (durante la build) dai file MDX in content/lezioni/.
//
// Per ogni modulo di data/lezioni-mock.ts si guarda la cartella content/lezioni/<slug del modulo>/:
// ogni file .mdx è una lezione, e titolo, durata, xp, prova, prossima e sessioneLive arrivano dal suo frontmatter.
// Le lezioni sono ordinate con "ordine". Se la cartella non c'è, restano le lezioni di esempio del modulo.

import fs from 'node:fs'
import path from 'node:path'
import type { MDXContent } from 'mdx/types'
import { cache } from 'react'
import { MODULI_BASE } from '@/data/lezioni-mock'
import { lezioneDaFrontmatter, type Modulo } from '@/lib/lezioni'

type FileLezione = { default: MDXContent; frontmatter?: unknown }

const CARTELLA = path.join(process.cwd(), 'content', 'lezioni')

// Carica un file MDX di lezione (null se non esiste).
export async function caricaFileLezione(modulo: string, lezione: string): Promise<FileLezione | null> {
  try {
    return (await import(`@/content/lezioni/${modulo}/${lezione}.mdx`)) as FileLezione
  } catch {
    return null
  }
}

function fileMdx(modulo: string): string[] {
  try {
    return fs
      .readdirSync(path.join(CARTELLA, modulo))
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.slice(0, -'.mdx'.length))
  } catch {
    return []
  }
}

export const caricaCatalogo = cache(async (): Promise<Modulo[]> => {
  return Promise.all(
    MODULI_BASE.map(async (m) => {
      const nomi = fileMdx(m.slug)
      if (nomi.length === 0) return m
      const lezioni = await Promise.all(
        nomi.map(async (nome) => lezioneDaFrontmatter((await caricaFileLezione(m.slug, nome))?.frontmatter, nome)),
      )
      return { ...m, lezioni: lezioni.sort((a, b) => a.ordine - b.ordine) }
    }),
  )
})
