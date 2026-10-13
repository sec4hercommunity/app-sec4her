'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAuth } from '@/auth/contesto'
import AuthLayout from '@/components/AuthLayout'
import Campo from '@/components/Campo'
import Pulsante from '@/components/Pulsante'
import { percorsoInterno, validaEmail, validaPassword } from '@/lib/validazione'

type Valori = { email: string; password: string }

function ModuloAccedi() {
  const [valori, setValori] = useState<Valori>({ email: '', password: '' })
  const [errori, setErrori] = useState<Partial<Record<keyof Valori, string>>>({})
  const [erroreLogin, setErroreLogin] = useState('')
  const { utente, accedi } = useAuth()
  const router = useRouter()
  // Dopo il login si torna alla pagina riservata richiesta (?da=...), altrimenti alla home.
  const destinazione = percorsoInterno(useSearchParams().get('da'))

  // Chi ha già fatto il login non vede di nuovo questa pagina.
  useEffect(() => {
    if (utente) router.replace(destinazione)
  }, [utente, router, destinazione])

  function aggiorna(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValori((v) => ({ ...v, [name]: value }))
    if (errori[name as keyof Valori]) setErrori((er) => ({ ...er, [name]: '' }))
    if (erroreLogin) setErroreLogin('')
  }

  function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nuoviErrori = {
      email: validaEmail(valori.email),
      password: validaPassword(valori.password),
    }
    setErrori(nuoviErrori)
    if (Object.values(nuoviErrori).some(Boolean)) return

    // Per ora confronta con le credenziali di test (config/credenzialiTest.ts).
    if (!accedi(valori.email, valori.password)) setErroreLogin('Email o password non corretti')
  }

  if (utente) return null

  return (
    <AuthLayout titolo="Accedi" sottotitolo="Bentornata nella community.">
      {erroreLogin && (
        <div role="alert" className="mb-5 rounded-lg border border-crimson bg-crimson/15 px-4 py-3 text-sm">
          <span className="font-mono font-bold text-[#e0587f]">[errore]</span> {erroreLogin}
        </div>
      )}

      <form onSubmit={invia} noValidate className="space-y-5">
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
          autoComplete="current-password"
          placeholder="••••••••"
          value={valori.password}
          onChange={aggiorna}
          errore={errori.password}
        />
        <Pulsante>Accedi</Pulsante>
      </form>

      <p className="mt-6 text-center text-sm text-text/70">
        Non hai un account?{' '}
        <Link href="/registrati" className="font-bold text-brand hover:underline">
          Registrati
        </Link>
      </p>
    </AuthLayout>
  )
}

// useSearchParams richiede un confine <Suspense> nelle pagine generate in anticipo.
export default function Accedi() {
  return (
    <Suspense>
      <ModuloAccedi />
    </Suspense>
  )
}
