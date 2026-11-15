import Link from 'next/link'
import { LINK } from '@/components/ctf/stili'
import ArchivioNote from '@/components/note/ArchivioNote'
import { caricaNote } from '@/lib/note'

// Archivio delle note: tutte le note, libere, per chi ha già esperienza (niente lucchetti, niente quiz obbligatori).
// Il percorso guidato con lucchetti, quiz e XP resta in /lezioni.
export default async function PaginaNote() {
  const aree = await caricaNote()
  const totale = aree.reduce((n, a) => n + a.note.length, 0)

  return (
    <>
      <header>
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/note · archivio libero</p>
        <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Le note</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        <p className="mt-4 max-w-3xl text-lg text-text/80">
          Hai già esperienza? Qui trovi <strong className="text-text">{totale} note</strong> dai lab e dai CTF di founder e
          co-founder, tutte aperte: vai dritta all&apos;argomento che ti serve.
        </p>
        <p className="mt-2 text-sm text-text/55">
          Parti da zero? Il percorso guidato, con quiz, XP e lezioni da sbloccare, è in{' '}
          <Link href="/lezioni" className={LINK}>
            Lezioni →
          </Link>
        </p>
      </header>

      <ArchivioNote aree={aree} />
    </>
  )
}
