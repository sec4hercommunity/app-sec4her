// Campo di input con etichetta e messaggio di errore accessibile.
export default function Campo({ id, etichetta, errore, ...props }) {
  const idErrore = `${id}-errore`

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-sm font-bold text-text/80">
        {etichetta}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={errore ? 'true' : 'false'}
        aria-describedby={errore ? idErrore : undefined}
        className={`w-full rounded-lg border bg-ink/80 px-4 py-3 text-text placeholder:text-text/30 outline-none transition focus:ring-2 ${
          errore
            ? 'border-crimson focus:ring-crimson/40'
            : 'border-white/15 focus:border-brand focus:ring-brand/40'
        }`}
        {...props}
      />
      {errore && (
        <p id={idErrore} role="alert" className="mt-1.5 text-sm text-[#e0587f]">
          {errore}
        </p>
      )}
    </div>
  )
}
