import type { ReactNode } from 'react'
import IconaDiscord from '@/components/IconaDiscord'
import { PIATTAFORME, TEMI, type Piattaforma, type Tema } from '@/lib/eventi'

// Piccole icone a linea per i temi degli eventi e per le piattaforme delle call (currentColor).

const BASE = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const DISEGNI: Record<Tema, ReactNode> = {
  // globo
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  // lente
  forensics: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5M9 11h4M11 9v4" />
    </>
  ),
  // occhio
  osint: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // chip
  hardware: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  // amo da pesca
  'social-engineering': (
    <>
      <path d="M12 2v10a4 4 0 1 1-8 0v-1" />
      <path d="m4 11 2 2" />
      <circle cx="12" cy="2.5" r="0.5" />
    </>
  ),
  // lucchetto
  privacy: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
}

export function IconaTema({ tema, className = 'h-4 w-4' }: { tema: Tema; className?: string }) {
  return (
    <svg {...BASE} className={className}>
      {DISEGNI[tema]}
    </svg>
  )
}

// Videocamera per Zoom e Google Meet (icone generiche, non i loghi); logo vero per Discord.
export function IconaPiattaforma({ piattaforma, className = 'h-4 w-4' }: { piattaforma: Piattaforma; className?: string }) {
  if (piattaforma === 'discord') return <IconaDiscord className={className} />
  return (
    <svg {...BASE} className={className}>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m16 10 6-3v10l-6-3" />
    </svg>
  )
}

export function EtichettaPiattaforma({ piattaforma }: { piattaforma: Piattaforma }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-text">
      <IconaPiattaforma piattaforma={piattaforma} className="h-4 w-4 text-brand" />
      {PIATTAFORME[piattaforma]}
    </span>
  )
}
