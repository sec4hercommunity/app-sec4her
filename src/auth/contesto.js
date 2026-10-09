import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// Restituisce { utente, accedi, esci } dal provider in AuthProvider.jsx.
export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth va usato dentro <AuthProvider>')
  return auth
}
