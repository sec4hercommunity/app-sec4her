// Avviso ben visibile in cima alla pagina quando la modalità anteprima è attiva (SOLO sviluppo).
// Lo stato "anteprima" arriva dal LezioniProvider; questo componente disegna solo la barra.
export default function AvvisoAnteprima() {
  return (
    <div
      role="status"
      className="sticky top-0 z-50 border-b border-[#f0b35b]/60 bg-[#f0b35b]/15 px-4 py-2 text-center backdrop-blur"
    >
      <p className="font-mono text-xs font-bold tracking-[0.15em] text-[#f0b35b] sm:text-sm">
        ⚠️ Modalità anteprima attiva (solo sviluppo) · i lucchetti sono ignorati
      </p>
    </div>
  )
}
