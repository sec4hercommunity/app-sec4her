'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import RichiestaCliccabile, { CHIAVI, COLORI_PARTI, NOMI_PARTI, type ChiaveParte } from './RichiestaCliccabile'

// Componenti interattivi delle lezioni MDX. Animazioni leggere fatte solo con CSS e stato React (nessuna libreria).
// Chi preferisce meno movimento (impostazione del sistema "riduci animazioni") vede le stesse cose senza animazioni.

const TITOLETTO = 'font-mono text-xs font-bold tracking-[0.25em] text-hack'
const CORNICE = 'my-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6'

// ---------- ScambioMessaggi ----------
// Una lettera va da "da" ad "a" e torna. Con "in_mezzo" passa anche da un terzo box (il proxy).
// <ScambioMessaggi da="TU" a="IL SITO" andata="richiesta" ritorno="risposta" in_mezzo="IL PROXY" />
export function ScambioMessaggi({
  da,
  a,
  andata,
  ritorno,
  in_mezzo,
}: {
  da: string
  a: string
  andata?: string
  ritorno?: string
  in_mezzo?: string
}) {
  const box = in_mezzo ? [da, in_mezzo, a] : [da, a]
  // Percorso della lettera, box per box: andata e ritorno.
  const percorso = in_mezzo ? [0, 1, 2, 1, 0] : [0, 1, 0]
  const [passo, setPasso] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPasso((p) => (p + 1) % percorso.length), 1600)
    return () => clearInterval(t)
  }, [percorso.length])

  const dove = percorso[passo]
  const meta = Math.floor(percorso.length / 2)
  // Fino al box più lontano la lettera è la richiesta, poi diventa la risposta che torna indietro.
  const inRitorno = passo > meta
  const etichetta = inRitorno ? (ritorno ?? 'risposta') : (andata ?? 'richiesta')
  // Centro del box in percentuale (i box hanno tutti la stessa larghezza/altezza).
  const pos = `${((dove + 0.5) / box.length) * 100}%`

  return (
    <figure className={CORNICE} aria-label={`Scambio di messaggi tra ${box.join(', ')}`}>
      <div className="relative">
        <div className={`grid gap-6 sm:gap-4 ${in_mezzo ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {box.map((b, i) => (
            <div
              key={b}
              className={`flex min-h-24 items-center justify-center rounded-xl border px-3 py-4 text-center font-mono text-sm font-bold transition duration-500 ${
                dove === i
                  ? 'border-brand bg-brand/20 text-white shadow-[0_0_24px_-4px_rgba(109,68,224,0.8)]'
                  : in_mezzo && i === 1
                    ? 'border-crimson/60 border-dashed text-text/80'
                    : 'border-white/15 text-text/80'
              }`}
            >
              {b}
            </div>
          ))}
        </div>
        {/* La lettera: si sposta sopra i box (in verticale su telefono, in orizzontale da sm in su). */}
        <span
          aria-hidden="true"
          style={{ ['--pos' as string]: pos }}
          className="pointer-events-none absolute top-[var(--pos)] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hack bg-ink px-3 py-1 font-mono text-xs font-bold whitespace-nowrap text-hack shadow-lg transition-all duration-1000 ease-in-out motion-reduce:transition-none sm:top-full sm:left-[var(--pos)] sm:translate-y-1"
        >
          ✉ {etichetta}
        </span>
      </div>
      <figcaption className="mt-10 text-center font-mono text-xs text-text/60" aria-live="polite">
        {inRitorno ? '← ' : '→ '}
        {etichetta}
      </figcaption>
    </figure>
  )
}

// ---------- PalazzoPorte ----------
// Un palazzo con l'IP: ogni appartamento è una porta; cliccandolo si vede il servizio.
// <PalazzoPorte ip="192.168.1.25" porte={[{ numero: 80, nome: "HTTP", nota: "siti web non protetti" }]} />
export function PalazzoPorte({
  ip,
  porte = [],
}: {
  ip: string
  porte?: { numero: number; nome: string; nota?: string }[]
}) {
  const [scelta, setScelta] = useState<number | null>(null)
  const porta = porte.find((p) => p.numero === scelta)

  return (
    <figure className={`${CORNICE} flex flex-col items-center gap-5 sm:flex-row sm:items-stretch`}>
      <div className="w-full max-w-60 shrink-0">
        {/* Tetto */}
        <div
          className="mx-auto h-0 w-0 border-x-[7.5rem] border-b-[2.5rem] border-x-transparent border-b-brand/50"
          aria-hidden="true"
        />
        <div className="rounded-b-xl border border-t-0 border-brand/50 bg-brand/10 p-4">
          <p className="text-center font-mono text-xs text-text/60">indirizzo IP</p>
          <p className="text-center font-mono text-base font-bold text-text">{ip}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {porte.map((p) => (
              <button
                key={p.numero}
                type="button"
                onClick={() => setScelta(p.numero)}
                aria-pressed={scelta === p.numero}
                className={`cursor-pointer rounded-lg border px-2 py-3 font-mono text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  scelta === p.numero
                    ? 'border-hack bg-hack/25 text-white'
                    : 'border-white/20 bg-ink text-text/80 hover:border-brand/60'
                }`}
              >
                🚪 {p.numero}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center rounded-xl border border-dashed border-white/15 p-4" aria-live="polite">
        {porta ? (
          <p className="font-mono text-sm">
            <span className="text-text/60">{ip}:</span>
            <span className="font-bold text-hack">{porta.numero}</span>
            <br />
            <span className="mt-2 inline-block text-lg font-bold text-text">{porta.nome}</span>
            {porta.nota && <span className="block text-text/70">{porta.nota}</span>}
          </p>
        ) : (
          <p className="font-mono text-sm text-text/60">
            👆 Clicca un appartamento (una porta) per vedere chi ci abita.
          </p>
        )}
      </div>
    </figure>
  )
}

// ---------- DnsRubrica ----------
// Campo stile terminale: scrivi un nome di esempio e appare il suo IP, lettera per lettera.
// <DnsRubrica esempi={[{ nome: "google.com", ip: "142.250.180.14" }]} />
export function DnsRubrica({ esempi = [] }: { esempi?: { nome: string; ip: string }[] }) {
  const [nome, setNome] = useState('')
  const [risultato, setRisultato] = useState<{ nome: string; ip: string | null } | null>(null)
  const [mostrati, setMostrati] = useState(0)

  function cerca(valore: string, anchePerSconosciuti: boolean) {
    const pulito = valore.trim().toLowerCase()
    const trovato = esempi.find((e) => e.nome.toLowerCase() === pulito)
    if (trovato) {
      setRisultato({ nome: trovato.nome, ip: trovato.ip })
      setMostrati(0)
    } else if (anchePerSconosciuti && pulito) {
      setRisultato({ nome: pulito, ip: null })
    } else {
      setRisultato(null)
    }
  }

  // Effetto "digitazione": l'IP compare un carattere alla volta.
  useEffect(() => {
    if (!risultato?.ip || mostrati >= risultato.ip.length) return
    const t = setTimeout(() => setMostrati((n) => n + 1), 60)
    return () => clearTimeout(t)
  }, [risultato, mostrati])

  function invia(e: FormEvent) {
    e.preventDefault()
    cerca(nome, true)
  }

  return (
    <figure className={CORNICE}>
      <p className={TITOLETTO}>📖 LA RUBRICA DNS</p>
      <form onSubmit={invia} className="mt-3 rounded-xl border border-white/10 bg-[#07070c] p-4 font-mono text-sm">
        <label htmlFor="dns-nome" className="flex items-center gap-2">
          <span className="text-hack">$</span>
          <span className="text-text/60">dns</span>
          <input
            id="dns-nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value)
              cerca(e.target.value, false)
            }}
            placeholder="scrivi un nome, es. google.com"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-text caret-hack outline-none placeholder:text-text/30"
          />
        </label>
        <p className="mt-3 min-h-6" aria-live="polite">
          {risultato?.ip ? (
            <>
              <span className="text-text/60">{risultato.nome} →</span>{' '}
              <span className="font-bold text-hack">{risultato.ip.slice(0, mostrati)}</span>
              <span className="cursor-blink text-hack">_</span>
            </>
          ) : risultato ? (
            <span className="text-[#e0587f]">✗ {risultato.nome}: non nella rubrica di esempio</span>
          ) : (
            <span className="text-text/40">Premi Invio per cercare.</span>
          )}
        </p>
      </form>
      <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text/60">
        Prova con:
        {esempi.map((e) => (
          <button
            key={e.nome}
            type="button"
            onClick={() => {
              setNome(e.nome)
              cerca(e.nome, true)
            }}
            className="cursor-pointer rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-text/80 transition hover:border-brand/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {e.nome}
          </button>
        ))}
      </figcaption>
    </figure>
  )
}

// ---------- LetteraHTTP ----------
// La richiesta con le 4 parti colorate; passando sopra (o toccando) una parte compare la spiegazione.
// <LetteraHTTP richiesta={`POST /login HTTP/1.1 ...`} parti={[{ chiave: "metodo", testo: "POST", spiegazione: "..." }]} />
export function LetteraHTTP({
  richiesta,
  parti = [],
}: {
  richiesta: string
  parti?: { chiave: ChiaveParte; testo?: string; spiegazione: string }[]
}) {
  const [attiva, setAttiva] = useState<ChiaveParte | null>(null)
  const info = parti.find((p) => p.chiave === attiva)
  const chiavi = CHIAVI.filter((c) => parti.some((p) => p.chiave === c))

  return (
    <figure className="my-8">
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Parti della richiesta">
        {chiavi.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setAttiva(c)}
            aria-pressed={attiva === c}
            className={`cursor-pointer rounded-full border px-3 py-1 font-mono text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              COLORI_PARTI[c].bordo
            } ${COLORI_PARTI[c].testo} ${attiva === c ? COLORI_PARTI[c].sfondo : ''}`}
          >
            {NOMI_PARTI[c]}
          </button>
        ))}
      </div>
      <RichiestaCliccabile testo={richiesta} attiva={attiva} onScegli={setAttiva} alPassaggio />
      <figcaption
        className={`mt-3 min-h-16 rounded-xl border px-4 py-3 text-sm transition ${
          attiva ? `${COLORI_PARTI[attiva].bordo} bg-white/[0.04]` : 'border-dashed border-white/15'
        }`}
        aria-live="polite"
      >
        {attiva && info ? (
          <>
            <span className={`font-mono font-bold ${COLORI_PARTI[attiva].testo}`}>
              {NOMI_PARTI[attiva]}
              {info.testo && <span className="font-normal text-text/50"> · {info.testo}</span>}
            </span>
            <span className="mt-1 block text-text/85">{info.spiegazione}</span>
          </>
        ) : (
          <span className="font-mono text-text/50">👆 Passa il mouse o tocca una parte colorata della lettera.</span>
        )}
      </figcaption>
    </figure>
  )
}

// ---------- StatusCodes ----------
// Carte che si girano al click: davanti il numero, dietro il significato.
// <StatusCodes codici={[{ codice: 200, significato: "Ok", colore: "verde" }]} />
const COLORI_CARTE: Record<string, string> = {
  verde: 'border-hack text-hack bg-hack/10',
  viola: 'border-brand text-[#a98bff] bg-brand/15',
  cremisi: 'border-crimson text-[#ff8fb0] bg-crimson/15',
  grigio: 'border-white/30 text-text/70 bg-white/5',
}

export function StatusCodes({ codici = [] }: { codici?: { codice: number; significato: string; colore?: string }[] }) {
  const [girate, setGirate] = useState<ReadonlySet<number>>(new Set())

  function gira(codice: number) {
    setGirate((g) => {
      const n = new Set(g)
      if (n.has(codice)) n.delete(codice)
      else n.add(codice)
      return n
    })
  }

  return (
    <ul className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {codici.map((c) => {
        const girata = girate.has(c.codice)
        const colore = COLORI_CARTE[c.colore ?? 'grigio'] ?? COLORI_CARTE.grigio
        return (
          <li key={c.codice} className="h-28 perspective-[800px]">
            <button
              type="button"
              onClick={() => gira(c.codice)}
              aria-pressed={girata}
              aria-label={`Status ${c.codice}${girata ? `: ${c.significato}` : ': gira la carta'}`}
              className={`relative h-full w-full cursor-pointer rounded-xl transition duration-500 transform-3d focus:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-reduce:transition-none ${
                girata ? 'rotate-y-180' : ''
              }`}
            >
              <span
                className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 font-mono backface-hidden ${colore}`}
              >
                <span className="text-3xl font-bold">{c.codice}</span>
                <span className="mt-1 text-[10px] text-text/50">tocca per girare</span>
              </span>
              <span
                className={`absolute inset-0 flex rotate-y-180 items-center justify-center rounded-xl border-2 px-3 text-center text-sm font-bold backface-hidden ${colore}`}
              >
                <span className="text-text">{c.significato}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

// ---------- CartolinaVsBusta ----------
// Interruttore HTTP / HTTPS: in chiaro (cartolina) oppure cifrato (busta chiusa con lucchetto).
// <CartolinaVsBusta messaggio="username=giulia&password=segreta123" />
const CARATTERI = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=#%&$'

function cifrato(lunghezza: number): string {
  return Array.from({ length: lunghezza }, () => CARATTERI[Math.floor(Math.random() * CARATTERI.length)]).join('')
}

export function CartolinaVsBusta({ messaggio }: { messaggio: string }) {
  const [https, setHttps] = useState(false)
  const [testoCifrato, setTestoCifrato] = useState('')
  const giri = useRef(0)

  // Passando a HTTPS il testo si "rimescola" per un attimo e poi resta cifrato.
  useEffect(() => {
    if (!https) return
    giri.current = 0
    const t = setInterval(() => {
      giri.current++
      setTestoCifrato(cifrato(Math.max(24, Math.round(messaggio.length * 1.3))))
      if (giri.current > 6) clearInterval(t)
    }, 70)
    return () => clearInterval(t)
  }, [https, messaggio])

  return (
    <figure className={CORNICE}>
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm font-bold">
        <span className={https ? 'text-text/40' : 'text-[#ff8fb0]'}>HTTP · porta 80</span>
        <button
          type="button"
          role="switch"
          aria-checked={https}
          aria-label="Usa HTTPS"
          onClick={() => setHttps((h) => !h)}
          className={`relative h-7 w-14 shrink-0 cursor-pointer rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            https ? 'border-hack bg-hack/40' : 'border-crimson bg-crimson/30'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-white transition-transform ${https ? 'translate-x-7' : ''}`}
          />
        </button>
        <span className={https ? 'text-hack' : 'text-text/40'}>HTTPS · porta 443</span>
      </div>

      <div
        className={`mt-5 rounded-xl border-2 p-5 transition duration-500 ${
          https ? 'border-hack/60 bg-hack/[0.07]' : 'border-dashed border-crimson/60 bg-[#fdf6e3]/[0.06]'
        }`}
      >
        <p className="font-mono text-xs font-bold tracking-[0.2em] text-text/60">
          {https ? '✉️🔒 BUSTA CHIUSA (cifrata con TLS)' : '📮 CARTOLINA (in chiaro)'}
        </p>
        <p
          className={`mt-3 font-mono text-sm break-all sm:text-base ${https ? 'text-hack/80' : 'text-text'}`}
          aria-live="polite"
        >
          {https ? (
            <>
              <span aria-hidden="true">🔒 </span>
              <span aria-label="Testo cifrato, illeggibile">{testoCifrato}</span>
            </>
          ) : (
            messaggio
          )}
        </p>
      </div>
      <figcaption className="mt-3 text-xs text-text/60">
        {https
          ? 'Chi intercetta il messaggio in viaggio vede solo caratteri senza senso.'
          : 'Chiunque intercetti il messaggio in viaggio lo legge così com’è.'}
      </figcaption>
    </figure>
  )
}

// ---------- ViaggioCompleto ----------
// I passi di un viaggio, animati uno alla volta con ▶, oppure avanti/indietro a mano.
// <ViaggioCompleto passi={["Digiti sito.com", "Il DNS traduce il nome in un IP"]} />
export function ViaggioCompleto({ passi = [] }: { passi?: string[] }) {
  const [attuale, setAttuale] = useState(-1) // -1 = non ancora partito
  const [avviato, setAvviato] = useState(false)
  // Si ferma da solo all'ultimo passo.
  const inRiproduzione = avviato && attuale < passi.length - 1
  const setInRiproduzione = setAvviato

  useEffect(() => {
    if (!inRiproduzione) return
    const t = setTimeout(() => setAttuale((a) => a + 1), attuale < 0 ? 200 : 1300)
    return () => clearTimeout(t)
  }, [inRiproduzione, attuale])

  function play() {
    if (attuale >= passi.length - 1) setAttuale(-1)
    setInRiproduzione(true)
  }

  const BOTTONE =
    'cursor-pointer rounded-lg border border-white/15 px-3 py-2 font-mono text-sm font-bold text-text transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <figure className={CORNICE}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => (inRiproduzione ? setInRiproduzione(false) : play())}
          className="cursor-pointer rounded-lg bg-brand px-4 py-2 font-mono text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-[#7d58ea] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {inRiproduzione ? '⏸ Pausa' : attuale >= passi.length - 1 ? '↺ Rivedi' : '▶ Play'}
        </button>
        <button
          type="button"
          className={BOTTONE}
          onClick={() => {
            setInRiproduzione(false)
            setAttuale((a) => Math.max(0, a - 1))
          }}
          disabled={attuale <= 0}
          aria-label="Passo precedente"
        >
          ← Indietro
        </button>
        <button
          type="button"
          className={BOTTONE}
          onClick={() => {
            setInRiproduzione(false)
            setAttuale((a) => Math.min(passi.length - 1, a + 1))
          }}
          disabled={attuale >= passi.length - 1}
          aria-label="Passo successivo"
        >
          Avanti →
        </button>
        <span className="ml-auto font-mono text-xs text-text/60" aria-live="polite">
          {Math.max(0, attuale + 1)}/{passi.length}
        </span>
      </div>
      <ol className="mt-5 space-y-2">
        {passi.map((p, i) => {
          const stato = i < attuale ? 'fatto' : i === attuale ? 'ora' : 'dopo'
          return (
            <li
              key={p}
              aria-current={stato === 'ora' ? 'step' : undefined}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition duration-500 ${
                stato === 'ora'
                  ? 'border-brand bg-brand/20 text-white shadow-[0_0_24px_-6px_rgba(109,68,224,0.8)]'
                  : stato === 'fatto'
                    ? 'border-hack/40 bg-hack/10 text-text/85'
                    : 'border-white/10 text-text/40'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                  stato === 'ora' ? 'bg-brand text-white' : stato === 'fatto' ? 'bg-hack/30 text-hack' : 'bg-white/5'
                }`}
                aria-hidden="true"
              >
                {stato === 'fatto' ? '✓' : i + 1}
              </span>
              {p}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
