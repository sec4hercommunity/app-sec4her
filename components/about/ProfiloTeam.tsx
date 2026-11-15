import { Rivela } from '@/components/home/Effetti'
import type { Persona } from '@/config/about'
import Ritratto from './Ritratto'

// Il profilo di una persona del team, impaginato come una rivista: nome gigante in contorno sullo sfondo,
// ritratto artistico, card terminale "whoami", citazione, competenze, la storia in capitoli e la biografia completa.
// "specchio" inverte i lati (ritratto a destra) per alternare i profili.

const ACCENTO: Record<Persona['colore'], { testo: string; bordo: string; sfondo: string }> = {
  brand: { testo: 'text-[#a98bff]', bordo: 'border-brand/50', sfondo: 'bg-brand' },
  crimson: { testo: 'text-[#e46a8f]', bordo: 'border-crimson/60', sfondo: 'bg-crimson' },
  hack: { testo: 'text-[#4cc47f]', bordo: 'border-hack/60', sfondo: 'bg-hack' },
}

export default function ProfiloTeam({ persona, specchio = false }: { persona: Persona; specchio?: boolean }) {
  const a = ACCENTO[persona.colore]

  return (
    <article aria-labelledby={`nome-${persona.id}`} className="relative isolate py-16 sm:py-24">
      {/* Nome gigante in contorno */}
      <p
        aria-hidden="true"
        className={`testo-contorno pointer-events-none absolute top-4 -z-10 font-mono text-[22vw] leading-none font-bold whitespace-nowrap select-none md:text-[11rem] ${specchio ? 'right-0' : 'left-0'}`}
      >
        {persona.nome.toUpperCase()}
      </p>

      <div className={`grid items-center gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 ${specchio ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <Rivela>
          <Ritratto nome={persona.nome} foto={persona.foto} colore={persona.colore} specchio={specchio} />
        </Rivela>

        <Rivela ritardo={120}>
          <p className={`font-mono text-xs font-bold tracking-[0.35em] ${a.testo}`}>{persona.ruolo.toUpperCase()}</p>
          <h2 id={`nome-${persona.id}`} className="mt-2 font-mono text-5xl font-bold text-text sm:text-6xl">
            {persona.nome}
            <span className="text-hack">.</span>
          </h2>
          <div className={`mt-4 h-1 w-24 ${a.sfondo}`} />

          {persona.frase && (
            <blockquote className="relative mt-8 pl-8">
              <span aria-hidden="true" className={`absolute -top-4 left-0 font-serif text-6xl leading-none ${a.testo}`}>
                “
              </span>
              <p className="text-xl leading-snug font-medium text-text italic sm:text-2xl">{persona.frase}</p>
            </blockquote>
          )}

          {/* Card terminale */}
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#07070c] shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f0b35b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-hack" />
              <span className="ml-3 font-mono text-[11px] text-text/40">{persona.id}@sec4her: ~</span>
            </div>
            <div className="p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p className="riga-terminale">
                <span className="text-hack">$</span> <span className="text-text">whoami</span>
              </p>
              {persona.whoami.map((r, i) => (
                <p key={r.chiave} className="riga-terminale" style={{ animationDelay: `${0.25 + i * 0.15}s` }}>
                  <span className={a.testo}>{r.chiave.padEnd(10, ' ')}</span>
                  <span className="text-text/40">: </span>
                  <span className="text-text/85">{r.valore}</span>
                </p>
              ))}
              <p className="riga-terminale" style={{ animationDelay: `${0.25 + persona.whoami.length * 0.15}s` }}>
                <span className="text-hack">$</span> <span className="cursor-blink text-text">_</span>
              </p>
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Competenze">
            {persona.competenze.map((c) => (
              <li key={c} className={`rounded-full border px-3 py-1 font-mono text-xs font-bold text-text/80 ${a.bordo}`}>
                {c}
              </li>
            ))}
          </ul>
        </Rivela>
      </div>

      {persona.inArrivo ? (
        <Rivela className="mx-auto mt-14 max-w-2xl">
          <p className="rounded-2xl border border-dashed border-white/15 px-6 py-8 text-center font-mono text-sm text-text/60">
            <span className="text-hack">&gt;</span> biografia in compilazione<span className="cursor-blink">_</span>
          </p>
        </Rivela>
      ) : (
        <>
          {/* La storia in capitoli */}
          {persona.capitoli.length > 0 && (
            <div className="mt-20">
              <Rivela>
                <h3 className="font-mono text-2xl font-bold text-text">
                  <span className="text-hack">&gt;</span> Il percorso
                </h3>
              </Rivela>
              <ol className="relative mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-[7px] w-px bg-gradient-to-b from-brand via-crimson to-hack sm:hidden"
                />
                {persona.capitoli.map((c, i) => (
                  <li key={c.titolo} className="relative pl-8 sm:pl-0">
                    <Rivela ritardo={i * 100}>
                      <span
                        aria-hidden="true"
                        className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-2 border-ink bg-brand shadow-[0_0_14px_rgba(109,68,224,0.9)] sm:static sm:mb-4 sm:block"
                      />
                      <span className="hidden h-px w-full bg-gradient-to-r from-brand/70 to-transparent sm:mb-4 sm:block" aria-hidden="true" />
                      <p className={`font-mono text-xs font-bold tracking-widest ${a.testo}`}>
                        {String(i + 1).padStart(2, '0')} · {c.quando.toUpperCase()}
                      </p>
                      <p className="mt-1 font-mono text-lg font-bold text-text">{c.titolo}</p>
                      <p className="mt-1 text-sm leading-relaxed text-text/65">{c.testo}</p>
                    </Rivela>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Biografia completa */}
          {persona.biografia.length > 0 && (
            <Rivela className="mt-20">
              <h3 className="font-mono text-2xl font-bold text-text">
                <span className="text-hack">&gt;</span> La storia, con le sue parole
              </h3>
              <div className="biografia mt-8 gap-10 text-text/80 md:columns-2">
                {persona.biografia.map((p, i) => (
                  <p
                    key={i}
                    className={`mb-5 leading-relaxed break-inside-avoid ${i === persona.biografia.length - 1 ? 'font-mono font-bold text-text' : ''}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Rivela>
          )}
        </>
      )}
    </article>
  )
}
