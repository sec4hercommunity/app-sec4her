'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { CardInclinata } from '@/components/home/Effetti'
import { durataTesto } from '@/lib/eventi'
import type { AreaConNote, Nota } from '@/lib/note'
import Costellazione, { type AreaCostellazione } from './Costellazione'

// Archivio delle note: costellazione 3D + ricerca e filtri (area, livello, tag) + elenco delle note per area.
// Niente lucchetti: ogni nota si apre subito.

const BORDO: Record<string, string> = { brand: 'border-brand/50', crimson: 'border-crimson/60', hack: 'border-hack/60' }
const TESTO: Record<string, string> = { brand: 'text-[#a98bff]', crimson: 'text-[#e46a8f]', hack: 'text-[#4cc47f]' }
const LIVELLI = ['Da zero', 'Base', 'Intermedio', 'Avanzato']
const CHIP =
  'cursor-pointer rounded-full border px-3 py-1 font-mono text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand'

function idNota(n: Nota) {
  return `${n.area}/${n.slug}`
}

function normalizza(t: string) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function chip(attivo: boolean) {
  return `${CHIP} ${attivo ? 'border-brand bg-brand/25 text-text' : 'border-white/15 text-text/70 hover:border-white/40 hover:text-text'}`
}

export default function ArchivioNote({ aree }: { aree: AreaConNote[] }) {
  const router = useRouter()
  const [cerca, setCerca] = useState('')
  const [area, setArea] = useState<string | null>(null)
  const [livello, setLivello] = useState<string | null>(null)
  const [tag, setTag] = useState<string | null>(null)

  const tutte = useMemo(() => aree.flatMap((a) => a.note), [aree])
  const tuttiTag = useMemo(() => [...new Set(tutte.flatMap((n) => n.tag))], [tutte])
  const q = normalizza(cerca.trim())

  // Per ogni nota trovata, l'eventuale sezione in cui compare la parola cercata.
  const risultati = useMemo(() => {
    const mappa = new Map<string, string | null>()
    for (const n of tutte) {
      if (area && n.area !== area) continue
      if (livello && n.livello !== livello) continue
      if (tag && !n.tag.includes(tag)) continue
      if (q) {
        const nelTitolo = [n.titolo, n.breve, ...n.tag].some((t) => normalizza(t).includes(q))
        const sezione = n.argomenti.find((a) => normalizza(a).includes(q)) ?? null
        if (!nelTitolo && !sezione) continue
        mappa.set(idNota(n), nelTitolo ? null : sezione)
      } else mappa.set(idNota(n), null)
    }
    return mappa
  }, [tutte, area, livello, tag, q])

  const filtriAttivi = Boolean(q || area || livello || tag)
  const evidenziate = useMemo(() => (filtriAttivi ? new Set(risultati.keys()) : null), [filtriAttivi, risultati])

  const datiCostellazione: AreaCostellazione[] = useMemo(
    () =>
      aree.map((a) => ({
        id: a.id,
        titolo: a.titolo,
        colore: a.colore,
        note: a.note.map((n) => ({ id: idNota(n), titolo: n.titolo })),
      })),
    [aree],
  )

  const apri = useCallback((id: string) => router.push(`/note/${id}`), [router])

  function azzera() {
    setCerca('')
    setArea(null)
    setLivello(null)
    setTag(null)
  }

  const conNote = aree.filter((a) => a.note.length > 0)
  const inArrivo = aree.filter((a) => a.note.length === 0)

  return (
    <>
      {/* Costellazione */}
      <div className="relative mt-8 h-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(109,68,224,0.16),transparent_70%)] sm:h-[28rem]">
        <Costellazione aree={datiCostellazione} evidenziate={evidenziate} onApri={apri} />
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[11px] whitespace-nowrap text-text/45">
          trascina per ruotare · tocca una stella per aprire la nota
        </p>
        {filtriAttivi && (
          <p className="pointer-events-none absolute top-3 left-3 rounded-full border border-hack/50 bg-ink/80 px-3 py-1 font-mono text-xs font-bold text-hack">
            {risultati.size} {risultati.size === 1 ? 'stella accesa' : 'stelle accese'}
          </p>
        )}
      </div>

      {/* Ricerca e filtri */}
      <section aria-label="Cerca nelle note" className="mt-8 space-y-4">
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-mono text-hack" aria-hidden="true">
            &gt;
          </span>
          <input
            type="search"
            value={cerca}
            onChange={(e) => setCerca(e.target.value)}
            placeholder="Cerca: IDOR, SSRF, JWT, 2FA, payload…"
            aria-label="Cerca nelle note (titoli, tag e sezioni)"
            className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 pr-4 pl-9 font-mono text-sm text-text placeholder:text-text/35 focus:border-brand focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Area">
          <button type="button" className={chip(area === null)} aria-pressed={area === null} onClick={() => setArea(null)}>
            Tutte le aree
          </button>
          {conNote.map((a) => (
            <button
              key={a.id}
              type="button"
              className={chip(area === a.id)}
              aria-pressed={area === a.id}
              onClick={() => setArea(area === a.id ? null : a.id)}
            >
              {a.icona} {a.titolo} · {a.note.length}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Livello">
          {LIVELLI.filter((l) => tutte.some((n) => n.livello === l)).map((l) => (
            <button
              key={l}
              type="button"
              className={chip(livello === l)}
              aria-pressed={livello === l}
              onClick={() => setLivello(livello === l ? null : l)}
            >
              {l}
            </button>
          ))}
          <span className="mx-1 hidden w-px bg-white/10 sm:block" aria-hidden="true" />
          {tuttiTag.map((t) => (
            <button key={t} type="button" className={chip(tag === t)} aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
              #{t}
            </button>
          ))}
        </div>
        {filtriAttivi && (
          <p className="font-mono text-sm text-text/60" role="status">
            {risultati.size === 0 ? 'Nessuna nota trovata.' : `${risultati.size} ${risultati.size === 1 ? 'nota' : 'note'}`}{' '}
            <button type="button" onClick={azzera} className="cursor-pointer font-bold text-brand hover:underline">
              Azzera i filtri
            </button>
          </p>
        )}
      </section>

      {/* Note per area */}
      <div className="mt-12 space-y-14">
        {conNote.map((a) => {
          const note = a.note.filter((n) => risultati.has(idNota(n)))
          if (note.length === 0) return null
          return (
            <section key={a.id} aria-labelledby={`area-${a.id}`}>
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white/[0.04] text-2xl ${BORDO[a.colore]}`}
                  aria-hidden="true"
                >
                  {a.icona}
                </span>
                <div>
                  <h2 id={`area-${a.id}`} className="font-mono text-2xl font-bold text-text">
                    {a.titolo}
                  </h2>
                  <p className="mt-1 text-text/65">{a.descrizione}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {note.map((n) => {
                  const sezione = risultati.get(idNota(n))
                  return (
                    <li key={n.slug}>
                      <Link href={`/note/${idNota(n)}`} className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <CardInclinata className={`flex h-full flex-col rounded-2xl border bg-white/[0.04] p-5 ${BORDO[a.colore]}`}>
                          <span className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold">
                            {n.livello && <span className={TESTO[a.colore]}>● {n.livello}</span>}
                            <span className="text-text/45">{durataTesto(n.durataMinuti)} di lettura</span>
                          </span>
                          <span className="mt-3 font-mono text-lg leading-snug font-bold text-text">{n.titolo}</span>
                          {n.breve && <span className="mt-2 text-sm leading-relaxed text-text/70">{n.breve}</span>}
                          {sezione && (
                            <span className="mt-3 rounded-lg border border-hack/40 bg-hack/10 px-3 py-2 font-mono text-xs text-text/85">
                              trovato in: <strong>{sezione}</strong>
                            </span>
                          )}
                          {n.argomenti.length > 0 && (
                            <span className="mt-3 text-xs text-text/45">
                              {n.argomenti.length} sezioni · {n.argomenti.slice(0, 3).join(' · ')}
                              {n.argomenti.length > 3 && '…'}
                            </span>
                          )}
                          <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                            {n.tag.map((t) => (
                              <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[11px] text-text/60">
                                #{t}
                              </span>
                            ))}
                          </span>
                        </CardInclinata>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      {/* Aree in arrivo */}
      {inArrivo.length > 0 && !filtriAttivi && (
        <section aria-labelledby="titolo-in-arrivo" className="mt-16">
          <h2 id="titolo-in-arrivo" className="font-mono text-xl font-bold text-text">
            <span className="text-hack">&gt;</span> In arrivo
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {inArrivo.map((a) => (
              <li key={a.id} className="rounded-2xl border border-dashed border-white/15 p-5">
                <span className="text-2xl opacity-60" aria-hidden="true">
                  {a.icona}
                </span>
                <p className="mt-2 font-mono font-bold text-text/80">{a.titolo}</p>
                <p className="mt-1 text-sm text-text/50">{a.descrizione}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
