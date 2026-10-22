'use client'

import { useId, useState, type FormEvent } from 'react'
import { PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from '@/components/ctf/stili'

// Simulatore di proxy (stile Caido) per la lezione "Intercettiamo un login".
// A sinistra un sito finto con form di login, a destra il proxy che sta in mezzo.
// Tutto succede nel browser: nessuna richiesta parte davvero, il "server" è una funzione qui sotto.

type Passo = { id: string; istruzione: string }

type Props = {
  sito?: string
  utenteDemo?: { username: string; password: string }
  passi?: Passo[]
  richiesta: string
  rispostaUser: string
  rispostaAdmin: string
  rispostaErrore: string
}

type Vista = 'sito' | 'proxy'

const PANNELLO = 'min-w-0 flex-col rounded-2xl border bg-[#07070c]'

// Costruisce la richiesta di login partendo da quella dell'MDX: cambia solo username e password nel body.
export function richiestaDiLogin(modello: string, username: string, password: string): string {
  const testo = modello.replace(/\r/g, '')
  const vuota = testo.indexOf('\n\n')
  if (vuota === -1) return testo
  const body = new URLSearchParams(testo.slice(vuota + 2).trim())
  body.set('username', username)
  body.set('password', password)
  return `${testo.slice(0, vuota)}\n\n${body.toString()}`
}

type Risposta = { testo: string; tipo: 'ok' | 'scartata' }

export default function SimulatoreProxy({ sito = 'Sito finto', utenteDemo, richiesta, rispostaUser }: Props) {
  const id = useId()
  const [vista, setVista] = useState<Vista>('sito')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [intercept, setIntercept] = useState(false)
  const [ferma, setFerma] = useState<string | null>(null) // richiesta bloccata nel proxy (modificabile)
  const [risposta, setRisposta] = useState<Risposta | null>(null)

  // Il "server" del sito finto.
  function server(_testo: string): Risposta {
    return { testo: rispostaUser, tipo: 'ok' }
  }

  function accedi(e: FormEvent) {
    e.preventDefault()
    const testo = richiestaDiLogin(richiesta, username, password)
    setRisposta(null)
    if (intercept) {
      setFerma(testo)
      setVista('proxy')
    } else {
      setRisposta(server(testo))
    }
  }

  function inoltra() {
    if (ferma === null) return
    setRisposta(server(ferma))
    setFerma(null)
  }

  function scarta() {
    setFerma(null)
    setRisposta({ testo: '', tipo: 'scartata' })
  }

  return (
    <section aria-label={`Simulatore proxy: ${sito}`} className="my-10" data-simulatore>
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-hack/50 bg-hack/10 px-3 py-1 font-mono text-xs font-bold text-hack">
        🧪 Simulazione: sito finto, tutto succede nel tuo browser
      </p>

      {/* Su telefono i due pannelli diventano due schede */}
      <div className="mb-3 grid grid-cols-2 gap-2 lg:hidden" role="group" aria-label="Scegli il pannello">
        {(['sito', 'proxy'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVista(v)}
            aria-pressed={vista === v}
            className={`cursor-pointer rounded-lg border px-3 py-2 font-mono text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              vista === v ? 'border-brand bg-brand/20 text-text' : 'border-white/15 text-text/60'
            }`}
          >
            {v === 'sito' ? '🌐 Sito' : '🕵️ Proxy'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ---------- Sito finto ---------- */}
        <div
          data-pannello="sito"
          className={`${PANNELLO} border-white/15 ${vista === 'sito' ? 'flex' : 'hidden'} lg:flex`}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f0b35b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-hack" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-text/60">
              https://biblioteca-bug.sec4her.lab/login
            </span>
          </div>
          <div className="flex flex-1 flex-col px-5 py-6 sm:px-7">
            <p className="font-mono text-lg font-bold text-text">📚 {sito}</p>
            <form onSubmit={accedi} noValidate className="mt-5 space-y-4">
              <div>
                <label htmlFor={`${id}-utente`} className="block text-sm text-text/80">
                  Username
                </label>
                <input
                  id={`${id}-utente`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label htmlFor={`${id}-password`} className="block text-sm text-text/80">
                  Password
                </label>
                <input
                  id={`${id}-password`}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <button type="submit" className={`${PULSANTE_PRIMARIO} w-full`}>
                Accedi
              </button>
            </form>
            {ferma !== null && (
              <p
                role="status"
                className="mt-5 rounded-lg border border-[#f0b35b]/50 bg-[#f0b35b]/10 px-4 py-3 font-mono text-sm text-[#f0b35b]"
              >
                ⏳ In attesa del server… la richiesta è ferma nel proxy.
              </p>
            )}
            {risposta?.tipo === 'scartata' && (
              <p
                role="status"
                className="mt-5 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-mono text-sm text-text/70"
              >
                🗑 Richiesta scartata: non è mai arrivata al server.
              </p>
            )}
            {utenteDemo && (
              <p className="mt-4 font-mono text-xs text-text/50">
                Utente di prova: {utenteDemo.username} / {utenteDemo.password}
              </p>
            )}
          </div>
        </div>

        {/* ---------- Proxy ---------- */}
        <div
          data-pannello="proxy"
          className={`${PANNELLO} border-brand/50 ${vista === 'proxy' ? 'flex' : 'hidden'} lg:flex`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
            <p className="font-mono text-sm font-bold text-[#a98bff]">🕵️ Proxy</p>
            <button
              type="button"
              role="switch"
              aria-checked={intercept}
              onClick={() => setIntercept((v) => !v)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                intercept ? 'border-hack bg-hack/20 text-hack' : 'border-white/20 text-text/60'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${intercept ? 'bg-hack motion-safe:animate-pulse' : 'bg-text/40'}`}
                aria-hidden="true"
              />
              Intercept {intercept ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-4 px-4 py-5">
            {ferma !== null ? (
              <div>
                <label htmlFor={`${id}-editor`} className="font-mono text-xs font-bold tracking-[0.2em] text-[#f0b35b]">
                  ✋ RICHIESTA INTERCETTATA · puoi modificarla
                </label>
                <textarea
                  id={`${id}-editor`}
                  value={ferma}
                  onChange={(e) => setFerma(e.target.value)}
                  rows={9}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  className="mt-2 w-full resize-y rounded-xl border border-[#f0b35b]/50 bg-black/40 p-3 font-mono text-[13px] leading-relaxed text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={inoltra} className={PULSANTE_PRIMARIO}>
                    ▶ Forward
                  </button>
                  <button type="button" onClick={scarta} className={PULSANTE_SECONDARIO}>
                    🗑 Drop
                  </button>
                </div>
              </div>
            ) : (
              <p className="font-mono text-sm text-text/50">
                {intercept
                  ? 'Intercept attivo: la prossima richiesta del sito si fermerà qui.'
                  : 'Intercept spento: le richieste passano dritte al server.'}
              </p>
            )}
            {risposta && (
              <div>
                <p className="font-mono text-xs font-bold tracking-[0.2em] text-text/50">⬅ RISPOSTA DEL SERVER</p>
                {risposta.tipo === 'scartata' ? (
                  <p className="mt-2 rounded-xl border border-white/15 bg-white/5 p-3 font-mono text-sm text-text/70">
                    Richiesta scartata: il server non l&apos;ha mai ricevuta.
                  </p>
                ) : (
                  <pre
                    data-risposta
                    className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-text/85"
                  >
                    {risposta.testo}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
