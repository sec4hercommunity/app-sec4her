// Segnaposto: il simulatore proxy interattivo non è ancora disponibile.
// Le proprietà scritte nell'MDX (sito, passi, richiesta, risposte…) vengono accettate e ignorate,
// così la lezione si apre lo stesso. La missione si fa nella sessione live, con un proxy vero.
export default function SimulatoreProxy({ sito }: { sito?: string; [proprieta: string]: unknown }) {
  return (
    <section className="my-10 rounded-2xl border border-dashed border-brand/50 bg-brand/[0.06] px-6 py-8 text-center">
      <p className="font-mono text-xs font-bold tracking-[0.25em] text-hack">🛠 SIMULATORE IN ARRIVO</p>
      <p className="mt-3 font-mono text-lg font-bold text-text">{sito ?? 'Simulatore proxy'}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-text/70">
        Il simulatore di questa missione non è ancora disponibile nel sito. La faremo insieme nella sessione live:
        prenota il posto qui sotto.
      </p>
    </section>
  )
}
