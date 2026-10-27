import type { ReactNode } from 'react'

// Componenti di testo delle lezioni MDX (si usano senza importarli, vedi mdx-components.tsx).
// Tutti lavorano anche sul server: niente stato, solo stile.

// Apertura della lezione: etichetta stile terminale + sottotitolo.
export function Intro({ etichetta, sottotitolo }: { etichetta?: string; sottotitolo?: string }) {
  return (
    <div className="mb-10">
      {etichetta && (
        <p className="inline-flex rounded-full border border-hack/50 bg-hack/10 px-3 py-1 font-mono text-xs font-bold text-hack">
          {etichetta}
        </p>
      )}
      {sottotitolo && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text/85 sm:text-xl">{sottotitolo}</p>}
    </div>
  )
}

// La promessa della lezione: cosa ti porti a casa, senza spaventare.
export function Promessa({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border border-brand/40 bg-brand/[0.08] px-5 py-5 sm:px-7">
      <p className="font-mono text-xs font-bold tracking-[0.25em] text-[#a98bff]">◆ LA PROMESSA</p>
      <div className="mt-2 max-w-2xl [&>p]:my-2">{children}</div>
    </aside>
  )
}

// Frase-chiave: una frase da ricordare, ben visibile, in mezzo al testo.
// <FraseChiave>autenticazione = chi sei · sessione = ti ricordo · controllo accessi = cosa puoi fare</FraseChiave>
export function FraseChiave({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 flex gap-4 rounded-2xl border-l-4 border-hack bg-hack/[0.1] px-5 py-5 shadow-[0_0_40px_-18px_rgba(31,138,76,0.9)] sm:px-6">
      <span className="mt-0.5 shrink-0 font-mono text-xl text-hack" aria-hidden="true">
        🔑
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-hack">FRASE-CHIAVE</p>
        <div className="mt-1 font-mono text-base leading-relaxed font-bold text-text sm:text-lg [&>p]:my-0">
          {children}
        </div>
      </div>
    </aside>
  )
}

// Il filo: la frase chiave della lezione, in grande.
export function Filo({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-6 rounded-2xl border border-brand/50 bg-brand/10 px-6 py-6 shadow-[0_0_40px_-16px_rgba(109,68,224,0.7)] sm:px-8">
      <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">&gt; IL FILO</p>
      <p className="mt-3 font-mono text-xl leading-snug font-bold text-text sm:text-2xl">&ldquo;{children}&rdquo;</p>
    </blockquote>
  )
}

// Un passo della lezione: card ben separata con numero e titolo. "evidenza" = il passo più importante.
export function Passo({
  numero,
  titolo,
  evidenza = false,
  children,
}: {
  numero: number
  titolo: string
  evidenza?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={`passo-${numero}`}
      data-passo={numero}
      aria-labelledby={`titolo-passo-${numero}`}
      className={`my-12 scroll-mt-40 rounded-3xl border px-5 py-8 sm:px-10 sm:py-10 ${
        evidenza
          ? 'border-brand/70 bg-brand/[0.07] shadow-[0_0_60px_-20px_rgba(109,68,224,0.8)]'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-lg font-bold ${
            evidenza ? 'bg-brand text-white' : 'border border-brand/60 text-[#a98bff]'
          }`}
          aria-hidden="true"
        >
          {numero}
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-text/50">
            PASSO {numero}
            {evidenza && <span className="text-[#a98bff]"> · IL CUORE DELLA LEZIONE</span>}
          </p>
          <h2
            id={`titolo-passo-${numero}`}
            className="mt-1 font-mono text-xl leading-snug font-bold text-text sm:text-2xl"
          >
            {titolo}
          </h2>
        </div>
      </div>
      <div className="mt-6 max-w-2xl [&>*:first-child]:mt-0">{children}</div>
    </section>
  )
}

// Definizione di un termine: <Definizione termine="Protocollo">un accordo su come ci parliamo.</Definizione>
export function Definizione({ termine, children }: { termine: string; children: ReactNode }) {
  return (
    <dl className="my-6 flex flex-col gap-1 rounded-xl border-l-4 border-hack bg-hack/10 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="shrink-0 font-mono font-bold text-hack">{termine} =</dt>
      <dd className="text-text/90 [&>p]:my-0">{children}</dd>
    </dl>
  )
}

// Il lato hacker: perché questa cosa interessa a chi attacca. "importante" = stile più forte.
export function LatoHacker({ importante = false, children }: { importante?: boolean; children: ReactNode }) {
  return (
    <aside
      className={`my-8 rounded-2xl border px-5 py-5 sm:px-6 ${
        importante
          ? 'border-crimson bg-crimson/20 shadow-[0_0_40px_-14px_rgba(155,44,79,0.9)]'
          : 'border-crimson/40 bg-crimson/[0.08]'
      }`}
    >
      <p className={`font-mono text-xs font-bold tracking-[0.25em] ${importante ? 'text-white' : 'text-[#e0587f]'}`}>
        {importante ? '⚠ LATO HACKER · IMPORTANTE' : '🔓 LATO HACKER'}
      </p>
      <div className={`mt-2 [&>p]:my-2 ${importante ? '[&>p]:text-text' : ''}`}>{children}</div>
    </aside>
  )
}

// Domande da farti (il ragionamento da pentester): elenco Markdown dentro.
export function Domande({ titolo = 'Domande da farti', children }: { titolo?: string; children: ReactNode }) {
  return (
    <section className="my-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 sm:px-7">
      <h2 className="font-mono text-lg font-bold text-text">
        <span className="text-hack">?</span> {titolo}
      </h2>
      <p className="mt-1 text-sm text-text/60">Niente soluzioni pronte: sono le domande che si fa una pentester.</p>
      <div className="mt-2 [&_li]:marker:text-hack">{children}</div>
    </section>
  )
}

// Bottino: i punti da portarsi a casa.
export function Bottino({ punti = [] }: { punti?: string[] }) {
  return (
    <section aria-labelledby="titolo-bottino" className="my-12">
      <h2 id="titolo-bottino" className="font-mono text-xl font-bold text-text sm:text-2xl">
        <span className="text-hack">&gt;</span> Bottino
      </h2>
      <p className="mt-1 text-sm text-text/60">Cosa ti porti a casa.</p>
      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {punti.map((p) => (
          <li
            key={p}
            className="flex gap-3 rounded-xl border border-hack/40 bg-hack/10 p-4 text-sm leading-relaxed text-text/90"
          >
            <span className="font-mono font-bold text-hack" aria-hidden="true">
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Compito per casa.
export function Compito({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="titolo-compito" className="my-12">
      <h2 id="titolo-compito" className="font-mono text-xl font-bold text-text sm:text-2xl">
        <span className="text-hack">&gt;</span> Compito
      </h2>
      <div className="mt-4 max-w-2xl rounded-xl border-l-4 border-crimson bg-white/[0.04] px-5 py-4 [&>p]:my-1">
        {children}
      </div>
    </section>
  )
}

// Chiusura: la frase finale, centrata.
export function Chiusura({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto my-14 max-w-xl text-center font-mono text-base leading-relaxed text-text/85 sm:text-lg [&>p]:my-2">
      <p className="mb-3 text-hack" aria-hidden="true">
        ─── ◆ ───
      </p>
      {children}
    </div>
  )
}
