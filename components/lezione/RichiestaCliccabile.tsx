'use client'

// Richiesta HTTP stile terminale con le 4 parti (metodo, URL, header, body) colorate e cliccabili.
// Usata da LetteraHTTP e dal SimulatoreProxy.

export type ChiaveParte = 'metodo' | 'url' | 'header' | 'body'

export const CHIAVI: ChiaveParte[] = ['metodo', 'url', 'header', 'body']

export const NOMI_PARTI: Record<ChiaveParte, string> = { metodo: 'Metodo', url: 'URL', header: 'Header', body: 'Body' }

export const COLORI_PARTI: Record<ChiaveParte, { testo: string; bordo: string; sfondo: string }> = {
  metodo: { testo: 'text-[#a98bff]', bordo: 'border-brand', sfondo: 'bg-brand/25' },
  url: { testo: 'text-[#4fd08a]', bordo: 'border-hack', sfondo: 'bg-hack/25' },
  header: { testo: 'text-[#f0b35b]', bordo: 'border-[#f0b35b]', sfondo: 'bg-[#f0b35b]/15' },
  body: { testo: 'text-[#ff8fb0]', bordo: 'border-crimson', sfondo: 'bg-crimson/30' },
}

// Spiegazioni di riserva (il simulatore le usa; LetteraHTTP prende quelle scritte nell'MDX).
export const SPIEGAZIONI_BASE: Record<ChiaveParte, string> = {
  metodo: 'Che tipo di lettera è. GET = dammi, POST = ti mando qualcosa (qui: i dati del login).',
  url: 'A quale pagina del sito va la lettera.',
  header: "La busta: a quale sito va (Host), che browser usi, il tuo 'biglietto' (Cookie), il formato del contenuto.",
  body: 'Il contenuto della lettera. Nel login: username, password… e tutto quello che il browser manda. Si può modificare!',
}

export type PartiRichiesta = {
  metodo: string
  spazio1: string
  url: string
  resto: string
  header: string
  body: string
}

// Divide il testo della richiesta nelle sue parti (accetta anche fine riga \r\n).
export function dividiRichiesta(testo: string): PartiRichiesta {
  const righe = testo.replace(/\r/g, '').split('\n')
  const prima = righe[0] ?? ''
  const m = prima.match(/^(\S*)(\s+)(\S*)(.*)$/)
  const vuota = righe.findIndex((r, i) => i > 0 && r.trim() === '')
  const fineHeader = vuota === -1 ? righe.length : vuota
  return {
    metodo: m?.[1] ?? prima,
    spazio1: m?.[2] ?? '',
    url: m?.[3] ?? '',
    resto: m?.[4] ?? '',
    header: righe.slice(1, fineHeader).join('\n'),
    body: vuota === -1 ? '' : righe.slice(vuota + 1).join('\n'),
  }
}

type Props = {
  testo: string
  attiva: ChiaveParte | null
  onScegli: (chiave: ChiaveParte) => void
  // true = la spiegazione compare anche passando sopra con il mouse (LetteraHTTP)
  alPassaggio?: boolean
}

type PropsParte = {
  chiave: ChiaveParte
  children: string
  blocco?: boolean
  attiva: ChiaveParte | null
  onScegli: (chiave: ChiaveParte) => void
  alPassaggio: boolean
}

function Parte({ chiave, children, blocco = false, attiva, onScegli, alPassaggio }: PropsParte) {
  const c = COLORI_PARTI[chiave]
  const scelta = attiva === chiave
  return (
    <button
      type="button"
      onClick={() => onScegli(chiave)}
      onMouseEnter={alPassaggio ? () => onScegli(chiave) : undefined}
      aria-pressed={scelta}
      aria-label={`${NOMI_PARTI[chiave]}: ${children}`}
      className={`cursor-pointer rounded border border-dashed text-left break-all whitespace-pre-wrap transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${c.testo} ${
        scelta ? `${c.bordo} ${c.sfondo}` : 'border-transparent hover:bg-white/5'
      } ${blocco ? 'block w-full px-1 py-0.5' : 'inline px-0.5'}`}
    >
      {children || ' '}
    </button>
  )
}

export default function RichiestaCliccabile({ testo, attiva, onScegli, alPassaggio = false }: Props) {
  const p = dividiRichiesta(testo)
  const comuni = { attiva, onScegli, alPassaggio }

  return (
    <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#07070c] p-4 font-mono text-[13px] leading-relaxed text-text/70 sm:text-sm">
      <code>
        <span className="block">
          <Parte chiave="metodo" {...comuni}>
            {p.metodo}
          </Parte>
          {p.spazio1}
          <Parte chiave="url" {...comuni}>
            {p.url}
          </Parte>
          <span className="text-text/50">{p.resto}</span>
        </span>
        {p.header && (
          <Parte chiave="header" blocco {...comuni}>
            {p.header}
          </Parte>
        )}
        <span className="block" aria-hidden="true">
          {' '}
        </span>
        {p.body !== '' && (
          <Parte chiave="body" blocco {...comuni}>
            {p.body}
          </Parte>
        )}
      </code>
    </pre>
  )
}
