'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import Campo from '@/components/Campo'
import { FORMATI, LIVELLI, PREFISSO_CTFTIME } from '@/config/ctf'
import { DESCRIZIONE_MAX, validaNuovoCtf, type Ctf, type DatiNuovoCtf, type Formato, type Livello } from '@/lib/ctf'
import { AreaTesto, Selezione } from './CampiModulo'
import Modale from './Modale'
import { PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from './stili'

const VUOTO: DatiNuovoCtf = {
  nome: '',
  linkCtftime: '',
  inizio: '',
  fine: '',
  formato: '',
  livello: '',
  descrizione: '',
}

type Props = { onChiudi: () => void; onSalva: (dati: Omit<Ctf, 'id'>) => void }

// Modale "Aggiungi CTF": un'utente inserisce un CTF scelto su CTFtime.
export default function ModaleAggiungiCtf({ onChiudi, onSalva }: Props) {
  const [valori, setValori] = useState<DatiNuovoCtf>(VUOTO)
  const [errori, setErrori] = useState<Partial<Record<keyof DatiNuovoCtf, string>>>({})

  function aggiorna(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValori((v) => ({ ...v, [name]: value }))
    if (errori[name as keyof DatiNuovoCtf]) setErrori((er) => ({ ...er, [name]: '' }))
  }

  function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nuoviErrori = validaNuovoCtf(valori)
    setErrori(nuoviErrori)
    if (Object.values(nuoviErrori).some(Boolean)) return

    onSalva({
      nome: valori.nome.trim(),
      linkCtftime: valori.linkCtftime.trim(),
      // <input type="datetime-local"> dà l'ora locale: la salviamo in formato ISO.
      inizio: new Date(valori.inizio).toISOString(),
      fine: new Date(valori.fine).toISOString(),
      formato: valori.formato as Formato,
      livello: valori.livello as Livello,
      descrizione: valori.descrizione.trim(),
    })
  }

  return (
    <Modale titolo="Aggiungi CTF" onChiudi={onChiudi}>
      <form onSubmit={invia} noValidate className="space-y-5">
        <Campo
          id="nome"
          etichetta="Nome del CTF"
          type="text"
          placeholder="es. CTF Hunter"
          autoFocus
          value={valori.nome}
          onChange={aggiorna}
          errore={errori.nome}
        />
        <Campo
          id="linkCtftime"
          etichetta="Link CTFtime"
          type="url"
          inputMode="url"
          placeholder={`${PREFISSO_CTFTIME}event/…`}
          value={valori.linkCtftime}
          onChange={aggiorna}
          errore={errori.linkCtftime}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo
            id="inizio"
            etichetta="Data inizio"
            type="datetime-local"
            value={valori.inizio}
            onChange={aggiorna}
            errore={errori.inizio}
          />
          <Campo
            id="fine"
            etichetta="Data fine"
            type="datetime-local"
            min={valori.inizio || undefined}
            value={valori.fine}
            onChange={aggiorna}
            errore={errori.fine}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Selezione
            id="formato"
            etichetta="Formato"
            opzioni={FORMATI}
            value={valori.formato}
            onChange={aggiorna}
            errore={errori.formato}
          />
          <Selezione
            id="livello"
            etichetta="Livello"
            opzioni={LIVELLI}
            value={valori.livello}
            onChange={aggiorna}
            errore={errori.livello}
          />
        </div>
        <AreaTesto
          id="descrizione"
          etichetta="Breve descrizione (facoltativa)"
          placeholder="Di cosa tratta, perché vale la pena partecipare…"
          massimo={DESCRIZIONE_MAX}
          value={valori.descrizione}
          onChange={aggiorna}
          errore={errori.descrizione}
        />

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onChiudi} className={PULSANTE_SECONDARIO}>
            Annulla
          </button>
          <button type="submit" className={PULSANTE_PRIMARIO}>
            Salva CTF
          </button>
        </div>
      </form>
    </Modale>
  )
}
