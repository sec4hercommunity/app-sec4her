'use client'

import { useState } from 'react'
import CardCtf from '@/components/ctf/CardCtf'
import { useCtf } from '@/components/ctf/CtfProvider'
import ModaleAggiungiCtf from '@/components/ctf/ModaleAggiungiCtf'
import { PULSANTE_PRIMARIO } from '@/components/ctf/stili'
import { useOra } from '@/components/ctf/useOra'
import { statoCtf, type Ctf, type StatoCtf } from '@/lib/ctf'

type Filtro = 'tutti' | StatoCtf

const FILTRI: { valore: Filtro; testo: string }[] = [
  { valore: 'tutti', testo: 'Tutti' },
  { valore: 'in-arrivo', testo: 'In arrivo' },
  { valore: 'in-corso', testo: 'In corso' },
  { valore: 'concluso', testo: 'Conclusi' },
]

// Ordine della lista: prima quelli in corso, poi in arrivo (il più vicino prima), infine i conclusi.
const PRIORITA: Record<StatoCtf, number> = { 'in-corso': 0, 'in-arrivo': 1, concluso: 2 }

export default function PaginaCtf() {
  const { ctf, gruppi, aggiungiCtf } = useCtf()
  const ora = useOra()
  const [filtro, setFiltro] = useState<Filtro>('tutti')
  const [modaleAperta, setModaleAperta] = useState(false)
  const [ultimoAggiunto, setUltimoAggiunto] = useState<string | null>(null)

  const conStato = ctf.map((c) => ({ ctf: c, stato: statoCtf(c, ora) }))
  const visibili = conStato
    .filter((c) => filtro === 'tutti' || c.stato === filtro)
    .sort((a, b) => {
      const diff = PRIORITA[a.stato] - PRIORITA[b.stato]
      if (diff !== 0) return diff
      const inizioA = Date.parse(a.ctf.inizio)
      const inizioB = Date.parse(b.ctf.inizio)
      return a.stato === 'concluso' ? inizioB - inizioA : inizioA - inizioB
    })

  function salva(dati: Omit<Ctf, 'id'>) {
    const nuovo = aggiungiCtf(dati)
    setUltimoAggiunto(nuovo.id)
    // Mostra tutti i CTF, così la nuova card si vede subito qualunque sia il filtro.
    setFiltro('tutti')
    setModaleAperta(false)
  }

  return (
    <>
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/ctf-groups</p>
          <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">CTF Groups</h1>
          <div className="mt-3 h-1 w-24 bg-crimson" />
          <p className="mt-4 text-text/70">Scegli una sfida, forma la tua squadra. Nessuna gioca da sola.</p>
        </div>
        <button type="button" onClick={() => setModaleAperta(true)} className={`${PULSANTE_PRIMARIO} shrink-0 self-start sm:self-auto`}>
          + Aggiungi CTF
        </button>
      </header>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtra i CTF per stato">
        {FILTRI.map((f) => {
          const attivo = filtro === f.valore
          const quanti = f.valore === 'tutti' ? conStato.length : conStato.filter((c) => c.stato === f.valore).length
          return (
            <button
              key={f.valore}
              type="button"
              onClick={() => setFiltro(f.valore)}
              aria-pressed={attivo}
              className={`cursor-pointer rounded-full border px-4 py-1.5 font-mono text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                attivo
                  ? 'border-brand bg-brand text-white shadow-lg shadow-brand/25'
                  : 'border-white/15 text-text/70 hover:border-brand/60 hover:text-text'
              }`}
            >
              {f.testo} <span className={attivo ? 'text-white/70' : 'text-text/40'}>{quanti}</span>
            </button>
          )
        })}
      </div>

      <h2 className="mt-8 font-mono text-lg font-bold text-text">
        <span className="text-hack">&gt;</span> {FILTRI.find((f) => f.valore === filtro)?.testo}
      </h2>

      {visibili.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibili.map(({ ctf: c }) => (
            <CardCtf
              key={c.id}
              ctf={c}
              ora={ora}
              numeroGruppi={gruppi.filter((g) => g.ctfId === c.id).length}
              nuovo={c.id === ultimoAggiunto}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center font-mono text-sm text-text/60">
          <span className="text-hack">&gt;</span> Nessun CTF in questa categoria
          <span className="cursor-blink">_</span>
        </p>
      )}

      {modaleAperta && <ModaleAggiungiCtf onChiudi={() => setModaleAperta(false)} onSalva={salva} />}
    </>
  )
}
