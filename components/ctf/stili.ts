// Classi Tailwind riusate nella sezione CTF Groups (solo colori del brand).

// Card scura leggermente più chiara dello sfondo, che si solleva con un bagliore viola al passaggio del mouse.
export const CARD =
  'rounded-2xl border border-white/10 bg-white/[0.04] transition duration-200 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_0_28px_-6px_rgba(109,68,224,0.55)]'

export const PULSANTE_PRIMARIO =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 font-mono text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-[#7d58ea] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-text/40 disabled:shadow-none disabled:active:scale-100'

export const PULSANTE_SECONDARIO =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 font-mono text-sm font-bold text-text transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer'

export const LINK = 'font-bold text-brand transition hover:brightness-150 hover:underline'

export const ETICHETTA =
  'inline-flex items-center rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-xs font-bold text-text/80'
