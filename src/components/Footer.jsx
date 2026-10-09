import { CONTATTI } from '../config/sito.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t-2 border-crimson bg-ink text-text">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <Logo className="h-12 w-auto" classeTesto="text-2xl" />
          <p className="mt-3 font-mono text-xs font-bold tracking-[0.3em] text-hack">&gt; HACK THE FUTURE_</p>
        </div>

        <div>
          <h2 className="font-mono text-lg font-bold">
            <span className="text-hack">$</span> Contatti
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {CONTATTI.map((c) => (
              <li key={c.nome}>
                <span className="text-text/60">{c.nome}:</span>{' '}
                <a
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-bold text-brand hover:underline"
                >
                  {c.testo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-text/60">
        © 2026 Sec4Her – Hack the Future
      </div>
    </footer>
  )
}
