import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Callout from '@/components/lezioni/mdx/Callout'
import RichiestaHttp from '@/components/lezioni/mdx/RichiestaHttp'
import Schema, { Flusso } from '@/components/lezioni/mdx/Schema'
import { LINK } from '@/components/ctf/stili'
import CheckRapido from '@/components/lezione/CheckRapido'
import {
  CartolinaVsBusta,
  DnsRubrica,
  LetteraHTTP,
  PalazzoPorte,
  ScambioMessaggi,
  StatusCodes,
  ViaggioCompleto,
} from '@/components/lezione/Interattivi'
import MappaConcetti from '@/components/lezione/MappaConcetti'
import NonTiServeOra from '@/components/lezione/NonTiServeOra'
import ProssimaLezione from '@/components/lezione/ProssimaLezione'
import SimulatoreProxy from '@/components/lezione/SimulatoreProxy'
import {
  Bottino,
  Chiusura,
  Compito,
  Definizione,
  Domande,
  Filo,
  Intro,
  LatoHacker,
  Passo,
  Promessa,
} from '@/components/lezione/Testo'
import { LINK_ESTERNO } from '@/config/links'

// Componenti e stili usati da TUTTI i file MDX (le lezioni in content/lezioni/).
// I componenti qui sotto si usano nelle lezioni senza bisogno di importarli:
// <Callout>, <Schema>, <Flusso>, <RichiestaHttp> (o un blocco di codice ```http) e quelli di components/lezione/
// (elenco con esempi nel README, sezione 10).

// Link: quelli interni ("/lezioni/...") restano nella scheda, quelli esterni si aprono in una nuova scheda
// con rel="noopener noreferrer". Sono accettati solo link https, http, mailto e interni (mai "javascript:").
function Collegamento({ href = '', children }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} className={LINK}>
        {children}
      </Link>
    )
  }
  if (/^(https?:|mailto:)/i.test(href)) {
    return (
      <a href={href} {...LINK_ESTERNO} className={LINK}>
        {children}
        {!href.startsWith('mailto:') && ' ↗'}
      </a>
    )
  }
  return <span>{children}</span>
}

// Blocco di codice: ```http diventa il blocco "richiesta HTTP" stile terminale, gli altri un riquadro scuro.
function BloccoCodice({ children }: ComponentPropsWithoutRef<'pre'>) {
  const codice = isValidElement<{ className?: string; children?: ReactNode }>(children) ? children.props : undefined
  const testo = typeof codice?.children === 'string' ? codice.children : ''
  if (codice?.className === 'language-http') return <RichiestaHttp codice={testo} />
  return (
    <pre className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#07070c] p-4 font-mono text-[13px] leading-relaxed text-text sm:text-sm">
      <code>{testo || codice?.children}</code>
    </pre>
  )
}

const components: MDXComponents = {
  h1: ({ children }) => <h2 className="mt-10 mb-4 font-mono text-2xl font-bold text-text">{children}</h2>,
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 font-mono text-xl font-bold text-text sm:text-2xl">
      <span className="text-hack">&gt;</span> {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 mb-3 font-mono text-lg font-bold text-text">{children}</h3>,
  p: ({ children }) => <p className="my-4 leading-relaxed text-text/85">{children}</p>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-1.5 pl-6 text-text/85 marker:text-hack">{children}</ul>,
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-text/85 marker:font-mono marker:text-hack">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-bold text-text">{children}</strong>,
  a: Collegamento,
  code: ({ children }) => (
    <code className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-[#c4b3ff]">
      {children}
    </code>
  ),
  pre: BloccoCodice,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-crimson pl-4 text-text/80 italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs font-bold text-text">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-white/5 px-4 py-2 text-text/80">{children}</td>,
  Callout,
  Schema,
  Flusso,
  RichiestaHttp,
  // components/lezione/: testo
  Intro,
  Promessa,
  Filo,
  Passo,
  Definizione,
  LatoHacker,
  CheckRapido,
  Domande,
  NonTiServeOra,
  Bottino,
  Compito,
  ProssimaLezione,
  Chiusura,
  MappaConcetti,
  // components/lezione/: interattivi
  ScambioMessaggi,
  PalazzoPorte,
  DnsRubrica,
  LetteraHTTP,
  StatusCodes,
  CartolinaVsBusta,
  ViaggioCompleto,
  SimulatoreProxy,
}

export function useMDXComponents(): MDXComponents {
  return components
}
