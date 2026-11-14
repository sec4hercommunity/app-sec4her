'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { LINK_ESTERNO } from '@/config/links'
import { PILASTRI, type Pilastro } from './contenuti'

// Il nucleo Sec4Her con i pilastri dell'ecosistema che gli girano intorno in 3D.
// Le card sono pulsanti veri (si usano anche da tastiera): cliccandone una si apre il dettaglio sotto.
// L'orbita si ferma col mouse sopra o con il focus, e resta ferma con "riduci movimento".

const SFUMATURE: Record<Pilastro['colore'], string> = {
  brand: 'border-brand/60 shadow-[0_0_30px_-8px_rgba(109,68,224,0.8)]',
  crimson: 'border-crimson/70 shadow-[0_0_30px_-8px_rgba(155,44,79,0.85)]',
  hack: 'border-hack/70 shadow-[0_0_30px_-8px_rgba(31,138,76,0.85)]',
}

export default function OrbitaPilastri() {
  const scena = useRef<HTMLDivElement>(null)
  const card = useRef<(HTMLButtonElement | null)[]>([])
  const inPausa = useRef(false)
  const [scelto, setScelto] = useState<string>(PILASTRI[0].id)

  useEffect(() => {
    const contenitore = scena.current
    if (!contenitore) return
    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let angolo = 0
    let frame = 0

    function posiziona() {
      if (!contenitore) return
      const l = contenitore.clientWidth
      const rx = l < 640 ? l * 0.4 : Math.min(l * 0.42, 440)
      const ry = rx * 0.32
      const n = PILASTRI.length
      card.current.forEach((el, i) => {
        if (!el) return
        const a = angolo + (i / n) * Math.PI * 2
        const x = Math.cos(a) * rx
        const profondita = (Math.sin(a) + 1) / 2 // 0 = dietro, 1 = davanti
        const y = Math.sin(a) * ry
        const scala = 0.62 + profondita * 0.48
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scala})`
        el.style.opacity = String(0.35 + profondita * 0.65)
        el.style.zIndex = String(Math.round(profondita * 100))
        el.style.filter = profondita < 0.4 ? `blur(${(0.4 - profondita) * 3}px)` : 'none'
      })
    }

    function passo() {
      if (!inPausa.current) angolo += 0.0035
      posiziona()
      frame = requestAnimationFrame(passo)
    }

    const osserva = new ResizeObserver(posiziona)
    osserva.observe(contenitore)
    if (fermo) posiziona()
    else frame = requestAnimationFrame(passo)
    return () => {
      cancelAnimationFrame(frame)
      osserva.disconnect()
    }
  }, [])

  const dettaglio = PILASTRI.find((p) => p.id === scelto) ?? PILASTRI[0]

  return (
    <div>
      <div
        ref={scena}
        className="relative mx-auto h-[22rem] w-full max-w-5xl sm:h-[26rem]"
        onPointerEnter={() => (inPausa.current = true)}
        onPointerLeave={() => (inPausa.current = false)}
        onFocus={() => (inPausa.current = true)}
        onBlur={() => (inPausa.current = false)}
      >
        {/* Orbita disegnata */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-[34%] w-[82%] max-w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-crimson/40"
        />

        {/* Nucleo */}
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 z-[50] -translate-x-1/2 -translate-y-1/2">
          <div className="nucleo-onda absolute inset-0 rounded-full border border-brand/60" />
          <div className="nucleo-onda nucleo-onda-2 absolute inset-0 rounded-full border border-hack/50" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-brand/70 bg-ink shadow-[0_0_60px_-4px_rgba(109,68,224,0.9)] sm:h-36 sm:w-36">
            <span className="font-mono text-xl font-bold tracking-tight text-text sm:text-2xl">
              sec<span className="text-brand">4</span>her
            </span>
          </div>
        </div>

        {PILASTRI.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              card.current[i] = el
            }}
            type="button"
            onClick={() => setScelto(p.id)}
            aria-pressed={scelto === p.id}
            className={`absolute top-1/2 left-1/2 w-36 cursor-pointer rounded-xl border bg-ink/90 p-3 text-left backdrop-blur transition-[border-color,box-shadow] duration-200 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:w-48 sm:p-4 ${
              scelto === p.id ? SFUMATURE[p.colore] : 'border-white/15 hover:border-white/40'
            }`}
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">
              {p.icona}
            </span>
            <span className="mt-1 block font-mono text-xs leading-snug font-bold text-text sm:text-sm">{p.titolo}</span>
            <span className="mt-1 hidden text-xs text-text/60 sm:block">{p.breve}</span>
          </button>
        ))}
      </div>

      {/* Dettaglio del pilastro scelto */}
      <div aria-live="polite" className="mx-auto mt-6 max-w-2xl">
        <div key={dettaglio.id} className="comparsa rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-8">
          <p className="text-3xl" aria-hidden="true">
            {dettaglio.icona}
          </p>
          <h3 className="mt-2 font-mono text-xl font-bold text-text">{dettaglio.titolo}</h3>
          <p className="mt-3 leading-relaxed text-text/80">{dettaglio.testo}</p>
          {dettaglio.link.esterno ? (
            <a href={dettaglio.link.percorso} {...LINK_ESTERNO} className="mt-5 inline-block font-mono text-sm font-bold text-brand hover:underline">
              {dettaglio.link.testo} ↗
            </a>
          ) : (
            <Link href={dettaglio.link.percorso} className="mt-5 inline-block font-mono text-sm font-bold text-brand hover:underline">
              {dettaglio.link.testo} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
