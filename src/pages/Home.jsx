import Logo from '../components/Logo.jsx'

// Testo segnaposto: modificalo liberamente.
const DESCRIZIONE =
  "Sec4Her Academy è lo spazio dove le donne imparano la cybersecurity partendo da zero. " +
  "Niente teoria infinita: si parte dai lab, si capisce facendo e si cresce insieme, " +
  "dalle basi del web fino alle prime vulnerabilità trovate sul campo. " +
  "Perché l'hacking non è facile, ma nessuna deve impararlo da sola."

export default function Home() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center px-4 py-12 sm:px-6 sm:py-20">
      <section className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-14">
        <div className="mx-auto w-full max-w-sm rounded-2xl bg-ink p-4 shadow-xl shadow-ink/25 sm:p-6 md:max-w-none">
          <Logo src="/logo-home.svg" className="block h-auto w-full rounded-xl" classeTesto="block py-16 text-center text-5xl" />
        </div>

        <p className="text-base leading-relaxed text-ink-text sm:text-lg md:text-xl">{DESCRIZIONE}</p>
      </section>
    </div>
  )
}
