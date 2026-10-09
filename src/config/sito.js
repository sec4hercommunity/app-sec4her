// Contenuti del sito facili da modificare: voci del menu e contatti del footer.

// Voci del menu (header). Ogni voce ha una pagina segnaposto con lo stesso titolo.
export const VOCI_MENU = [
  { titolo: 'About us', percorso: '/about' },
  { titolo: 'Lezioni', percorso: '/lezioni' },
  { titolo: 'Eventi', percorso: '/eventi' },
  { titolo: 'Meeting', percorso: '/meeting' },
  { titolo: 'CTF Groups', percorso: '/ctf' },
  { titolo: 'Bug Bounty Group', percorso: '/bug-bounty' },
  { titolo: 'Contact us', percorso: '/contatti' },
]

// Contatti del footer: valori SEGNAPOSTO, da sostituire con quelli reali.
// "icona" sceglie il disegno mostrato prima del testo (vedi Footer.jsx).
export const CONTATTI = [
  { nome: 'Email', icona: 'email', testo: 'info@sec4her.it', link: 'mailto:info@sec4her.it' },
  { nome: 'Instagram', icona: 'instagram', testo: '@sec4her', link: 'https://instagram.com/sec4her' },
]
