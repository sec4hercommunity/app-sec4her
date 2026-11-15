import type { ReactNode } from 'react'
import LezioniProvider from '@/components/lezioni/LezioniProvider'
import { catalogoSenzaProve } from '@/lib/note'

// Sezione Note su sfondo scuro. Il LezioniProvider serve ai componenti interattivi delle note (es. il simulatore
// proxy), ma riceve il catalogo SENZA le prove: risposte dei quiz e flag non arrivano mai nel browser.
export default async function LayoutNote({ children }: { children: ReactNode }) {
  return (
    <LezioniProvider moduli={await catalogoSenzaProve()}>
      <div className="pagina-scura mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
    </LezioniProvider>
  )
}
