'use client'

import { PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from '@/components/ctf/stili'
import { LINK_ESTERNO } from '@/config/links'
import { scaricaIcs } from '@/lib/ics'
import { soldOut, type Evento, type Iscrizione } from '@/lib/eventi'

// Link alla call (solo eventi online e solo dopo l'iscrizione) + "Aggiungi al calendario".
export function DopoIscrizione({ evento }: { evento: Evento }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {evento.modalita === 'online' && evento.linkCall && (
        <a href={evento.linkCall} {...LINK_ESTERNO} className={PULSANTE_PRIMARIO}>
          Entra nella call ↗
        </a>
      )}
      <button type="button" onClick={() => scaricaIcs(evento, evento.linkCall)} className={PULSANTE_SECONDARIO}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-hack"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5h5" />
        </svg>
        Aggiungi al calendario
      </button>
    </div>
  )
}

export function LinkNascosto() {
  return (
    <p className="flex items-center gap-2 font-mono text-xs text-text/60">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      >
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      Il link sarà visibile dopo l&apos;iscrizione
    </p>
  )
}

type Props = {
  evento: Evento
  iscrizione: Iscrizione | undefined
  iscritte: number
  onPartecipo: () => void
  onAnnulla: () => void
  // Testo del pulsante di iscrizione (le sessioni live delle Lezioni usano "Prenota il posto").
  testoPulsante?: string
}

// Pulsanti di una card evento futura: Partecipo / Sold out / Iscritta ✓ + Annulla iscrizione.
export default function AzioniIscrizione({ evento, iscrizione, iscritte, onPartecipo, onAnnulla, testoPulsante = 'Partecipo' }: Props) {
  if (iscrizione) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="inline-flex items-center rounded-lg border border-hack bg-hack/20 px-4 py-2.5 font-mono text-sm font-bold text-text">
            Iscritta ✓
          </p>
          <button
            type="button"
            onClick={onAnnulla}
            className="cursor-pointer rounded-lg px-2 py-2 font-mono text-sm font-bold text-[#e0587f] transition hover:bg-crimson/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
          >
            Annulla iscrizione
          </button>
        </div>
        <DopoIscrizione evento={evento} />
      </div>
    )
  }

  const esaurito = soldOut(evento, iscritte)
  return (
    <div className="space-y-3">
      <button type="button" onClick={onPartecipo} disabled={esaurito} className={`${PULSANTE_PRIMARIO} w-full sm:w-auto`}>
        {esaurito ? 'Sold out' : testoPulsante}
      </button>
      {evento.modalita === 'online' && <LinkNascosto />}
    </div>
  )
}
