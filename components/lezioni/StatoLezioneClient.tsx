'use client'

import { PULSANTE_PRIMARIO } from '@/components/ctf/stili'
import { idLezione, statoLezione } from '@/lib/lezioni'
import { useLezioni } from './LezioniProvider'
import { BadgeStatoLezione } from './Stato'

type Props = { modulo: string; lezione: string }

// Badge con lo stato attuale della lezione (cambia quando la segni come completata).
export function BadgeLezioneAttuale({ modulo, lezione }: Props) {
  const { moduli, completate } = useLezioni()
  const m = moduli.find((x) => x.slug === modulo)
  const l = m?.lezioni.find((x) => x.slug === lezione)
  if (!m || !l) return null
  return <BadgeStatoLezione stato={statoLezione(m, l, completate)} />
}

// "Segna come completata": aggiorna lo stato nel percorso (mappa, modulo e barra di avanzamento).
export function PulsanteCompletata({ modulo, lezione }: Props) {
  const { completate, segnaCompletata } = useLezioni()
  const id = idLezione(modulo, lezione)
  const fatta = completate.has(id)

  if (fatta) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2" role="status">
        <p className="inline-flex items-center rounded-lg border border-hack bg-hack/20 px-4 py-2.5 font-mono text-sm font-bold text-text">
          Completata ✓
        </p>
        <button
          type="button"
          onClick={() => segnaCompletata(id, false)}
          className="cursor-pointer rounded-lg px-2 py-2 font-mono text-sm font-bold text-text/60 transition hover:bg-white/10 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Segna come da fare
        </button>
      </div>
    )
  }

  return (
    <button type="button" onClick={() => segnaCompletata(id, true)} className={`${PULSANTE_PRIMARIO} w-full sm:w-auto`}>
      Segna come completata
    </button>
  )
}
