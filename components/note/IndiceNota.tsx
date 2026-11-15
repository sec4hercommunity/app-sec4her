'use client'

import { useEffect, useState } from 'react'

// Indice della nota (le sezioni ## e ###) con la sezione che si sta leggendo evidenziata,
// e una barra di lettura in cima allo schermo. Legge i titoli dalla pagina già disegnata.
// Su telefono l'indice è un menu a tendina sopra il testo; su schermo largo resta fisso di lato.

type Voce = { id: string; testo: string; livello: 2 | 3 }

function slug(t: string, usati: Set<string>) {
  const base =
    t
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'sezione'
  let id = base
  for (let i = 2; usati.has(id); i++) id = `${base}-${i}`
  usati.add(id)
  return id
}

// vista "telefono" = menu a tendina sopra il testo; "laterale" = colonna fissa a destra.
// La pagina mette ognuna dentro un contenitore visibile solo sul suo tipo di schermo.
export default function IndiceNota({ contenitore, vista }: { contenitore: string; vista: 'telefono' | 'laterale' }) {
  const [voci, setVoci] = useState<Voce[]>([])
  const [attiva, setAttiva] = useState<string | null>(null)
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const radice = document.getElementById(contenitore)
    if (!radice) return
    const usati = new Set<string>()
    const titoli = [...radice.querySelectorAll<HTMLHeadingElement>('h2, h3')]
    const trovate = titoli.map((h) => {
      if (!h.id) h.id = slug(h.textContent?.replace(/^>\s*/, '') ?? '', usati)
      return { id: h.id, testo: (h.textContent ?? '').replace(/^>\s*/, ''), livello: h.tagName === 'H2' ? 2 : 3 } as Voce
    })
    // I titoli esistono solo nella pagina già disegnata (sistema esterno a React): li leggiamo dopo il montaggio.
    // oxlint-disable-next-line react/set-state-in-effect
    setVoci(trovate)

    const osserva = new IntersectionObserver(
      (voci) => {
        const visibile = voci.find((v) => v.isIntersecting)
        if (visibile) setAttiva(visibile.target.id)
      },
      { rootMargin: '-90px 0px -70% 0px' },
    )
    titoli.forEach((h) => osserva.observe(h))

    function scorri() {
      if (!radice) return
      const r = radice.getBoundingClientRect()
      const totale = r.height - window.innerHeight
      setProgresso(totale <= 0 ? 1 : Math.min(Math.max(-r.top / totale, 0), 1))
    }
    scorri()
    window.addEventListener('scroll', scorri, { passive: true })
    return () => {
      osserva.disconnect()
      window.removeEventListener('scroll', scorri)
    }
  }, [contenitore])

  const elenco = (
    <ol className="space-y-1 border-l border-white/10">
      {voci.map((v) => (
        <li key={v.id}>
          <a
            href={`#${v.id}`}
            className={`-ml-px block border-l-2 py-1 text-sm leading-snug transition ${v.livello === 3 ? 'pl-6' : 'pl-3 font-mono font-bold'} ${
              attiva === v.id ? 'border-hack text-text' : 'border-transparent text-text/50 hover:text-text'
            }`}
          >
            {v.testo}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-brand via-crimson to-hack transition-[width] duration-150"
        style={{ width: `${progresso * 100}%` }}
      />
      {voci.length > 0 &&
        (vista === 'telefono' ? (
          <details className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <summary className="cursor-pointer font-mono text-sm font-bold text-text">Indice della nota · {voci.length} sezioni</summary>
            <nav aria-label="Indice della nota" className="mt-4">
              {elenco}
            </nav>
          </details>
        ) : (
          <nav aria-label="Indice della nota" className="sticky top-24 max-h-[calc(100svh-8rem)] overflow-y-auto pr-2">
            <p className="mb-3 font-mono text-xs font-bold tracking-[0.25em] text-text/50">INDICE</p>
            {elenco}
            <p className="mt-4 font-mono text-xs text-hack">{Math.round(progresso * 100)}% letto</p>
          </nav>
        ))}
    </>
  )
}
