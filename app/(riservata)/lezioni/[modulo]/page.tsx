import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LINK } from '@/components/ctf/stili'
import ElencoLezioni from '@/components/lezioni/ElencoLezioni'
import RiquadroSessione from '@/components/lezioni/RiquadroSessione'
import { IconaLucchetto } from '@/components/lezioni/Stato'
import { MODULI } from '@/data/lezioni-mock'

// Una pagina per ogni modulo di data/lezioni-mock.ts; gli altri indirizzi non esistono.
export const dynamicParams = false

export function generateStaticParams() {
  return MODULI.map((m) => ({ modulo: m.slug }))
}

export default async function PaginaModulo({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo: slug } = await params
  const modulo = MODULI.find((m) => m.slug === slug)
  if (!modulo) notFound()
  const numero = String(modulo.numero).padStart(2, '0')

  return (
    <>
      <Link href="/lezioni" className={`${LINK} font-mono text-sm`}>
        ← Il percorso
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/lezioni/{modulo.slug}</p>
        <p className="mt-3 font-mono text-sm font-bold text-text/60">MODULO {numero}</p>
        <h1 className="mt-1 font-mono text-3xl font-bold text-text sm:text-4xl">
          {modulo.titolo}
          {modulo.sottotitolo && <span className="text-text/60"> ({modulo.sottotitolo})</span>}
        </h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        <p className="mt-4 max-w-3xl text-lg text-text/80">{modulo.descrizione}</p>
        <p className="mt-3 font-mono text-sm text-text/60">
          <span className="text-hack">&gt;</span> Approccio: {modulo.approccio}
        </p>
      </header>

      {modulo.aperto ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <section aria-labelledby="titolo-lezioni">
            <h2 id="titolo-lezioni" className="font-mono text-2xl font-bold text-text">
              <span className="text-hack">&gt;</span> Lezioni
            </h2>
            <div className="mt-6">
              <ElencoLezioni modulo={modulo} />
            </div>
          </section>
          <aside className="lg:sticky lg:top-6">
            <RiquadroSessione modulo={modulo.slug} />
          </aside>
        </div>
      ) : (
        <p className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center font-mono text-sm text-text/60">
          <IconaLucchetto className="h-4 w-4 shrink-0" />
          Prossimamente: questo modulo si apre più avanti nel percorso.
        </p>
      )}
    </>
  )
}
