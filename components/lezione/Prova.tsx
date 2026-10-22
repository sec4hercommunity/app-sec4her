'use client'

import Link from 'next/link'
import { createContext, useContext, useState, type FormEvent, type ReactNode } from 'react'
import { LINK, PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from '@/components/ctf/stili'
import { useLezioni } from '@/components/lezioni/LezioniProvider'
import { IconaLucchetto } from '@/components/lezioni/Stato'
import { PulsanteCompletata } from '@/components/lezioni/StatoLezioneClient'
import {
  idLezione,
  lezioneSbloccata,
  risposteNecessarie,
  type DomandaQuiz,
  type Lezione,
  type Modulo,
} from '@/lib/lezioni'

// ⚠️ SOLO MOCK: quiz e flag sono verificati qui, nel browser, con le risposte scritte nel frontmatter.
// In produzione la verifica (e l'assegnazione degli XP) va fatta LATO SERVER (Supabase): nel browser
// chiunque può leggere le risposte e la flag, o segnarsi la lezione come superata.

type Corrente = { modulo: Modulo; lezione: Lezione; id: string }

const ContestoLezione = createContext<{ modulo: string; slug: string } | null>(null)

// Dice ai componenti dentro la lezione (es. il SimulatoreProxy) quale lezione è aperta.
export function LezioneCorrenteProvider({
  modulo,
  slug,
  children,
}: {
  modulo: string
  slug: string
  children: ReactNode
}) {
  return <ContestoLezione.Provider value={{ modulo, slug }}>{children}</ContestoLezione.Provider>
}

export function useLezioneCorrente(): (Corrente & { superata: boolean }) | null {
  const c = useContext(ContestoLezione)
  const { moduli, completate } = useLezioni()
  const modulo = moduli.find((m) => m.slug === c?.modulo)
  const lezione = modulo?.lezioni.find((l) => l.slug === c?.slug)
  if (!modulo || !lezione) return null
  const id = idLezione(modulo.slug, lezione.slug)
  return { modulo, lezione, id, superata: completate.has(id) }
}

// Se la lezione è ancora bloccata (prova della precedente non superata) mostra il lucchetto al posto del contenuto.
export function LezioneProtetta({ children }: { children: ReactNode }) {
  const c = useLezioneCorrente()
  const { completate } = useLezioni()
  if (!c || lezioneSbloccata(c.modulo, c.lezione.slug, completate)) return <>{children}</>

  const i = c.modulo.lezioni.findIndex((l) => l.slug === c.lezione.slug)
  const precedente = c.modulo.lezioni[i - 1]
  return (
    <section className="mx-auto my-10 max-w-xl rounded-2xl border border-dashed border-white/20 px-6 py-10 text-center">
      <IconaLucchetto className="mx-auto h-8 w-8 text-text/50" />
      <h2 className="mt-4 font-mono text-xl font-bold text-text">Lezione bloccata</h2>
      <p className="mt-2 text-text/70">
        Si sblocca quando {precedente?.prova?.tipo === 'quiz' ? 'superi il quiz' : 'completi la prova'} della lezione
        precedente.
      </p>
      {precedente && (
        <Link href={`/lezioni/${c.modulo.slug}/${precedente.slug}`} className={`${PULSANTE_PRIMARIO} mt-6`}>
          ← Vai a “{precedente.titolo}”
        </Link>
      )}
    </section>
  )
}

function Superata({ xp, testo }: { xp: number; testo: string }) {
  return (
    <div role="status" className="rounded-xl border border-hack bg-hack/15 px-5 py-4">
      <p className="font-mono text-lg font-bold text-hack">✓ {testo}</p>
      {xp > 0 && <p className="mt-1 font-mono text-sm text-text">+{xp} XP · la lezione è completata</p>}
    </div>
  )
}

// ---------- Quiz ----------
function Quiz({ domande, soglia, corrente }: { domande: DomandaQuiz[]; soglia: number; corrente: Corrente }) {
  const { completate, segnaCompletata } = useLezioni()
  const [risposte, setRisposte] = useState<(number | null)[]>(() => domande.map(() => null))
  const [verificato, setVerificato] = useState(false)
  const necessarie = risposteNecessarie({ soglia, domande })
  const giuste = risposte.filter((r, i) => r === domande[i].corretta).length
  const superata = completate.has(corrente.id)
  const tutteRisposte = risposte.every((r) => r !== null)

  function verifica(e: FormEvent) {
    e.preventDefault()
    if (!tutteRisposte) return
    setVerificato(true)
    if (giuste >= necessarie) segnaCompletata(corrente.id, true)
  }

  function riprova() {
    setRisposte(domande.map(() => null))
    setVerificato(false)
  }

  return (
    <form onSubmit={verifica} noValidate>
      <p className="text-sm text-text/70">
        {domande.length} domande · per superarlo servono almeno <strong className="text-text">{necessarie}</strong>{' '}
        risposte giuste ({soglia}%).
      </p>
      <ol className="mt-6 space-y-6">
        {domande.map((d, i) => (
          <li key={d.domanda}>
            <fieldset disabled={verificato}>
              <legend className="font-bold text-text">
                <span className="font-mono text-hack">{i + 1}.</span> {d.domanda}
              </legend>
              <div className="mt-3 space-y-2">
                {d.opzioni.map((o, j) => {
                  const scelta = risposte[i] === j
                  const colore = !verificato
                    ? scelta
                      ? 'border-brand bg-brand/20'
                      : 'border-white/10 hover:border-white/30'
                    : j === d.corretta && scelta
                      ? 'border-hack bg-hack/20'
                      : scelta
                        ? 'border-crimson bg-crimson/20'
                        : 'border-white/10 opacity-60'
                  return (
                    <label
                      key={o}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${colore}`}
                    >
                      <input
                        type="radio"
                        name={`domanda-${i}`}
                        checked={scelta}
                        onChange={() => setRisposte((r) => r.map((x, k) => (k === i ? j : x)))}
                        className="mt-0.5 accent-[#6d44e0]"
                      />
                      <span className="text-text/90">{o}</span>
                    </label>
                  )
                })}
              </div>
              {verificato && (
                <p className={`mt-2 text-sm ${risposte[i] === d.corretta ? 'text-hack' : 'text-[#e0587f]'}`}>
                  {risposte[i] === d.corretta ? '✓ Giusto. ' : `✗ La risposta giusta era: “${d.opzioni[d.corretta]}”. `}
                  {d.spiegazione && <span className="text-text/75">{d.spiegazione}</span>}
                </p>
              )}
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-4" aria-live="polite">
        {!verificato ? (
          <button type="submit" disabled={!tutteRisposte} className={`${PULSANTE_PRIMARIO} w-full sm:w-auto`}>
            Verifica le risposte
          </button>
        ) : giuste >= necessarie ? (
          <>
            <Superata xp={corrente.lezione.xp} testo={`Quiz superato: ${giuste}/${domande.length}`} />
            <button type="button" onClick={riprova} className={PULSANTE_SECONDARIO}>
              Rifai il quiz
            </button>
          </>
        ) : (
          <>
            <p role="status" className="rounded-xl border border-crimson bg-crimson/15 px-5 py-4 font-mono text-text">
              {giuste}/{domande.length}: ne servono almeno {necessarie}. Rileggi le spiegazioni e riprova, nessuna
              fretta.
            </p>
            <button type="button" onClick={riprova} className={PULSANTE_PRIMARIO}>
              Riprova
            </button>
          </>
        )}
        {superata && !verificato && <Superata xp={corrente.lezione.xp} testo="Quiz già superato" />}
      </div>
    </form>
  )
}

// ---------- Flag ----------
function ProvaFlag({ flag, suggerimento, corrente }: { flag: string; suggerimento?: string; corrente: Corrente }) {
  const { completate, segnaCompletata } = useLezioni()
  const [valore, setValore] = useState('')
  const [errore, setErrore] = useState('')
  const [tentativi, setTentativi] = useState(0)
  const superata = completate.has(corrente.id)

  function verifica(e: FormEvent) {
    e.preventDefault()
    // MOCK: confronto nel browser. In produzione: chiamata al server, che conosce la flag e assegna gli XP.
    if (valore.trim() === flag) {
      setErrore('')
      segnaCompletata(corrente.id, true)
    } else {
      setTentativi((t) => t + 1)
      setErrore(
        valore.trim()
          ? 'Flag non corretta. Controlla di averla copiata tutta, parentesi comprese.'
          : 'Incolla la flag.',
      )
    }
  }

  if (superata) return <Superata xp={corrente.lezione.xp} testo="Flag corretta! Missione compiuta 🏴" />

  return (
    <form onSubmit={verifica} noValidate className="space-y-4">
      <label htmlFor="flag" className="block text-sm text-text/80">
        Incolla qui la flag che trovi nella risposta del server (formato{' '}
        <code className="font-mono text-hack">sec4her{'{…}'}</code>).
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="flag"
          value={valore}
          onChange={(e) => {
            setValore(e.target.value)
            setErrore('')
          }}
          placeholder="sec4her{...}"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={errore ? true : undefined}
          aria-describedby={errore ? 'flag-errore' : undefined}
          className="min-w-0 flex-1 rounded-lg border border-white/15 bg-[#07070c] px-4 py-2.5 font-mono text-sm text-text caret-hack outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
        />
        <button type="submit" className={PULSANTE_PRIMARIO}>
          Verifica la flag
        </button>
      </div>
      {errore && (
        <p id="flag-errore" role="alert" className="font-mono text-sm text-[#e0587f]">
          ✗ {errore}
        </p>
      )}
      {suggerimento && tentativi > 0 && (
        <p className="rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-text/85">
          💡 {suggerimento}
        </p>
      )}
    </form>
  )
}

// Prova finale della lezione (dal frontmatter "prova"): quiz, flag, oppure "Segna come completata" se non c'è.
export default function ProvaLezione() {
  const c = useLezioneCorrente()
  if (!c) return null
  const prova = c.lezione.prova

  return (
    <section
      id="prova"
      aria-labelledby="titolo-prova"
      className="my-14 scroll-mt-28 rounded-3xl border border-brand/50 border-t-2 border-t-crimson bg-white/[0.04] px-5 py-8 sm:px-10"
    >
      <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">
        {prova?.tipo === 'quiz'
          ? '🧠 PROVA FINALE · QUIZ'
          : prova?.tipo === 'flag'
            ? '🏴 PROVA FINALE · FLAG'
            : '✓ FINE LEZIONE'}
      </p>
      <h2 id="titolo-prova" className="mt-2 font-mono text-2xl font-bold text-text">
        {prova?.tipo === 'quiz'
          ? 'Metti alla prova quello che hai capito'
          : prova?.tipo === 'flag'
            ? 'Trova la flag'
            : 'Finito?'}
      </h2>
      {c.lezione.xp > 0 && (
        <p className="mt-1 font-mono text-sm text-[#a98bff]">
          ⚡ {c.lezione.xp} XP
          {prova ? ' e lo sblocco della lezione successiva' : ''}
        </p>
      )}
      <div className="mt-6">
        {prova?.tipo === 'quiz' ? (
          <Quiz domande={prova.domande} soglia={prova.soglia} corrente={c} />
        ) : prova?.tipo === 'flag' ? (
          <ProvaFlag flag={prova.flag} suggerimento={prova.suggerimento} corrente={c} />
        ) : (
          <PulsanteCompletata modulo={c.modulo.slug} lezione={c.lezione.slug} />
        )}
      </div>
      {c.superata && <FineModuloOProssima corrente={c} />}
    </section>
  )
}

// Dopo aver superato la prova: link alla lezione successiva, oppure al percorso.
function FineModuloOProssima({ corrente }: { corrente: Corrente }) {
  const prossima = corrente.lezione.prossima
    ? corrente.modulo.lezioni.find((l) => l.slug === corrente.lezione.prossima)
    : undefined
  return (
    <p className="mt-6 font-mono text-sm">
      {prossima ? (
        <Link href={`/lezioni/${corrente.modulo.slug}/${prossima.slug}`} className={LINK}>
          🔓 Sbloccata: {prossima.titolo} →
        </Link>
      ) : (
        <Link href="/lezioni" className={LINK}>
          ← Torna al percorso
        </Link>
      )}
    </p>
  )
}
