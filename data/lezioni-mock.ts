// ⚠️ DATI FINTI per la sezione Lezioni ⚠️
//
// Servono solo a mostrare la grafica finché non c'è un database. Il percorso segue docs/struttura-corsi.md.
// - MODULI: i 7 moduli e l'elenco delle lezioni (titolo, durata). Il TESTO di ogni lezione è un file MDX in
//   content/lezioni/<modulo>/<lezione>.mdx (le note arrivano da Obsidian).
// - COMPLETATE_INIZIALI: le lezioni già completate dall'utente di prova.
// - SESSIONI_LIVE: le sessioni live settimanali (si prenotano come gli eventi).
// Progressi e iscrizioni fatti nel sito restano solo nella memoria del browser e spariscono ricaricando la pagina.
// Con Supabase: progressi e sessioni dal database, l'elenco delle lezioni può restare qui o passare in una tabella.

import { LINKS } from '@/config/links'
import { idLezione, type Modulo, type SessioneLive } from '@/lib/lezioni'

export const MODULI: Modulo[] = [
  {
    numero: 1,
    slug: 'basi-rete-web',
    titolo: 'Basi di rete e web',
    contenuto: 'Come funziona il web: protocolli, richieste e risposte HTTP, infrastruttura.',
    approccio: 'Schemi + esempi pratici. Obiettivo: capire, non memorizzare.',
    descrizione:
      'Il web è uno scambio di messaggi. Qui impariamo a leggerli: cosa chiede il browser, cosa risponde il server e come ci si mette in mezzo con un proxy. Niente teoria astratta: OSI, TCP/UDP e subnetting arrivano quando servono.',
    aperto: true,
    lezioni: [
      {
        slug: 'come-parla-il-web',
        titolo: 'Come parla il web: richieste e risposte',
        durataMinuti: 40,
        descrizione: 'Browser e server si scambiano lettere: metodo, URL, header, body e status code.',
      },
      {
        slug: 'il-browser-sotto-la-lente',
        titolo: 'Il browser sotto la lente: gli strumenti per sviluppatori',
        durataMinuti: 35,
        descrizione: 'La scheda Rete dei DevTools: vediamo i messaggi che il browser manda senza dircelo.',
      },
      {
        slug: 'intercettiamo-un-login-con-caido',
        titolo: 'Intercettiamo un login con Caido',
        durataMinuti: 55,
        descrizione: 'Mettiamo un proxy in mezzo e leggiamo la richiesta di login. E se la cambiassimo?',
      },
    ],
  },
  {
    numero: 2,
    slug: 'vulnerabilita-web',
    titolo: 'Vulnerabilità web',
    sottotitolo: 'OWASP Top 10',
    contenuto: 'XSS, SQL injection, IDOR, autenticazione.',
    approccio: 'Lezioni estratte dai lab e dai CTF reali di founder e co-founder, non PDF generici.',
    descrizione:
      'Le vulnerabilità più comuni del web, viste dal lato di chi attacca: dove nascono, quali domande farsi davanti a un target, come si riconoscono. Il metodo prima della soluzione.',
    aperto: true,
    lezioni: [
      {
        slug: 'owasp-top-10-la-mappa',
        titolo: 'OWASP Top 10: la mappa',
        durataMinuti: 30,
        descrizione: 'Le 10 famiglie di vulnerabilità più diffuse, per sapere dove guardare.',
      },
      {
        slug: 'xss',
        titolo: 'Cross-Site Scripting (XSS)',
        durataMinuti: 50,
        descrizione: 'Quando il sito ripete quello che scrivi senza controllarlo.',
      },
      {
        slug: 'sql-injection',
        titolo: 'SQL injection',
        durataMinuti: 55,
        descrizione: 'Quando il tuo input finisce dentro la domanda al database.',
      },
      {
        slug: 'idor',
        titolo: 'IDOR: i dati delle altre',
        durataMinuti: 40,
        descrizione: 'Cambi un numero nell’URL e vedi il profilo di un’altra persona.',
      },
      {
        slug: 'autenticazione',
        titolo: 'Autenticazione rotta',
        durataMinuti: 50,
        descrizione: 'Password deboli, sessioni che non scadono, reset fatti male.',
      },
    ],
  },
  {
    numero: 3,
    slug: 'lab-pratici',
    titolo: 'Lab pratici',
    contenuto: 'PortSwigger Web Security Academy.',
    approccio: 'Fatti insieme, guidati step by step.',
    descrizione: 'I lab della Web Security Academy di PortSwigger, affrontati insieme e guidati passo per passo.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 4,
    slug: 'ctf-di-gruppo',
    titolo: 'CTF di gruppo',
    contenuto: 'Giornate di sfide in team.',
    approccio: 'Si impara 1000x più che da sole.',
    descrizione: 'Giornate di Capture The Flag in squadra: si impara mille volte di più che da sole.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 5,
    slug: 'bug-bounty',
    titolo: 'Bug bounty',
    contenuto: 'Piccoli team che cacciano vulnerabilità reali.',
    approccio: 'Quando si è pronte, ci si supporta a vicenda.',
    descrizione:
      'Piccoli team che cercano vulnerabilità reali. I bug trovati restano confidenziali: dall’esperienza estraiamo solo il metodo.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 6,
    slug: 'lab-nostro',
    titolo: 'Lab nostro',
    contenuto: 'Ambiente controllato per attacchi simulati, 100% legale.',
    approccio: 'Costruito insieme, come team.',
    descrizione: 'Un ambiente controllato per attacchi simulati, 100% legale, costruito insieme come team.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 7,
    slug: 'eventi-a-tema',
    titolo: 'Eventi a tema',
    contenuto: 'OSINT, social engineering, privacy.',
    approccio: 'Per allargare l’orizzonte oltre il web hacking.',
    descrizione: 'OSINT, social engineering e privacy: per allargare l’orizzonte oltre il web hacking.',
    aperto: false,
    lezioni: [],
  },
]

export const COMPLETATE_INIZIALI: string[] = [
  idLezione('basi-rete-web', 'come-parla-il-web'),
  idLezione('basi-rete-web', 'il-browser-sotto-la-lente'),
]

const GIORNO = 24 * 60 * 60 * 1000

// Data tra "giorni" giorni alle ore indicate (ora locale): così le sessioni sono sempre nel futuro.
function tra(giorni: number, ore: number, minuti = 0): string {
  const d = new Date(Date.now() + giorni * GIORNO)
  d.setHours(ore, minuti, 0, 0)
  return d.toISOString()
}

// Una sessione a settimana, legata a una lezione. Pubblico solo il NUMERO di iscritte, mai i nomi.
export const SESSIONI_LIVE: SessioneLive[] = [
  {
    id: 'live-caido',
    modulo: 'basi-rete-web',
    lezione: 'intercettiamo-un-login-con-caido',
    titolo: 'Live · Intercettiamo un login con Caido',
    tema: 'web',
    inizio: tra(3, 18, 30),
    durataMinuti: 55,
    modalita: 'online',
    descrizione:
      'Sessione live della lezione: installiamo Caido insieme e intercettiamo un login vero, passo per passo.',
    cosaPortare: ['Caido installato', 'Account gratuito PortSwigger'],
    piattaforma: 'zoom',
    linkCall: LINKS.callEventi.zoom,
    iscritte: 14,
  },
  {
    id: 'live-owasp',
    modulo: 'vulnerabilita-web',
    lezione: 'owasp-top-10-la-mappa',
    titolo: 'Live · OWASP Top 10: la mappa',
    tema: 'web',
    inizio: tra(10, 18, 30),
    durataMinuti: 45,
    modalita: 'online',
    descrizione: 'Giro guidato delle 10 famiglie di vulnerabilità, con esempi presi dai lab.',
    cosaPortare: [],
    piattaforma: 'meet',
    linkCall: LINKS.callEventi.meet,
    iscritte: 9,
  },
  {
    id: 'live-xss',
    modulo: 'vulnerabilita-web',
    lezione: 'xss',
    titolo: 'Live · Cross-Site Scripting (XSS)',
    tema: 'web',
    inizio: tra(17, 18, 30),
    durataMinuti: 50,
    modalita: 'online',
    descrizione: 'Il nostro primo alert(): troviamo insieme dove il sito ripete l’input senza controllarlo.',
    cosaPortare: ['Caido installato'],
    piattaforma: 'discord',
    linkCall: LINKS.callEventi.discord,
    iscritte: 6,
  },
]
