import Link from 'next/link'
import BarraAvanzamento from '@/components/lezioni/BarraAvanzamento'
import MappaPercorso from '@/components/lezioni/MappaPercorso'
import RiquadroSessione from '@/components/lezioni/RiquadroSessione'

// Pagina Lezioni: il percorso in 7 moduli (docs/struttura-corsi.md), con la prossima sessione live in alto.
export default function PaginaLezioni() {
  return (
    <>
      <header>
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/lezioni</p>
        <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Il percorso</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        <p className="mt-4 text-lg text-text/80">
          Da zero, <strong className="text-text">hands-first</strong>, mai da sole.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        <Link
          href="/note"
          className="group flex flex-col gap-3 rounded-2xl border border-crimson/50 bg-crimson/10 p-5 transition hover:border-crimson hover:shadow-[0_0_28px_-6px_rgba(155,44,79,0.7)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <span>
            <span className="block font-mono font-bold text-text">🧠 Hai già esperienza?</span>
            <span className="mt-1 block text-sm text-text/75">
              Salta il percorso: tutte le note sono aperte, senza lucchetti né quiz, divise per categoria.
            </span>
          </span>
          <span className="shrink-0 font-mono text-sm font-bold text-[#e46a8f] group-hover:underline">Vai alle note →</span>
        </Link>

        <RiquadroSessione largo />

        <section aria-labelledby="titolo-mappa">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="titolo-mappa" className="font-mono text-2xl font-bold text-text">
              <span className="text-hack">&gt;</span> I 7 moduli
            </h2>
            <div className="sm:w-80">
              <BarraAvanzamento />
            </div>
          </div>
          <div className="mt-8">
            <MappaPercorso />
          </div>
        </section>
      </div>
    </>
  )
}
