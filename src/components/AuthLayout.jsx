import Logo from './Logo.jsx'

// Contenitore comune per le pagine di autenticazione: logo, titolo e card centrata.
export default function AuthLayout({ titolo, sottotitolo, children }) {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <header className="mb-8 flex flex-col items-center text-center">
          <Logo className="h-24 w-auto sm:h-28" classeTesto="text-3xl" />
          <p className="mt-3 font-mono text-xs font-bold tracking-[0.3em] text-hack">
            &gt; HACK THE FUTURE<span className="cursor-blink">_</span>
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 border-t-crimson border-t-2 bg-white/[0.03] p-6 shadow-2xl shadow-brand/10 backdrop-blur sm:p-8">
          <h1 className="font-mono text-2xl font-bold text-text">
            <span className="text-hack">$</span> {titolo}
          </h1>
          {sottotitolo && <p className="mt-1 text-sm text-text/60">{sottotitolo}</p>}
          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  )
}
