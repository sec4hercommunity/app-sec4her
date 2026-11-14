'use client'

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

// Piccoli effetti riusabili della Home.

// Rivela: il contenuto entra (sale e appare) quando arriva sullo schermo scorrendo.
export function Rivela({ children, ritardo = 0, className = '' }: { children: ReactNode; ritardo?: number; className?: string }) {
  const el = useRef<HTMLDivElement>(null)
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    const nodo = el.current
    if (!nodo) return
    const osserva = new IntersectionObserver(
      ([voce]) => {
        if (voce.isIntersecting) {
          setVisibile(true)
          osserva.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    osserva.observe(nodo)
    return () => osserva.disconnect()
  }, [])

  return (
    <div ref={el} className={`rivela ${visibile ? 'rivela-visibile' : ''} ${className}`} style={{ transitionDelay: `${ritardo}ms` }}>
      {children}
    </div>
  )
}

// CardInclinata: la card si inclina in 3D seguendo il mouse, con un riflesso di luce.
export function CardInclinata({ children, className = '' }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null)

  function muovi(e: PointerEvent<HTMLDivElement>) {
    const nodo = el.current
    if (!nodo || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = nodo.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    nodo.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg) translateZ(0)`
    nodo.style.setProperty('--luce-x', `${x * 100}%`)
    nodo.style.setProperty('--luce-y', `${y * 100}%`)
  }

  function esci() {
    if (el.current) el.current.style.transform = ''
  }

  return (
    <div ref={el} onPointerMove={muovi} onPointerLeave={esci} className={`card-inclinata ${className}`}>
      {children}
    </div>
  )
}

// Digitazione: scrive il testo una lettera alla volta, come in un terminale.
export function Digitazione({ testo, className = '' }: { testo: string; className?: string }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    // Con "riduci movimento" il testo appare tutto al primo giro.
    const passo = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? testo.length : 1
    const timer = setInterval(() => {
      setN((v) => {
        if (v >= testo.length) {
          clearInterval(timer)
          return v
        }
        return Math.min(v + passo, testo.length)
      })
    }, 70)
    return () => clearInterval(timer)
  }, [testo])

  return (
    <span className={className} aria-label={testo}>
      <span aria-hidden="true">{testo.slice(0, n)}</span>
      <span aria-hidden="true" className="cursor-blink text-hack">
        _
      </span>
    </span>
  )
}
