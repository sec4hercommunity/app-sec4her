# Sec4Her

Web app di **Sec4Her**, una community sulla cybersecurity fatta da donne, per donne.
Slogan: **HACK THE FUTURE**. Tutti i testi dell'interfaccia sono in **italiano**.

## Missione

> **Hacking made simple. By women, for women.**

"Made simple" non vuol dire facile: vuol dire reso accessibile, con una guida, un sistema e uno spazio
dove condividere. Nessuna deve più imparare da sola. Il sito è **la porta e la scuola**
(brand + note/lezioni + membership); la community vive su **Discord**.

## Fase attuale: **Fase 1 – Fondamenta sito**

| Fase       | Obiettivo       | Deliverable                                                     |
| ---------- | --------------- | --------------------------------------------------------------- |
| 0 · subito | Community viva  | Server Discord strutturato (canali, ruoli, onboarding)          |
| **1** ⬅    | Fondamenta sito | Landing + brand + 2-3 note pubbliche (MDX) online su Vercel     |
| 2          | Account         | Supabase Auth + note gated per utenti registrati                |
| 3          | Monetizzazione  | Stripe subscription + webhook → membership + auto-ruolo Discord |
| 4          | Rifinitura      | Pagina eventi, polish UI, note che crescono, pentest finale     |

## Stack ufficiale

**Next.js (App Router) + TypeScript + Tailwind CSS + Supabase + Stripe + MDX + Vercel**
(community su Discord + bot). Dettagli in `docs/architettura.md`.

Già in uso: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4** (tema in `app/globals.css` con `@theme`).
Prima di scrivere codice Next.js leggi `AGENTS.md`: questa versione può differire da quella che conosci.

Stato attuale: pagine Accedi (`/accedi`), Registrati (`/registrati`), Home riservata (`/home`) e pagine
segnaposto del menu (`app/(riservata)/[sezione]`). Il login usa solo le credenziali di test in
`config/credenzialiTest.ts`, con protezione solo lato browser (`app/(riservata)/layout.tsx`); la registrazione
non salva dati. Entrambe le cose verranno sostituite da Supabase nella Fase 2.

Sezione **CTF Groups** (`/ctf`, `/ctf/[id]`): solo grafica, dati finti in `data/ctf-mock.ts` gestiti con lo stato
React in `components/ctf/CtfProvider.tsx`; limiti in `config/ctf.ts`. Con Supabase si sostituiscono quei due file.

```
app/          pagine (App Router); app/(riservata)/ = pagine che richiedono il login
components/   AuthLayout, Campo, Pulsante, Header, Footer, Logo, Segnaposto; ctf/ per CTF Groups
auth/         AuthProvider + useAuth()
config/       credenzialiTest.ts, sito.ts (voci menu e contatti), ctf.ts (limiti CTF Groups)
data/         ctf-mock.ts (dati finti, da sostituire con Supabase)
lib/          validazione.ts (regole dei campi, percorsoInterno contro gli open redirect)
public/       loghi SVG
```

## Sicurezza — priorità assoluta

Siamo un brand di cybersecurity: un breach sarebbe fatale per la credibilità.

- **Mai gestire password a mano** → usare Supabase Auth (hashing e sessioni gestite).
- **Mai toccare dati carta** → Stripe Checkout.
- **Secrets solo in variabili d'ambiente** (`.env.local`, già ignorato da git), **mai su GitHub**.
- **Row Level Security** su Supabase: ogni utente vede solo i propri dati.
- **Validazione input lato server** su ogni endpoint (quella lato client non basta).
- **Webhook Stripe firmati e verificati** (niente spoofing dello stato membership).
- HTTPS ovunque; pentest interno prima del lancio.

## Colori del brand

| Uso                            | Colore    | Classe Tailwind           |
| ------------------------------ | --------- | ------------------------- |
| Sfondo (quasi nero)            | `#0B0B12` | `bg-ink`                  |
| Testo principale               | `#E2E8F0` | `text-text`               |
| Principale: pulsanti e link    | `#6D44E0` | `bg-brand` / `text-brand` |
| Linea / accento                | `#9B2C4F` | `border-crimson`          |
| Piccoli dettagli               | `#1F8A4C` | `text-hack`               |

Titoli: font **monospace in grassetto** (`font-mono font-bold`), stile terminale/hacker.
Layout moderno, centrato e responsive (deve funzionare anche da telefono).

## Comandi

```bash
npm install       # installa le dipendenze (la prima volta)
npm run dev       # avvia l'app in sviluppo → http://localhost:3000
npm run build     # build di produzione in .next/ (controlla anche i tipi TypeScript)
npm run start     # avvia la build di produzione
npm run lint      # controllo del codice (oxlint)
```

## Regole di lavoro

- **Un modulo alla volta**: si finisce e si **testa** un modulo prima di passare al successivo.
- **Commit e push alla fine di ogni attività.**
- Lavoriamo in due, ognuna sul proprio branch separato. Mai committare direttamente su `main`.
- Ogni modifica arriva su `main` tramite **pull request**, revisionata dall'altra prima del merge.
- Branch con nomi brevi e descrittivi (es. `login`, `landing`, `note-mdx`).
- Prima di aprire una PR: `npm run build` e `npm run lint` devono passare.

## Documenti di riferimento (`docs/`)

Leggerli quando serve, invece di indovinare:

- `docs/architettura.md` — principio guida, flusso utente, stack, data model, sicurezza, fasi, costi.
- `docs/struttura-corsi.md` — filosofia, percorso formativo (moduli 1-7), modello di sessione, formato dei contenuti.
- I PDF originali sono nella stessa cartella.
