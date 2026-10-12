// Regole di validazione condivise tra le pagine di accesso e registrazione.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const PASSWORD_MIN = 8

export function validaEmail(email) {
  if (!email.trim()) return "Inserisci l'indirizzo email."
  if (!EMAIL_REGEX.test(email.trim())) return 'Inserisci un indirizzo email valido (es. nome@esempio.it).'
  return ''
}

export function validaPassword(password) {
  if (!password) return 'Inserisci la password.'
  if (password.length < PASSWORD_MIN) return `La password deve contenere almeno ${PASSWORD_MIN} caratteri.`
  return ''
}

export function validaConferma(password, conferma) {
  if (!conferma) return 'Conferma la password.'
  if (password !== conferma) return 'Le due password non coincidono.'
  return ''
}

export function validaNome(nome) {
  if (!nome.trim()) return 'Inserisci il tuo nome.'
  if (nome.trim().length < 2) return 'Il nome deve contenere almeno 2 caratteri.'
  return ''
}
