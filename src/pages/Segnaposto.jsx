import { Link } from 'react-router-dom'

// Pagina provvisoria per le sezioni del menu non ancora sviluppate.
export default function Segnaposto({ titolo }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-mono text-3xl font-bold text-brand sm:text-4xl">{titolo}</h1>
      <div className="mt-3 h-1 w-24 bg-crimson" />
      <p className="mt-6 text-base">
        <span className="font-mono font-bold text-hack">[in costruzione]</span> Questa sezione arriverà presto.
      </p>
      <Link to="/home" className="mt-8 inline-block font-mono font-bold text-brand hover:underline">
        ← Torna alla home
      </Link>
    </div>
  )
}
