import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/contesto.js'
import AuthLayout from '../components/AuthLayout.jsx'
import Campo from '../components/Campo.jsx'
import Pulsante from '../components/Pulsante.jsx'
import { validaEmail, validaPassword } from '../lib/validazione.js'

export default function Accedi() {
  const [valori, setValori] = useState({ email: '', password: '' })
  const [errori, setErrori] = useState({})
  const [erroreLogin, setErroreLogin] = useState('')
  const { utente, accedi } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // Dopo il login si torna alla pagina riservata richiesta, altrimenti alla home.
  const destinazione = location.state?.da || '/home'

  function aggiorna(e) {
    const { name, value } = e.target
    setValori((v) => ({ ...v, [name]: value }))
    if (errori[name]) setErrori((er) => ({ ...er, [name]: '' }))
    if (erroreLogin) setErroreLogin('')
  }

  function invia(e) {
    e.preventDefault()
    const nuoviErrori = {
      email: validaEmail(valori.email),
      password: validaPassword(valori.password),
    }
    setErrori(nuoviErrori)
    if (Object.values(nuoviErrori).some(Boolean)) return

    // Per ora confronta con le credenziali di test (src/config/credenzialiTest.js).
    if (accedi(valori.email, valori.password)) navigate(destinazione, { replace: true })
    else setErroreLogin('Email o password non corretti')
  }

  // Chi ha già fatto il login non vede di nuovo questa pagina.
  if (utente) return <Navigate to={destinazione} replace />

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
        <Link to="/registrati" className="font-bold text-brand hover:underline">
          Registrati
        </Link>
      </p>
    </AuthLayout>
  )
}
