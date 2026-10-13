// ⚠️  CREDENZIALI SOLO DI TEST — USARE ESCLUSIVAMENTE IN SVILUPPO  ⚠️
//
// Questo file esiste solo per poter provare il login e la pagina /home finché non c'è un database.
// Il confronto avviene nel browser, quindi chiunque apra il sito può leggere questi valori:
// NON usarle mai in produzione e NON metterci password vere.
//
// Da sostituire con un vero sistema di autenticazione (Supabase Auth, Fase 2), che controlla
// email e password sul server. Quando succederà, questo file andrà eliminato.

export const CREDENZIALI_TEST = {
  email: 'test@sec4her.com',
  password: 'Test1234!',
}

// Profilo dell'utente di test (usato per precompilare i moduli, es. l'iscrizione agli eventi).
export const PROFILO_TEST = {
  nome: 'Test',
  cognome: 'Sec4Her',
}
