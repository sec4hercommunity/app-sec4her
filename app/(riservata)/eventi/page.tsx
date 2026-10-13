'use client'

import { useState } from 'react'
import { useOra } from '@/components/ctf/useOra'
import CardEvento from '@/components/eventi/CardEvento'
import CardEventoMese from '@/components/eventi/CardEventoMese'
import { IconaTema } from '@/components/eventi/Icone'
import ModaleIscrizione from '@/components/eventi/ModaleIscrizione'
import { useEventi } from '@/components/eventi/useEventi'
import RiquadroDiscord from '@/components/RiquadroDiscord'
import { eventoInCorso, eventoPassato, TEMI, type Evento, type Modalita, type Tema } from '@/lib/eventi'

const FILTRI_MODALITA: { valore: 'tutte' | Modalita; testo: string }[] = [
  { valore: 'tutte', testo: 'Tutte' },
  { valore: 'online', testo: 'Online' },
  { valore: 'presenza', testo: 'In presenza' },
]

function classePillola(attiva: boolean) {
  return `inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
    attiva
      ? 'border-brand bg-brand text-white shadow-lg shadow-brand/25'
      : 'border-white/15 text-text/70 hover:border-brand/60 hover:text-text'
  }`
}

export default function PaginaEventi() {
  const { eventi, iscrizioni, iscritteTotali, iscriviti, annullaIscrizione } = useEventi()
  const ora = useOra()
  const [tema, setTema] = useState<'tutti' | Tema>('tutti')
  const [modalita, setModalita] = useState<'tutte' | Modalita>('tutte')
  // Modale di iscrizione aperta per un evento; "confermata" mostra il messaggio "Sei iscritta! ✓".
  const [modale, setModale] = useState<{ id: string; confermata: boolean } | null>(null)

  const futuri = eventi
    .filter((e) => !eventoPassato(e, ora))
    .sort((a, b) => Date.parse(a.inizio) - Date.parse(b.inizio))
  const passati = eventi
    .filter((e) => eventoPassato(e, ora))
    .sort((a, b) => Date.parse(b.inizio) - Date.parse(a.inizio))
  // Evento del mese: quello indicato nei dati, altrimenti il prossimo in programma.
  const delMese = futuri.find((e) => e.inEvidenza) ?? futuri[0]

  const filtra = (e: Evento) => (tema === 'tutti' || e.tema === tema) && (modalita === 'tutte' || e.modalita === modalita)
  const prossimi = futuri.filter((e) => e.id !== delMese?.id).filter(filtra)
  const archivio = passati.filter(filtra)
  const eventoModale = modale ? eventi.find((e) => e.id === modale.id) : undefined

  function propsIscrizione(e: Evento) {
    return {
      evento: e,
      iscritte: iscritteTotali(e),
      iscrizione: iscrizioni[e.id],
      onPartecipo: () => setModale({ id: e.id, confermata: false }),
      onAnnulla: () => annullaIscrizione(e.id),
    }
  }

  return (
    <>
      <header>
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/eventi</p>
        <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Eventi</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        <p className="mt-4 text-text/70">Workshop e serate a tema, dal vivo o online. Si impara insieme.</p>
      </header>

      <div className="mt-10 space-y-14">
        {delMese && <CardEventoMese {...propsIscrizione(delMese)} ora={ora} />}

        <section aria-labelledby="titolo-prossimi">
          <h2 id="titolo-prossimi" className="font-mono text-2xl font-bold text-text">
            <span className="text-hack">&gt;</span> Prossimi eventi
          </h2>

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra per tema">
              <button type="button" onClick={() => setTema('tutti')} aria-pressed={tema === 'tutti'} className={classePillola(tema === 'tutti')}>
                Tutti
              </button>
              {(Object.keys(TEMI) as Tema[]).map((t) => (
                <button key={t} type="button" onClick={() => setTema(t)} aria-pressed={tema === t} className={classePillola(tema === t)}>
                  <IconaTema tema={t} className="h-3.5 w-3.5" />
                  {TEMI[t]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtra per modalità">
              <span className="mr-1 font-mono text-xs font-bold text-text/50">Modalità:</span>
              {FILTRI_MODALITA.map((f) => (
                <button
                  key={f.valore}
                  type="button"
                  onClick={() => setModalita(f.valore)}
                  aria-pressed={modalita === f.valore}
                  className={classePillola(modalita === f.valore)}
                >
                  {f.testo}
                </button>
              ))}
            </div>
          </div>

          {prossimi.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {prossimi.map((e) => (
                <CardEvento key={e.id} {...propsIscrizione(e)} passato={false} inCorso={eventoInCorso(e, ora)} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center font-mono text-sm text-text/60">
              <span className="text-hack">&gt;</span> Nessun evento in programma con questi filtri
              <span className="cursor-blink">_</span>
            </p>
          )}
        </section>

        <section aria-labelledby="titolo-passati">
          <h2 id="titolo-passati" className="font-mono text-2xl font-bold text-text/80">
            <span className="text-text/40">&gt;</span> Eventi passati
          </h2>
          {archivio.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {archivio.map((e) => (
                <CardEvento key={e.id} {...propsIscrizione(e)} passato inCorso={false} />
              ))}
            </div>
          ) : (
            <p className="mt-6 font-mono text-sm text-text/60">Nessun evento passato con questi filtri.</p>
          )}
        </section>
      </div>

      <div className="mt-16">
        <RiquadroDiscord />
      </div>

      {modale && eventoModale && (
        <ModaleIscrizione
          evento={eventoModale}
          iscritta={modale.confermata}
          onConferma={(dati) => {
            iscriviti(eventoModale, dati)
            setModale({ id: eventoModale.id, confermata: true })
          }}
          onChiudi={() => setModale(null)}
        />
      )}
    </>
  )
}
