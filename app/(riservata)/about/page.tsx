import Link from 'next/link'
import ProfiloTeam from '@/components/about/ProfiloTeam'
import RiquadroDiscord from '@/components/RiquadroDiscord'
import { PULSANTE_SECONDARIO } from '@/components/ctf/stili'
import { Rivela } from '@/components/home/Effetti'
import { TEAM_ABOUT } from '@/config/about'

// About us: chi c'è dietro Sec4Her. È l'immagine del brand: profili impaginati come una rivista,
// con ritratti artistici (foto da aggiungere in config/about.ts) e le biografie.
export default function PaginaAbout() {
  return (
    <div className="pagina-scura overflow-x-clip">
      {/* Apertura */}
      <section className="relative isolate overflow-hidden px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
        <div aria-hidden="true" className="aurora absolute inset-0 -z-10 opacity-70" />
        <div className="mx-auto max-w-6xl">
          <p className="comparsa font-mono text-xs font-bold tracking-[0.3em] text-hack">~/about · whoami</p>
          <h1 className="comparsa mt-4 max-w-4xl font-mono text-4xl leading-tight font-bold text-text sm:text-6xl" style={{ animationDelay: '0.15s' }}>
            Le persone dietro <span className="testo-sfumato">Sec4Her</span>
          </h1>
          <div className="mt-4 h-1 w-24 bg-crimson" />
          <p className="comparsa mt-6 max-w-2xl text-lg leading-relaxed text-text/80" style={{ animationDelay: '0.3s' }}>
            Per troppo tempo è girata una bugia: che la cybersecurity non fosse un posto per donne. Non è vero, il
            cervello non ha genere. Mancava solo uno spazio pensato per noi. Così l&apos;abbiamo costruito.
          </p>
        </div>
      </section>

      {/* Profili */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {TEAM_ABOUT.map((p, i) => (
          <div key={p.id} className={i > 0 ? 'border-t border-white/5' : ''}>
            <ProfiloTeam persona={p} specchio={i % 2 === 1} />
          </div>
        ))}
      </div>

      {/* Manifesto */}
      <section className="border-y border-white/5 bg-white/[0.02] px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {[
            ['Non facile.', 'Accessibile.', 'La prima volta è difficile per tutte: con una guida e uno spazio dove condividere, tutto cambia.'],
            ['Non da sole.', 'Insieme.', 'La difficoltà non sparisce: smetti solo di affrontarla da sola.'],
            ['Non un corso.', 'Un movimento.', 'L’obiettivo finale: una stanza piena di donne che amano questo mondo.'],
          ].map(([no, si, testo], i) => (
            <Rivela key={si} ritardo={i * 120}>
              <p className="font-mono text-lg font-bold text-text/35 line-through decoration-crimson decoration-2">{no}</p>
              <p className="font-mono text-3xl font-bold text-text">{si}</p>
              <p className="mt-3 text-sm leading-relaxed text-text/65">{testo}</p>
            </Rivela>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        <RiquadroDiscord />
        <p className="text-center">
          <Link href="/meeting" className={PULSANTE_SECONDARIO}>
            Vuoi parlare con noi? Prenota una call →
          </Link>
        </p>
      </div>
    </div>
  )
}
