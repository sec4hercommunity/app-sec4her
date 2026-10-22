'use client'

import { useId, useState, type FormEvent } from 'react'
import { PULSANTE_PRIMARIO } from '@/components/ctf/stili'

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

export default function SimulatoreProxy({ sito = 'Sito finto', utenteDemo }: Props) {
  const id = useId()
  const [vista, setVista] = useState<Vista>('sito')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function accedi(e: FormEvent) {
    e.preventDefault()
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
            <p className="font-mono text-sm font-bold text-[#a98bff]">🕵️ Proxy · Intercept</p>
          </div>
          <div className="flex flex-1 flex-col px-4 py-5">
            <p className="font-mono text-sm text-text/50">Nessuna richiesta in coda.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
