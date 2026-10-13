import type { Modalita } from '@/lib/eventi'

const PILLOLA = 'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold'

// Online (viola) / In presenza (verde), con lo stesso aspetto dei badge di CTF Groups.
export function BadgeModalita({ modalita, spento = false }: { modalita: Modalita; spento?: boolean }) {
  const online = modalita === 'online'
  const colori = spento
    ? 'border-white/15 bg-white/5 text-text/60'
    : online
      ? 'border-brand bg-brand/25 text-text'
      : 'border-hack bg-hack/20 text-text'
  return (
    <span className={`${PILLOLA} ${colori}`}>
      <span
        className={`h-2 w-2 rounded-full ${spento ? 'bg-text/40' : online ? 'bg-brand' : 'bg-hack'}`}
        aria-hidden="true"
      />
      {online ? 'Online' : 'In presenza'}
    </span>
  )
}

export function BadgeConcluso() {
  return <span className={`${PILLOLA} border-white/15 bg-white/5 text-text/60`}>Concluso</span>
}

export function BadgeSoldOut() {
  return <span className={`${PILLOLA} border-crimson bg-crimson/25 text-text`}>Sold out</span>
}

export function BadgeInCorso() {
  return (
    <span className={`${PILLOLA} border-hack bg-hack/20 text-text`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hack opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-hack" />
      </span>
      In corso
    </span>
  )
}
