'use client'

import { useState } from 'react'

// Lo STESSO input letto da due componenti con regole diverse (front-end vs back-end, validatore vs router):
// premendo "Manda l'input" ognuno mostra cosa "vede" e il suo verdetto → il disaccordo che l'attaccante sfrutta.
// Per parser differential e X-Original-URL.
//
// <DueGuardie
//   input={`POST / · X-Original-URL: /admin/deleteUser`}
//   sinistra={{ nome: "FRONT-END (guardia)", regola: "guarda solo la riga della richiesta", vede: "/", esito: "vede '/' → fa passare", tono: "ambra" }}
//   destra={{ nome: "BACK-END (app)", regola: "onora l'header X-Original-URL", vede: "/admin/deleteUser", esito: "riscrive l'URL → esegue", tono: "cremisi" }}
//   conclusione="I due componenti leggono lo stesso input in modo diverso: il disaccordo è il bug."
// />

type Tono = 'verde' | 'ambra' | 'cremisi'

type Guardia = {
  nome: string
  regola: string
  vede: string
  esito: string
  tono?: Tono
}

const TONI: Record<Tono, { bordo: string; testo: string; sfondo: string }> = {
  verde: { bordo: 'border-hack', testo: 'text-hack', sfondo: 'bg-hack/10' },
  ambra: { bordo: 'border-[#f0b35b]', testo: 'text-[#f0b35b]', sfondo: 'bg-[#f0b35b]/10' },
  cremisi: { bordo: 'border-crimson', testo: 'text-[#ff8fb0]', sfondo: 'bg-crimson/15' },
}

function Pannello({ guardia, mostra, ritardo }: { guardia: Guardia; mostra: boolean; ritardo: string }) {
  const t = TONI[guardia.tono ?? 'ambra']
  return (
    <div className={`flex-1 rounded-xl border px-4 py-4 transition duration-500 ${mostra ? t.bordo : 'border-white/10'}`}>
      <p className={`font-mono text-xs font-bold tracking-[0.2em] ${mostra ? t.testo : 'text-text/50'}`}>
        {guardia.nome}
      </p>
      <p className="mt-2 text-sm text-text/70">{guardia.regola}</p>
      <div
        className="mt-3 transition duration-500 motion-reduce:transition-none"
        style={{ opacity: mostra ? 1 : 0, transform: mostra ? 'none' : 'translateY(0.5rem)', transitionDelay: ritardo }}
        aria-hidden={!mostra}
      >
        <p className="font-mono text-xs text-text/50">legge →</p>
        <p className={`mt-1 rounded-lg border px-3 py-2 font-mono text-sm font-bold break-all ${t.bordo} ${t.sfondo} ${t.testo}`}>
          {guardia.vede}
        </p>
        <p className={`mt-2 font-mono text-sm font-bold ${t.testo}`}>→ {guardia.esito}</p>
      </div>
    </div>
  )
}

export default function DueGuardie({
  input,
  sinistra,
  destra,
  conclusione,
}: {
  input: string
  sinistra: Guardia
  destra: Guardia
  conclusione?: string
}) {
  const [mandato, setMandato] = useState(false)

  return (
    <figure className="my-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex flex-col items-center">
        <p className="font-mono text-xs font-bold tracking-[0.25em] text-hack">LO STESSO INPUT</p>
        <p className="mt-2 max-w-full overflow-x-auto rounded-lg border border-brand/50 bg-brand/10 px-4 py-2 font-mono text-sm font-bold break-all text-text">
          {input}
        </p>
        <span className="mt-2 font-mono text-lg text-text/40" aria-hidden="true">
          ↓ ↓
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Pannello guardia={sinistra} mostra={mandato} ritardo="0ms" />
        <Pannello guardia={destra} mostra={mandato} ritardo="400ms" />
      </div>

      <div className="mt-5 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setMandato((m) => !m)}
          className="cursor-pointer rounded-lg bg-brand px-4 py-2 font-mono text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-[#7d58ea] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {mandato ? '↺ Rivedi' : '▶ Manda l’input'}
        </button>
        {conclusione && (
          <p
            className="max-w-xl rounded-xl border border-crimson/60 bg-crimson/15 px-4 py-3 text-center text-sm text-text/90 transition duration-500 motion-reduce:transition-none"
            style={{ opacity: mandato ? 1 : 0, transitionDelay: '800ms' }}
            aria-live="polite"
          >
            <span className="font-mono font-bold text-[#ff8fb0]">💥 Disaccordo: </span>
            {conclusione}
          </p>
        )}
      </div>
    </figure>
  )
}
