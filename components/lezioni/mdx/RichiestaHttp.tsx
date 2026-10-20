import type { ReactNode } from 'react'

// Parti da evidenziare scritte tra ==uguali== (come l'evidenziatore di Obsidian).
function conEvidenziati(testo: string): ReactNode[] {
  return testo.split(/(==[^=]+==)/g).map((parte, i) =>
    parte.startsWith('==') && parte.endsWith('==') && parte.length > 4 ? (
      <mark key={i} className="rounded bg-crimson/40 px-0.5 text-white">
        {parte.slice(2, -2)}
      </mark>
    ) : (
      parte
    ),
  )
}

function coloreStatus(codice: number): string {
  if (codice < 300) return 'text-hack'
  if (codice < 400) return 'text-[#a98bff]'
  return 'text-[#e0587f]'
}

// Prima riga: "POST /login HTTP/1.1" (richiesta) oppure "HTTP/1.1 302 Found" (risposta).
function PrimaRiga({ riga }: { riga: string }) {
  const risposta = riga.match(/^(HTTP\/\S+)\s+(\d{3})(.*)$/)
  if (risposta) {
    return (
      <>
        <span className="text-text/50">{risposta[1]}</span>{' '}
        <span className={`font-bold ${coloreStatus(Number(risposta[2]))}`}>{risposta[2]}</span>
        <span className="text-text">{risposta[3]}</span>
      </>
    )
  }
  const richiesta = riga.match(/^([A-Z]+)\s+(\S+)(\s+HTTP\/\S+)?$/)
  if (richiesta) {
    return (
      <>
        <span className="font-bold text-[#a98bff]">{richiesta[1]}</span>{' '}
        <span className="text-text">{conEvidenziati(richiesta[2])}</span>
        {richiesta[3] && <span className="text-text/50">{richiesta[3]}</span>}
      </>
    )
  }
  return <>{conEvidenziati(riga)}</>
}

// Blocco "richiesta HTTP" in stile terminale. Nelle lezioni basta un blocco di codice:
//   ```http
//   POST /login HTTP/1.1
//   Host: esempio.it
//
//   username=anna&password===segreta==
//   ```
// oppure il componente: <RichiestaHttp titolo="..." codice={`...`} />
export default function RichiestaHttp({ codice, titolo }: { codice: string; titolo?: string }) {
  const righe = codice.replace(/\r/g, '').replace(/\n+$/, '').split('\n')
  const vuota = righe.findIndex((r) => r.trim() === '')
  const intestazione = vuota === -1 ? righe : righe.slice(0, vuota)
  const corpo = vuota === -1 ? [] : righe.slice(vuota + 1)
  const eRisposta = /^HTTP\//.test(righe[0] ?? '')
  const nome = titolo ?? (eRisposta ? 'risposta.http' : 'richiesta.http')

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-white/10 bg-[#07070c] shadow-lg shadow-black/40">
      <figcaption className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand" />
          <span className="h-2.5 w-2.5 rounded-full bg-hack" />
        </span>
        <span className="font-mono text-xs text-text/60">{nome}</span>
        <span
          className={`ml-auto rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${
            eRisposta ? 'border-hack/60 text-hack' : 'border-brand/60 text-[#a98bff]'
          }`}
        >
          {eRisposta ? 'RISPOSTA' : 'RICHIESTA'}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          {intestazione.map((riga, i) => {
            if (i === 0)
              return (
                <span key={i} className="block">
                  <PrimaRiga riga={riga} />
                </span>
              )
            const due = riga.indexOf(':')
            return (
              <span key={i} className="block">
                {due > 0 ? (
                  <>
                    <span className="text-hack">{riga.slice(0, due)}</span>
                    <span className="text-text/50">:</span>
                    <span className="text-text/80">{conEvidenziati(riga.slice(due + 1))}</span>
                  </>
                ) : (
                  conEvidenziati(riga)
                )}
              </span>
            )
          })}
          {corpo.length > 0 && (
            <>
              <span className="block" aria-hidden="true">
                &nbsp;
              </span>
              {corpo.map((riga, i) => (
                <span key={`c${i}`} className="block text-text">
                  {riga ? conEvidenziati(riga) : ' '}
                </span>
              ))}
            </>
          )}
        </code>
      </pre>
    </figure>
  )
}
