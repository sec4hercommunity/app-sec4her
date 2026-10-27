// ⚠️ DATI FINTI per la sezione Lezioni ⚠️
//
// Servono solo a mostrare la grafica finché non c'è un database. Il percorso segue docs/struttura-corsi.md.
// - MODULI_BASE: i 7 moduli. Le lezioni di un modulo arrivano dai file MDX nella sua cartella
//   content/lezioni/<slug del modulo>/ (titolo, durata, xp, prova… dal frontmatter, vedi lib/catalogo.ts).
//   Se la cartella non c'è, si usano le lezioni di esempio scritte qui ("note in preparazione").
// - COMPLETATE_INIZIALI: le lezioni già completate dall'utente di prova.
// - SESSIONI_LIVE: le sessioni live settimanali (si prenotano come gli eventi).
// Progressi e iscrizioni fatti nel sito restano solo nella memoria del browser e spariscono ricaricando la pagina.
// Con Supabase: progressi e sessioni dal database, l'elenco delle lezioni può restare qui o passare in una tabella.

import { LINKS } from '@/config/links'
import type { Modulo, SessioneLive } from '@/lib/lezioni'

export const MODULI_BASE: Modulo[] = [
  {
    numero: 1,
    slug: '01-basi-rete-web',
    titolo: 'Basi di rete e web',
    contenuto: 'Come funziona il web: protocolli, richieste e risposte HTTP, infrastruttura.',
    approccio: 'Schemi + esempi pratici. Obiettivo: capire, non memorizzare.',
    descrizione:
      'Il web è uno scambio di messaggi. Qui impariamo a leggerli: cosa chiede il browser, cosa risponde il server e come ci si mette in mezzo con un proxy. Niente teoria astratta: OSI, TCP/UDP e subnetting arrivano quando servono.',
    aperto: true,
    lezioni: [], // dai file MDX in content/lezioni/01-basi-rete-web/
  },
  {
    numero: 2,
    slug: '02-vulnerabilita-web',
    titolo: 'Vulnerabilità web',
    sottotitolo: 'OWASP Top 10',
    contenuto: 'XSS, SQL injection, IDOR, autenticazione.',
    approccio: 'Lezioni estratte dai lab e dai CTF reali di founder e co-founder, non PDF generici.',
    descrizione:
      'Le vulnerabilità più comuni del web, viste dal lato di chi attacca: dove nascono, quali domande farsi davanti a un target, come si riconoscono. Il metodo prima della soluzione.',
    aperto: true,
    // Lezioni di riserva: oggi arrivano tutte dai file MDX in content/lezioni/02-vulnerabilita-web/
    // (titolo, livello, durata, xp, prova… dal frontmatter). Questo elenco si usa solo se la cartella è vuota.
    lezioni: [
      {
        slug: '01-controllo-accessi',
        ordine: 1,
        xp: 50,
        livello: 'Base',
        haContenuto: true,
        titolo: 'Controllo degli accessi e privilege escalation',
        durataMinuti: 35,
        descrizione: 'Nascondere non è proteggere: IDOR, escalation verticale e orizzontale.',
      },
      {
        slug: '02-autenticazione',
        ordine: 2,
        xp: 50,
        livello: 'Base',
        haContenuto: true,
        titolo: 'Vulnerabilità di autenticazione',
        durataMinuti: 35,
        descrizione: 'Brute-force intelligente, 2FA aggirata, reset fatti male. Se lo scrivi tu, non è una prova.',
      },
      {
        slug: '03-xss',
        ordine: 3,
        xp: 50,
        livello: 'Base',
        haContenuto: true,
        titolo: 'Cross-Site Scripting (XSS)',
        durataMinuti: 40,
        descrizione: 'Quando il sito ripete il tuo input nella pagina: il contesto determina tutto.',
      },
      {
        slug: '04-injection-ssrf-secrets',
        ordine: 4,
        xp: 60,
        livello: 'Intermedio',
        haContenuto: true,
        titolo: 'Injection, SSRF e secrets nel codice',
        durataMinuti: 35,
        descrizione: 'Un input non fidato che viaggia da un source a un sink pericoloso.',
      },
      {
        slug: '05-parser-differential-ssti',
        ordine: 5,
        xp: 80,
        livello: 'Avanzato',
        avanzata: true,
        haContenuto: true,
        titolo: 'Parser differential + SSTI → RCE',
        durataMinuti: 30,
        descrizione: 'Due bug piccoli che concatenati diventano esecuzione di codice.',
      },
      {
        slug: '06-jwt-kid-traversal-lfi',
        ordine: 6,
        xp: 80,
        livello: 'Avanzato',
        avanzata: true,
        haContenuto: true,
        titolo: 'JWT kid traversal + lettura file locale',
        durataMinuti: 30,
        descrizione: 'Forgi un token da admin e leggi qualsiasi file del server.',
      },
    ],
  },
  {
    numero: 3,
    slug: '03-lab-pratici',
    titolo: 'Lab pratici',
    contenuto: 'PortSwigger Web Security Academy.',
    approccio: 'Fatti insieme, guidati step by step.',
    descrizione: 'I lab della Web Security Academy di PortSwigger, affrontati insieme e guidati passo per passo.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 4,
    slug: '04-ctf-di-gruppo',
    titolo: 'CTF di gruppo',
    contenuto: 'Giornate di sfide in team.',
    approccio: 'Si impara 1000x più che da sole.',
    descrizione: 'Giornate di Capture The Flag in squadra: si impara mille volte di più che da sole.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 5,
    slug: '05-bug-bounty',
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
    slug: '06-lab-nostro',
    titolo: 'Lab nostro',
    contenuto: 'Ambiente controllato per attacchi simulati, 100% legale.',
    approccio: 'Costruito insieme, come team.',
    descrizione: 'Un ambiente controllato per attacchi simulati, 100% legale, costruito insieme come team.',
    aperto: false,
    lezioni: [],
  },
  {
    numero: 7,
    slug: '07-eventi-a-tema',
    titolo: 'Eventi a tema',
    contenuto: 'OSINT, social engineering, privacy.',
    approccio: 'Per allargare l’orizzonte oltre il web hacking.',
    descrizione: 'OSINT, social engineering e privacy: per allargare l’orizzonte oltre il web hacking.',
    aperto: false,
    lezioni: [],
  },
]

// L'utente di prova parte da zero: la lezione 2 si sblocca superando il quiz della lezione 1.
export const COMPLETATE_INIZIALI: string[] = []

const GIORNO = 24 * 60 * 60 * 1000

// Data tra "giorni" giorni alle ore indicate (ora locale): così le sessioni sono sempre nel futuro.
function tra(giorni: number, ore: number, minuti = 0): string {
  const d = new Date(Date.now() + giorni * GIORNO)
  d.setHours(ore, minuti, 0, 0)
  return d.toISOString()
}

// Una sessione a settimana, legata a un modulo (e alle lezioni che la indicano in "sessioneLive").
// Pubblico solo il NUMERO di iscritte, mai i nomi.
export const SESSIONI_LIVE: SessioneLive[] = [
  {
    id: 'sessione-01-caido', // = "sessioneLive" nel frontmatter delle lezioni del modulo 1
    modulo: '01-basi-rete-web',
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
    id: 'sessione-02-owasp',
    modulo: '02-vulnerabilita-web',
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
    id: 'sessione-02-xss',
    modulo: '02-vulnerabilita-web',
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
