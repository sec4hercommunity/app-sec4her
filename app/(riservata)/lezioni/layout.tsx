import type { ReactNode } from 'react'
import LezioniProvider from '@/components/lezioni/LezioniProvider'

// Sezione Lezioni: stato condiviso tra percorso (/lezioni), moduli e lezioni, su sfondo scuro come CTF Groups.
export default function LayoutLezioni({ children }: { children: ReactNode }) {
  return (
    <LezioniProvider>
      <div className="pagina-scura mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
    </LezioniProvider>
  )
}
