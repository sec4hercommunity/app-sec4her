'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { useAuth } from '@/auth/contesto'
import { MAX_GRUPPI_PER_CTF, MAX_MEMBRI_PER_GRUPPO } from '@/config/ctf'
import { CTF_INIZIALI, GRUPPI_INIZIALI } from '@/data/ctf-mock'
import { nomeDaEmail, nuovoId, type Ctf, type Gruppo, type Membro } from '@/lib/ctf'

type StatoCtfGroups = {
  ctf: Ctf[]
  gruppi: Gruppo[]
  utenteAttuale: Membro | null
  aggiungiCtf: (dati: Omit<Ctf, 'id'>) => Ctf
  creaGruppo: (ctfId: string, nome: string, nota: string) => void
  unisciti: (gruppoId: string) => void
  esciDalGruppo: (gruppoId: string) => void
}

const CtfContext = createContext<StatoCtfGroups | null>(null)

export function useCtf(): StatoCtfGroups {
  const valore = useContext(CtfContext)
  if (!valore) throw new Error('useCtf va usato dentro <CtfProvider>')
  return valore
}

// Gruppo dell'utente per un certo CTF (al massimo uno).
export function gruppoDellUtente(gruppi: Gruppo[], ctfId: string, email: string | undefined): Gruppo | undefined {
  if (!email) return undefined
  return gruppi.find((g) => g.ctfId === ctfId && g.membri.some((m) => m.email === email))
}

// Stato della sezione CTF Groups, tenuto in memoria con React.
// Parte dai dati finti di data/ctf-mock.ts: con Supabase queste funzioni leggeranno e scriveranno sul database.
export default function CtfProvider({ children }: { children: ReactNode }) {
  const [ctf, setCtf] = useState<Ctf[]>(CTF_INIZIALI)
  const [gruppi, setGruppi] = useState<Gruppo[]>(GRUPPI_INIZIALI)
  const { utente } = useAuth()
  // Per ora l'utente attuale è quella delle credenziali di test.
  const utenteAttuale = utente ? { email: utente, nome: nomeDaEmail(utente) } : null

  function aggiungiCtf(dati: Omit<Ctf, 'id'>) {
    const nuovo = { ...dati, id: nuovoId(dati.nome) }
    setCtf((lista) => [nuovo, ...lista])
    return nuovo
  }

  function creaGruppo(ctfId: string, nome: string, nota: string) {
    if (!utenteAttuale) return
    setGruppi((lista) => {
      const delCtf = lista.filter((g) => g.ctfId === ctfId)
      // Regole: massimo MAX_GRUPPI_PER_CTF gruppi e un solo gruppo per utente in ogni CTF.
      if (delCtf.length >= MAX_GRUPPI_PER_CTF || gruppoDellUtente(lista, ctfId, utenteAttuale.email)) return lista
      return [
        ...lista,
        { id: nuovoId(nome), ctfId, nome: nome.trim(), nota: nota.trim(), membri: [utenteAttuale] },
      ]
    })
  }

  function unisciti(gruppoId: string) {
    if (!utenteAttuale) return
    setGruppi((lista) => {
      const gruppo = lista.find((g) => g.id === gruppoId)
      if (!gruppo || gruppo.membri.length >= MAX_MEMBRI_PER_GRUPPO) return lista
      if (gruppoDellUtente(lista, gruppo.ctfId, utenteAttuale.email)) return lista
      return lista.map((g) => (g.id === gruppoId ? { ...g, membri: [...g.membri, utenteAttuale] } : g))
    })
  }

  function esciDalGruppo(gruppoId: string) {
    if (!utenteAttuale) return
    setGruppi((lista) =>
      lista
        .map((g) => (g.id === gruppoId ? { ...g, membri: g.membri.filter((m) => m.email !== utenteAttuale.email) } : g))
        // Un gruppo rimasto senza nessuno viene eliminato, così libera il posto.
        .filter((g) => g.membri.length > 0),
    )
  }

  return (
    <CtfContext.Provider value={{ ctf, gruppi, utenteAttuale, aggiungiCtf, creaGruppo, unisciti, esciDalGruppo }}>
      {children}
    </CtfContext.Provider>
  )
}
