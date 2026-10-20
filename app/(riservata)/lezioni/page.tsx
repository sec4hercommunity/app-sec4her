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
