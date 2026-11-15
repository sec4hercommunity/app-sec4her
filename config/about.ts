// Contenuti della pagina About us (/about): le persone dietro Sec4Her.
//
// FOTO: metti l'immagine in public/team/ (es. public/team/lucrezia.jpg) e scrivi qui foto: '/team/lucrezia.jpg'.
// Meglio una foto verticale (circa 4:5), almeno 800px di larghezza. Senza "foto" si vede il segnaposto.
// L'ordine dell'elenco è l'ordine in cui compaiono nella pagina.

export type Capitolo = { quando: string; titolo: string; testo: string }

export type Persona = {
  id: string
  nome: string
  ruolo: string
  foto?: string // percorso in public/, es. '/team/lucrezia.jpg'
  frase?: string // la citazione in grande
  whoami: { chiave: string; valore: string }[] // righe della card terminale
  competenze: string[]
  capitoli: Capitolo[] // la storia in tappe, sulla linea del tempo
  biografia: string[] // testo completo, un paragrafo per elemento
  inArrivo?: boolean // true = biografia non ancora pronta
  colore: 'brand' | 'crimson' | 'hack'
}

export const TEAM_ABOUT: Persona[] = [
  {
    id: 'founder',
    nome: 'Founder',
    ruolo: 'Founder',
    inArrivo: true,
    frase: 'Hacking made simple. By women, for women.',
    whoami: [
      { chiave: 'ruolo', valore: 'Founder · Sec4Her' },
      { chiave: 'focus', valore: 'web hacking · bug bounty' },
      { chiave: 'stato', valore: 'biografia in arrivo…' },
    ],
    competenze: ['Web hacking', 'Lab PortSwigger', 'Bug bounty'],
    capitoli: [],
    biografia: [],
    colore: 'crimson',
  },
  {
    id: 'lucrezia',
    nome: 'Lucrezia',
    ruolo: 'Co-founder',
    frase: 'Non serve sapere già tutto per appartenere a questo mondo. Basta avere la curiosità di iniziare.',
    whoami: [
      { chiave: 'nome', valore: 'Lucrezia' },
      { chiave: 'ruolo', valore: 'Co-founder · Sec4Her' },
      { chiave: 'studi', valore: 'Informatica · Tor Vergata' },
      { chiave: 'stack', valore: 'Python · Linux · Web' },
      { chiave: 'webmaster', valore: 'Roma2LUG' },
      { chiave: 'progetto', valore: 'The Cyber Geek Girl' },
    ],
    competenze: ['Sviluppo software', 'Sviluppo web', 'Python', 'Linux', 'Cybersecurity', 'CTF', 'Divulgazione'],
    capitoli: [
      {
        quando: '16 anni',
        titolo: 'La prima riga di codice',
        testo: 'Visual Basic: la curiosità che diventa passione, poi nuovi linguaggi e nuove tecnologie.',
      },
      {
        quando: 'Università',
        titolo: 'Informatica a Tor Vergata',
        testo: 'Studio, apprendimento autonomo e tanta pratica per capire come funzionano davvero i sistemi.',
      },
      {
        quando: 'Ogni giorno',
        titolo: 'Python, Linux e sviluppo',
        testo: 'Software e web, con lo sguardo sempre più rivolto alla cybersecurity e alle sue sfide.',
      },
      {
        quando: 'Oggi',
        titolo: 'Webmaster di Roma2LUG',
        testo: 'Nell’associazione universitaria, in un ambiente fatto di tecnologia e condivisione.',
      },
      {
        quando: 'Online',
        titolo: 'The Cyber Geek Girl',
        testo: 'Divulgazione su Instagram e YouTube: trasformare la curiosità in conoscenza da condividere.',
      },
      {
        quando: 'Adesso',
        titolo: 'Sec4Her',
        testo: 'Una community dove ogni ragazza possa avvicinarsi alla cybersecurity, qualunque sia il suo livello.',
      },
    ],
    biografia: [
      "Sono Lucrezia, una studentessa di Informatica presso l'Università degli Studi di Roma Tor Vergata, con una forte passione per la tecnologia, la programmazione e il mondo della cybersecurity.",
      "Il mio percorso nel mondo dell'informatica è iniziato a 16 anni, quando ho scritto le prime righe di codice in Visual Basic. Quella che inizialmente era semplice curiosità si è trasformata, nel tempo, in una passione che mi ha spinta a esplorare nuovi linguaggi di programmazione, sperimentare tecnologie diverse e approfondire sempre di più il funzionamento dei sistemi informatici.",
      "Negli anni ho costruito le mie competenze attraverso lo studio universitario, l'apprendimento autonomo e la pratica. Mi occupo di sviluppo software e web, lavoro quotidianamente con Python e ambienti Linux e continuo a esplorare il mondo della cybersecurity, affascinata dalle sfide che pone e dalle infinite possibilità di apprendimento che offre.",
      "Attualmente ricopro il ruolo di Webmaster presso l'associazione universitaria Roma2LUG, un'esperienza che mi permette di mettere in pratica le mie competenze e di continuare a crescere in un ambiente orientato alla tecnologia e alla condivisione della conoscenza.",
      'Accanto al mio percorso tecnico, mi dedico anche alla divulgazione informatica attraverso Instagram e YouTube, dove creo contenuti con il mio progetto "The Cyber Geek Girl". Credo che condividere ciò che impariamo sia uno dei modi più efficaci per crescere, rendere la tecnologia più accessibile e ispirare altre persone ad avvicinarsi a questo mondo. Per me, divulgare significa trasformare la curiosità in conoscenza e la conoscenza in un\'opportunità da condividere.',
      'Credo che la tecnologia sia ancora più potente quando diventa uno spazio in cui imparare, sperimentare e crescere insieme. È anche per questo che ho scelto di contribuire alla creazione di questa community: un luogo in cui le ragazze possano avvicinarsi alla cybersecurity, mettersi alla prova con le CTF, esplorare il bug bounty e sviluppare nuove competenze, senza sentirsi limitate dal proprio livello di partenza o dalla propria esperienza.',
      'Per me, la cybersecurity è un percorso fatto di curiosità, tentativi, errori e continue scoperte. Non è necessario sapere già tutto per iniziare: servono voglia di imparare, costanza e la libertà di fare domande.',
      'Il mio obiettivo è continuare a crescere in questo settore, condividere ciò che imparo e contribuire a creare un ambiente in cui ogni ragazza possa sentirsi parte di qualcosa, trovare la propria strada nel mondo tech e scoprire fin dove può arrivare.',
      'Perché non serve sapere già tutto per appartenere a questo mondo. Basta avere la curiosità di iniziare.',
    ],
    colore: 'brand',
  },
]
