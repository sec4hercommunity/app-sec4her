import { notFound } from 'next/navigation'
import Segnaposto from '@/components/Segnaposto'
import { VOCI_MENU } from '@/config/sito'

// Una pagina segnaposto per ogni voce del menu (config/sito.ts); gli altri indirizzi non esistono.
export const dynamicParams = false

export function generateStaticParams() {
  return VOCI_MENU.map((voce) => ({ sezione: voce.percorso.slice(1) }))
}

export default async function PaginaSezione({ params }: { params: Promise<{ sezione: string }> }) {
  const { sezione } = await params
  const voce = VOCI_MENU.find((v) => v.percorso === `/${sezione}`)
  if (!voce) notFound()
  return <Segnaposto titolo={voce.titolo} />
}
