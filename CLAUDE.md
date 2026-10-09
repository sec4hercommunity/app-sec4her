# Sec4Her

Web app di **Sec4Her**, una community sulla cybersecurity fatta da donne, per donne.
Slogan: **HACK THE FUTURE**. Tutti i testi dell'interfaccia sono in **italiano**.

Stato attuale: pagine **Accedi** (`/accedi`) e **Registrati** (`/registrati`) con validazione lato client,
**Home** riservata (`/home`) con header, menu ☰, footer e pagine segnaposto per le voci del menu.
Il login usa solo le **credenziali di test** in `src/config/credenzialiTest.js` (da sostituire con Supabase Auth).
La registrazione **non salva ancora dati**: mostra solo un messaggio di conferma. Il collegamento al database
(previsto Supabase, vedi `sec4her-architettura-sito.pdf`) verrà fatto in seguito.

## Tecnologie

- **React 19** + **Vite** (JavaScript, JSX)
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`, tema definito in `src/index.css` con `@theme`)
- **React Router** per la navigazione tra le pagine

## Struttura

```
public/logo.svg            logo usato nelle pagine (fallback testuale se manca)
src/App.jsx                rotte
src/pages/                 Accedi.jsx, Registrati.jsx
src/components/            AuthLayout, Campo (input + errore), Pulsante
src/lib/validazione.js     regole: email valida, password ≥ 8 caratteri, password uguali
```

## Colori del brand

| Uso                            | Colore    | Classe Tailwind          |
| ------------------------------ | --------- | ------------------------ |
| Sfondo (quasi nero)            | `#0B0B12` | `bg-ink`                 |
| Testo principale               | `#E2E8F0` | `text-text`              |
| Principale: pulsanti e link    | `#6D44E0` | `bg-brand` / `text-brand`|
| Linea / accento                | `#9B2C4F` | `border-crimson`         |
| Piccoli dettagli               | `#1F8A4C` | `text-hack`              |

Titoli: font **monospace in grassetto** (`font-mono font-bold`), stile terminale/hacker.
Layout moderno, centrato e responsive (deve funzionare anche da telefono).

## Comandi

```bash
npm install       # installa le dipendenze (la prima volta)
npm run dev       # avvia l'app in sviluppo → http://localhost:5173
npm run build     # build di produzione in dist/
npm run preview   # anteprima della build
npm run lint      # controllo del codice (oxlint)
```

## Regole di lavoro

- **Lavoriamo in due, ognuna sul proprio branch separato.** Mai committare direttamente su `main`.
- Ogni modifica arriva su `main` tramite **pull request**, revisionata dall'altra prima del merge.
- Branch con nomi brevi e descrittivi (es. `login`, `landing`, `note-mdx`).
- Prima di aprire una PR: `npm run build` e `npm run lint` devono passare.
- Mai mettere secrets (chiavi API, password) nel repository: usare variabili d'ambiente (`.env.local`, già ignorato da git).
