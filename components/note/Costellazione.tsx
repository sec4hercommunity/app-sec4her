'use client'

import { useEffect, useRef } from 'react'
import type { ColoreArea } from '@/config/note'

// Costellazione 3D delle note: ogni stella è una nota, raggruppata intorno alla sua area.
// Si trascina per ruotarla, si passa sopra a una stella per leggerne il titolo, si clicca per aprirla.
// Le aree ancora senza note sono stelle tenui ("in arrivo"). Con "evidenziate" (ricerca/filtri)
// le stelle giuste si accendono e le altre si spengono.
// È solo un modo in più per esplorare: le stesse note sono anche nell'elenco sotto (tastiera e lettori di schermo).

export type AreaCostellazione = {
  id: string
  titolo: string
  colore: ColoreArea
  note: { id: string; titolo: string }[]
}

type Props = {
  aree: AreaCostellazione[]
  evidenziate: ReadonlySet<string> | null // null = nessun filtro attivo
  onApri: (id: string) => void
}

type Stella = { x: number; y: number; z: number; area: number; id?: string; titolo?: string; fase: number }

const RGB: Record<ColoreArea, string> = { brand: '109,68,224', crimson: '155,44,79', hack: '31,138,76' }

function costruisci(aree: AreaCostellazione[]) {
  const centri = aree.map((_, i) => {
    const a = (i / aree.length) * Math.PI * 2
    return { x: Math.cos(a) * 1.05, y: (i % 2 === 0 ? -1 : 1) * 0.18, z: Math.sin(a) * 1.05 }
  })
  const stelle: Stella[] = []
  aree.forEach((area, i) => {
    const c = centri[i]
    const quante = area.note.length || 5
    const oro = Math.PI * (3 - Math.sqrt(5))
    for (let k = 0; k < quante; k++) {
      const y = quante === 1 ? 0 : 1 - (k / (quante - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const raggio = area.note.length ? 0.3 : 0.18
      const nota = area.note[k]
      stelle.push({
        x: c.x + Math.cos(oro * k) * r * raggio,
        y: c.y + y * raggio,
        z: c.z + Math.sin(oro * k) * r * raggio,
        area: i,
        id: nota?.id,
        titolo: nota?.titolo,
        fase: Math.random() * Math.PI * 2,
      })
    }
  })
  const sfondo = Array.from({ length: 220 }, () => {
    const u = Math.random() * 2 - 1
    const a = Math.random() * Math.PI * 2
    const r = Math.sqrt(1 - u * u)
    return { x: Math.cos(a) * r * 3, y: u * 3, z: Math.sin(a) * r * 3 }
  })
  return { centri, stelle, sfondo }
}

export default function Costellazione({ aree, evidenziate, onApri }: Props) {
  const tela = useRef<HTMLCanvasElement>(null)
  const filtro = useRef(evidenziate)
  const apri = useRef(onApri)

  useEffect(() => {
    filtro.current = evidenziate
    apri.current = onApri
  }, [evidenziate, onApri])

  useEffect(() => {
    const canvas = tela.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const { centri, stelle, sfondo } = costruisci(aree)
    let larghezza = 0
    let altezza = 0
    let rotY = 0.4
    let rotX = -0.32
    let velocita = 0.0022
    let tempo = 0
    let frame = 0
    let sopra: number | null = null
    let trascina: { x: number; y: number; rotY: number; rotX: number; mosso: boolean } | null = null
    let proiettate: { sx: number; sy: number; z: number; s: number }[] = []

    function proietta(p: { x: number; y: number; z: number }) {
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const x1 = p.x * cosY - p.z * sinY
      const z1 = p.x * sinY + p.z * cosY
      const y2 = p.y * cosX - z1 * sinX
      const z2 = p.y * sinX + z1 * cosX
      const fuoco = 3.2
      const s = fuoco / (fuoco + z2)
      const scala = Math.min(larghezza, altezza * 1.6) * 0.34
      return { sx: larghezza / 2 + x1 * scala * s, sy: altezza / 2 + y2 * scala * s, z: z2, s }
    }

    function accesa(st: Stella) {
      const f = filtro.current
      return !f || (st.id !== undefined && f.has(st.id))
    }

    function disegna() {
      if (!ctx) return
      ctx.clearRect(0, 0, larghezza, altezza)

      // Stelle di sfondo.
      for (const p of sfondo) {
        const q = proietta(p)
        if (q.z < -2.9) continue
        ctx.fillStyle = `rgba(226,232,240,${0.08 + (1 - (q.z + 3) / 6) * 0.25})`
        ctx.fillRect(q.sx, q.sy, 1.2, 1.2)
      }

      const pc = centri.map(proietta)
      proiettate = stelle.map(proietta)

      // Anello che unisce le aree.
      ctx.lineWidth = 1
      ctx.setLineDash([2, 6])
      ctx.strokeStyle = 'rgba(155,44,79,0.35)'
      ctx.beginPath()
      pc.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)))
      ctx.closePath()
      ctx.stroke()
      ctx.setLineDash([])

      // Raggi tra ogni nota e il centro della sua area.
      stelle.forEach((st, i) => {
        const p = proiettate[i]
        const c = pc[st.area]
        const colore = RGB[aree[st.area].colore]
        const luce = st.id ? (accesa(st) ? 0.45 : 0.06) : 0.08
        ctx.strokeStyle = `rgba(${colore},${luce * (1 - (p.z + 1.5) / 4)})`
        ctx.beginPath()
        ctx.moveTo(c.sx, c.sy)
        ctx.lineTo(p.sx, p.sy)
        ctx.stroke()
      })

      // Stelle (note), da dietro in avanti.
      const ordine = stelle.map((_, i) => i).sort((a, b) => proiettate[b].z - proiettate[a].z)
      for (const i of ordine) {
        const st = stelle[i]
        const p = proiettate[i]
        const colore = RGB[aree[st.area].colore]
        const vicina = 1 - (p.z + 1.5) / 3
        const on = st.id ? accesa(st) : false
        const battito = 0.8 + 0.2 * Math.sin(tempo * 2.2 + st.fase)
        let r = (st.id ? 2.4 + vicina * 2.6 : 1.4) * p.s * battito
        if (on && filtro.current) r *= 1.5
        if (i === sopra) r *= 1.8
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, Math.max(r, 0.8), 0, Math.PI * 2)
        ctx.fillStyle = st.id
          ? `rgba(${on ? colore : '226,232,240'},${on ? 0.55 + vicina * 0.45 : 0.15})`
          : `rgba(226,232,240,${0.1 + vicina * 0.15})`
        if (on || i === sopra) {
          ctx.shadowColor = `rgba(${colore},1)`
          ctx.shadowBlur = i === sopra ? 22 : 12
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Nomi delle aree.
      ctx.textAlign = 'center'
      pc.forEach((p, i) => {
        const vicina = 1 - (p.z + 1.5) / 3
        const vuota = aree[i].note.length === 0
        ctx.font = `bold ${Math.round(11 + vicina * 4)}px ui-monospace, Consolas, monospace`
        ctx.fillStyle = `rgba(226,232,240,${(vuota ? 0.25 : 0.5) + vicina * 0.4})`
        ctx.fillText(aree[i].titolo + (vuota ? ' · in arrivo' : ''), p.sx, p.sy - 0.42 * Math.min(larghezza, altezza * 1.6) * 0.34 * p.s)
      })

      // Titolo della stella sotto il puntatore.
      if (sopra !== null && stelle[sopra].titolo) {
        const p = proiettate[sopra]
        const testo = stelle[sopra].titolo ?? ''
        ctx.font = 'bold 13px ui-monospace, Consolas, monospace'
        const w = ctx.measureText(testo).width + 20
        const x = Math.min(Math.max(p.sx - w / 2, 6), larghezza - w - 6)
        const y = Math.max(p.sy - 44, 6)
        ctx.fillStyle = 'rgba(11,11,18,0.92)'
        ctx.strokeStyle = `rgba(${RGB[aree[stelle[sopra].area].colore]},0.9)`
        ctx.beginPath()
        ctx.roundRect(x, y, w, 28, 8)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = '#e2e8f0'
        ctx.textAlign = 'left'
        ctx.fillText(testo, x + 10, y + 18)
      }
    }

    function passo() {
      tempo += 0.016
      if (!trascina && sopra === null) rotY += velocita
      velocita += (0.0022 - velocita) * 0.02
      disegna()
      frame = requestAnimationFrame(passo)
    }

    function ridimensiona() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      larghezza = canvas.clientWidth
      altezza = canvas.clientHeight
      canvas.width = Math.round(larghezza * dpr)
      canvas.height = Math.round(altezza * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      disegna()
    }

    function stellaVicina(x: number, y: number): number | null {
      let migliore: number | null = null
      let distanza = 18 * 18
      proiettate.forEach((p, i) => {
        if (!stelle[i].id) return
        const d = (p.sx - x) ** 2 + (p.sy - y) ** 2
        if (d < distanza) {
          distanza = d
          migliore = i
        }
      })
      return migliore
    }

    function punto(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    function giu(e: PointerEvent) {
      const p = punto(e)
      trascina = { x: p.x, y: p.y, rotY, rotX, mosso: false }
    }

    function muovi(e: PointerEvent) {
      const p = punto(e)
      if (trascina) {
        const dx = p.x - trascina.x
        const dy = p.y - trascina.y
        if (Math.abs(dx) + Math.abs(dy) > 4) {
          trascina.mosso = true
          canvas!.setPointerCapture(e.pointerId)
        }
        if (trascina.mosso) {
          rotY = trascina.rotY + dx * 0.008
          rotX = Math.max(-1.1, Math.min(0.6, trascina.rotX + dy * 0.006))
          velocita = dx > 0 ? 0.006 : -0.006
          if (fermo) disegna()
          return
        }
      }
      sopra = stellaVicina(p.x, p.y)
      canvas!.style.cursor = sopra !== null ? 'pointer' : 'grab'
      if (fermo) disegna()
    }

    function su(e: PointerEvent) {
      const mosso = trascina?.mosso
      trascina = null
      if (mosso) return
      const i = stellaVicina(punto(e).x, punto(e).y)
      const id = i !== null ? stelle[i].id : undefined
      if (id) apri.current(id)
    }

    function fuori() {
      sopra = null
      if (fermo) disegna()
    }

    const osserva = new ResizeObserver(ridimensiona)
    osserva.observe(canvas)
    canvas.addEventListener('pointerdown', giu)
    canvas.addEventListener('pointermove', muovi)
    canvas.addEventListener('pointerup', su)
    canvas.addEventListener('pointerleave', fuori)
    ridimensiona()
    if (!fermo) frame = requestAnimationFrame(passo)

    return () => {
      cancelAnimationFrame(frame)
      osserva.disconnect()
      canvas.removeEventListener('pointerdown', giu)
      canvas.removeEventListener('pointermove', muovi)
      canvas.removeEventListener('pointerup', su)
      canvas.removeEventListener('pointerleave', fuori)
    }
  }, [aree])

  return <canvas ref={tela} aria-hidden="true" className="block h-full w-full cursor-grab touch-pan-y" />
}
