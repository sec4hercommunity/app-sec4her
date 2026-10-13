import type { ReactNode } from 'react'

// Pagina Meeting su sfondo scuro, come CTF Groups (la classe "pagina-scura" scurisce la parte centrale).
export default function LayoutMeeting({ children }: { children: ReactNode }) {
  return <div className="pagina-scura mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
}
