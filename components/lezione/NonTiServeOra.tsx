import type { ReactNode } from 'react'

// Riquadro richiudibile con quello che "non ti serve ora" (esiste, ma lo vedrai quando servirà).
// Usa <details>: si apre e si chiude anche senza JavaScript ed è accessibile da tastiera.
// <NonTiServeOra elenco={["Modello OSI", "Subnet"]}>Testo...</NonTiServeOra>
export default function NonTiServeOra({ elenco = [], children }: { elenco?: string[]; children?: ReactNode }) {
  return (
    <details className="group my-10 rounded-2xl border border-white/10 bg-white/[0.03] open:border-white/20">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-mono text-sm font-bold text-text/80 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
        <span>
          <span className="text-text/50">🧳</span> Non ti serve ora{' '}
          <span className="font-normal text-text/50">({elenco.length} argomenti da lasciare per dopo)</span>
        </span>
        <span className="text-hack transition group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="px-5 pb-5">
        {elenco.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Argomenti da rimandare">
            {elenco.map((e) => (
              <li
                key={e}
                className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-text/60 line-through decoration-crimson/70"
              >
                {e}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2 max-w-2xl [&>p]:my-3">{children}</div>
      </div>
    </details>
  )
}
