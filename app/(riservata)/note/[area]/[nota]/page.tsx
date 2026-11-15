import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CARD, LINK } from '@/components/ctf/stili'
import { LezioneCorrenteProvider } from '@/components/lezione/Prova'
import IndiceNota from '@/components/note/IndiceNota'
import { LINK_ESTERNO, LINKS } from '@/config/links'
import { caricaFileLezione } from '@/lib/catalogo'
import { durataTesto } from '@/lib/eventi'
import { caricaNote } from '@/lib/note'

// Una nota libera, da consultare: lo stesso file MDX della lezione, ma senza lucchetto, senza prova, senza XP
// e senza le parti del percorso guidato (compito, prossima lezione…). In fondo: le altre note della stessa area.
export const dynamicParams = false

export async function generateStaticParams() {
  return (await caricaNote()).flatMap((a) => a.note.map((n) => ({ area: a.id, nota: n.slug })))
}

export default async function PaginaNota({ params }: { params: Promise<{ area: string; nota: string }> }) {
  const { area: idArea, nota: slugNota } = await params
  const area = (await caricaNote()).find((a) => a.id === idArea)
  const nota = area?.note.find((n) => n.slug === slugNota)
  if (!area || !nota) notFound()
  const Contenuto = (await caricaFileLezione(nota.modulo, nota.slug))?.default
  if (!Contenuto) notFound()

  const lezione = `/lezioni/${nota.modulo}/${nota.slug}`

  // Le note sono solo consultazione: i pezzi che servono al percorso guidato (apertura e promessa della lezione,
  // mappa dei concetti, mini-quiz, compito, chiusura, prossima lezione) qui non si mostrano.
  // Gli esercizi interattivi (simulatore proxy) restano nella lezione: al loro posto c'è un rimando.
  const nascosto = () => null
  const componenti: MDXComponents = {
    Intro: nascosto,
    Promessa: nascosto,
    MappaConcetti: nascosto,
    CheckRapido: nascosto,
    Compito: nascosto,
    Chiusura: nascosto,
    ProssimaLezione: nascosto,
    SimulatoreProxy: () => (
      <Link href={lezione} className={`${CARD} my-8 flex items-center justify-between gap-4 border-hack/50 p-5`}>
        <span>
          <span className="block font-mono text-[11px] font-bold tracking-[0.25em] text-hack">ESERCIZIO INTERATTIVO</span>
          <span className="mt-1 block text-sm text-text/75">
            Il simulatore di proxy (Intercept, Forward, modifica della richiesta) è nella lezione del percorso.
          </span>
        </span>
        <span className="font-mono text-xl font-bold text-hack" aria-hidden="true">
          →
        </span>
      </Link>
    ),
  }

  const altre = area.note.filter((n) => n !== nota)

  return (
    <LezioneCorrenteProvider modulo={nota.modulo} slug={nota.slug}>
      <Link href="/note" className={`${LINK} font-mono text-sm`}>
        ← Tutte le note
      </Link>

      <header className="mt-6 max-w-4xl">
        <p className="font-mono text-xs font-bold tracking-[0.3em] break-all text-hack">
          ~/note/{area.id}/{nota.slug}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm font-bold text-text/60">
          <span>
            {area.icona} {area.titolo.toUpperCase()}
          </span>
          {nota.livello && (
            <span className="rounded-full border border-hack/60 bg-hack/15 px-2.5 py-0.5 text-xs text-text">{nota.livello}</span>
          )}
          <span className="rounded-full border border-brand bg-brand/25 px-2.5 py-0.5 text-xs text-text">
            {durataTesto(nota.durataMinuti)} di lettura
          </span>
          {nota.tag.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-text/70">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">{nota.titolo}</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        {nota.breve && <p className="mt-4 text-lg text-text/75">{nota.breve}</p>}
        <p className="mt-3 text-sm text-text/55">
          Vuoi la versione guidata, con quiz e XP?{' '}
          <Link href={lezione} className={LINK}>
            Apri la lezione nel percorso →
          </Link>
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0">
          <div className="lg:hidden">
            <IndiceNota contenitore="testo-nota" vista="telefono" />
          </div>
          <article id="testo-nota" className="nota-testo leading-relaxed">
            <Contenuto components={componenti} />
          </article>

          <section className="mt-14 flex flex-col gap-4 rounded-2xl border border-brand/40 bg-brand/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-text/85">
              <strong className="font-mono text-text">Hai un dubbio o un’idea da aggiungere?</strong> Parliamone insieme su
              Discord.
            </p>
            <a href={LINKS.discordDomande} {...LINK_ESTERNO} className={`${LINK} shrink-0 font-mono text-sm`}>
              Scrivi su Discord ↗
            </a>
          </section>
        </div>
        <aside className="hidden lg:block">
          <IndiceNota contenitore="testo-nota" vista="laterale" />
        </aside>
      </div>

      {altre.length > 0 && (
        <section aria-labelledby="titolo-altre" className="mt-16">
          <h2 id="titolo-altre" className="font-mono text-xl font-bold text-text">
            <span className="text-hack">&gt;</span> Altre note di {area.titolo}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {altre.map((n) => (
              <li key={n.slug}>
                <Link href={`/note/${area.id}/${n.slug}`} className={`${CARD} block h-full p-5`}>
                  <span className="font-mono text-[11px] font-bold text-text/50">{n.livello}</span>
                  <span className="mt-1 block font-mono font-bold text-text">{n.titolo}</span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {n.tag.map((t) => (
                      <span key={t} className="font-mono text-[11px] text-text/50">
                        #{t}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </LezioneCorrenteProvider>
  )
}
