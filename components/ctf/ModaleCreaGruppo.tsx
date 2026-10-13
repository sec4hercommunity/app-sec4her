'use client'

import { useState, type FormEvent } from 'react'
import Campo from '@/components/Campo'
import { MAX_MEMBRI_PER_GRUPPO } from '@/config/ctf'
import { NOTA_MAX, validaNomeGruppo, type Gruppo } from '@/lib/ctf'
import { AreaTesto } from './CampiModulo'
import Modale from './Modale'
import { PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from './stili'

type Props = {
  gruppiEsistenti: Gruppo[]
  onChiudi: () => void
  onCrea: (nome: string, nota: string) => void
}

// Piccola modale "Crea gruppo": nome e una nota facoltativa. Chi crea il gruppo ne fa subito parte.
export default function ModaleCreaGruppo({ gruppiEsistenti, onChiudi, onCrea }: Props) {
  const [nome, setNome] = useState('')
  const [nota, setNota] = useState('')
  const [errori, setErrori] = useState<{ nome?: string; nota?: string }>({})

  function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nuoviErrori = {
      nome: validaNomeGruppo(nome, gruppiEsistenti),
      nota: nota.trim().length > NOTA_MAX ? `La nota può avere al massimo ${NOTA_MAX} caratteri.` : '',
    }
    setErrori(nuoviErrori)
    if (nuoviErrori.nome || nuoviErrori.nota) return
    onCrea(nome, nota)
  }

  return (
    <Modale titolo="Crea gruppo" onChiudi={onChiudi}>
      <form onSubmit={invia} noValidate className="space-y-5">
        <Campo
          id="nomeGruppo"
          etichetta="Nome del gruppo"
          type="text"
          placeholder="es. Byte Queens"
          autoFocus
          value={nome}
          onChange={(e) => {
            setNome(e.target.value)
            if (errori.nome) setErrori((er) => ({ ...er, nome: '' }))
          }}
          errore={errori.nome}
        />
        <AreaTesto
          id="notaGruppo"
          etichetta="Nota (facoltativa)"
          placeholder="es. cerchiamo qualcuna forte in web"
          rows={2}
          massimo={NOTA_MAX}
          value={nota}
          onChange={(e) => {
            setNota(e.target.value)
            if (errori.nota) setErrori((er) => ({ ...er, nota: '' }))
          }}
          errore={errori.nota}
        />
        <p className="font-mono text-xs text-text/60">
          <span className="text-hack">&gt;</span> Entrerai subito nel gruppo. Posti: {MAX_MEMBRI_PER_GRUPPO} in tutto.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onChiudi} className={PULSANTE_SECONDARIO}>
            Annulla
          </button>
          <button type="submit" className={PULSANTE_PRIMARIO}>
            Crea gruppo
          </button>
        </div>
      </form>
    </Modale>
  )
}
