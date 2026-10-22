'use client'

import Link from 'next/link'
import { CARD } from '@/components/ctf/stili'
import { durataTesto } from '@/lib/eventi'
import { statoLezione, type Lezione, type Modulo, type StatoLezione } from '@/lib/lezioni'
import { useLezioni } from './LezioniProvider'
import { BadgeStatoLezione, CerchioStato } from './Stato'

function Riga({
  lezione,
  numero,
  stato,
  precedente,
}: {
  lezione: Lezione
  numero: number
  stato: StatoLezione
  precedente?: Lezione
}) {
  return (
    <>
      <CerchioStato stato={stato} etichetta={String(numero)} piccolo />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-text/50">
          LEZIONE {numero}
          {lezione.livello && <span className="text-hack"> · {lezione.livello.toUpperCase()}</span>}
        </p>
        <h3 className={`font-mono leading-snug font-bold ${stato === 'bloccata' ? 'text-text/60' : 'text-text'}`}>
          {lezione.titolo}
        </h3>
        {lezione.descrizione && <p className="mt-1 text-sm text-text/70">{lezione.descrizione}</p>}
        {stato === 'bloccata' && (
          <p className="mt-1 font-mono text-xs text-text/50">
            {precedente?.prova?.tipo === 'quiz'
              ? `Si sblocca superando il quiz della lezione ${numero - 1}.`
              : precedente?.prova?.tipo === 'flag'
                ? `Si sblocca trovando la flag della lezione ${numero - 1}.`
                : `Si sblocca completando la lezione ${numero - 1}.`}
          </p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <BadgeStatoLezione stato={stato} />
        <span className="font-mono text-xs text-text/60">
          {durataTesto(lezione.durataMinuti)}
          {lezione.xp > 0 && <span className="text-[#a98bff]"> · ⚡{lezione.xp} XP</span>}
        </span>
      </div>
    </>
  )
}

// Elenco delle lezioni di un modulo, con stato (completata / prossima / da fare / bloccata), durata e XP.
// Le lezioni bloccate non sono cliccabili: si sbloccano completando (o superando la prova de) la precedente.
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
            {stato === 'bloccata' ? (
              <div
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"
                aria-disabled="true"
              >
                <Riga lezione={l} numero={i + 1} stato={stato} precedente={modulo.lezioni[i - 1]} />
              </div>
            ) : (
              <Link
                href={`/lezioni/${modulo.slug}/${l.slug}`}
                className={`${CARD} flex items-center gap-4 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-5 ${
                  stato === 'prossima' ? 'border-brand/60' : ''
                } ${stato === 'completata' ? 'border-hack/40' : ''}`}
              >
                <Riga lezione={l} numero={i + 1} stato={stato} />
              </Link>
            )}
          </li>
        )
      })}
    </ol>
  )
}
