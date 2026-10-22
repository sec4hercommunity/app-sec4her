import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LINK } from '@/components/ctf/stili'
import ProssimaLezione from '@/components/lezione/ProssimaLezione'
import ProvaLezione, { LezioneCorrenteProvider, LezioneProtetta } from '@/components/lezione/Prova'
import RiquadroSessione from '@/components/lezioni/RiquadroSessione'
import { BadgeLezioneAttuale } from '@/components/lezioni/StatoLezioneClient'
import { caricaCatalogo, caricaFileLezione } from '@/lib/catalogo'
import { durataTesto } from '@/lib/eventi'

// Una pagina per ogni lezione del catalogo (file MDX in content/lezioni/ + lezioni di esempio).
// Gli altri indirizzi non esistono.
export const dynamicParams = false

export async function generateStaticParams() {
  return (await caricaCatalogo()).flatMap((m) => m.lezioni.map((l) => ({ modulo: m.slug, lezione: l.slug })))
}

export default async function PaginaLezione({ params }: { params: Promise<{ modulo: string; lezione: string }> }) {
  const { modulo: slugModulo, lezione: slugLezione } = await params
  const modulo = (await caricaCatalogo()).find((m) => m.slug === slugModulo)
  const indice = modulo?.lezioni.findIndex((l) => l.slug === slugLezione) ?? -1
  if (!modulo || indice < 0) notFound()
  const lezione = modulo.lezioni[indice]
  const file = lezione.haContenuto ? await caricaFileLezione(modulo.slug, lezione.slug) : null
  const Contenuto = file?.default

  // <ProssimaLezione> nell'MDX riceve dal frontmatter ("prossima") a quale lezione portare.
  const componenti: MDXComponents = {
    ProssimaLezione: (props: { titolo: string; anteprima?: string }) => (
      <ProssimaLezione {...props} modulo={modulo.slug} slug={lezione.prossima} />
    ),
  }

  return (
    <LezioneCorrenteProvider modulo={modulo.slug} slug={lezione.slug}>
      <Link href={`/lezioni/${modulo.slug}`} className={`${LINK} font-mono text-sm`}>
        ← Modulo {modulo.numero}: {modulo.titolo}
      </Link>

      <header className="mx-auto mt-6 max-w-4xl">
        <p className="font-mono text-xs font-bold tracking-[0.3em] break-all text-hack">
          ~/lezioni/{modulo.slug}/{lezione.slug}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm font-bold text-text/60">
          <span>
            MODULO {String(modulo.numero).padStart(2, '0')} · LEZIONE {indice + 1}
          </span>
          <span className="rounded-full border border-brand bg-brand/25 px-2.5 py-0.5 text-xs text-text">
            {durataTesto(lezione.durataMinuti)}
          </span>
          {lezione.livello && (
            <span className="rounded-full border border-hack/60 bg-hack/15 px-2.5 py-0.5 text-xs text-text">
              {lezione.livello}
            </span>
          )}
          {lezione.xp > 0 && (
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-[#a98bff]">
              ⚡ {lezione.xp} XP
            </span>
          )}
          <BadgeLezioneAttuale modulo={modulo.slug} lezione={lezione.slug} />
        </div>
        <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">{lezione.titolo}</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        <a href="#sessione-live" className={`${LINK} mt-4 inline-block font-mono text-sm`}>
          📅 Sessione live di questa lezione ↓
        </a>
      </header>

      <div className="mx-auto mt-8 max-w-4xl">
        <LezioneProtetta>
          {Contenuto ? (
            <article className="leading-relaxed">
              <Contenuto components={componenti} />
            </article>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center font-mono text-sm text-text/60">
              <span className="text-hack">&gt;</span> {lezione.descrizione}
              <br />
              <br />
              Le note di questa lezione sono in preparazione: arriveranno presto da Obsidian
              <span className="cursor-blink">_</span>
            </p>
          )}
          <ProvaLezione />
        </LezioneProtetta>

        <div className="mt-14">
          <RiquadroSessione modulo={modulo.slug} sessioneId={lezione.sessioneLive} largo />
        </div>
      </div>
    </LezioneCorrenteProvider>
  )
}
