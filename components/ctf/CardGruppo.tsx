import { MAX_MEMBRI_PER_GRUPPO } from '@/config/ctf'
import { iniziali, type Gruppo, type Membro } from '@/lib/ctf'
import { CARD, PULSANTE_PRIMARIO } from './stili'

// Colori degli avatar, scelti sempre uguali per la stessa persona.
const COLORI_AVATAR = ['bg-brand', 'bg-crimson', 'bg-hack']

function coloreAvatar(email: string) {
  let somma = 0
  for (const c of email) somma = (somma + c.charCodeAt(0)) % 997
  return COLORI_AVATAR[somma % COLORI_AVATAR.length]
}

function Avatar({ membro, sonoIo }: { membro: Membro; sonoIo: boolean }) {
  return (
    <li
      title={sonoIo ? `${membro.nome} (tu)` : membro.nome}
      className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-bold text-white ${coloreAvatar(membro.email)} ${
        sonoIo ? 'ring-2 ring-text ring-offset-2 ring-offset-ink' : ''
      }`}
    >
      <span aria-hidden="true">{iniziali(membro.nome)}</span>
      <span className="sr-only">{sonoIo ? `${membro.nome} (tu)` : membro.nome}</span>
    </li>
  )
}

type Props = {
  gruppo: Gruppo
  emailUtente: string | undefined
  // L'utente è già in un altro gruppo di questo CTF.
  inAltroGruppo: boolean
  concluso: boolean
  onUnisciti: () => void
  onEsci: () => void
}

export default function CardGruppo({ gruppo, emailUtente, inAltroGruppo, concluso, onUnisciti, onEsci }: Props) {
  const mio = gruppo.membri.some((m) => m.email === emailUtente)
  const completo = gruppo.membri.length >= MAX_MEMBRI_PER_GRUPPO
  const postiLiberi = Math.max(0, MAX_MEMBRI_PER_GRUPPO - gruppo.membri.length)

  let azione
  if (mio) {
    azione = (
      <div className="flex flex-col gap-2">
        <p className="flex items-center justify-center gap-2 rounded-lg border border-hack bg-hack/20 px-4 py-2.5 font-mono text-sm font-bold text-text">
          Sei nel gruppo ✓
        </p>
        {!concluso && (
          <button
            type="button"
            onClick={onEsci}
            className="cursor-pointer rounded-lg px-3 py-2 font-mono text-sm font-bold text-[#e0587f] transition hover:bg-crimson/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
          >
            Esci dal gruppo
          </button>
        )}
      </div>
    )
  } else {
    const motivo = concluso ? 'CTF concluso' : completo ? 'Gruppo completo' : inAltroGruppo ? 'Sei già in un altro gruppo' : ''
    azione = (
      <div className="flex flex-col gap-2">
        <button type="button" onClick={onUnisciti} disabled={Boolean(motivo)} className={`${PULSANTE_PRIMARIO} w-full`}>
          {completo ? 'Completo' : 'Unisciti'}
        </button>
        {motivo && !completo && <p className="text-center font-mono text-xs text-text/50">{motivo}</p>}
      </div>
    )
  }

  return (
    <article className={`${CARD} flex flex-col gap-4 p-5 starting:scale-95 starting:opacity-0 ${mio ? 'border-hack/70' : ''}`}>
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg font-bold leading-snug text-text">{gruppo.nome}</h3>
        {completo && (
          <span className="shrink-0 rounded-full border border-crimson bg-crimson/25 px-2.5 py-0.5 font-mono text-xs font-bold text-text">
            Completo
          </span>
        )}
      </header>

      {gruppo.nota && <p className="text-sm italic text-text/70">“{gruppo.nota}”</p>}

      <div className="mt-auto space-y-2">
        <ul className="flex flex-wrap gap-2" aria-label="Membri del gruppo">
          {gruppo.membri.map((m) => (
            <Avatar key={m.email} membro={m} sonoIo={m.email === emailUtente} />
          ))}
          {Array.from({ length: postiLiberi }, (_, i) => (
            <li key={`libero-${i}`} className="h-10 w-10 rounded-full border-2 border-dashed border-white/25" aria-hidden="true" />
          ))}
        </ul>
        <p className="font-mono text-xs text-text/60">
          {gruppo.membri.length}/{MAX_MEMBRI_PER_GRUPPO} membri
          {postiLiberi > 0 && ` · ${postiLiberi} ${postiLiberi === 1 ? 'posto libero' : 'posti liberi'}`}
        </p>
      </div>

      {azione}
    </article>
  )
}
