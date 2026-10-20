'use client'

import Link from 'next/link'
import { CARD } from '@/components/ctf/stili'
import { durataTesto } from '@/lib/eventi'
import { statoLezione, type Modulo } from '@/lib/lezioni'
import { useLezioni } from './LezioniProvider'
import { BadgeStatoLezione, CerchioStato } from './Stato'

// Elenco delle lezioni di un modulo, con stato (completata / prossima / da fare) e durata.
export default function ElencoLezioni({ modulo }: { modulo: Modulo }) {
  const { completate } = useLezioni()

  return (
    <ol className="space-y-3">
      {modulo.lezioni.map((l, i) => {
        const stato = statoLezione(modulo, l, completate)
        return (
          <li
            key={l.slug}
            className="transition duration-500 starting:translate-y-2 starting:opacity-0"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <Link
              href={`/lezioni/${modulo.slug}/${l.slug}`}
              className={`${CARD} flex items-center gap-4 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-5 ${
                stato === 'prossima' ? 'border-brand/60' : ''
              } ${stato === 'completata' ? 'border-hack/40' : ''}`}
            >
              <CerchioStato stato={stato} etichetta={String(i + 1)} piccolo />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-text/50">LEZIONE {i + 1}</p>
                <h3 className="font-mono font-bold leading-snug text-text">{l.titolo}</h3>
                <p className="mt-1 text-sm text-text/70">{l.descrizione}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <BadgeStatoLezione stato={stato} />
                <span className="font-mono text-xs text-text/60">{durataTesto(l.durataMinuti)}</span>
              </div>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
