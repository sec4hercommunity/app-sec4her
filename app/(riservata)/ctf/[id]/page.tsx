'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import BadgeStato from '@/components/ctf/BadgeStato'
import CardGruppo from '@/components/ctf/CardGruppo'
import { gruppoDellUtente, useCtf } from '@/components/ctf/CtfProvider'
import { BarraGruppi, ContoAllaRovescia, DateCtf, EtichetteCtf, LinkCtftime } from '@/components/ctf/InfoCtf'
import ModaleCreaGruppo from '@/components/ctf/ModaleCreaGruppo'
import { LINK } from '@/components/ctf/stili'
import { useOra } from '@/components/ctf/useOra'
import { MAX_GRUPPI_PER_CTF, MAX_MEMBRI_PER_GRUPPO } from '@/config/ctf'
import { statoCtf } from '@/lib/ctf'

const TORNA = (
  <Link href="/ctf" className={`inline-flex items-center gap-1 font-mono text-sm ${LINK}`}>
    ← Torna ai CTF
  </Link>
)

export default function DettaglioCtf() {
  const { id } = useParams<{ id: string }>()
  const { ctf, gruppi, utenteAttuale, creaGruppo, unisciti, esciDalGruppo } = useCtf()
  const ora = useOra()
  const [modaleAperta, setModaleAperta] = useState(false)

  const evento = ctf.find((c) => c.id === id)

  if (!evento) {
    return (
      <>
        {TORNA}
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
          <p className="font-mono text-lg font-bold text-text">
            <span className="text-[#e0587f]">[errore]</span> CTF non trovato
          </p>
          <p className="mt-2 text-sm text-text/60">
            Forse è stato aggiunto in un&apos;altra sessione: per ora i dati sono finti e si azzerano ricaricando la pagina.
          </p>
        </div>
      </>
    )
  }

  const stato = statoCtf(evento, ora)
  const concluso = stato === 'concluso'
  const gruppiCtf = gruppi.filter((g) => g.ctfId === evento.id)
  const mioGruppo = gruppoDellUtente(gruppi, evento.id, utenteAttuale?.email)
  const limiteRaggiunto = gruppiCtf.length >= MAX_GRUPPI_PER_CTF

  function crea(nome: string, nota: string) {
    creaGruppo(evento!.id, nome, nota)
    setModaleAperta(false)
  }

  return (
    <>
      {TORNA}

      <section className="mt-6 rounded-2xl border border-white/10 border-t-2 border-t-crimson bg-white/[0.04] p-6 shadow-2xl shadow-brand/10 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/ctf/{evento.id}</p>
            <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">{evento.nome}</h1>
          </div>
          <div className="self-start">
            <BadgeStato stato={stato} />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <DateCtf ctf={evento} grande />
          <ContoAllaRovescia ctf={evento} stato={stato} ora={ora} />
        </div>

        <div className="mt-5">
          <EtichetteCtf ctf={evento} />
        </div>

        {evento.descrizione && <p className="mt-5 max-w-3xl text-text/80">{evento.descrizione}</p>}

        <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-sm">
            <BarraGruppi numero={gruppiCtf.length} massimo={MAX_GRUPPI_PER_CTF} />
          </div>
          <LinkCtftime href={evento.linkCtftime} />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="titolo-gruppi">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="titolo-gruppi" className="font-mono text-2xl font-bold text-text">
            <span className="text-hack">&gt;</span> Gruppi
          </h2>
          <p className="font-mono text-sm text-text/60">
            max {MAX_GRUPPI_PER_CTF} gruppi · {MAX_MEMBRI_PER_GRUPPO} persone per gruppo
          </p>
        </div>

        {mioGruppo && (
          <p className="mt-3 font-mono text-sm text-text/80">
            <span className="text-hack">[ok]</span> Sei in <strong className="text-text">{mioGruppo.nome}</strong>. Puoi stare in
            un solo gruppo per CTF.
          </p>
        )}
        {concluso && (
          <p className="mt-3 font-mono text-sm text-text/60">
            <span className="text-text/40">[info]</span> Il CTF è concluso: i gruppi restano visibili ma non si possono più
            modificare.
          </p>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gruppiCtf.map((g) => (
            <CardGruppo
              key={g.id}
              gruppo={g}
              emailUtente={utenteAttuale?.email}
              inAltroGruppo={Boolean(mioGruppo && mioGruppo.id !== g.id)}
              concluso={concluso}
              onUnisciti={() => unisciti(g.id)}
              onEsci={() => esciDalGruppo(g.id)}
            />
          ))}

          {!limiteRaggiunto && !concluso && (
            <button
              type="button"
              onClick={() => setModaleAperta(true)}
              disabled={Boolean(mioGruppo)}
              className="group flex min-h-56 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/60 p-5 text-center transition duration-200 hover:-translate-y-1 hover:border-brand hover:bg-brand/10 hover:shadow-[0_0_28px_-6px_rgba(109,68,224,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:border-white/15 disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:shadow-none"
            >
              <span className="font-mono text-3xl font-bold text-brand transition group-hover:scale-110 group-disabled:text-text/30 group-disabled:group-hover:scale-100">
                +
              </span>
              <span className="font-mono text-lg font-bold text-text group-disabled:text-text/50">Crea gruppo</span>
              <span className="text-sm text-text/60">
                {mioGruppo
                  ? 'Sei già in un gruppo: esci per crearne uno nuovo.'
                  : `Ancora ${MAX_GRUPPI_PER_CTF - gruppiCtf.length} su ${MAX_GRUPPI_PER_CTF} disponibili`}
              </span>
            </button>
          )}
        </div>

        {limiteRaggiunto && !concluso && (
          <p className="mt-6 rounded-xl border border-crimson/60 bg-crimson/10 px-4 py-3 font-mono text-sm text-text">
            <span className="font-bold text-[#e0587f]">[limite]</span> Numero massimo di gruppi raggiunto
          </p>
        )}
        {gruppiCtf.length === 0 && concluso && (
          <p className="mt-6 font-mono text-sm text-text/60">Nessun gruppo per questo CTF.</p>
        )}
      </section>

      {modaleAperta && (
        <ModaleCreaGruppo gruppiEsistenti={gruppiCtf} onChiudi={() => setModaleAperta(false)} onCrea={crea} />
      )}
    </>
  )
}
