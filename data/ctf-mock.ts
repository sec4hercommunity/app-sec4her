// ⚠️ DATI FINTI per la sezione CTF Groups ⚠️
//
// Servono solo a mostrare la grafica finché non c'è un database. Le modifiche fatte nel sito
// (CTF aggiunti, gruppi creati, iscrizioni) restano solo nella memoria del browser e spariscono
// ricaricando la pagina. Con Supabase questo file verrà sostituito dalla lettura del database.
//
// Le date sono calcolate rispetto a "adesso", così ci sono sempre CTF in arrivo, in corso e conclusi.

import type { Ctf, Gruppo, Membro } from '@/lib/ctf'

const ORA = 60 * 60 * 1000
const GIORNO = 24 * ORA

// Data a partire da adesso, arrotondata all'ora: traGiorni(3, 4) = tra 3 giorni e 4 ore.
function traGiorni(giorni: number, ore = 0): string {
  const d = new Date(Date.now() + giorni * GIORNO + ore * ORA)
  d.setMinutes(0, 0, 0)
  return d.toISOString()
}

const LISTA_CTFTIME = 'https://ctftime.org/event/list/upcoming'

export const CTF_INIZIALI: Ctf[] = [
  {
    id: 'ctf-hunter',
    nome: 'CTF Hunter',
    linkCtftime: LISTA_CTFTIME,
    inizio: traGiorni(-1),
    fine: traGiorni(1, 6),
    formato: 'Jeopardy',
    livello: 'Principiante',
    descrizione: 'Web, crypto e forensics per chi è alle prime armi. Perfetto come primo CTF di gruppo.',
  },
  {
    id: 'packet-storm',
    nome: 'Packet Storm CTF',
    linkCtftime: LISTA_CTFTIME,
    inizio: traGiorni(3, 4),
    fine: traGiorni(5, 4),
    formato: 'Jeopardy',
    livello: 'Intermedio',
    descrizione: 'Tante sfide di web e reverse: occasione ideale per mettere in pratica i lab PortSwigger.',
  },
  {
    id: 'red-vs-blue',
    nome: 'Red vs Blue',
    linkCtftime: LISTA_CTFTIME,
    inizio: traGiorni(12),
    fine: traGiorni(13),
    formato: 'Attack-Defense',
    livello: 'Avanzato',
    descrizione: 'Ogni squadra difende i propri servizi e attacca quelli delle altre. Serve un team affiatato.',
  },
  {
    id: 'byte-night',
    nome: 'Byte Night',
    linkCtftime: LISTA_CTFTIME,
    inizio: traGiorni(-20),
    fine: traGiorni(-19),
    formato: 'Jeopardy',
    livello: 'Principiante',
    descrizione: 'Il nostro primo CTF insieme: 24 ore di sfide e tanta pizza.',
  },
]

function m(nome: string): Membro {
  return { nome, email: nome.toLowerCase().replace(/\s+/g, '.') + '@esempio.it' }
}

export const GRUPPI_INIZIALI: Gruppo[] = [
  // CTF Hunter (in corso): 3 gruppi, uno completo
  {
    id: 'team-root',
    ctfId: 'ctf-hunter',
    nome: 'Team Root',
    nota: 'Puntiamo alla top 50!',
    membri: [m('Giulia Rossi'), m('Sara Bianchi'), m('Martina Esposito'), m('Chiara Romano'), m('Elena Colombo')],
  },
  {
    id: 'byte-queens',
    ctfId: 'ctf-hunter',
    nome: 'Byte Queens',
    nota: 'Cerchiamo qualcuna forte in web.',
    membri: [m('Alessia Ricci'), m('Francesca Marino'), m('Valentina Greco')],
  },
  {
    id: 'null-pointers',
    ctfId: 'ctf-hunter',
    nome: 'Null Pointers',
    nota: 'Prima volta per tutte: si impara insieme.',
    membri: [m('Laura Bruno')],
  },
  // Packet Storm (in arrivo): numero massimo di gruppi raggiunto
  {
    id: 'shell-sisters',
    ctfId: 'packet-storm',
    nome: 'Shell Sisters',
    nota: 'Focus su reverse e pwn.',
    membri: [m('Giorgia Gallo'), m('Federica Conti'), m('Anna De Luca'), m('Silvia Mancini')],
  },
  {
    id: 'cyber-witches',
    ctfId: 'packet-storm',
    nome: 'Cyber Witches',
    nota: '',
    membri: [m('Ilaria Costa'), m('Noemi Giordano')],
  },
  {
    id: 'xss-squad',
    ctfId: 'packet-storm',
    nome: 'XSS Squad',
    nota: 'Solo web, tutto web.',
    membri: [m('Beatrice Rizzo'), m('Camilla Lombardi'), m('Aurora Moretti'), m('Sofia Barbieri'), m('Marta Fontana')],
  },
  {
    id: 'hex-girls',
    ctfId: 'packet-storm',
    nome: 'Hex Girls',
    nota: 'Cerchiamo qualcuna che mastichi crypto.',
    membri: [m('Elisa Santoro')],
  },
  {
    id: 'stack-smashers',
    ctfId: 'packet-storm',
    nome: 'Stack Smashers',
    nota: '',
    membri: [m('Irene Caruso'), m('Paola Ferrara'), m('Gaia Rinaldi')],
  },
  // Red vs Blue (in arrivo): un gruppo
  {
    id: 'blue-shield',
    ctfId: 'red-vs-blue',
    nome: 'Blue Shield',
    nota: 'Ci serve chi sappia difendere i servizi Linux.',
    membri: [m('Roberta Serra'), m('Claudia Leone')],
  },
  // Byte Night (concluso)
  {
    id: 'pizza-and-flags',
    ctfId: 'byte-night',
    nome: 'Pizza & Flags',
    nota: '',
    membri: [m('Giulia Rossi'), m('Alessia Ricci'), m('Laura Bruno'), m('Sara Bianchi')],
  },
]
