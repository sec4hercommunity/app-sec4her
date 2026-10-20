import { Fragment, type ReactNode } from 'react'

// Riquadro per diagrammi e schemi: <Schema titolo="..." didascalia="...">contenuto</Schema>
export default function Schema({
  titolo,
  didascalia,
  children,
}: {
  titolo?: string
  didascalia?: string
  children: ReactNode
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-dashed border-brand/50 bg-brand/[0.06]">
      {titolo && (
        <p className="border-b border-dashed border-brand/40 px-4 py-2 font-mono text-xs font-bold tracking-[0.2em] text-hack sm:px-5">
          <span aria-hidden="true">◇ </span>SCHEMA · {titolo.toUpperCase()}
        </p>
      )}
      <div className="px-4 py-6 sm:px-6 [&>p]:my-2">{children}</div>
      {didascalia && (
        <figcaption className="border-t border-white/5 px-4 py-2 text-center text-xs text-text/60 sm:px-5">
          {didascalia}
        </figcaption>
      )}
    </figure>
  )
}

// Passi collegati da frecce (in orizzontale su schermo largo, in verticale su telefono):
// <Flusso passi="Browser, Caido, Server" />
export function Flusso({ passi, evidenzia }: { passi: string; evidenzia?: string }) {
  const elenco = passi
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
      {elenco.map((p, i) => (
        <Fragment key={`${p}-${i}`}>
          {i > 0 && (
            <span className="font-mono text-lg font-bold text-hack" aria-hidden="true">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          )}
          <span
            className={`rounded-xl border px-4 py-2.5 text-center font-mono text-sm font-bold ${
              p === evidenzia
                ? 'border-brand bg-brand text-white shadow-[0_0_24px_-4px_rgba(109,68,224,0.8)]'
                : 'border-white/15 bg-ink text-text'
            }`}
          >
            {p}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
