import { Fragment } from 'react'
import { CONTATTI } from '../config/sito.js'

// Piccole icone dei contatti; usano il colore del testo (currentColor).
const ICONE = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  ),
}

export default function Footer() {
  return (
    <footer className="border-t border-crimson bg-ink px-4 py-6 text-center text-text">
      <div className="flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row">
        <h2 className="font-mono text-lg font-bold text-text">
          <span className="text-hack">$</span> Contatti:
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          {CONTATTI.map((c, i) => (
            <Fragment key={c.nome}>
              {i > 0 && (
                <li aria-hidden="true" className="text-text/40">
                  ·
                </li>
              )}
              <li>
                <a
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${c.nome}: ${c.testo}`}
                  className="inline-flex items-center gap-1.5 font-bold text-brand transition hover:brightness-150"
                >
                  {ICONE[c.icona]}
                  {c.testo}
                </a>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>

      <p className="mt-3 font-mono text-xs font-bold tracking-[0.3em] text-hack">&gt; HACK THE FUTURE_</p>

      <p className="mt-2 text-xs text-text/60">© 2026 Sec4Her</p>
    </footer>
  )
}
