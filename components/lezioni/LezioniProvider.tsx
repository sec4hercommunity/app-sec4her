'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useEventi } from '@/components/eventi/useEventi'
import { anteprimaAttiva, PARAM_ANTEPRIMA } from '@/config/anteprima'
import { COMPLETATE_INIZIALI, SESSIONI_LIVE } from '@/data/lezioni-mock'
import type { Evento, Iscrizione } from '@/lib/eventi'
import { xpTotali, type Modulo } from '@/lib/lezioni'
import AvvisoAnteprima from './AvvisoAnteprima'

type ValoreLezioni = {
  moduli: Modulo[] // catalogo letto dal server (lib/catalogo.ts)
  completate: ReadonlySet<string> // id "modulo/lezione"
  segnaCompletata: (id: string, completata: boolean) => void
  xp: number // XP guadagnati (somma delle lezioni completate)
  // Modalità anteprima (SOLO sviluppo, config/anteprima.ts): true = lucchetti ignorati.
  anteprima: boolean
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

  // Modalità anteprima (SOLO sviluppo). All'inizio conta solo il flag in config (così server e client combaciano);
  // dopo il montaggio si aggiunge il parametro ?anteprima=1 dell'URL, letto nel browser.
  const [anteprima, setAnteprima] = useState(() => anteprimaAttiva())
  useEffect(() => {
    if (anteprima) return
    // Leggiamo l'URL (sistema esterno) solo dopo il montaggio: così il primo render combacia con il server
    // ed evitiamo un mismatch di idratazione. Questo setState nell'effetto è voluto e corretto.
    const param = new URLSearchParams(window.location.search).get(PARAM_ANTEPRIMA)
    // oxlint-disable-next-line react/set-state-in-effect
    if (anteprimaAttiva(param)) setAnteprima(true)
  }, [anteprima])

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
        anteprima,
        iscrizioni,
        iscritteTotali,
        iscriviti,
        annullaIscrizione,
      }}
    >
      {anteprima && <AvvisoAnteprima />}
      {children}
    </ContestoLezioni.Provider>
  )
}

export function useLezioni(): ValoreLezioni {
  const valore = useContext(ContestoLezioni)
  if (!valore) throw new Error('useLezioni va usato dentro <LezioniProvider>')
  return valore
}
