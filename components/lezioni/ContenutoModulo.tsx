'use client'

import ElencoLezioni from '@/components/lezioni/ElencoLezioni'
import RiquadroSessione from '@/components/lezioni/RiquadroSessione'
import { IconaLucchetto } from '@/components/lezioni/Stato'
import type { Modulo } from '@/lib/lezioni'
import { useLezioni } from './LezioniProvider'

// Corpo della pagina di un modulo: se il modulo è aperto (o è attiva l'anteprima, solo sviluppo) mostra
// l'elenco delle lezioni e la sessione live; altrimenti il messaggio "Prossimamente".
export default function ContenutoModulo({ modulo }: { modulo: Modulo }) {
  const { anteprima } = useLezioni()

  if (!modulo.aperto && !anteprima) {
    return (
      <p className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center font-mono text-sm text-text/60">
        <IconaLucchetto className="h-4 w-4 shrink-0" />
        Prossimamente: questo modulo si apre più avanti nel percorso.
      </p>
    )
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
      <section aria-labelledby="titolo-lezioni">
        <h2 id="titolo-lezioni" className="font-mono text-2xl font-bold text-text">
          <span className="text-hack">&gt;</span> Lezioni
        </h2>
        <div className="mt-6">
          <ElencoLezioni modulo={modulo} />
        </div>
      </section>
      <aside className="lg:sticky lg:top-6">
        <RiquadroSessione modulo={modulo.slug} />
      </aside>
    </div>
  )
}
