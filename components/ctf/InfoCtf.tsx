import { durataBreve, formattaData, type Ctf, type StatoCtf } from '@/lib/ctf'
import { ETICHETTA, LINK } from './stili'

// Date di inizio e fine.
export function DateCtf({ ctf, grande = false }: { ctf: Ctf; grande?: boolean }) {
  return (
    <p className={`font-mono text-text/70 ${grande ? 'text-sm sm:text-base' : 'text-xs'}`}>
      <time dateTime={ctf.inizio}>{formattaData(ctf.inizio)}</time>
      <span className="px-1.5 text-text/40">→</span>
      <time dateTime={ctf.fine}>{formattaData(ctf.fine)}</time>
    </p>
  )
}

// Conto alla rovescia: "inizia tra 3g 4h" (in arrivo) o "termina tra 5h" (in corso).
export function ContoAllaRovescia({ ctf, stato, ora }: { ctf: Ctf; stato: StatoCtf; ora: number }) {
  if (stato === 'concluso') return null
  const testo =
    stato === 'in-arrivo'
      ? `inizia tra ${durataBreve(Date.parse(ctf.inizio) - ora)}`
      : `termina tra ${durataBreve(Date.parse(ctf.fine) - ora)}`
  return (
    <p className="font-mono text-sm font-bold text-hack">
      &gt; {testo}
      <span className="cursor-blink">_</span>
    </p>
  )
}

// Formato e livello come piccole etichette.
export function EtichetteCtf({ ctf }: { ctf: Ctf }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className={ETICHETTA}>{ctf.formato}</span>
      <span className={ETICHETTA}>{ctf.livello}</span>
    </div>
  )
}

export function LinkCtftime({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`text-sm ${LINK}`}>
      Vedi su CTFtime ↗
    </a>
  )
}

// "3/5 gruppi" con barra di avanzamento.
export function BarraGruppi({ numero, massimo }: { numero: number; massimo: number }) {
  const percentuale = Math.min(100, Math.round((numero / massimo) * 100))
  const pieno = numero >= massimo
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between font-mono text-xs font-bold">
        <span className="text-text/70">Gruppi</span>
        <span className={pieno ? 'text-[#e0587f]' : 'text-text'}>
          {numero}/{massimo} gruppi
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label="Gruppi creati"
        aria-valuemin={0}
        aria-valuemax={massimo}
        aria-valuenow={numero}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${pieno ? 'bg-crimson' : 'bg-brand'}`}
          style={{ width: `${percentuale}%` }}
        />
      </div>
    </div>
  )
}
