'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/AuthLayout'
import Campo from '@/components/Campo'
import Pulsante from '@/components/Pulsante'
import { PASSWORD_MIN, validaConferma, validaEmail, validaNome, validaPassword } from '@/lib/validazione'

type Valori = { nome: string; email: string; password: string; conferma: string }

const VUOTO: Valori = { nome: '', email: '', password: '', conferma: '' }

export default function Registrati() {
  const [valori, setValori] = useState<Valori>(VUOTO)
  const [errori, setErrori] = useState<Partial<Record<keyof Valori, string>>>({})
  const [registrata, setRegistrata] = useState<string | null>(null)

  function aggiorna(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValori((v) => ({ ...v, [name]: value }))
    if (errori[name as keyof Valori]) setErrori((er) => ({ ...er, [name]: '' }))
  }

  function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nuoviErrori = {
      nome: validaNome(valori.nome),
      email: validaEmail(valori.email),
      password: validaPassword(valori.password),
      conferma: validaConferma(valori.password, valori.conferma),
    }
    setErrori(nuoviErrori)
    if (Object.values(nuoviErrori).some(Boolean)) return

    // Per ora nessun salvataggio: il collegamento al database arriverà dopo.
    setRegistrata(valori.nome.trim())
    setValori(VUOTO)
  }

  if (registrata) {
    return (
      <AuthLayout titolo="Account creato">
        <div role="status" className="rounded-lg border border-hack/50 bg-hack/10 px-4 py-4">
          <p className="font-mono font-bold text-hack">[ok] Registrazione completata</p>
          <p className="mt-2 text-sm text-text/80">
            Benvenuta, {registrata}! Il tuo account è stato creato. (Per ora è una demo: i dati non vengono
            ancora salvati.)
          </p>
        </div>
        <Link
          href="/accedi"
          className="mt-6 block w-full rounded-lg bg-brand px-4 py-3 text-center font-mono font-bold text-white transition hover:bg-[#7d58ea]"
        >
          Vai ad Accedi
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout titolo="Registrati" sottotitolo="Entra nella community. Nessuna impara da sola.">
      <form onSubmit={invia} noValidate className="space-y-5">
        <Campo
          id="nome"
          etichetta="Nome"
          type="text"
          autoComplete="given-name"
          placeholder="Il tuo nome"
          value={valori.nome}
          onChange={aggiorna}
          errore={errori.nome}
        />
        <Campo
          id="email"
          etichetta="Email"
          type="email"
          autoComplete="email"
          placeholder="nome@esempio.it"
          value={valori.email}
          onChange={aggiorna}
          errore={errori.email}
        />
        <Campo
          id="password"
          etichetta="Password"
          type="password"
          autoComplete="new-password"
          placeholder={`Almeno ${PASSWORD_MIN} caratteri`}
          value={valori.password}
          onChange={aggiorna}
          errore={errori.password}
        />
        <Campo
          id="conferma"
          etichetta="Conferma password"
          type="password"
          autoComplete="new-password"
          placeholder="Ripeti la password"
          value={valori.conferma}
          onChange={aggiorna}
          errore={errori.conferma}
        />
        <Pulsante>Crea account</Pulsante>
      </form>

      <p className="mt-6 text-center text-sm text-text/70">
        Hai già un account?{' '}
        <Link href="/accedi" className="font-bold text-brand hover:underline">
          Accedi
        </Link>
      </p>
    </AuthLayout>
  )
}
