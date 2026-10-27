'use client'

import { useEffect, useState } from 'react'

// Una pallina "input" che va da SOURCE a SINK attraverso l'app. L'interruttore "c'è una guardia?"
// decide se in mezzo c'è un sanitizer: con la guardia la pallina si ferma (✓ sicuro), senza arriva al
// sink e detona (💥 vulnerabile). Per Injection / SSRF (e in generale source → sink).
//
// <SourceSink
//   source="form / URL / header"
//   sink="query al database"
//   guardia="query parametrizzata"
//   sicuro="Il dato viaggia separato dal comando: resta un valore, non diventa sintassi."
//   vulnerabile="L'input raggiunge la query come codice e cambia ciò che fa, non solo ciò che cerca."
// />

export default function SourceSink({
  source = 'input non fidato',
  sink = 'operazione pericolosa',
  guardia = 'una guardia',
  sicuro,
  vulnerabile,
}: {
  source?: string
  sink?: string
  guardia?: string
  sicuro?: string
  vulnerabile?: string
}) {
  const [conGuardia, setConGuardia] = useState(false)
  const [lanciato, setLanciato] = useState(false)
  const [arrivato, setArrivato] = useState(false)

  // Quando lancio, la pallina parte e dopo l'animazione mostro l'esito. L'esito si azzera negli handler qui sotto
  // (quando rilancio o cambio interruttore), così non serve chiamare setState dentro l'effetto.
  useEffect(() => {
    if (!lanciato) return
    const t = setTimeout(() => setArrivato(true), 1100)
    return () => clearTimeout(t)
  }, [lanciato])

  // Posizione della pallina in percentuale: ferma al source (non lanciata), alla guardia (se c'è), o al sink.
  const pos = !lanciato ? 8 : conGuardia ? 50 : 92

  return (
    <figure className="my-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm font-bold">
        <span className={conGuardia ? 'text-hack' : 'text-text/40'}>🛡 c’è una guardia?</span>
        <button
          type="button"
          role="switch"
          aria-checked={conGuardia}
          aria-label="C'è una guardia tra source e sink?"
          onClick={() => {
            setConGuardia((g) => !g)
            setLanciato(false)
            setArrivato(false)
          }}
          className={`relative h-7 w-14 shrink-0 cursor-pointer rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            conGuardia ? 'border-hack bg-hack/40' : 'border-crimson bg-crimson/30'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-white transition-transform ${conGuardia ? 'translate-x-7' : ''}`}
          />
        </button>
        <span className={conGuardia ? 'text-text/40' : 'text-[#ff8fb0]'}>{conGuardia ? 'sì' : 'no'}</span>
      </div>

      <div className="relative mt-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="rounded-xl border border-hack/50 bg-hack/[0.07] px-2 py-4 text-center">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-hack">SOURCE</p>
            <p className="mt-1 text-xs text-text/80 sm:text-sm">{source}</p>
          </div>
          <div
            className={`rounded-xl border px-2 py-4 text-center transition duration-300 ${
              conGuardia ? 'border-brand bg-brand/10' : 'border-dashed border-white/15'
            }`}
          >
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-text/50">L’APP</p>
            <p className="mt-1 text-xs text-text/80 sm:text-sm">{conGuardia ? `🛡 ${guardia}` : 'niente in mezzo'}</p>
          </div>
          <div className="rounded-xl border border-crimson/50 bg-crimson/[0.12] px-2 py-4 text-center">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#ff8fb0]">SINK</p>
            <p className="mt-1 text-xs text-text/80 sm:text-sm">{sink}</p>
          </div>
        </div>

        {/* La pallina "input" che viaggia sopra i tre box. */}
        <span
          aria-hidden="true"
          style={{ left: `${pos}%` }}
          className="pointer-events-none absolute -top-3 z-10 -translate-x-1/2 rounded-full border border-brand bg-ink px-2 py-0.5 font-mono text-xs font-bold text-[#a98bff] shadow-lg transition-all duration-1000 ease-in-out motion-reduce:transition-none"
        >
          ●
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setArrivato(false)
            setLanciato((l) => !l)
          }}
          className="cursor-pointer rounded-lg bg-brand px-4 py-2 font-mono text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-[#7d58ea] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {lanciato ? '↺ Rilancia' : '▶ Lancia l’input'}
        </button>
        <p className="min-h-12 max-w-xl text-center text-sm" aria-live="polite">
          {arrivato &&
            (conGuardia ? (
              <span className="rounded-xl border border-hack bg-hack/15 px-4 py-3 text-text/90">
                <span className="font-mono font-bold text-hack">✓ Sicuro. </span>
                {sicuro ?? 'La guardia neutralizza il dato prima del sink.'}
              </span>
            ) : (
              <span className="rounded-xl border border-crimson bg-crimson/15 px-4 py-3 text-text/90">
                <span className="font-mono font-bold text-[#ff8fb0]">💥 Vulnerabile. </span>
                {vulnerabile ?? 'L’input raggiunge il sink senza che niente lo neutralizzi.'}
              </span>
            ))}
        </p>
      </div>
    </figure>
  )
}
