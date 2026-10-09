import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Campo from '../components/Campo.jsx'
import Pulsante from '../components/Pulsante.jsx'
import { validaEmail, validaPassword } from '../lib/validazione.js'

export default function Accedi() {
  const [valori, setValori] = useState({ email: '', password: '' })
  const [errori, setErrori] = useState({})
  const [inviato, setInviato] = useState(false)

  function aggiorna(e) {
    const { name, value } = e.target
    setValori((v) => ({ ...v, [name]: value }))
    if (errori[name]) setErrori((er) => ({ ...er, [name]: '' }))
  }

  function invia(e) {
    e.preventDefault()
    const nuoviErrori = {
      email: validaEmail(valori.email),
      password: validaPassword(valori.password),
    }
    setErrori(nuoviErrori)
    // L'autenticazione vera verrà collegata al database in seguito.
    setInviato(!Object.values(nuoviErrori).some(Boolean))
  }

  return (
    <AuthLayout titolo="Accedi" sottotitolo="Bentornata nella community.">
      {inviato && (
        <div role="status" className="mb-5 rounded-lg border border-hack/50 bg-hack/10 px-4 py-3 text-sm">
          <span className="font-mono font-bold text-hack">[ok]</span> Dati validi. L'accesso sarà attivo
          appena collegheremo il database.
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
        <Link to="/registrati" className="font-bold text-brand hover:underline">
          Registrati
        </Link>
      </p>
    </AuthLayout>
  )
}
