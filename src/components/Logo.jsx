import { useState } from 'react'

// Logo (di default public/logo.svg); se l'immagine manca mostra la scritta "sec4her".
export default function Logo({ src = '/logo.svg', className = 'h-10 w-auto', classeTesto = 'text-xl' }) {
  const [mancante, setMancante] = useState(false)

  if (mancante) {
    return (
      <span className={`font-mono font-bold tracking-tight text-text ${classeTesto}`}>
        sec<span className="text-brand">4</span>her
      </span>
    )
  }
  return <img src={src} alt="Sec4Her" className={className} onError={() => setMancante(true)} />
}
