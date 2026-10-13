import { CARD } from '@/components/ctf/stili'
import { iniziali } from '@/lib/ctf'
import type { PersonaTeam } from '@/lib/meeting'

// Card di Founder / Co-founder: cerchio con le iniziali (foto segnaposto), nome, ruolo e argomenti.
export default function CardTeam({ persona, colore }: { persona: PersonaTeam; colore: 'bg-brand' | 'bg-crimson' }) {
  return (
    <article className={`${CARD} flex items-center gap-5 p-5`}>
      <div
        className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full font-mono text-2xl font-bold text-white ring-2 ring-white/10 ring-offset-2 ring-offset-ink ${colore}`}
        aria-hidden="true"
      >
        {iniziali(persona.nome)}
      </div>
      <div className="min-w-0">
        <h3 className="font-mono text-lg font-bold text-text">{persona.nome}</h3>
        <p className="font-mono text-sm text-hack">{persona.ruolo}</p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Argomenti su cui può aiutarti">
          {persona.argomenti.map((a) => (
            <li key={a} className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-xs font-bold text-text/80">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
