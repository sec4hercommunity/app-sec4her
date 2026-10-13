'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { useAuth } from '@/auth/contesto'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

// Pagine riservate: lascia passare solo chi ha fatto il login, gli altri vanno ad Accedi.
// Struttura: header scuro, contenuto su sfondo bianco (scuro per le sezioni con "pagina-scura", es. /ctf), footer scuro.
// Protezione solo lato browser (login di test): con Supabase (Fase 2) diventerà un controllo sul server.
export default function LayoutRiservato({ children }: { children: ReactNode }) {
  const { utente, uscitaVolontaria } = useAuth()
  const router = useRouter()
  const percorso = usePathname()

  useEffect(() => {
    if (utente !== null) return
    // Dopo "Esci" si va ad Accedi senza ricordare la pagina da cui si è uscite.
    router.replace(uscitaVolontaria() ? '/accedi' : `/accedi?da=${encodeURIComponent(percorso)}`)
  }, [utente, uscitaVolontaria, router, percorso])

  // Finché la sessione non è letta (o se manca il login) non mostra nulla del contenuto riservato.
  if (!utente) return null

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1 bg-white text-ink-text has-[.pagina-scura]:bg-ink has-[.pagina-scura]:text-text">{children}</main>
      <Footer />
    </div>
  )
}
