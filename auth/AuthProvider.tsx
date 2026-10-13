'use client'

import { useSyncExternalStore, type ReactNode } from 'react'
import { CREDENZIALI_TEST } from '@/config/credenzialiTest'
import { AuthContext } from './contesto'

// Chiave usata per ricordare il login finché la scheda del browser resta aperta.
const CHIAVE_SESSIONE = 'sec4her-utente'

// Copia in memoria della sessione: serve se lo storage non è disponibile (es. navigazione privata).
let utenteInMemoria: string | null = null
let uscita = false
const ascoltatori = new Set<() => void>()

function leggiSessione(): string | null {
  try {
    return sessionStorage.getItem(CHIAVE_SESSIONE)
  } catch {
    return utenteInMemoria
  }
}

function scriviSessione(email: string | null) {
  utenteInMemoria = email
  try {
    if (email) sessionStorage.setItem(CHIAVE_SESSIONE, email)
    else sessionStorage.removeItem(CHIAVE_SESSIONE)
  } catch {
    // Storage non disponibile: il login resta valido solo finché non si ricarica.
  }
  ascoltatori.forEach((avvisa) => avvisa())
}

function iscriviti(avvisa: () => void) {
  ascoltatori.add(avvisa)
  return () => ascoltatori.delete(avvisa)
}

// Login finto basato sulle credenziali di test: da sostituire con Supabase Auth (Fase 2).
export default function AuthProvider({ children }: { children: ReactNode }) {
  // sessionStorage esiste solo nel browser: sul server il valore è "non ancora letto" (undefined).
  const utente = useSyncExternalStore<string | null | undefined>(iscriviti, leggiSessione, () => undefined)

  function accedi(email: string, password: string) {
    const corrette =
      email.trim().toLowerCase() === CREDENZIALI_TEST.email && password === CREDENZIALI_TEST.password
    if (!corrette) return false
    uscita = false
    scriviSessione(CREDENZIALI_TEST.email)
    return true
  }

  function esci() {
    uscita = true
    scriviSessione(null)
  }

  return <AuthContext.Provider value={{ utente, accedi, esci, uscitaVolontaria: () => uscita }}>{children}</AuthContext.Provider>
}
