import { contoAllaRovescia, eventoInCorso, soldOut, type Evento, type Iscrizione } from '@/lib/eventi'
import AzioniIscrizione from './AzioniIscrizione'
import { BadgeInCorso, BadgeModalita, BadgeSoldOut } from './Badge'
import { DoveEvento, PostiEvento, QuandoEvento, TemaEvento } from './InfoEvento'

type Props = {
  evento: Evento
  iscritte: number
  iscrizione: Iscrizione | undefined
  ora: number
  onPartecipo: () => void
  onAnnulla: () => void
}

// Evento del mese: card grande in evidenza con conto alla rovescia stile terminale.
export default function CardEventoMese({ evento, iscritte, iscrizione, ora, onPartecipo, onAnnulla }: Props) {
  const inCorso = eventoInCorso(evento, ora)

  return (
    <article className="relative overflow-hidden rounded-2xl border border-brand/50 border-t-2 border-t-crimson bg-white/[0.04] p-6 shadow-[0_0_48px_-12px_rgba(109,68,224,0.55)] transition duration-300 starting:translate-y-3 starting:opacity-0 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-hack">★ EVENTO DEL MESE</span>
            <BadgeModalita modalita={evento.modalita} />
            {inCorso && <BadgeInCorso />}
            {soldOut(evento, iscritte) && !iscrizione && <BadgeSoldOut />}
          </div>
          <h2 className="mt-3 font-mono text-2xl font-bold text-text sm:text-4xl">{evento.titolo}</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            <TemaEvento evento={evento} />
          </div>

          <div className="mt-4 space-y-2">
            <QuandoEvento evento={evento} grande />
            <DoveEvento evento={evento} />
          </div>

          <p className="mt-5 max-w-2xl text-text/80">{evento.descrizione}</p>

          {evento.cosaPortare.length > 0 && (
            <div className="mt-5">
              <p className="font-mono text-sm font-bold text-text">
                <span className="text-hack">&gt;</span> Cosa portare
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {evento.cosaPortare.map((cosa) => (
                  <li key={cosa} className="rounded-lg border border-white/10 bg-ink/60 px-3 py-1 font-mono text-xs text-text/80">
                    {cosa}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 max-w-md">
            <PostiEvento evento={evento} iscritte={iscritte} />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:w-[22rem]">
          <div className="rounded-xl border border-white/10 bg-ink/80 p-5 font-mono">
            <p className="text-xs text-text/50">$ countdown --evento {evento.id.split('-')[0]}</p>
            {inCorso ? (
              <p className="mt-3 text-2xl font-bold text-hack sm:text-3xl">
                &gt; in corso ora<span className="cursor-blink">_</span>
              </p>
            ) : (
              <p className="mt-3 whitespace-nowrap text-3xl font-bold text-hack" aria-label={`Inizia tra ${contoAllaRovescia(Date.parse(evento.inizio) - ora)}`}>
                &gt; {contoAllaRovescia(Date.parse(evento.inizio) - ora)}
                <span className="cursor-blink">_</span>
              </p>
            )}
          </div>
          <AzioniIscrizione
            evento={evento}
            iscrizione={iscrizione}
            iscritte={iscritte}
            onPartecipo={onPartecipo}
            onAnnulla={onAnnulla}
          />
        </div>
      </div>
    </article>
  )
}
