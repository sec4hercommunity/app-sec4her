import { useState } from 'react'
import { CREDENZIALI_TEST } from '../config/credenzialiTest.js'
import { AuthContext } from './contesto.js'

// Chiave usata per ricordare il login finché la scheda del browser resta aperta.
const CHIAVE_SESSIONE = 'sec4her-utente'

function leggiSessione() {
  try {
    return sessionStorage.getItem(CHIAVE_SESSIONE)
  } catch {
    return null
  }
}

function scriviSessione(email) {
  try {
    if (email) sessionStorage.setItem(CHIAVE_SESSIONE, email)
    else sessionStorage.removeItem(CHIAVE_SESSIONE)
  } catch {
    // Storage non disponibile (es. navigazione privata): il login resta valido solo finché non si ricarica.
  }
}

// Login finto basato sulle credenziali di test: da sostituire con Supabase Auth.
export default function AuthProvider({ children }) {
  const [utente, setUtente] = useState(() => leggiSessione())

  function accedi(email, password) {
    const corrette =
      email.trim().toLowerCase() === CREDENZIALI_TEST.email && password === CREDENZIALI_TEST.password
    if (!corrette) return false
    setUtente(CREDENZIALI_TEST.email)
    scriviSessione(CREDENZIALI_TEST.email)
    return true
  }

  function esci() {
    setUtente(null)
    scriviSessione(null)
  }

  return <AuthContext.Provider value={{ utente, accedi, esci }}>{children}</AuthContext.Provider>
}
