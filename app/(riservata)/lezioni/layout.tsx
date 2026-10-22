import type { ReactNode } from 'react'
import LezioniProvider from '@/components/lezioni/LezioniProvider'
import { caricaCatalogo } from '@/lib/catalogo'

// Sezione Lezioni: stato condiviso tra percorso (/lezioni), moduli e lezioni, su sfondo scuro come CTF Groups.
// Il catalogo (moduli + lezioni dai file MDX) è letto sul server e passato allo stato del browser.
export default async function LayoutLezioni({ children }: { children: ReactNode }) {
  const moduli = await caricaCatalogo()
  return (
    <LezioniProvider moduli={moduli}>
      <div className="pagina-scura mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
    </LezioniProvider>
  )
}
