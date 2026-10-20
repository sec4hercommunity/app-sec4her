import Link from 'next/link'
import { LINK } from '@/components/ctf/stili'
import CardTeam from '@/components/meeting/CardTeam'
import CardTipoCall from '@/components/meeting/CardTipoCall'
import RiquadroDiscord from '@/components/RiquadroDiscord'
import { TEAM, TIPI_CALL } from '@/data/meeting-mock'

// Pagina Meeting: chi siamo e i tipi di call, prenotabili su Cal.com.
export default function PaginaMeeting() {
  return (
    <>
      <header>
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/meeting</p>
        <h1 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Meeting</h1>
        <div className="mt-3 h-1 w-24 bg-crimson" />
        <p className="mt-4 max-w-2xl text-lg text-text/80">
          Bloccata su un lab? Un dubbio sulla lezione? <strong className="text-text">Prenota una call con noi.</strong>
        </p>
      </header>

      <section aria-labelledby="titolo-team" className="mt-10">
        <h2 id="titolo-team" className="font-mono text-2xl font-bold text-text">
          <span className="text-hack">&gt;</span> Con chi parli
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {TEAM.map((p, i) => (
            <CardTeam key={p.ruolo} persona={p} colore={i % 2 === 0 ? 'bg-brand' : 'bg-crimson'} />
          ))}
        </div>
      </section>

      <section aria-labelledby="titolo-tipi-call" className="mt-14">
        <h2 id="titolo-tipi-call" className="font-mono text-2xl font-bold text-text">
          <span className="text-hack">&gt;</span> Prenota una call
        </h2>
        <div className="mx-auto mt-6 max-w-xl">
          {TIPI_CALL.map((t) => (
            <CardTipoCall key={t.id} tipo={t} />
          ))}
          <p className="mt-4 text-center font-mono text-sm text-text/60">
            <span className="text-hack">&gt;</span> Scegli l&apos;orario, ricevi la conferma via email con il link alla call.
          </p>
          <aside className="mt-8 rounded-xl border border-dashed border-white/15 px-5 py-4 text-center text-sm text-text/80">
            <strong className="text-text">Vuoi imparare in gruppo?</strong> Le sessioni live settimanali sono nella
            sezione{' '}
            <Link href="/lezioni" className={LINK}>
              Lezioni →
            </Link>
          </aside>
        </div>
      </section>

      <div className="mt-16">
        <RiquadroDiscord />
      </div>
    </>
  )
}
