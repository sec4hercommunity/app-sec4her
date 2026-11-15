// Sezione NOTE (/note): le stesse note delle lezioni, ma libere, senza lucchetti né quiz obbligatori.
// Pensata per chi ha già esperienza e vuole andare dritta all'argomento.
//
// Qui si decide come sono organizzate: le AREE (una per modulo, più quelle in arrivo) e, per ogni nota,
// una frase "in breve" e i TAG (categorie di vulnerabilità/argomenti, usati per filtrare e cercare).
// Il testo delle note resta nei file MDX di content/lezioni/: per aggiungere una nota basta scrivere la lezione
// e, se vuoi, aggiungere qui sotto la sua riga in NOTE_INFO.

export type ColoreArea = 'brand' | 'crimson' | 'hack'

export type Area = {
  id: string // parte dell'indirizzo: /note/<id>/<nota>
  titolo: string
  icona: string
  descrizione: string
  colore: ColoreArea
  modulo?: string // cartella di content/lezioni/ da cui prende le note; senza = area in arrivo
}

export const AREE_NOTE: Area[] = [
  {
    id: 'rete-web',
    titolo: 'Rete & Web',
    icona: '🌐',
    descrizione: 'HTTP, DNS, porte, HTTPS e proxy: come viaggiano davvero i messaggi tra browser e server.',
    colore: 'hack',
    modulo: '01-basi-rete-web',
  },
  {
    id: 'vulnerabilita-web',
    titolo: 'Vulnerabilità web',
    icona: '🕷️',
    descrizione: 'Access control, autenticazione, XSS, injection, SSRF, SSTI, JWT: il metodo per trovarle.',
    colore: 'crimson',
    modulo: '02-vulnerabilita-web',
  },
  {
    id: 'linux',
    titolo: 'Linux',
    icona: '🐧',
    descrizione: 'Terminale, permessi, processi e i comandi che servono davvero a chi fa security.',
    colore: 'brand',
  },
  {
    id: 'ctf',
    titolo: 'CTF',
    icona: '🚩',
    descrizione: 'Come si affronta una sfida: categorie, strumenti e il ragionamento da tenere a mente.',
    colore: 'brand',
  },
  {
    id: 'osint',
    titolo: 'OSINT & social engineering',
    icona: '🔎',
    descrizione: 'Oltre il web hacking: informazioni pubbliche, privacy e il fattore umano.',
    colore: 'hack',
  },
]

// Per ogni nota ("modulo/file"): una frase in breve e i tag. Se una nota non è qui, si vede comunque, senza tag.
export const NOTE_INFO: Record<string, { breve: string; tag: string[] }> = {
  '01-basi-rete-web/01-networking-le-basi': {
    breve: 'Il web come scambio di messaggi: porte, DNS, richiesta e risposta HTTP, status code, HTTPS.',
    tag: ['HTTP', 'DNS', 'Porte', 'HTTPS'],
  },
  '01-basi-rete-web/02-intercettiamo-un-login': {
    breve: 'Mettersi in mezzo con un proxy: Intercept, Forward, Drop e modificare una richiesta prima che arrivi.',
    tag: ['Proxy', 'Caido', 'Burp', 'HTTP'],
  },
  '02-vulnerabilita-web/01-controllo-accessi': {
    breve: '«Non protetto» non è «nascosto»: parametri modificabili, X-Original-URL, URL travestiti e IDOR.',
    tag: ['Access control', 'IDOR', 'Header'],
  },
  '02-vulnerabilita-web/02-autenticazione': {
    breve: 'Enumeration, brute-force intelligente, bypass dei limiti, 2FA, remember-me e password reset.',
    tag: ['Autenticazione', 'Brute force', '2FA', 'Password reset'],
  },
  '02-vulnerabilita-web/03-xss': {
    breve: 'Il contesto determina il payload: reflected, stored, DOM, breakout di attributi e href javascript:.',
    tag: ['XSS', 'Client-side', 'Contesto'],
  },
  '02-vulnerabilita-web/04-injection-ssrf-secrets': {
    breve: 'Source → sink: SQL e NoSQL injection, SSRF e i suoi bypass, secrets finiti nel codice.',
    tag: ['SQL injection', 'NoSQL', 'SSRF', 'Secrets'],
  },
  '02-vulnerabilita-web/05-parser-differential-ssti': {
    breve: 'Due parser che non sono d’accordo: commenti RFC 5322 e Server-Side Template Injection.',
    tag: ['SSTI', 'Parser differential', 'RCE'],
  },
  '02-vulnerabilita-web/06-jwt-kid-traversal-lfi': {
    breve: 'JWT con HS256, l’header kid usato come percorso: path traversal, LFI e token firmati da te.',
    tag: ['JWT', 'Path traversal', 'LFI'],
  },
}
