import { CARD, PULSANTE_PRIMARIO } from '@/components/ctf/stili'
import { TEAM, TIPI_CALL } from '@/data/eventi-mock'
import { iniziali } from '@/lib/ctf'
import { durataTesto } from '@/lib/eventi'
import { ESTERNO } from './AzioniIscrizione'
import { EtichettaPiattaforma } from './Icone'

// Scheda "Parla con noi": chi siamo e i tipi di call, prenotabili su Cal.com (nessun calendario costruito qui).
export default function ParlaConNoi() {
  return (
    <div className="space-y-12">
      <section>
        <p className="max-w-2xl text-lg text-text/80">
          Bloccata su un lab? Un dubbio sulla lezione? <strong className="text-text">Prenota una call con noi.</strong>
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {TEAM.map((p, i) => (
            <article key={p.ruolo} className={`${CARD} flex items-center gap-5 p-5`}>
              {/* Foto segnaposto: cerchio con le iniziali */}
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full font-mono text-2xl font-bold text-white ring-2 ring-white/10 ring-offset-2 ring-offset-ink ${
                  i % 2 === 0 ? 'bg-brand' : 'bg-crimson'
                }`}
                aria-hidden="true"
              >
                {iniziali(p.nome)}
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-lg font-bold text-text">{p.nome}</h3>
                <p className="font-mono text-sm text-hack">{p.ruolo}</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Argomenti su cui può aiutarti">
                  {p.argomenti.map((a) => (
                    <li key={a} className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-xs font-bold text-text/80">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="titolo-tipi-call">
        <h2 id="titolo-tipi-call" className="font-mono text-2xl font-bold text-text">
          <span className="text-hack">&gt;</span> Tipi di call
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {TIPI_CALL.map((t) => (
            <article key={t.id} className={`${CARD} flex flex-col gap-4 p-5`}>
              <header className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-lg font-bold text-text">{t.titolo}</h3>
                <span className="shrink-0 rounded-full border border-brand bg-brand/25 px-2.5 py-0.5 font-mono text-xs font-bold text-text">
                  {durataTesto(t.durataMinuti)}
                </span>
              </header>
              <p className="font-mono text-xs font-bold text-text/60">{t.persone}</p>
              <p className="text-sm text-text/70">{t.descrizione}</p>
              <div className="mt-auto space-y-4">
                <EtichettaPiattaforma piattaforma={t.piattaforma} />
                <a href={t.linkPrenotazione} {...ESTERNO} className={`${PULSANTE_PRIMARIO} w-full`}>
                  Prenota su Cal.com ↗
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 font-mono text-sm text-text/60">
          <span className="text-hack">&gt;</span> Scegli l&apos;orario, ricevi la conferma via email con il link alla call.
        </p>
      </section>
    </div>
  )
}
