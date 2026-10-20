import type { ReactNode } from 'react'

type Tipo = 'nota' | 'attenzione' | 'suggerimento'

const STILE: Record<Tipo, { titolo: string; bordo: string; icona: string; colore: string }> = {
  nota: { titolo: 'Nota', bordo: 'border-brand bg-brand/10', icona: 'i', colore: 'bg-brand text-white' },
  attenzione: {
    titolo: 'Attenzione',
    bordo: 'border-crimson bg-crimson/15',
    icona: '!',
    colore: 'bg-crimson text-white',
  },
  suggerimento: { titolo: 'Suggerimento', bordo: 'border-hack bg-hack/10', icona: '✦', colore: 'bg-hack text-white' },
}

// Riquadro colorato in mezzo al testo: <Callout tipo="nota|attenzione|suggerimento" titolo="...">testo</Callout>
export default function Callout({
  tipo = 'nota',
  titolo,
  children,
}: {
  tipo?: Tipo
  titolo?: string
  children: ReactNode
}) {
  const s = STILE[tipo] ?? STILE.nota
  return (
    <aside className={`my-6 flex gap-3 rounded-xl border-l-4 px-4 py-4 sm:px-5 ${s.bordo}`}>
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${s.colore}`}
        aria-hidden="true"
      >
        {s.icona}
      </span>
      <div className="min-w-0 [&>p]:my-1 [&>p:first-of-type]:mt-0">
        <p className="font-mono text-sm font-bold text-text">{titolo ?? s.titolo}</p>
        {children}
      </div>
    </aside>
  )
}
