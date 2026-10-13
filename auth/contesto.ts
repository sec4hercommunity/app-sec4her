'use client'

import { createContext, useContext } from 'react'

export type Auth = {
  // undefined = sto ancora leggendo la sessione; null = nessun login; stringa = email dell'utente.
  utente: string | null | undefined
  accedi: (email: string, password: string) => boolean
  esci: () => void
  // true se l'ultimo cambio è stato un "Esci" (e non un accesso diretto a una pagina riservata).
  uscitaVolontaria: () => boolean
}

export const AuthContext = createContext<Auth | null>(null)

// Restituisce { utente, accedi, esci } dal provider in AuthProvider.tsx.
export function useAuth(): Auth {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth va usato dentro <AuthProvider>')
  return auth
}
