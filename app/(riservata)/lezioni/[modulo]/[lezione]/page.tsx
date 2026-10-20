import type { MDXContent } from 'mdx/types'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { CARD, LINK, PULSANTE_PRIMARIO } from '@/components/ctf/stili'
import RiquadroSessione from '@/components/lezioni/RiquadroSessione'
import { BadgeLezioneAttuale, PulsanteCompletata } from '@/components/lezioni/StatoLezioneClient'
import { LINK_ESTERNO } from '@/config/links'
import { MODULI } from '@/data/lezioni-mock'
import { durataTesto } from '@/lib/eventi'
import { leggiProprieta, lezioneSuccessiva } from '@/lib/lezioni'

// Una pagina per ogni lezione di data/lezioni-mock.ts; gli altri indirizzi non esistono.
export const dynamicParams = false

export function generateStaticParams() {
  return MODULI.flatMap((m) => m.lezioni.map((l) => ({ modulo: m.slug, lezione: l.slug })))
}

// Il testo della lezione è il file content/lezioni/<modulo>/<lezione>.mdx (se non c'è ancora: null).
async function caricaContenuto(modulo: string, lezione: string) {
  try {
    const file: { default: MDXContent; frontmatter?: unknown } = await import(
      `@/content/lezioni/${modulo}/${lezione}.mdx`
    )
    return { Contenuto: file.default, proprieta: leggiProprieta(file.frontmatter) }
  } catch {
    return null
  }
}

function TitoloSezione({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-mono text-xl font-bold text-text sm:text-2xl">
      <span className="text-hack">&gt;</span> {children}
    </h2>
  )
}

export default async function PaginaLezione({ params }: { params: Promise<{ modulo: string; lezione: string }> }) {
  const { modulo: slugModulo, lezione: slugLezione } = await params
  const modulo = MODULI.find((m) => m.slug === slugModulo)
  const indice = modulo?.lezioni.findIndex((l) => l.slug === slugLezione) ?? -1
  if (!modulo || indice < 0) notFound()
  const lezione = modulo.lezioni[indice]
  const successiva = lezioneSuccessiva(MODULI, modulo.slug, lezione.slug)
  const caricata = await caricaContenuto(modulo.slug, lezione.slug)
  const p = caricata?.proprieta

  return (
    <>
      <Link href={`/lezioni/${modulo.slug}`} className={`${LINK} font-mono text-sm`}>
        ← Modulo {modulo.numero}: {modulo.titolo}
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">
          ~/lezioni/{modulo.slug}/{lezione.slug}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm font-bold text-text/60">
          <span>
            MODULO {String(modulo.numero).padStart(2, '0')} · LEZIONE {indice + 1}
          </span>
          <span className="rounded-full border border-brand bg-brand/25 px-2.5 py-0.5 text-xs text-text">
            {durataTesto(lezione.durataMinuti)}
          </span>
          <BadgeLezioneAttuale modulo={modulo.slug} lezione={lezione.slug} />
        </div>
        <h1 className="mt-2 max-w-4xl font-mono text-3xl font-bold text-text sm:text-4xl">{lezione.titolo}</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0 space-y-12">
          {p?.filo && (
            <section
              aria-label="Il filo"
              className="relative overflow-hidden rounded-2xl border border-brand/50 bg-brand/10 px-6 py-6 shadow-[0_0_40px_-16px_rgba(109,68,224,0.7)] sm:px-8"
            >
              <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">&gt; IL FILO</p>
              <p className="mt-3 font-mono text-xl font-bold leading-snug text-text sm:text-2xl">
                &ldquo;{p.filo}&rdquo;
              </p>
            </section>
          )}

          {caricata ? (
            <article className="max-w-3xl">
              <caricata.Contenuto />
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

          {p?.lab_link && (
            <section aria-labelledby="titolo-lab" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <TitoloSezione id="titolo-lab">Lab</TitoloSezione>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-sm font-bold text-text">{p.lab ?? 'Lab della lezione'}</p>
                <a href={p.lab_link} {...LINK_ESTERNO} className={`${PULSANTE_PRIMARIO} shrink-0`}>
                  Apri il lab ↗
                </a>
              </div>
              {p.domande.length > 0 && (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <h3 className="font-mono font-bold text-text">Domande da farti</h3>
                  <p className="mt-1 text-sm text-text/60">
                    Niente soluzioni pronte: sono le domande che si fa una pentester davanti a un target.
                  </p>
                  <ol className="mt-4 space-y-3">
                    {p.domande.map((d, i) => (
                      <li key={d} className="flex gap-3 text-text/85">
                        <span className="font-mono text-sm font-bold text-hack">?{i + 1}</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          )}

          {p && p.bottino.length > 0 && (
            <section aria-labelledby="titolo-bottino">
              <TitoloSezione id="titolo-bottino">Bottino</TitoloSezione>
              <p className="mt-1 text-sm text-text/60">Cosa hai capito oggi.</p>
              <ul className="mt-5 grid gap-3 md:grid-cols-3">
                {p.bottino.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 rounded-xl border border-hack/40 bg-hack/10 p-4 text-sm text-text/90"
                  >
                    <span className="font-mono font-bold text-hack" aria-hidden="true">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p?.compito && (
            <section aria-labelledby="titolo-compito">
              <TitoloSezione id="titolo-compito">Compito</TitoloSezione>
              <p className="mt-4 rounded-xl border-l-4 border-crimson bg-white/[0.04] px-5 py-4 leading-relaxed text-text/85">
                {p.compito}
              </p>
            </section>
          )}

          <section aria-label="Stato della lezione" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="mb-4 font-mono text-sm text-text/70">
              <span className="text-hack">&gt;</span> Finito? Segnala nel percorso.
            </p>
            <PulsanteCompletata modulo={modulo.slug} lezione={lezione.slug} />
          </section>

          <section aria-labelledby="titolo-prossima">
            <TitoloSezione id="titolo-prossima">Prossima lezione</TitoloSezione>
            {successiva ? (
              <Link
                href={`/lezioni/${successiva.modulo.slug}/${successiva.lezione.slug}`}
                className={`${CARD} mt-4 flex items-center justify-between gap-4 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand`}
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-text/50">
                    MODULO {String(successiva.modulo.numero).padStart(2, '0')}
                  </p>
                  <p className="font-mono font-bold text-text">{successiva.lezione.titolo}</p>
                  <p className="mt-1 text-sm text-text/70">{p?.prossima ?? successiva.lezione.descrizione}</p>
                </div>
                <span className="font-mono text-xl font-bold text-brand" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <p className="mt-4 font-mono text-sm text-text/60">
                Per ora è l&apos;ultima lezione aperta del percorso.
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6" aria-label="Sessione live e domande">
          <RiquadroSessione modulo={modulo.slug} lezione={lezione.slug} />
        </aside>
      </div>
    </>
  )
}
