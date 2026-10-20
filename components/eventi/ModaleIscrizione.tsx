'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import Campo from '@/components/Campo'
import Modale from '@/components/ctf/Modale'
import { PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from '@/components/ctf/stili'
import { PROFILO_TEST } from '@/config/credenzialiTest'
import { dataEvento, oraEvento, validaIscrizione, type Evento, type Iscrizione } from '@/lib/eventi'
import { DopoIscrizione } from './AzioniIscrizione'

type Props = {
  evento: Evento
  // true quando l'iscrizione è stata confermata: la modale mostra "Sei iscritta! ✓".
  iscritta: boolean
  onConferma: (dati: Iscrizione) => void
  onChiudi: () => void
  // Titolo della modale (le sessioni live delle Lezioni usano "Prenota il posto").
  titolo?: string
}

// Modale "Partecipo": nome e cognome già compilati dal profilo dell'utente (modificabili).
export default function ModaleIscrizione({ evento, iscritta, onConferma, onChiudi, titolo = 'Partecipo' }: Props) {
  const [valori, setValori] = useState<Iscrizione>({ nome: PROFILO_TEST.nome, cognome: PROFILO_TEST.cognome })
  const [errori, setErrori] = useState<Partial<Record<keyof Iscrizione, string>>>({})

  function aggiorna(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValori((v) => ({ ...v, [name]: value }))
    if (errori[name as keyof Iscrizione]) setErrori((er) => ({ ...er, [name]: '' }))
  }

  function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nuoviErrori = validaIscrizione(valori)
    setErrori(nuoviErrori)
    if (Object.values(nuoviErrori).some(Boolean)) return
    onConferma(valori)
  }

  if (iscritta) {
    return (
      <Modale titolo="Iscrizione" onChiudi={onChiudi}>
        <div role="status" className="rounded-lg border border-hack/50 bg-hack/10 px-4 py-4">
          <p className="font-mono text-lg font-bold text-hack">Sei iscritta! ✓</p>
          <p className="mt-2 text-sm text-text/80">
            Ci vediamo a <strong className="text-text">{evento.titolo}</strong>, {dataEvento(evento.inizio)} alle{' '}
            {oraEvento(evento.inizio)}.
          </p>
        </div>
        <div className="mt-6">
          <DopoIscrizione evento={evento} />
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onChiudi} className={PULSANTE_SECONDARIO}>
            Chiudi
          </button>
        </div>
      </Modale>
    )
  }

  return (
    <Modale titolo={titolo} onChiudi={onChiudi}>
      <p className="-mt-2 mb-6 text-sm text-text/70">
        <span className="font-mono text-hack">&gt;</span> {evento.titolo} · {dataEvento(evento.inizio)}, ore{' '}
        {oraEvento(evento.inizio)}
      </p>
      <form onSubmit={invia} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo
            id="nome"
            etichetta="Nome"
            type="text"
            autoComplete="given-name"
            autoFocus
            value={valori.nome}
            onChange={aggiorna}
            errore={errori.nome}
          />
          <Campo
            id="cognome"
            etichetta="Cognome"
            type="text"
            autoComplete="family-name"
            value={valori.cognome}
            onChange={aggiorna}
            errore={errori.cognome}
          />
        </div>
        <p className="font-mono text-xs text-text/60">
          <span className="text-hack">&gt;</span> Il tuo nome non viene mostrato a nessuno: pubblichiamo solo il numero di
          iscritte.
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onChiudi} className={PULSANTE_SECONDARIO}>
            Annulla
          </button>
          <button type="submit" className={PULSANTE_PRIMARIO}>
            Conferma iscrizione
          </button>
        </div>
      </form>
    </Modale>
  )
}
