import type { ReactNode } from 'react'
import CtfProvider from '@/components/ctf/CtfProvider'

// Sezione CTF Groups: stato condiviso tra la lista (/ctf) e i dettagli (/ctf/[id]), su sfondo scuro.
// La classe "pagina-scura" fa diventare scura anche la parte centrale del layout riservato.
export default function LayoutCtf({ children }: { children: ReactNode }) {
  return (
    <CtfProvider>
      <div className="pagina-scura mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
    </CtfProvider>
  )
}
