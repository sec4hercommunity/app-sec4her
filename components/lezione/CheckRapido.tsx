'use client'

import { useId, useState } from 'react'

// Micro-domanda con risposta immediata, in mezzo al testo. NON conta per lo sblocco della lezione successiva.
// <CheckRapido domanda="..." opzioni={["80", "443", "25"]} corretta={1} />
export default function CheckRapido({
  domanda,
  opzioni = [],
  corretta,
}: {
  domanda: string
  opzioni?: string[]
  corretta: number
}) {
  const [scelta, setScelta] = useState<number | null>(null)
  const id = useId()
  const giusta = scelta === corretta

  return (
    <div
      role="group"
      aria-labelledby={id}
      className="my-8 rounded-2xl border border-dashed border-hack/50 bg-hack/[0.06] px-5 py-5"
    >
      <p className="font-mono text-xs font-bold tracking-[0.25em] text-hack">⚡ CHECK RAPIDO</p>
      <p id={id} className="mt-2 font-bold text-text">
        {domanda}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {opzioni.map((o, i) => {
          const scelta_ = scelta === i
          const colore =
            scelta === null
              ? 'border-white/15 hover:border-brand/60 hover:bg-white/5'
              : i === corretta && (giusta || scelta_)
                ? 'border-hack bg-hack/25 text-white'
                : scelta_
                  ? 'border-crimson bg-crimson/25 text-white'
                  : 'border-white/10 text-text/50'
          return (
            <button
              key={o}
              type="button"
              onClick={() => setScelta(i)}
              aria-pressed={scelta_}
              className={`min-w-14 cursor-pointer rounded-lg border px-4 py-2 font-mono text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${colore}`}
            >
              {o}
            </button>
          )
        })}
      </div>
      <p className="mt-3 min-h-6 font-mono text-sm" aria-live="polite">
        {scelta !== null &&
          (giusta ? (
            <span className="text-hack">✓ Esatto!</span>
          ) : (
            <span className="text-[#e0587f]">✗ Non proprio: riprova.</span>
          ))}
      </p>
    </div>
  )
}
