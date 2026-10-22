'use client'

import Link from 'next/link'
import { CARD } from '@/components/ctf/stili'
import { useLezioni } from '@/components/lezioni/LezioniProvider'
import { IconaLucchetto } from '@/components/lezioni/Stato'
import { lezioneSbloccata } from '@/lib/lezioni'

type Props = {
  titolo: string
  anteprima?: string
  // Aggiunti dalla pagina della lezione (dal frontmatter "prossima"): chi scrive l'MDX non li mette.
  modulo?: string
  slug?: string
}

// Anteprima della lezione successiva. Finché la prova di questa lezione non è superata, mostra il lucchetto.
// <ProssimaLezione titolo="Intercettiamo un login" anteprima="..." />
export default function ProssimaLezione({ titolo, anteprima, modulo, slug }: Props) {
  const { moduli, completate } = useLezioni()
  const m = moduli.find((x) => x.slug === modulo)
  const sbloccata = m && slug ? lezioneSbloccata(m, slug, completate) : false

  const contenuto = (
    <>
      <div className="min-w-0">
        <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-text/50">PROSSIMA LEZIONE</p>
        <p className="mt-1 font-mono text-lg font-bold text-text">{titolo}</p>
        {anteprima && <p className="mt-1 text-sm leading-relaxed text-text/70">{anteprima}</p>}
        {!sbloccata && slug && (
          <p className="mt-3 flex items-center gap-2 font-mono text-xs text-text/60">
            <IconaLucchetto className="h-3.5 w-3.5 shrink-0" />
            Si sblocca quando superi la prova di questa lezione (in fondo alla pagina).
          </p>
        )}
      </div>
      <span className={`font-mono text-2xl font-bold ${sbloccata ? 'text-brand' : 'text-text/30'}`} aria-hidden="true">
        {sbloccata ? '→' : '🔒'}
      </span>
    </>
  )

  return (
    <section aria-label="Prossima lezione" className="my-12">
      {sbloccata && modulo && slug ? (
        <Link
          href={`/lezioni/${modulo}/${slug}`}
          className={`${CARD} flex items-center justify-between gap-4 border-brand/50 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-6`}
        >
          {contenuto}
        </Link>
      ) : (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          {contenuto}
        </div>
      )}
    </section>
  )
}
