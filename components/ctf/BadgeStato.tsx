import type { StatoCtf } from '@/lib/ctf'

const TESTO: Record<StatoCtf, string> = {
  'in-arrivo': 'In arrivo',
  'in-corso': 'In corso',
  concluso: 'Concluso',
}

const STILE: Record<StatoCtf, string> = {
  'in-arrivo': 'border-brand bg-brand/25 text-text',
  'in-corso': 'border-hack bg-hack/20 text-text',
  concluso: 'border-white/15 bg-white/5 text-text/60',
}

const PUNTINO: Record<StatoCtf, string> = {
  'in-arrivo': 'bg-brand',
  'in-corso': 'bg-hack',
  concluso: 'bg-text/40',
}

// Badge colorato con lo stato del CTF; "In corso" ha un puntino che pulsa.
export default function BadgeStato({ stato }: { stato: StatoCtf }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold ${STILE[stato]}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {stato === 'in-corso' && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hack opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${PUNTINO[stato]}`} />
      </span>
      {TESTO[stato]}
    </span>
  )
}
