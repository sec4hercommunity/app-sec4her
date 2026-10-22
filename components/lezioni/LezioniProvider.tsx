'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { useEventi } from '@/components/eventi/useEventi'
import { COMPLETATE_INIZIALI, SESSIONI_LIVE } from '@/data/lezioni-mock'
import type { Evento, Iscrizione } from '@/lib/eventi'
import { xpTotali, type Modulo } from '@/lib/lezioni'

type ValoreLezioni = {
  moduli: Modulo[] // catalogo letto dal server (lib/catalogo.ts)
  completate: ReadonlySet<string> // id "modulo/lezione"
  segnaCompletata: (id: string, completata: boolean) => void
  xp: number // XP guadagnati (somma delle lezioni completate)
  // Sessioni live: stessa logica di iscrizione degli Eventi (solo il numero di iscritte è pubblico).
  iscrizioni: Record<string, Iscrizione>
  iscritteTotali: (s: Evento) => number
  iscriviti: (s: Evento, dati: Iscrizione) => void
  annullaIscrizione: (id: string) => void
}

const ContestoLezioni = createContext<ValoreLezioni | null>(null)

// Stato della sezione Lezioni condiviso tra percorso, moduli e lezioni, tenuto in memoria con React.
// Con Supabase: progressi, XP e iscrizioni verranno letti e scritti sul database
// (e le prove verificate sul server, non qui).
export default function LezioniProvider({ moduli, children }: { moduli: Modulo[]; children: ReactNode }) {
  const [completate, setCompletate] = useState<ReadonlySet<string>>(() => new Set(COMPLETATE_INIZIALI))
  const { iscrizioni, iscritteTotali, iscriviti, annullaIscrizione } = useEventi(SESSIONI_LIVE)

  function segnaCompletata(id: string, completata: boolean) {
    setCompletate((prima) => {
      const nuove = new Set(prima)
      if (completata) nuove.add(id)
      else nuove.delete(id)
      return nuove
    })
  }

  return (
    <ContestoLezioni.Provider
      value={{
        moduli,
        completate,
        segnaCompletata,
        xp: xpTotali(moduli, completate),
        iscrizioni,
        iscritteTotali,
        iscriviti,
        annullaIscrizione,
      }}
    >
      {children}
    </ContestoLezioni.Provider>
  )
}

export function useLezioni(): ValoreLezioni {
  const valore = useContext(ContestoLezioni)
  if (!valore) throw new Error('useLezioni va usato dentro <LezioniProvider>')
  return valore
}
