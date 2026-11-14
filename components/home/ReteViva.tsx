'use client'

import { useEffect, useRef } from 'react'

// "Rete viva": un globo 3D di nodi che ruota lentamente. Ogni nodo è una persona della community,
// le linee sono i legami e i puntini verdi sono i "pacchetti" (conoscenza) che viaggiano tra loro.
// Disegnato su <canvas> con una semplice proiezione prospettica, senza librerie 3D.
// Segue il mouse (o il dito), si ferma quando non è visibile e resta immobile con "riduci movimento".

type Nodo = { x: number; y: number; z: number; colore: string; fase: number }
type Pacchetto = { a: number; b: number; t: number; v: number }

const N_NODI = 150
const DISTANZA_LEGAME = 0.42 // sul globo di raggio 1
const COLORI = { brand: '109,68,224', crimson: '155,44,79', hack: '31,138,76', testo: '226,232,240' }

function creaNodi(): Nodo[] {
  // Sfera di Fibonacci: punti distribuiti in modo uniforme sulla superficie.
  const nodi: Nodo[] = []
  const oro = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < N_NODI; i++) {
    const y = 1 - (i / (N_NODI - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const a = oro * i
    const caso = Math.random()
    const colore = caso < 0.12 ? COLORI.crimson : caso < 0.22 ? COLORI.hack : caso < 0.3 ? COLORI.testo : COLORI.brand
    nodi.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, colore, fase: Math.random() * Math.PI * 2 })
  }
  return nodi
}

function creaLegami(nodi: Nodo[]): [number, number][] {
  const legami: [number, number][] = []
  for (let i = 0; i < nodi.length; i++) {
    for (let j = i + 1; j < nodi.length; j++) {
      const dx = nodi[i].x - nodi[j].x
      const dy = nodi[i].y - nodi[j].y
      const dz = nodi[i].z - nodi[j].z
      if (dx * dx + dy * dy + dz * dz < DISTANZA_LEGAME * DISTANZA_LEGAME) legami.push([i, j])
    }
  }
  return legami
}

export default function ReteViva({ className = '' }: { className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = tela.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodi = creaNodi()
    const legami = creaLegami(nodi)
    const pacchetti: Pacchetto[] = []

    let larghezza = 0
    let altezza = 0
    let rotY = 0
    let inclinazione = { x: -0.25, y: 0 } // dove sta andando la vista
    let vista = { x: -0.25, y: 0 } // dove è adesso (si avvicina piano: movimento morbido)
    let tempo = 0
    let frame = 0
    let visibile = true

    function ridimensiona() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      larghezza = canvas.clientWidth
      altezza = canvas.clientHeight
      canvas.width = Math.round(larghezza * dpr)
      canvas.height = Math.round(altezza * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (fermo) disegna()
    }

    function disegna() {
      if (!ctx) return
      ctx.clearRect(0, 0, larghezza, altezza)
      const raggio = Math.min(larghezza, altezza) * (larghezza < 640 ? 0.42 : 0.38)
      const cx = larghezza < 768 ? larghezza / 2 : larghezza * 0.68
      const cy = altezza / 2
      const fuoco = 2.6

      const cosY = Math.cos(rotY + vista.y)
      const sinY = Math.sin(rotY + vista.y)
      const cosX = Math.cos(vista.x)
      const sinX = Math.sin(vista.x)

      // Proiezione di ogni nodo: rotazione su Y, poi su X, poi prospettiva.
      const proiettati = nodi.map((n) => {
        const x1 = n.x * cosY - n.z * sinY
        const z1 = n.x * sinY + n.z * cosY
        const y2 = n.y * cosX - z1 * sinX
        const z2 = n.y * sinX + z1 * cosX
        const s = fuoco / (fuoco + z2)
        return { sx: cx + x1 * raggio * s, sy: cy + y2 * raggio * s, z: z2, s }
      })

      // Alone dietro il globo.
      const alone = ctx.createRadialGradient(cx, cy, raggio * 0.1, cx, cy, raggio * 1.5)
      alone.addColorStop(0, 'rgba(109,68,224,0.20)')
      alone.addColorStop(0.5, 'rgba(155,44,79,0.07)')
      alone.addColorStop(1, 'rgba(11,11,18,0)')
      ctx.fillStyle = alone
      ctx.fillRect(0, 0, larghezza, altezza)

      // Anello orbitale inclinato.
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.35)
      ctx.beginPath()
      ctx.ellipse(0, 0, raggio * 1.35, raggio * 0.32, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(155,44,79,0.35)'
      ctx.lineWidth = 1
      ctx.setLineDash([2, 6])
      ctx.stroke()
      ctx.setLineDash([])
      const aOrbita = tempo * 0.6
      ctx.beginPath()
      ctx.arc(Math.cos(aOrbita) * raggio * 1.35, Math.sin(aOrbita) * raggio * 0.32, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(31,138,76,0.95)'
      ctx.shadowColor = 'rgba(31,138,76,1)'
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.restore()

      // Legami: più chiari davanti, quasi spariti dietro.
      ctx.lineWidth = 0.8
      for (const [i, j] of legami) {
        const a = proiettati[i]
        const b = proiettati[j]
        const profondita = 1 - (a.z + b.z + 2) / 4 // 1 = davanti
        ctx.strokeStyle = `rgba(${COLORI.brand},${0.04 + profondita * 0.32})`
        ctx.beginPath()
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
        ctx.stroke()
      }

      // Nodi, ordinati da dietro in avanti.
      const ordine = proiettati.map((_, i) => i).sort((a, b) => proiettati[b].z - proiettati[a].z)
      for (const i of ordine) {
        const p = proiettati[i]
        const n = nodi[i]
        const profondita = 1 - (p.z + 1) / 2
        const battito = 0.75 + 0.25 * Math.sin(tempo * 2 + n.fase)
        const r = (1 + profondita * 2.2) * p.s * battito
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${n.colore},${0.25 + profondita * 0.75})`
        if (profondita > 0.7) {
          ctx.shadowColor = `rgba(${n.colore},0.9)`
          ctx.shadowBlur = 10
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Pacchetti di conoscenza che viaggiano lungo i legami.
      for (const pk of pacchetti) {
        const a = proiettati[pk.a]
        const b = proiettati[pk.b]
        const x = a.sx + (b.sx - a.sx) * pk.t
        const y = a.sy + (b.sy - a.sy) * pk.t
        const profondita = 1 - ((a.z + b.z) / 2 + 1) / 2
        ctx.beginPath()
        ctx.arc(x, y, 1.6 + profondita * 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLORI.hack},${0.4 + profondita * 0.6})`
        ctx.shadowColor = `rgba(${COLORI.hack},1)`
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    function passo() {
      tempo += 0.016
      rotY += 0.0025
      vista = { x: vista.x + (inclinazione.x - vista.x) * 0.05, y: vista.y + (inclinazione.y - vista.y) * 0.05 }

      if (legami.length > 0 && pacchetti.length < 14 && Math.random() < 0.08) {
        const [a, b] = legami[Math.floor(Math.random() * legami.length)]
        pacchetti.push(Math.random() < 0.5 ? { a, b, t: 0, v: 0.012 + Math.random() * 0.012 } : { a: b, b: a, t: 0, v: 0.015 })
      }
      for (let i = pacchetti.length - 1; i >= 0; i--) {
        pacchetti[i].t += pacchetti[i].v
        if (pacchetti[i].t >= 1) pacchetti.splice(i, 1)
      }

      disegna()
      frame = requestAnimationFrame(passo)
    }

    function avvia() {
      cancelAnimationFrame(frame)
      if (!fermo && visibile && !document.hidden) frame = requestAnimationFrame(passo)
    }

    function puntatore(e: PointerEvent) {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      inclinazione = { x: -0.25 + ny * 0.6, y: nx * 0.9 }
    }

    const osservaDimensioni = new ResizeObserver(ridimensiona)
    osservaDimensioni.observe(canvas)
    const osservaVisibile = new IntersectionObserver(([voce]) => {
      visibile = voce.isIntersecting
      avvia()
    })
    osservaVisibile.observe(canvas)
    document.addEventListener('visibilitychange', avvia)
    window.addEventListener('pointermove', puntatore, { passive: true })

    ridimensiona()
    if (fermo) disegna()
    else avvia()

    return () => {
      cancelAnimationFrame(frame)
      osservaDimensioni.disconnect()
      osservaVisibile.disconnect()
      document.removeEventListener('visibilitychange', avvia)
      window.removeEventListener('pointermove', puntatore)
    }
  }, [])

  return <canvas ref={tela} aria-hidden="true" className={`block h-full w-full ${className}`} />
}
