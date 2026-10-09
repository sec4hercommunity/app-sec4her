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
export const CONTATTI = [
  { nome: 'Email', testo: 'info@sec4her.it', link: 'mailto:info@sec4her.it' },
  { nome: 'Instagram', testo: '@sec4her', link: 'https://instagram.com/sec4her' },
  { nome: 'LinkedIn', testo: 'Sec4Her', link: 'https://www.linkedin.com/company/sec4her' },
  { nome: 'GitHub', testo: 'sec4hercommunity', link: 'https://github.com/sec4hercommunity' },
]
