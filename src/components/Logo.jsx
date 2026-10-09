import { useState } from 'react'

// Logo da public/logo.png; se il file manca mostra la scritta "sec4her".
export default function Logo({ className = 'h-10 w-auto', classeTesto = 'text-xl' }) {
  const [mancante, setMancante] = useState(false)

  if (mancante) {
    return (
      <span className={`font-mono font-bold tracking-tight text-text ${classeTesto}`}>
        sec<span className="text-brand">4</span>her
      </span>
    )
  }
  return <img src="/logo.png" alt="Sec4Her" className={className} onError={() => setMancante(true)} />
}
