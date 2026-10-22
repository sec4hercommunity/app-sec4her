import type { StatoLezione, StatoModulo } from '@/lib/lezioni'

const PILLOLA =
  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold'

export function IconaLucchetto({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

// Badge dello stato di un modulo: ✓ completato (verde), ▶ in corso (viola), 🔒 prossimamente (grigio).
// "compatto" = più piccolo, per le colonne strette della mappa su schermo largo.
export function BadgeStatoModulo({ stato, compatto = false }: { stato: StatoModulo; compatto?: boolean }) {
  const base = compatto ? `${PILLOLA} lg:gap-1 lg:px-2 lg:text-[10px]` : PILLOLA
  if (stato === 'completato') return <span className={`${base} border-hack bg-hack/20 text-text`}>✓ Completato</span>
  if (stato === 'in-corso') return <span className={`${base} border-brand bg-brand/25 text-text`}>▶ In corso</span>
  return (
    <span className={`${base} border-white/15 bg-white/5 text-text/60`}>
      <IconaLucchetto className="h-3 w-3" />
      Prossimamente
    </span>
  )
}

// Badge dello stato di una lezione.
export function BadgeStatoLezione({ stato }: { stato: StatoLezione }) {
  if (stato === 'completata') return <span className={`${PILLOLA} border-hack bg-hack/20 text-text`}>✓ Completata</span>
  if (stato === 'prossima') return <span className={`${PILLOLA} border-brand bg-brand/25 text-text`}>▶ Prossima</span>
  if (stato === 'bloccata')
    return (
      <span className={`${PILLOLA} border-white/15 bg-white/5 text-text/60`}>
        <IconaLucchetto className="h-3 w-3" />
        Bloccata
      </span>
    )
  return <span className={`${PILLOLA} border-white/15 text-text/60`}>Da fare</span>
}

// Cerchio della mappa e dell'elenco lezioni: verde con ✓, viola con ▶ e bagliore, grigio con il lucchetto.
export function CerchioStato({
  stato,
  etichetta,
  piccolo = false,
}: {
  stato: StatoModulo | StatoLezione
  etichetta: string
  piccolo?: boolean
}) {
  const misura = piccolo ? 'h-9 w-9 text-sm' : 'h-12 w-12 text-base'
  if (stato === 'completato' || stato === 'completata') {
    return (
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-hack bg-[#0f1f17] font-mono font-bold text-hack ${misura}`}
        aria-hidden="true"
      >
        ✓
      </span>
    )
  }
  if (stato === 'in-corso' || stato === 'prossima') {
    return (
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-brand bg-brand font-mono font-bold text-white shadow-[0_0_24px_4px_rgba(109,68,224,0.6)] ${misura}`}
        aria-hidden="true"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 [animation-duration:2.5s]" />
        <span className="relative">▶</span>
      </span>
    )
  }
  if (stato === 'da-fare') {
    return (
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-ink font-mono font-bold text-text/60 ${misura}`}
        aria-hidden="true"
      >
        {etichetta}
      </span>
    )
  }
  return (
    <span
      className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-white/10 bg-ink text-text/35 ${misura}`}
      aria-hidden="true"
    >
      <IconaLucchetto className={piccolo ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
    </span>
  )
}
