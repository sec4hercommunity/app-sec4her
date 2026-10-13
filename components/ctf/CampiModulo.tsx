import type { SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

// Menu a tendina e area di testo con lo stesso aspetto di components/Campo.tsx.

const BASE =
  'w-full rounded-lg border bg-ink/80 px-4 py-3 text-text placeholder:text-text/30 outline-none transition focus:ring-2'

function bordo(errore?: string) {
  return errore ? 'border-crimson focus:ring-crimson/40' : 'border-white/15 focus:border-brand focus:ring-brand/40'
}

function Etichetta({ id, testo }: { id: string; testo: string }) {
  return (
    <label htmlFor={id} className="mb-1.5 block font-mono text-sm font-bold text-text/80">
      {testo}
    </label>
  )
}

function Errore({ id, errore }: { id: string; errore?: string }) {
  if (!errore) return null
  return (
    <p id={`${id}-errore`} role="alert" className="mt-1.5 text-sm text-[#e0587f]">
      {errore}
    </p>
  )
}

type PropsSelezione = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  etichetta: string
  opzioni: readonly string[]
  errore?: string
}

export function Selezione({ id, etichetta, opzioni, errore, ...props }: PropsSelezione) {
  return (
    <div>
      <Etichetta id={id} testo={etichetta} />
      <select
        id={id}
        name={id}
        aria-invalid={errore ? 'true' : 'false'}
        aria-describedby={errore ? `${id}-errore` : undefined}
        className={`${BASE} ${bordo(errore)} cursor-pointer`}
        {...props}
      >
        <option value="">Scegli…</option>
        {opzioni.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Errore id={id} errore={errore} />
    </div>
  )
}

type PropsArea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string
  etichetta: string
  errore?: string
  massimo: number
}

export function AreaTesto({ id, etichetta, errore, massimo, value, ...props }: PropsArea) {
  const lunghezza = String(value ?? '').length
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <Etichetta id={id} testo={etichetta} />
        <span className={`font-mono text-xs ${lunghezza > massimo ? 'text-[#e0587f]' : 'text-text/40'}`}>
          {lunghezza}/{massimo}
        </span>
      </div>
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        aria-invalid={errore ? 'true' : 'false'}
        aria-describedby={errore ? `${id}-errore` : undefined}
        className={`${BASE} ${bordo(errore)} resize-none`}
        {...props}
      />
      <Errore id={id} errore={errore} />
    </div>
  )
}
