'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LINK, PULSANTE_SECONDARIO } from '@/components/ctf/stili'
import { useOra } from '@/components/ctf/useOra'
import AzioniIscrizione from '@/components/eventi/AzioniIscrizione'
import { BadgeInCorso } from '@/components/eventi/Badge'
import { DoveEvento, PostiEvento, QuandoEvento } from '@/components/eventi/InfoEvento'
import ModaleIscrizione from '@/components/eventi/ModaleIscrizione'
import IconaDiscord from '@/components/IconaDiscord'
import { LINK_ESTERNO, LINKS } from '@/config/links'
import { SESSIONI_LIVE } from '@/data/lezioni-mock'
import { eventoInCorso, eventoPassato } from '@/lib/eventi'
import { useLezioni } from './LezioniProvider'

type Props = {
  // Nella pagina di un modulo: la sua prossima sessione. Nella pagina di una lezione: la sessione indicata
  // in "sessioneLive" nel frontmatter. Se non c'è (o è già passata): la prossima in programma.
  modulo?: string
  sessioneId?: string
  // true = riquadro largo in cima al percorso; false = colonna laterale della lezione.
  largo?: boolean
}

// Pulsante verso il canale Discord delle domande sulle lezioni.
export function PulsanteDomandaDiscord({ className = '' }: { className?: string }) {
  return (
    <a href={LINKS.discordDomande} {...LINK_ESTERNO} className={`${PULSANTE_SECONDARIO} ${className}`}>
      <IconaDiscord className="h-4 w-4 text-brand" />
      Fai una domanda su Discord ↗
    </a>
  )
}

// "Prossima sessione live": stessa iscrizione degli Eventi (conferma, Iscritta ✓, annulla, link alla call
// solo dopo l'iscrizione, file .ics). Si vede solo il NUMERO di iscritte, mai i nomi.
export default function RiquadroSessione({ modulo, sessioneId, largo = false }: Props) {
  const { moduli, iscrizioni, iscritteTotali, iscriviti, annullaIscrizione } = useLezioni()
  const ora = useOra()
  const [modale, setModale] = useState<'chiusa' | 'aperta' | 'confermata'>('chiusa')

  const future = SESSIONI_LIVE.filter((s) => !eventoPassato(s, ora)).sort(
    (a, b) => Date.parse(a.inizio) - Date.parse(b.inizio),
  )
  const indicata = sessioneId ? future.find((s) => s.id === sessioneId) : undefined
  const delModulo = modulo ? future.find((s) => s.modulo === modulo) : undefined
  const sessione = indicata ?? delModulo ?? future[0]

  if (!sessione) {
    return (
      <section aria-label="Sessioni live" className="rounded-2xl border border-dashed border-white/15 p-5">
        <p className="font-mono text-sm text-text/60">
          <span className="text-hack">&gt;</span> Nessuna sessione live in programma
          <span className="cursor-blink">_</span>
        </p>
        <PulsanteDomandaDiscord className="mt-4 w-full" />
      </section>
    )
  }

  const iscritte = iscritteTotali(sessione)
  const modDellaSessione = moduli.find((m) => m.slug === sessione.modulo)
  const etichetta = indicata ? 'SESSIONE LIVE DI QUESTA LEZIONE' : 'PROSSIMA SESSIONE LIVE'

  return (
    <>
      <section
        id="sessione-live"
        aria-labelledby={`titolo-${sessione.id}`}
        className={`relative overflow-hidden rounded-2xl border border-brand/50 border-t-2 border-t-crimson bg-white/[0.04] p-5 shadow-[0_0_40px_-14px_rgba(109,68,224,0.6)] transition duration-300 starting:translate-y-2 starting:opacity-0 sm:p-6 ${
          iscrizioni[sessione.id] ? 'border-hack/70' : ''
        }`}
      >
        <div
          className={`flex flex-col gap-6 ${largo ? 'lg:flex-row lg:items-start lg:justify-between lg:gap-10' : ''}`}
        >
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.25em] text-hack">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
                </span>
                {etichetta}
              </span>
              {eventoInCorso(sessione, ora) && <BadgeInCorso />}
            </div>
            <h2
              id={`titolo-${sessione.id}`}
              className={`font-mono font-bold text-text ${largo ? 'text-xl sm:text-2xl' : 'text-lg'}`}
            >
              {sessione.titolo}
            </h2>
            <QuandoEvento evento={sessione} grande={largo} />
            <DoveEvento evento={sessione} />
            <PostiEvento evento={sessione} iscritte={iscritte} />
            {!indicata && modDellaSessione && modDellaSessione.slug !== modulo && (
              <p className="text-sm text-text/70">
                Modulo {modDellaSessione.numero}:{' '}
                <Link href={`/lezioni/${modDellaSessione.slug}`} className={LINK}>
                  {modDellaSessione.titolo} →
                </Link>
              </p>
            )}
          </div>

          <div className={`flex flex-col gap-3 ${largo ? 'lg:w-80 lg:shrink-0' : ''}`}>
            <AzioniIscrizione
              evento={sessione}
              iscrizione={iscrizioni[sessione.id]}
              iscritte={iscritte}
              onPartecipo={() => setModale('aperta')}
              onAnnulla={() => annullaIscrizione(sessione.id)}
              testoPulsante="Prenota il posto"
            />
            <PulsanteDomandaDiscord className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Fuori dal riquadro: la sua animazione (translate) sposterebbe la modale, che è "fixed". */}
      {modale !== 'chiusa' && (
        <ModaleIscrizione
          evento={sessione}
          iscritta={modale === 'confermata'}
          titolo="Prenota il posto"
          onConferma={(dati) => {
            iscriviti(sessione, dati)
            setModale('confermata')
          }}
          onChiudi={() => setModale('chiusa')}
        />
      )}
    </>
  )
}
