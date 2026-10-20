'use client'

import Link from 'next/link'
import { CARD } from '@/components/ctf/stili'
import { MODULI } from '@/data/lezioni-mock'
import { lezioniCompletate, statoModulo, type StatoModulo } from '@/lib/lezioni'
import { useLezioni } from './LezioniProvider'
import { BadgeStatoModulo, CerchioStato } from './Stato'

// Colore della linea che parte da un modulo verso il successivo.
const LINEA: Record<StatoModulo, string> = {
  completato: 'bg-hack',
  'in-corso': 'bg-linear-to-b from-brand to-white/15 lg:bg-linear-to-r',
  prossimamente: 'bg-white/10',
}

// Mappa dei 7 moduli collegati da una linea: orizzontale su schermo largo, verticale su telefono.
export default function MappaPercorso() {
  const { completate } = useLezioni()

  return (
    <ol className="grid gap-4 lg:grid-cols-7 lg:gap-3">
      {MODULI.map((m, i) => {
        const stato = statoModulo(m, completate)
        const fatte = lezioniCompletate(m, completate)
        const numero = String(m.numero).padStart(2, '0')
        const contenuto = (
          <>
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-text/50">MODULO {numero}</p>
            <h3
              className={`mt-1 font-mono text-base font-bold leading-snug ${stato === 'prossimamente' ? 'text-text/60' : 'text-text'}`}
            >
              {m.titolo}
            </h3>
            {m.sottotitolo && <p className="font-mono text-xs text-text/60">({m.sottotitolo})</p>}
            <div className="mt-3 flex flex-wrap items-center gap-2 lg:flex-col lg:items-start">
              <BadgeStatoModulo stato={stato} compatto />
              {m.aperto && (
                <span className="font-mono text-xs text-text/60">
                  {fatte}/{m.lezioni.length} lezioni
                </span>
              )}
            </div>
          </>
        )

        return (
          <li
            key={m.slug}
            className="relative flex gap-4 transition duration-500 starting:translate-y-2 starting:opacity-0 lg:flex-col lg:items-center lg:gap-4"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {i < MODULI.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute top-12 -bottom-4 left-6 w-0.5 -translate-x-1/2 lg:top-6 lg:bottom-auto lg:left-[calc(50%+1.5rem)] lg:h-0.5 lg:w-[calc(100%+0.75rem-3rem)] lg:translate-x-0 lg:-translate-y-1/2 ${LINEA[stato]}`}
              />
            )}
            <CerchioStato stato={stato} etichetta={numero} />
            {m.aperto ? (
              <Link
                href={`/lezioni/${m.slug}`}
                className={`${CARD} block min-w-0 flex-1 p-4 focus:outline-none lg:p-3 focus-visible:ring-2 focus-visible:ring-brand lg:w-full ${
                  stato === 'in-corso' ? 'border-brand/60 shadow-[0_0_28px_-10px_rgba(109,68,224,0.7)]' : ''
                } ${stato === 'completato' ? 'border-hack/50' : ''}`}
              >
                {contenuto}
              </Link>
            ) : (
              <div
                className="min-w-0 flex-1 rounded-2xl border border-white/5 bg-white/[0.02] p-4 lg:w-full lg:p-3"
                aria-disabled="true"
              >
                {contenuto}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
