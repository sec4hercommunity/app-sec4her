'use client'

import { useState } from 'react'
import { EVENTI_INIZIALI } from '@/data/eventi-mock'
import { soldOut, type Evento, type Iscrizione } from '@/lib/eventi'

// Stato della pagina Eventi, tenuto in memoria con React.
// Parte dai dati finti di data/eventi-mock.ts: con Supabase queste funzioni leggeranno e scriveranno sul database.
export function useEventi() {
  const [eventi] = useState<Evento[]>(EVENTI_INIZIALI)
  // Iscrizioni dell'utente attuale: id evento → nome e cognome.
  const [iscrizioni, setIscrizioni] = useState<Record<string, Iscrizione>>({})

  // Numero pubblico di iscritte (mai i nomi): quelle già presenti + l'utente attuale se iscritta.
  function iscritteTotali(e: Evento) {
    return e.iscritte + (iscrizioni[e.id] ? 1 : 0)
  }

  function iscriviti(evento: Evento, dati: Iscrizione) {
    if (iscrizioni[evento.id] || soldOut(evento, iscritteTotali(evento))) return
    setIscrizioni((i) => ({ ...i, [evento.id]: { nome: dati.nome.trim(), cognome: dati.cognome.trim() } }))
  }

  function annullaIscrizione(id: string) {
    setIscrizioni((i) => {
      const copia = { ...i }
      delete copia[id]
      return copia
    })
  }

  return { eventi, iscrizioni, iscritteTotali, iscriviti, annullaIscrizione }
}
