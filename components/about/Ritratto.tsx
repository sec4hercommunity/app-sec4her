'use client'

import { useState } from 'react'

// Ritratto artistico: la foto dentro un anello di luce che gira, con due cornici sfalsate che fluttuano,
// il mirino da terminale agli angoli, le scanline e un'etichetta "REC". Senza foto (o se l'immagine non si
// carica) mostra un segnaposto con una silhouette e l'indicazione di dove mettere la foto.

type Props = { nome: string; foto?: string; colore: 'brand' | 'crimson' | 'hack'; specchio?: boolean }

const ANELLO: Record<Props['colore'], string> = {
  brand: 'conic-gradient(from 0deg, #6d44e0, #9b2c4f, #1f8a4c, #6d44e0)',
  crimson: 'conic-gradient(from 0deg, #9b2c4f, #6d44e0, #1f8a4c, #9b2c4f)',
  hack: 'conic-gradient(from 0deg, #1f8a4c, #6d44e0, #9b2c4f, #1f8a4c)',
}

export default function Ritratto({ nome, foto, colore, specchio = false }: Props) {
  const [errore, setErrore] = useState(false)
  const conFoto = foto && !errore

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      {/* Cornici sfalsate */}
      <div
        aria-hidden="true"
        className={`cornice-fluttua absolute inset-0 rounded-[2rem] border-2 border-crimson/70 ${specchio ? '-translate-x-4 translate-y-4' : 'translate-x-4 translate-y-4'}`}
      />
      <div
        aria-hidden="true"
        className={`cornice-fluttua cornice-fluttua-2 absolute inset-0 rounded-[2rem] border border-hack/60 ${specchio ? 'translate-x-5 -translate-y-5' : '-translate-x-5 -translate-y-5'}`}
      />

      {/* Anello di luce che gira */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] p-[3px] shadow-[0_0_80px_-10px_rgba(109,68,224,0.7)]">
        <div aria-hidden="true" className="anello-gira absolute -inset-1/2" style={{ background: ANELLO[colore] }} />

        <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-3px)] bg-ink">
          {conFoto ? (
            <img
              src={foto}
              alt={`Foto di ${nome}`}
              onError={() => setErrore(true)}
              className="h-full w-full object-cover grayscale-[35%] transition duration-700 hover:scale-105 hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(109,68,224,0.35),transparent_65%)]">
              <svg viewBox="0 0 120 140" className="h-1/2 w-1/2 text-text/15" aria-hidden="true">
                <circle cx="60" cy="45" r="26" fill="currentColor" />
                <path d="M10 140c0-32 22-55 50-55s50 23 50 55z" fill="currentColor" />
              </svg>
              <p className="mt-4 font-mono text-xs font-bold tracking-[0.25em] text-text/50">[ FOTO IN ARRIVO ]</p>
              <p className="sr-only">Foto di {nome} non ancora disponibile</p>
            </div>
          )}

          {/* Velo con i colori del brand, scanline e mirino */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-brand/10" />
          <div aria-hidden="true" className="scanline pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-4">
            <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-text/70" />
            <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-text/70" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-text/70" />
            <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-text/70" />
          </div>
          <p aria-hidden="true" className="absolute top-6 right-7 flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-text/80">
            <span className="cursor-blink h-2 w-2 rounded-full bg-crimson" /> REC
          </p>
          <p aria-hidden="true" className="absolute bottom-6 left-7 font-mono text-[10px] font-bold tracking-widest text-hack">
            sec4her://{nome.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  )
}
