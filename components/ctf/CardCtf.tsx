import Link from 'next/link'
import { MAX_GRUPPI_PER_CTF } from '@/config/ctf'
import { statoCtf, type Ctf } from '@/lib/ctf'
import BadgeStato from './BadgeStato'
import { BarraGruppi, ContoAllaRovescia, DateCtf, EtichetteCtf, LinkCtftime } from './InfoCtf'
import { CARD, PULSANTE_PRIMARIO } from './stili'

type Props = { ctf: Ctf; numeroGruppi: number; ora: number; nuovo?: boolean }

// Card di un CTF nella lista di /ctf.
export default function CardCtf({ ctf, numeroGruppi, ora, nuovo = false }: Props) {
  const stato = statoCtf(ctf, ora)

  return (
    <article
      className={`${CARD} flex flex-col gap-4 p-5 starting:translate-y-2 starting:opacity-0 ${nuovo ? 'border-brand/70' : ''}`}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg font-bold leading-snug text-text">{ctf.nome}</h3>
        <BadgeStato stato={stato} />
      </header>

      <div className="space-y-1.5">
        <DateCtf ctf={ctf} />
        <ContoAllaRovescia ctf={ctf} stato={stato} ora={ora} />
      </div>

      <EtichetteCtf ctf={ctf} />

      {ctf.descrizione && <p className="line-clamp-2 text-sm text-text/70">{ctf.descrizione}</p>}

      <div className="mt-auto space-y-4">
        <BarraGruppi numero={numeroGruppi} massimo={MAX_GRUPPI_PER_CTF} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <LinkCtftime href={ctf.linkCtftime} />
          <Link href={`/ctf/${ctf.id}`} className={PULSANTE_PRIMARIO}>
            Vedi gruppi
          </Link>
        </div>
      </div>
    </article>
  )
}
