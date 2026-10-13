import { CARD, PULSANTE_PRIMARIO } from '@/components/ctf/stili'
import { EtichettaPiattaforma } from '@/components/eventi/Icone'
import { LINK_ESTERNO } from '@/config/links'
import { durataTesto } from '@/lib/eventi'
import type { TipoCall } from '@/lib/meeting'

// Card di un tipo di call: si prenota su Cal.com (nessun calendario costruito nel sito).
export default function CardTipoCall({ tipo }: { tipo: TipoCall }) {
  return (
    <article className={`${CARD} flex flex-col gap-4 p-5`}>
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg font-bold text-text">{tipo.titolo}</h3>
        <span className="shrink-0 rounded-full border border-brand bg-brand/25 px-2.5 py-0.5 font-mono text-xs font-bold text-text">
          {durataTesto(tipo.durataMinuti)}
        </span>
      </header>
      <p className="font-mono text-xs font-bold text-text/60">{tipo.persone}</p>
      <p className="text-sm text-text/70">{tipo.descrizione}</p>
      <div className="mt-auto space-y-4">
        <EtichettaPiattaforma piattaforma={tipo.piattaforma} />
        <a href={tipo.linkPrenotazione} {...LINK_ESTERNO} className={`${PULSANTE_PRIMARIO} w-full`}>
          Prenota su Cal.com ↗
        </a>
      </div>
    </article>
  )
}
