import IconaDiscord from '@/components/IconaDiscord'
import { PULSANTE_PRIMARIO } from '@/components/ctf/stili'
import { LINK_ESTERNO, LINKS } from '@/config/links'

// Riquadro "Unisciti alla community": porta sul server Discord (in fondo alle pagine Eventi e Meeting).
export default function RiquadroDiscord() {
  return (
    <section
      aria-labelledby="titolo-discord"
      className="flex flex-col gap-6 rounded-2xl border border-brand/50 bg-brand/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white" aria-hidden="true">
          <IconaDiscord className="h-6 w-6" />
        </span>
        <div>
          <h2 id="titolo-discord" className="font-mono text-xl font-bold text-text">
            <span className="text-hack">&gt;</span> Unisciti alla community
          </h2>
          <p className="mt-1 text-text/80">Su Discord parliamo, ci aiutiamo e organizziamo i gruppi. Nessuna resta sola.</p>
        </div>
      </div>
      <a href={LINKS.discord} {...LINK_ESTERNO} className={`${PULSANTE_PRIMARIO} shrink-0`}>
        <IconaDiscord className="h-4 w-4" />
        Entra su Discord ↗
      </a>
    </section>
  )
}
