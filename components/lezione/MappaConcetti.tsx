'use client'

import { useEffect, useState } from 'react'

// I concetti della lezione in alto, fissi mentre si scorre: il concetto N si illumina quando arrivi al <Passo numero={N}>.
// <MappaConcetti concetti={["Rete", "IP e porte", "DNS", "Messaggio HTTP", "HTTP vs HTTPS"]} />
export default function MappaConcetti({ concetti = [] }: { concetti?: string[] }) {
  // Numero dell'ultimo passo raggiunto (0 = nessuno).
  const [raggiunto, setRaggiunto] = useState(0)

  useEffect(() => {
    const passi = Array.from(document.querySelectorAll<HTMLElement>('[data-passo]'))
    if (passi.length === 0) return
    function aggiorna() {
      // Un passo è "raggiunto" quando il suo inizio supera il 45% dell'altezza dello schermo.
      const soglia = window.innerHeight * 0.45
      let ultimo = 0
      for (const p of passi) if (p.getBoundingClientRect().top < soglia) ultimo = Number(p.dataset.passo)
      setRaggiunto(ultimo)
    }
    aggiorna()
    window.addEventListener('scroll', aggiorna, { passive: true })
    window.addEventListener('resize', aggiorna)
    return () => {
      window.removeEventListener('scroll', aggiorna)
      window.removeEventListener('resize', aggiorna)
    }
  }, [])

  function vaiAl(numero: number) {
    document.getElementById(`passo-${numero}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Mappa dei concetti della lezione"
      className="sticky top-[72px] z-10 -mx-4 my-8 border-y border-white/10 bg-ink/90 px-4 py-3 backdrop-blur md:top-[84px] sm:mx-0 sm:rounded-2xl sm:border"
    >
      <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.25em] text-text/50">
        I {concetti.length} CONCETTI DI OGGI · {Math.min(raggiunto, concetti.length)}/{concetti.length}
      </p>
      <ol className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {concetti.map((c, i) => {
          const numero = i + 1
          const attuale = numero === raggiunto
          const visto = numero < raggiunto
          return (
            <li key={c} className="shrink-0">
              <button
                type="button"
                onClick={() => vaiAl(numero)}
                aria-current={attuale ? 'step' : undefined}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-bold whitespace-nowrap transition duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  attuale
                    ? 'border-brand bg-brand text-white shadow-[0_0_20px_2px_rgba(109,68,224,0.6)]'
                    : visto
                      ? 'border-hack/70 bg-hack/15 text-text'
                      : 'border-white/15 text-text/50 hover:text-text'
                }`}
              >
                <span aria-hidden="true">{visto ? '✓' : numero}</span>
                {c}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
