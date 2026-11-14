// Testi della Home: modificali liberamente (sono solo contenuti, niente logica).

export type Pilastro = {
  id: string
  icona: string
  titolo: string
  breve: string // una riga, sulla card che gira in orbita
  testo: string // il dettaglio che si apre cliccando
  link: { testo: string; percorso: string; esterno?: boolean }
  colore: 'brand' | 'crimson' | 'hack'
}

// I pilastri dell'ecosistema Sec4Her (docs/struttura-corsi.md): ruotano intorno al nucleo nella Home.
export const PILASTRI: Pilastro[] = [
  {
    id: 'beginner',
    icona: '📘',
    titolo: 'Note per chi parte da zero',
    breve: 'Dalle basi, passo dopo passo',
    testo:
      "Come funziona il web, cosa succede quando fai un login, come si legge una richiesta. Lezioni visive, con schemi e prove: si capisce facendo, non memorizzando.",
    link: { testo: 'Inizia dal modulo 1', percorso: '/lezioni' },
    colore: 'brand',
  },
  {
    id: 'avanzate',
    icona: '🧠',
    titolo: 'Note per chi ha già esperienza',
    breve: 'Il ragionamento da pentester',
    testo:
      'Per chi le basi le ha già: tecniche avanzate estratte dai lab e dai CTF di founder e co-founder. Niente write-up pronti: il metodo, le domande da farsi davanti a un target.',
    link: { testo: 'Vai alle lezioni avanzate', percorso: '/lezioni' },
    colore: 'crimson',
  },
  {
    id: 'live',
    icona: '🎥',
    titolo: 'Sessioni live',
    breve: 'Hands-first, insieme',
    testo:
      'Ogni modulo ha le sue sessioni dal vivo: proxy aperto, lab sullo schermo, domande in diretta. Nessuna resta bloccata da sola davanti a un errore.',
    link: { testo: 'Vedi le prossime sessioni', percorso: '/lezioni' },
    colore: 'hack',
  },
  {
    id: 'ctf',
    icona: '🚩',
    titolo: 'CTF di gruppo',
    breve: 'Sfide in team',
    testo:
      'Scegli un CTF, crea o unisciti a un gruppo e affrontalo con le altre. In squadra si impara mille volte più che da sole.',
    link: { testo: 'Trova il tuo gruppo', percorso: '/ctf' },
    colore: 'brand',
  },
  {
    id: 'bugbounty',
    icona: '🐞',
    titolo: 'Bug bounty',
    breve: 'Vulnerabilità vere',
    testo:
      "Quando ti senti pronta, piccoli team cacciano bug reali sui programmi di bug bounty, sostenendosi a vicenda. I dettagli dei bug restano confidenziali: condividiamo il metodo, mai il target.",
    link: { testo: 'Scopri il Bug Bounty Group', percorso: '/bug-bounty' },
    colore: 'crimson',
  },
  {
    id: 'presenza',
    icona: '📍',
    titolo: 'Eventi in presenza',
    breve: 'Dal digitale alla stanza',
    testo:
      "Workshop, talk e incontri dal vivo, ospitati da Sec4Her: principianti ed esperte nella stessa stanza, a condividere. Oltre il web: OSINT, social engineering, privacy.",
    link: { testo: 'Guarda gli eventi', percorso: '/eventi' },
    colore: 'hack',
  },
  {
    id: 'community',
    icona: '💬',
    titolo: 'La community',
    breve: 'Mai da sole',
    testo:
      'Su Discord ci si aiuta ogni giorno: domande sulle lezioni, gruppi CTF, opportunità, chiacchiere. E se vuoi parlare con noi, prenota una call 1:1.',
    link: { testo: 'Parla con noi', percorso: '/meeting' },
    colore: 'brand',
  },
]

// I 4 principi del metodo (docs/struttura-corsi.md, sezione 1).
export const PRINCIPI = [
  { simbolo: '>_', titolo: 'Hands first', testo: 'Prima si fa, poi si capisce. Il lab è il contenitore, la teoria entra quando serve.' },
  { simbolo: '◎', titolo: 'Scenari reali', testo: 'Target e vulnerabilità vere, non quiz astratti.' },
  { simbolo: '⇄', titolo: 'Si impara insieme', testo: 'Nessuna resta bloccata da sola: c’è sempre qualcuna che ci è già passata.' },
  { simbolo: '⚑', titolo: 'Risultati veri', testo: 'Si finisce con skill e portfolio — CTF, bug trovati — non con un quaderno di appunti.' },
]
