'use client'

import { useEffect, useId, type ReactNode } from 'react'

type Props = { titolo: string; onChiudi: () => void; children: ReactNode }

// Finestra modale con dissolvenza: si chiude con ✕, con Esc o cliccando fuori.
export default function Modale({ titolo, onChiudi, children }: Props) {
  const idTitolo = useId()

  useEffect(() => {
    function tasto(e: KeyboardEvent) {
      if (e.key === 'Escape') onChiudi()
    }
    document.addEventListener('keydown', tasto)
    // Blocca lo scorrimento della pagina sotto la modale.
    const overflowPrima = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', tasto)
      document.body.style.overflow = overflowPrima
    }
  }, [onChiudi])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-200 starting:opacity-0"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onChiudi()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitolo}
        className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 border-t-2 border-t-crimson bg-ink p-6 text-text shadow-2xl shadow-brand/20 transition duration-200 starting:translate-y-4 starting:scale-95 starting:opacity-0 sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={idTitolo} className="font-mono text-xl font-bold text-text sm:text-2xl">
            <span className="text-hack">$</span> {titolo}
          </h2>
          <button
            type="button"
            onClick={onChiudi}
            aria-label="Chiudi"
            className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-lg text-text/70 transition hover:bg-white/10 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
