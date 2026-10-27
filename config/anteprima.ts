// ⚠️ MODALITÀ ANTEPRIMA DELLE LEZIONI — SOLO PER LO SVILUPPO ⚠️
//
// Quando è attiva, nella sezione Lezioni TUTTI i moduli e TUTTE le lezioni sono apribili e i lucchetti
// vengono ignorati: così durante lo sviluppo si può vedere qualsiasi lezione in anteprima senza prima
// completare le precedenti. In cima alla pagina compare un avviso ben visibile.
//
// ❗ NON toglie davvero i lucchetti alle utenti. Funziona SOLO in sviluppo: in produzione
// (`next build` / `next start`, cioè NODE_ENV === 'production') è SEMPRE disattivata, qualunque sia il
// valore di ANTEPRIMA_LEZIONI qui sotto. La logica normale dei lucchetti non viene toccata: con l'anteprima
// spenta tutto torna esattamente come prima.
//
// Due modi per attivarla (solo in sviluppo, con `npm run dev`):
//   1. Metti ANTEPRIMA_LEZIONI = true qui sotto → vale per tutte le pagine finché non lo rimetti a false.
//   2. Aggiungi ?anteprima=1 all'URL → vale solo per quella scheda, senza modificare il codice.
//      Es. /lezioni/02-vulnerabilita-web/02-autenticazione?anteprima=1
//
// Ricordati di rimettere ANTEPRIMA_LEZIONI = false (o di non lasciare ?anteprima=1 in giro) prima di pubblicare.

export const ANTEPRIMA_LEZIONI = false

// Nome del parametro URL che attiva l'anteprima (?anteprima=1).
export const PARAM_ANTEPRIMA = 'anteprima'

// true solo in sviluppo: in produzione l'anteprima resta sempre spenta.
const IN_SVILUPPO = process.env.NODE_ENV !== 'production'

// Decide se l'anteprima è attiva. In produzione è sempre false. In sviluppo è attiva se il flag in config
// è true, oppure se "valoreParam" (il valore di ?anteprima nell'URL) vale "1" o "true".
export function anteprimaAttiva(valoreParam?: string | null): boolean {
  if (!IN_SVILUPPO) return false
  if (ANTEPRIMA_LEZIONI) return true
  return valoreParam === '1' || valoreParam === 'true'
}
