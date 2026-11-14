import Link from 'next/link'
import IconaDiscord from '@/components/IconaDiscord'
import { PULSANTE_PRIMARIO, PULSANTE_SECONDARIO } from '@/components/ctf/stili'
import { CardInclinata, Digitazione, Rivela } from '@/components/home/Effetti'
import OrbitaPilastri from '@/components/home/OrbitaPilastri'
import ReteViva from '@/components/home/ReteViva'
import { PRINCIPI } from '@/components/home/contenuti'
import { LINK_ESTERNO, LINKS } from '@/config/links'
import { caricaCatalogo } from '@/lib/catalogo'

// Home: racconta il progetto Sec4Her con una scena viva.
// 1. Rete viva 3D (la community)  2. Orbita dei pilastri (cosa trovi qui)  3. Il percorso in 7 moduli
// 4. I 4 principi del metodo  5. Chiusura con l'invito alla community.
// I testi stanno in components/home/contenuti.ts.
export default async function Home() {
  // Al browser passano solo titolo e stato dei moduli (mai le prove delle lezioni).
  const moduli = (await caricaCatalogo()).map((m) => ({
    numero: m.numero,
    slug: m.slug,
    titolo: m.titolo,
    contenuto: m.contenuto,
    aperto: m.aperto,
    lezioni: m.lezioni.length,
  }))

  return (
    <div className="pagina-scura overflow-x-clip">
      {/* 1 · Hero con la rete viva */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center">
        <div className="absolute inset-0 -z-10">
          <ReteViva />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-xl">
            <p className="comparsa font-mono text-xs font-bold tracking-[0.3em] text-hack">~/sec4her · community &amp; academy</p>
            <h1 className="mt-4 font-mono text-4xl leading-tight font-bold text-text sm:text-6xl">
              <Digitazione testo="HACK THE FUTURE" />
            </h1>
            <div className="mt-4 h-1 w-24 bg-crimson" />
            <p className="comparsa mt-6 font-mono text-lg font-bold text-brand sm:text-xl" style={{ animationDelay: '0.9s' }}>
              Hacking made simple. By women, for women.
            </p>
            <p className="comparsa mt-4 text-base leading-relaxed text-text/80 sm:text-lg" style={{ animationDelay: '1.1s' }}>
              Ogni punto di questa rete è una di noi. Impariamo la cybersecurity partendo da zero, con lab veri, sessioni
              live, CTF in squadra ed eventi dal vivo. L&apos;hacking non è facile: ma nessuna deve più impararlo da sola.
            </p>
            <div className="comparsa mt-8 flex flex-wrap gap-3" style={{ animationDelay: '1.3s' }}>
              <Link href="/lezioni" className={PULSANTE_PRIMARIO}>
                Inizia il percorso →
              </Link>
              <a href={LINKS.discord} {...LINK_ESTERNO} className={PULSANTE_SECONDARIO}>
                <IconaDiscord className="h-4 w-4" />
                Entra nella community ↗
              </a>
            </div>
          </div>
        </div>

        <a
          href="#ecosistema"
          aria-label="Scopri cosa trovi in Sec4Her"
          className="scendi absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-text/50 hover:text-text"
        >
          scorri ↓
        </a>
      </section>

      {/* 2 · L'ecosistema in orbita */}
      <section id="ecosistema" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <Rivela className="text-center">
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/ecosistema</p>
          <h2 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Non un corso. Un ecosistema.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text/70">
            Tutto gira intorno a una cosa sola: crescere insieme. Tocca un pilastro per scoprirlo.
          </p>
        </Rivela>
        <Rivela ritardo={150} className="mt-10">
          <OrbitaPilastri />
        </Rivela>
      </section>

      {/* 3 · Il percorso */}
      <section className="relative border-y border-white/5 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Rivela>
            <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/percorso</p>
            <h2 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Da zero, step by step</h2>
            <p className="mt-4 max-w-2xl text-text/70">
              Sette moduli: si parte da come funziona il web e si arriva ai bug veri. Chi ha già esperienza trova le
              lezioni avanzate dentro ogni modulo.
            </p>
          </Rivela>

          <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {moduli.map((m, i) => (
              <li key={m.slug}>
                <Rivela ritardo={i * 90} className="h-full">
                  <Link
                    href={`/lezioni/${m.slug}`}
                    className={`group flex h-full flex-col rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 ${
                      m.aperto
                        ? 'border-brand/40 bg-brand/10 hover:border-brand hover:shadow-[0_0_28px_-6px_rgba(109,68,224,0.6)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/30'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className={`font-mono text-3xl font-bold ${m.aperto ? 'text-brand' : 'text-text/30'}`}>
                        {String(m.numero).padStart(2, '0')}
                      </span>
                      <span className={`font-mono text-xs font-bold ${m.aperto ? 'text-hack' : 'text-text/40'}`}>
                        {m.aperto ? `● ${m.lezioni} lezioni` : '🔒 prossimamente'}
                      </span>
                    </span>
                    <span className="mt-3 font-mono font-bold text-text">{m.titolo}</span>
                    <span className="mt-1 text-sm text-text/60">{m.contenuto}</span>
                  </Link>
                </Rivela>
              </li>
            ))}
            <li>
              <Rivela ritardo={moduli.length * 90} className="h-full">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-crimson/50 p-5">
                  <span className="font-mono text-xs font-bold tracking-widest text-crimson">TRAGUARDO</span>
                  <span className="mt-2 font-mono font-bold text-text">Skill + portfolio</span>
                  <span className="mt-1 text-sm text-text/60">CTF giocati, bug trovati, una community al tuo fianco.</span>
                </div>
              </Rivela>
            </li>
          </ol>
        </div>
      </section>

      {/* 4 · Il metodo */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Rivela className="text-center">
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/metodo</p>
          <h2 className="mt-2 font-mono text-3xl font-bold text-text sm:text-4xl">Made simple non vuol dire facile</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text/70">
            Vuol dire reso accessibile: una guida, un sistema e uno spazio dove condividere. Non competiamo sul cosa, ma sul
            come.
          </p>
        </Rivela>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPI.map((p, i) => (
            <Rivela key={p.titolo} ritardo={i * 100} className="h-full">
              <CardInclinata className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="font-mono text-2xl font-bold text-brand" aria-hidden="true">
                  {p.simbolo}
                </span>
                <h3 className="mt-4 font-mono text-lg font-bold text-text">{p.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text/70">{p.testo}</p>
              </CardInclinata>
            </Rivela>
          ))}
        </div>
      </section>

      {/* 5 · Chiusura */}
      <section className="relative isolate overflow-hidden px-4 py-24 text-center sm:px-6">
        <div aria-hidden="true" className="aurora absolute inset-0 -z-10" />
        <Rivela>
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-hack">~/visione</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-mono text-3xl leading-tight font-bold text-text sm:text-5xl">
            Una stanza piena di donne che amano questo mondo.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-text/75">
            Da community digitale ad academy riconosciuta, fino agli incontri in presenza. Non un corso. Non solo una
            community. Un movimento.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/lezioni" className={PULSANTE_PRIMARIO}>
              Inizia dal modulo 1 →
            </Link>
            <Link href="/eventi" className={PULSANTE_SECONDARIO}>
              Guarda gli eventi
            </Link>
          </div>
        </Rivela>
      </section>
    </div>
  )
}
