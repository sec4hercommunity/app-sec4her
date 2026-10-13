import { CARD } from '@/components/ctf/stili'
import { soldOut, type Evento, type Iscrizione } from '@/lib/eventi'
import AzioniIscrizione from './AzioniIscrizione'
import { BadgeConcluso, BadgeInCorso, BadgeModalita, BadgeSoldOut } from './Badge'
import { DoveEvento, PostiEvento, QuandoEvento, TemaEvento } from './InfoEvento'

type Props = {
  evento: Evento
  iscritte: number
  iscrizione: Iscrizione | undefined
  passato: boolean
  inCorso: boolean
  onPartecipo: () => void
  onAnnulla: () => void
}

// Card di un evento nella griglia (prossimi eventi) o nell'archivio (eventi passati, in grigio).
export default function CardEvento({ evento, iscritte, iscrizione, passato, inCorso, onPartecipo, onAnnulla }: Props) {
  const esaurito = soldOut(evento, iscritte)

  return (
    <article
      className={`${CARD} flex flex-col gap-4 p-5 starting:translate-y-2 starting:opacity-0 ${
        passato ? 'opacity-60 grayscale hover:opacity-90' : ''
      } ${iscrizione ? 'border-hack/70' : ''}`}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg font-bold leading-snug text-text">{evento.titolo}</h3>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {passato ? <BadgeConcluso /> : <BadgeModalita modalita={evento.modalita} />}
          {!passato && inCorso && <BadgeInCorso />}
          {!passato && esaurito && !iscrizione && <BadgeSoldOut />}
        </div>
      </header>

      <div className="space-y-2">
        <QuandoEvento evento={evento} />
        <DoveEvento evento={evento} />
      </div>

      <div className="flex flex-wrap gap-2">
        <TemaEvento evento={evento} />
        {passato && <BadgeModalita modalita={evento.modalita} spento />}
      </div>

      <p className="line-clamp-3 text-sm text-text/70">{evento.descrizione}</p>

      <div className="mt-auto space-y-4">
        <PostiEvento evento={evento} iscritte={iscritte} />
        {!passato && (
          <AzioniIscrizione
            evento={evento}
            iscrizione={iscrizione}
            iscritte={iscritte}
            onPartecipo={onPartecipo}
            onAnnulla={onAnnulla}
          />
        )}
      </div>
    </article>
  )
}
