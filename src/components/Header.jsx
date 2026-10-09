import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/contesto.js'
import { VOCI_MENU } from '../config/sito.js'
import Logo from './Logo.jsx'

export default function Header() {
  const [aperto, setAperto] = useState(false)
  const contenitore = useRef(null)
  const { esci } = useAuth()
  const navigate = useNavigate()

  // Chiude il menu cliccando fuori o premendo Esc.
  useEffect(() => {
    if (!aperto) return
    function clickFuori(e) {
      if (contenitore.current && !contenitore.current.contains(e.target)) setAperto(false)
    }
    function tasto(e) {
      if (e.key === 'Escape') setAperto(false)
    }
    document.addEventListener('mousedown', clickFuori)
    document.addEventListener('touchstart', clickFuori)
    document.addEventListener('keydown', tasto)
    return () => {
      document.removeEventListener('mousedown', clickFuori)
      document.removeEventListener('touchstart', clickFuori)
      document.removeEventListener('keydown', tasto)
    }
  }, [aperto])

  function logout() {
    setAperto(false)
    esci()
    navigate('/accedi', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 border-b-2 border-crimson bg-ink">
      <div className="flex w-full items-center justify-between px-6 py-2">
        <Link to="/home" aria-label="Vai alla home" className="flex items-center">
          <Logo className="block h-12 w-12 rounded-md" />
        </Link>

        <div ref={contenitore} className="relative">
          <button
            type="button"
            onClick={() => setAperto((a) => !a)}
            aria-expanded={aperto}
            aria-controls="menu-principale"
            aria-label={aperto ? 'Chiudi il menu' : 'Apri il menu'}
            className="-mr-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-2xl text-text transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {aperto ? '✕' : '☰'}
          </button>

          {aperto && (
            <nav
              id="menu-principale"
              className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-white/10 bg-ink shadow-2xl shadow-black/50"
            >
              <ul className="py-2">
                {VOCI_MENU.map((voce) => (
                  <li key={voce.percorso}>
                    <Link
                      to={voce.percorso}
                      onClick={() => setAperto(false)}
                      className="block px-5 py-2.5 font-mono text-sm font-bold text-text transition hover:bg-brand/20 hover:text-white"
                    >
                      <span className="text-hack">&gt;</span> {voce.titolo}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 p-2">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left font-mono text-sm font-bold text-[#e0587f] transition hover:bg-crimson/20"
                >
                  ⏻ Esci
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
