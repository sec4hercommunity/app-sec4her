import { durataTesto, dataEvento, oraEvento, TEMI, type Evento } from '@/lib/eventi'
import { ETICHETTA } from '@/components/ctf/stili'
import { EtichettaPiattaforma, IconaTema } from './Icone'

// Tema con la sua icona.
export function TemaEvento({ evento }: { evento: Evento }) {
  return (
    <span className={`${ETICHETTA} gap-1.5`}>
      <IconaTema tema={evento.tema} className="h-3.5 w-3.5 text-hack" />
      {TEMI[evento.tema]}
    </span>
  )
}

// Data, ora e durata.
export function QuandoEvento({ evento, grande = false }: { evento: Evento; grande?: boolean }) {
  return (
    <p className={`font-mono text-text/70 ${grande ? 'text-sm sm:text-base' : 'text-xs'}`}>
      <time dateTime={evento.inizio}>
        {dataEvento(evento.inizio)} · ore {oraEvento(evento.inizio)}
      </time>
      <span className="text-text/40"> · </span>
      {durataTesto(evento.durataMinuti)}
    </p>
  )
}

// Dove: luogo (in presenza) o piattaforma (online).
export function DoveEvento({ evento }: { evento: Evento }) {
  if (evento.modalita === 'online' && evento.piattaforma) return <EtichettaPiattaforma piattaforma={evento.piattaforma} />
  if (evento.luogo) {
    return (
      <p className="flex items-start gap-1.5 text-sm text-text/80">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 h-4 w-4 shrink-0 text-hack"
          aria-hidden="true"
        >
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>{evento.luogo}</span>
      </p>
    )
  }
  return null
}

// "18/30 iscritte" con barra (in presenza) oppure solo il numero (online). Mai i nomi.
export function PostiEvento({ evento, iscritte }: { evento: Evento; iscritte: number }) {
  if (evento.postiTotali === undefined) {
    return (
      <p className="font-mono text-xs font-bold text-text/70">
        <span className="text-text">{iscritte}</span> {iscritte === 1 ? 'iscritta' : 'iscritte'}
      </p>
    )
  }
  const pieno = iscritte >= evento.postiTotali
  const liberi = Math.max(0, evento.postiTotali - iscritte)
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between font-mono text-xs font-bold">
        <span className="text-text/70">{pieno ? 'Posti esauriti' : `${liberi} ${liberi === 1 ? 'posto libero' : 'posti liberi'}`}</span>
        <span className={pieno ? 'text-[#e0587f]' : 'text-text'}>
          {iscritte}/{evento.postiTotali} posti
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label="Posti occupati"
        aria-valuemin={0}
        aria-valuemax={evento.postiTotali}
        aria-valuenow={iscritte}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${pieno ? 'bg-crimson' : 'bg-hack'}`}
          style={{ width: `${Math.min(100, Math.round((iscritte / evento.postiTotali) * 100))}%` }}
        />
      </div>
    </div>
  )
}
