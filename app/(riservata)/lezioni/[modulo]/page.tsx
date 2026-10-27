import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LINK } from '@/components/ctf/stili'
import ContenutoModulo from '@/components/lezioni/ContenutoModulo'
import { caricaCatalogo } from '@/lib/catalogo'

// Una pagina per ogni modulo del catalogo (data/lezioni-mock.ts + lezioni MDX); gli altri indirizzi non esistono.
export const dynamicParams = false

export async function generateStaticParams() {
  return (await caricaCatalogo()).map((m) => ({ modulo: m.slug }))
}

export default async function PaginaModulo({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo: slug } = await params
  const modulo = (await caricaCatalogo()).find((m) => m.slug === slug)
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

      <ContenutoModulo modulo={modulo} />
    </>
  )
}
