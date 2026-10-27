'use client'

import { useId, useState } from 'react'

// Richiesta HTTP stile Burp/Caido con parti evidenziabili e cliccabili.
// Ogni voce di "evidenzia" cerca il suo "testo" dentro la richiesta e lo rende una pastiglia colorata:
// toccandola compare la "spiegazione" sotto. Usato per IDOR (id nell'URL), X-Forwarded-For, cookie di
// sessione, role=, X-Original-URL…
//
// <VisoreRichiesta
//   titolo="GET /my-account?id=carlos"
//   richiesta={`GET /my-account?id=carlos HTTP/1.1\nCookie: session=WIENER`}
//   evidenzia={[
//     { testo: "id=carlos", colore: "ambra", spiegazione: "L'id lo scrivi tu: è il riferimento che l'app usa." },
//     { testo: "session=WIENER", colore: "verde", spiegazione: "Il cookie è la tua identità vera, non falsificabile." },
//   ]}
// />

type Colore = 'viola' | 'verde' | 'ambra' | 'cremisi'

export type VoceEvidenza = { testo: string; colore?: Colore; spiegazione: string }

const COLORI: Record<Colore, { testo: string; bordo: string; sfondo: string }> = {
  viola: { testo: 'text-[#a98bff]', bordo: 'border-brand', sfondo: 'bg-brand/25' },
  verde: { testo: 'text-[#4fd08a]', bordo: 'border-hack', sfondo: 'bg-hack/25' },
  ambra: { testo: 'text-[#f0b35b]', bordo: 'border-[#f0b35b]', sfondo: 'bg-[#f0b35b]/15' },
  cremisi: { testo: 'text-[#ff8fb0]', bordo: 'border-crimson', sfondo: 'bg-crimson/30' },
}

const ORDINE: Colore[] = ['ambra', 'viola', 'verde', 'cremisi']

type Segmento = { testo: string; voce: number | null }

// Divide la richiesta in segmenti: testo normale (voce = null) e parti evidenziate (voce = indice in "evidenzia").
// Evidenzia TUTTE le occorrenze non sovrapposte di ogni "testo"; a parità di posizione vince quella che inizia prima.
function segmenta(richiesta: string, evidenzia: VoceEvidenza[]): Segmento[] {
  const trovate: { inizio: number; fine: number; voce: number }[] = []
  evidenzia.forEach((e, voce) => {
    if (!e.testo) return
    let da = 0
    let i = richiesta.indexOf(e.testo, da)
    while (i !== -1) {
      trovate.push({ inizio: i, fine: i + e.testo.length, voce })
      da = i + e.testo.length
      i = richiesta.indexOf(e.testo, da)
    }
  })
  trovate.sort((a, b) => a.inizio - b.inizio || b.fine - a.fine)

  const segmenti: Segmento[] = []
  let pos = 0
  for (const m of trovate) {
    if (m.inizio < pos) continue // sovrapposta a una già scelta
    if (m.inizio > pos) segmenti.push({ testo: richiesta.slice(pos, m.inizio), voce: null })
    segmenti.push({ testo: richiesta.slice(m.inizio, m.fine), voce: m.voce })
    pos = m.fine
  }
  if (pos < richiesta.length) segmenti.push({ testo: richiesta.slice(pos), voce: null })
  return segmenti
}

export default function VisoreRichiesta({
  titolo,
  richiesta,
  evidenzia = [],
}: {
  titolo?: string
  richiesta: string
  evidenzia?: VoceEvidenza[]
}) {
  const [attiva, setAttiva] = useState<number | null>(null)
  const id = useId()
  const testo = richiesta.replace(/\r/g, '')
  const segmenti = segmenta(testo, evidenzia)
  const info = attiva !== null ? evidenzia[attiva] : undefined
  const coloreInfo = info ? COLORI[info.colore ?? ORDINE[attiva! % ORDINE.length]] : undefined

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07070c]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-crimson/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f0b35b]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-hack/70" />
          </span>
          <p className="truncate font-mono text-[11px] font-bold tracking-[0.2em] text-text/50">
            {titolo ? titolo : 'PROXY · RICHIESTA'}
          </p>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-text/70 sm:text-sm">
          <code>
            {segmenti.map((s, i) => {
              if (s.voce === null) return <span key={`${id}-${i}`}>{s.testo}</span>
              const voce = evidenzia[s.voce]
              const c = COLORI[voce.colore ?? ORDINE[s.voce % ORDINE.length]]
              const scelta = attiva === s.voce
              return (
                <button
                  key={`${id}-${i}`}
                  type="button"
                  onClick={() => setAttiva(scelta ? null : s.voce)}
                  aria-pressed={scelta}
                  aria-label={`${voce.testo}: ${voce.spiegazione}`}
                  className={`cursor-pointer rounded border border-dashed px-0.5 font-bold whitespace-pre-wrap transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${c.testo} ${
                    scelta ? `${c.bordo} ${c.sfondo}` : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  {s.testo}
                </button>
              )
            })}
          </code>
        </pre>
      </div>
      <figcaption
        className={`mt-3 min-h-16 rounded-xl border px-4 py-3 text-sm transition ${
          coloreInfo ? `${coloreInfo.bordo} bg-white/[0.04]` : 'border-dashed border-white/15'
        }`}
        aria-live="polite"
      >
        {info && coloreInfo ? (
          <>
            <span className={`font-mono font-bold ${coloreInfo.testo}`}>{info.testo}</span>
            <span className="mt-1 block text-text/85">{info.spiegazione}</span>
          </>
        ) : (
          <span className="font-mono text-text/50">
            👆 Tocca una parte evidenziata della richiesta per sapere cosa controlla l&apos;attaccante.
          </span>
        )}
      </figcaption>
    </figure>
  )
}
