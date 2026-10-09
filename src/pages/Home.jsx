import { Link } from 'react-router-dom'

// Testi segnaposto: modificali liberamente.
const DESCRIZIONE =
  "Sec4Her Academy è lo spazio dove le donne imparano la cybersecurity partendo da zero. " +
  "Niente teoria infinita: si parte dai lab, si capisce facendo e si cresce insieme, " +
  "dalle basi del web fino alle prime vulnerabilità trovate sul campo. " +
  "Perché l'hacking non è facile, ma nessuna deve impararlo da sola."

const ATTIVITA = [
  {
    titolo: 'Lezioni',
    testo: 'Percorso passo passo: dal funzionamento del web alle vulnerabilità più comuni, con schemi e lab pratici.',
    percorso: '/lezioni',
  },
  {
    titolo: 'Eventi',
    testo: 'Incontri a tema su OSINT, social engineering e privacy, online e, presto, anche dal vivo.',
    percorso: '/eventi',
  },
  {
    titolo: 'CTF',
    testo: 'Giornate di sfide in squadra: si impara mille volte di più risolvendo i problemi insieme.',
    percorso: '/ctf',
  },
  {
    titolo: 'Bug Bounty',
    testo: 'Piccoli team che cercano vulnerabilità reali, sostenendosi a vicenda nel rispetto dell’etica.',
    percorso: '/bug-bounty',
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="max-w-3xl">
        <h1 className="font-mono text-3xl font-bold leading-tight text-brand sm:text-5xl">
          Benvenuta in Sec4Her Academy
        </h1>
        <p className="mt-4 inline-block border-b-4 border-crimson pb-2 font-mono text-sm font-bold tracking-[0.3em] text-ink-text sm:text-base">
          HACK THE FUTURE
        </p>
        <p className="mt-6 text-base leading-relaxed sm:text-lg">{DESCRIZIONE}</p>
      </section>

      <section className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ATTIVITA.map((a) => (
          <Link
            key={a.titolo}
            to={a.percorso}
            className="group flex flex-col rounded-xl border border-brand/60 bg-white p-6 transition hover:border-brand hover:shadow-lg hover:shadow-brand/15"
          >
            <h2 className="font-mono text-xl font-bold text-ink-text">
              <span className="text-hack">&gt;</span> {a.titolo}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed">{a.testo}</p>
            <span className="mt-4 font-mono text-sm font-bold text-brand group-hover:underline">Scopri di più →</span>
          </Link>
        ))}
      </section>
    </div>
  )
}
