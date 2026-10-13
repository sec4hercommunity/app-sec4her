import { redirect } from 'next/navigation'

// Qualsiasi indirizzo sconosciuto riporta ad Accedi.
export default function NonTrovata() {
  redirect('/accedi')
}
