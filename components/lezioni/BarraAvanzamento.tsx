'use client'

import { MODULI } from '@/data/lezioni-mock'
import { idLezione } from '@/lib/lezioni'
import { useLezioni } from './LezioniProvider'

// Avanzamento generale: "2/8 lezioni completate" con barra verde.
export default function BarraAvanzamento() {
  const { completate } = useLezioni()
  const tutte = MODULI.flatMap((m) => m.lezioni.map((l) => idLezione(m.slug, l.slug)))
  const fatte = tutte.filter((id) => completate.has(id)).length
  const percentuale = tutte.length ? Math.round((fatte / tutte.length) * 100) : 0

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono">
        <p className="text-sm font-bold text-text">
          <span className="text-hack">&gt;</span> {fatte}/{tutte.length} lezioni completate
        </p>
        <p className="text-xs font-bold text-hack">{percentuale}%</p>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label="Lezioni completate"
        aria-valuemin={0}
        aria-valuemax={tutte.length}
        aria-valuenow={fatte}
      >
        <div className="h-full rounded-full bg-hack transition-all duration-700" style={{ width: `${percentuale}%` }} />
      </div>
    </div>
  )
}
