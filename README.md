<p align="center">
  <img src="public/logo-home.svg" alt="Logo Sec4Her" width="360" />
</p>

<h1 align="center">Sec4Her</h1>

<p align="center"><strong><code>&gt; HACK THE FUTURE_</code></strong></p>

**Sec4Her** è una community sulla **cybersecurity fatta da donne, per donne**: uno spazio dove imparare l'hacking
partendo da zero, con una guida, un percorso e senza mai sentirsi sole.

Questo repository contiene la **web app** di Sec4Her. Oggi l'app ha:

- le pagine **Accedi** e **Registrati**, con controlli sui campi;
- una **Home riservata** (`/home`) con header, menu ☰, presentazione dell'Academy e footer;
- una **pagina segnaposto** per ogni voce del menu.

> ⚠️ Il login funziona solo con delle **credenziali di test** e la registrazione **non salva dati**: il
> collegamento a un database per gestire davvero gli account verrà fatto più avanti.

---

## Indice

1. [Tecnologie usate](#1-tecnologie-usate)
2. [Requisiti](#2-requisiti)
3. [Come avviare il progetto in locale](#3-come-avviare-il-progetto-in-locale)
4. [Struttura delle cartelle](#4-struttura-delle-cartelle)
5. [Pagine di Accesso e Registrazione](#5-pagine-di-accesso-e-registrazione)
6. [Login di test, pagine protette ed Esci](#6-login-di-test-pagine-protette-ed-esci)
7. [La pagina Home](#7-la-pagina-home)
8. [I loghi](#8-i-loghi)
9. [Stile e colori del brand](#9-stile-e-colori-del-brand)
10. [Come testare](#10-come-testare)
11. [Come lavoriamo in due](#11-come-lavoriamo-in-due)
12. [Cronologia modifiche](#12-cronologia-modifiche)
13. [Prossimi passi](#13-prossimi-passi)

---

## 1. Tecnologie usate

| Tecnologia | Versione | A cosa serve |
| --- | --- | --- |
| [Next.js](https://nextjs.org) (App Router) | 16 | Il framework del sito: ogni cartella dentro `app/` è un indirizzo (`app/accedi/` → `/accedi`). Avvia l'app in locale, la ricarica a ogni salvataggio e crea la versione da pubblicare (su Vercel). |
| [React](https://react.dev) | 19 | Libreria per costruire l'interfaccia a "componenti" (pezzi riutilizzabili come campi, pulsanti, header). |
| [TypeScript](https://www.typescriptlang.org) | 7 | JavaScript con i **tipi**: segnala molti errori prima ancora di aprire il browser. |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Permette di dare lo stile scrivendo classi direttamente nell'HTML (es. `bg-brand`, `font-mono`). |
| [oxlint](https://oxc.rs) | 1 | Controlla il codice e segnala errori comuni (comando `npm run lint`). |

È lo **stack ufficiale** del progetto (vedi `docs/architettura.md`); più avanti si aggiungeranno Supabase, Stripe
e MDX. Il codice è scritto in **TypeScript** (file `.ts`, e `.tsx` per i componenti React). Per ora non ci sono
database: il login di test gira tutto nel browser.

---

## 2. Requisiti

Prima di iniziare installa sul computer:

- **[Git](https://git-scm.com/download/win)** – per scaricare il codice e salvare le modifiche.
- **[Node.js](https://nodejs.org)** – versione **20.9 o superiore**, richiesta da Next.js 16.
  Consigliata l'ultima versione **LTS**. Insieme a Node viene installato anche **npm**.
- **[Visual Studio Code](https://code.visualstudio.com)** *(consigliato)* – l'editor per aprire e modificare il codice.

Per controllare che sia tutto installato, apri **PowerShell** e scrivi:

```powershell
git --version
node -v
npm -v
```

Se ognuno risponde con un numero di versione, sei pronta.

---

## 3. Come avviare il progetto in locale

Tutti i comandi vanno scritti in **PowerShell** (oppure nel terminale di VS Code: menu *Terminale → Nuovo terminale*).

**1. Vai nella cartella dei progetti** (se non esiste, creala):

```powershell
New-Item -ItemType Directory -Force C:\Progetti
cd C:\Progetti
```

**2. Clona il repository** (scarica il codice da GitHub):

```powershell
git clone https://github.com/sec4hercommunity/app-sec4her.git
cd app-sec4her
```

**3. Installa le dipendenze** (solo la prima volta, o quando cambia `package.json`):

```powershell
npm install
```

Verrà creata la cartella `node_modules` con tutte le librerie necessarie.

**4. Avvia l'app:**

```powershell
npm run dev
```

**5. Apri il browser** all'indirizzo:

👉 **http://localhost:3000**

Verrai portata automaticamente alla pagina **Accedi**. Entra con le credenziali di test (vedi
[sezione 6](#6-login-di-test-pagine-protette-ed-esci)). Ogni volta che salvi un file, la pagina si aggiorna da sola.

**6. Per fermare l'app** torna nel terminale e premi **`Ctrl + C`**.

### Altri comandi disponibili

Si trovano nella sezione `scripts` di `package.json`:

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Avvia l'app in modalità sviluppo su http://localhost:3000. |
| `npm run build` | Crea la versione ottimizzata da pubblicare (cartella `.next/`) e controlla i tipi TypeScript. |
| `npm run start` | Avvia la versione creata con `build`, per controllarla prima di pubblicarla. |
| `npm run lint` | Controlla il codice con oxlint e segnala eventuali errori. |

> 💡 Vuoi provare l'app dal telefono? Con `npm run dev` nel terminale compare anche un indirizzo
> "Network" (es. `http://192.168.x.x:3000`) da aprire sul telefono collegato alla **stessa rete Wi-Fi**.

---

## 4. Struttura delle cartelle

```
app-sec4her/
├── public/                     File statici, serviti così come sono
│   ├── favicon.svg             Iconcina mostrata nella scheda del browser
│   ├── logo.svg                Logo completo originale (Accedi e Registrati)
│   ├── logo-header.svg         Logo ritagliato per l'header: solo "sec", linea cremisi e "4her"
│   └── logo-home.svg           Logo completo ritagliato, senza spazio vuoto (parte centrale della Home)
├── app/                        Le pagine: ogni cartella è un indirizzo (App Router di Next.js)
│   ├── layout.tsx              Cornice di tutto il sito: lingua, titolo, favicon, stili e stato del login
│   ├── globals.css             Importa Tailwind e definisce colori e font del brand
│   ├── page.tsx                /  → manda su /accedi
│   ├── not-found.tsx           Indirizzi che non esistono → manda su /accedi
│   ├── accedi/page.tsx         Pagina di accesso (/accedi)
│   ├── registrati/page.tsx     Pagina di registrazione (/registrati)
│   └── (riservata)/            Pagine che richiedono il login (le parentesi non finiscono nell'indirizzo)
│       ├── layout.tsx          Protezione + struttura: header, contenuto bianco, footer
│       ├── home/page.tsx       Home riservata (/home): logo grande e presentazione dell'Academy
│       └── [sezione]/page.tsx  Pagina segnaposto per ogni voce del menu (/about, /lezioni, …)
├── components/                 Pezzi riutilizzati dalle pagine
│   ├── AuthLayout.tsx          Cornice di Accedi/Registrati: logo, slogan, card centrata
│   ├── Campo.tsx               Campo di testo con etichetta e messaggio di errore
│   ├── Pulsante.tsx            Pulsante viola principale
│   ├── Logo.tsx                Mostra un logo; se l'immagine manca mostra la scritta "sec4her"
│   ├── Header.tsx              Barra in alto: logo a sinistra, menu ☰ a destra (con "Esci")
│   ├── Footer.tsx              Barra in basso: Contatti (Email · Instagram), slogan, copyright
│   └── Segnaposto.tsx          Contenuto provvisorio delle pagine del menu
├── auth/
│   ├── AuthProvider.tsx        Stato del login: accedi, esci, utente collegata
│   └── contesto.ts             Hook useAuth() per leggere lo stato del login da qualsiasi pagina
├── config/
│   ├── credenzialiTest.ts      ⚠️ Email e password di TEST (solo sviluppo)
│   └── sito.ts                 Voci del menu e contatti del footer (facili da modificare)
├── lib/
│   └── validazione.ts          Regole di controllo dei campi, testi degli errori, controllo dei redirect
├── next.config.ts              Configurazione di Next.js
├── postcss.config.mjs          Collega Tailwind a Next.js
├── tsconfig.json               Configurazione di TypeScript (es. `@/` = cartella principale negli import)
├── package.json                Nome del progetto, comandi e librerie usate
├── package-lock.json           Versioni esatte delle librerie installate (non modificarlo a mano)
├── .oxlintrc.json              Regole del controllo del codice (oxlint)
├── .gitignore                  File che Git deve ignorare (node_modules, .next, .env.local, prompt.txt, tmpapp/)
├── CLAUDE.md                   Istruzioni per Claude Code: progetto, colori, comandi, regole
├── AGENTS.md                   Note per gli assistenti AI, generate da Next.js (si ricrea con `npm run dev`)
└── docs/
    ├── architettura.md                 Architettura della piattaforma (versione Markdown del PDF)
    ├── struttura-corsi.md              Struttura del percorso formativo (versione Markdown del PDF)
    ├── sec4her-architettura-sito.pdf   Documento originale sull'architettura del sito
    └── sec4her-struttura-corsi.pdf     Documento originale sul percorso formativo
```

---

## 5. Pagine di Accesso e Registrazione

### Quali file

| File | Ruolo |
| --- | --- |
| `app/accedi/page.tsx` | Pagina **Accedi**: campi email e password. |
| `app/registrati/page.tsx` | Pagina **Registrati**: campi nome, email, password e conferma password. |
| `components/AuthLayout.tsx` | Cornice uguale per entrambe le pagine (logo, slogan con cursore lampeggiante, card). |
| `components/Campo.tsx` | Il singolo campo con etichetta e, se serve, il messaggio di errore. |
| `components/Pulsante.tsx` | Il pulsante viola ("Accedi" / "Crea account"). |
| `lib/validazione.ts` | Le regole di controllo dei campi, usate da entrambe le pagine. |

### Come si passa da Accedi a Registrati

Con Next.js gli indirizzi **sono le cartelle** dentro `app/`: non c'è un elenco di rotte da tenere aggiornato.

```
app/page.tsx              →  /            (manda su /accedi)
app/accedi/page.tsx       →  /accedi
app/registrati/page.tsx   →  /registrati
app/not-found.tsx         →  qualsiasi indirizzo che non esiste (manda su /accedi)
```

- Aprendo `/` (o un indirizzo che non esiste) si viene mandate su **`/accedi`**.
- In fondo a ogni pagina c'è un link verso l'altra, senza ricaricare la pagina:
  **"Non hai un account? Registrati"** e **"Hai già un account? Accedi"**.

### Quali controlli vengono fatti sui campi

I controlli sono in `lib/validazione.ts`. Ogni funzione restituisce il **testo dell'errore**, oppure una
stringa vuota se il campo è corretto:

```ts
export const PASSWORD_MIN = 8

export function validaPassword(password: string): string {
  if (!password) return 'Inserisci la password.'
  if (password.length < PASSWORD_MIN) return `La password deve contenere almeno ${PASSWORD_MIN} caratteri.`
  return ''
}
```

| Campo | Pagina | Controllo | Messaggio di errore |
| --- | --- | --- | --- |
| Nome | Registrati | Vuoto | *Inserisci il tuo nome.* |
| Nome | Registrati | Meno di 2 caratteri | *Il nome deve contenere almeno 2 caratteri.* |
| Email | Entrambe | Vuota | *Inserisci l'indirizzo email.* |
| Email | Entrambe | Formato non valido (es. manca `@` o il dominio) | *Inserisci un indirizzo email valido (es. nome@esempio.it).* |
| Password | Entrambe | Vuota | *Inserisci la password.* |
| Password | Entrambe | Meno di 8 caratteri | *La password deve contenere almeno 8 caratteri.* |
| Conferma password | Registrati | Vuota | *Conferma la password.* |
| Conferma password | Registrati | Diversa dalla password | *Le due password non coincidono.* |

- I controlli partono **quando si preme il pulsante**, non mentre si scrive.
- Ogni errore compare **sotto il proprio campo**, e il bordo del campo diventa cremisi.
- Appena si ricomincia a scrivere in un campo con errore, il suo messaggio **sparisce**.
- I form hanno `noValidate`: i controlli automatici del browser sono disattivati, così i messaggi sono sempre
  quelli in italiano scritti da noi.

### Cosa succede quando si clicca il pulsante

**"Accedi"**: dopo i controlli sui campi, email e password vengono confrontate con le **credenziali di test**
(sezione 6). Se coincidono si arriva su **`/home`** (o sulla pagina riservata che si era chiesta); altrimenti
sopra il form compare il riquadro cremisi **"[errore] Email o password non corretti"**.

```tsx
if (!accedi(valori.email, valori.password)) setErroreLogin('Email o password non corretti')
```

**"Crea account"**: se tutti i campi sono corretti, il form viene sostituito da una schermata di conferma
(**"[ok] Registrazione completata — Benvenuta, *Nome*!"**) con un pulsante **"Vai ad Accedi"**.

> ⚠️ **Per ora i dati NON vengono salvati**: non c'è nessun database. Dopo esserti "registrata" non puoi
> accedere con quell'account: per entrare usa le credenziali di test.

---

## 6. Login di test, pagine protette ed Esci

### Credenziali di test — ⚠️ SOLO PER SVILUPPO

| Campo | Valore |
| --- | --- |
| Email | `test@sec4her.com` |
| Password | `Test1234!` |

Si trovano in **`config/credenzialiTest.ts`**, un file separato con un avviso ben visibile:

```ts
// ⚠️  CREDENZIALI SOLO DI TEST — USARE ESCLUSIVAMENTE IN SVILUPPO  ⚠️
// ...
// Da sostituire con un vero sistema di autenticazione (Supabase Auth, Fase 2), che controlla
// email e password sul server. Quando succederà, questo file andrà eliminato.
export const CREDENZIALI_TEST = {
  email: 'test@sec4her.com',
  password: 'Test1234!',
}
```

> ⚠️ Il confronto avviene **nel browser**: chiunque apra il sito può leggere questi valori. Vanno bene solo per
> provare l'app in locale, **mai in produzione**.

Come funziona il login di test (`auth/AuthProvider.tsx`):

- L'email viene confrontata senza badare a maiuscole/minuscole e spazi; la password deve essere **identica**.
- Il login viene ricordato nella `sessionStorage` del browser: se ricarichi la pagina resti dentro, se chiudi la
  scheda dovrai rifare l'accesso.
- Se sei già dentro e apri `/accedi`, vieni riportata alla home.

### Pagine protette

`/home` e tutte le pagine del menu sono nella cartella **`app/(riservata)/`**. Il suo `layout.tsx` controlla il
login prima di mostrare qualsiasi cosa:

```tsx
useEffect(() => {
  if (utente !== null) return
  router.replace(uscitaVolontaria() ? '/accedi' : `/accedi?da=${encodeURIComponent(percorso)}`)
}, [utente, uscitaVolontaria, router, percorso])

// Finché la sessione non è letta (o se manca il login) non mostra nulla del contenuto riservato.
if (!utente) return null
```

Se provi ad aprire una di queste pagine **senza aver fatto il login**, vieni mandata su **Accedi** (es.
`/accedi?da=/eventi`); dopo il login torni automaticamente alla pagina che avevi chiesto. Il parametro `da` accetta
solo indirizzi interni al sito (`percorsoInterno` in `lib/validazione.ts`): un link come
`/accedi?da=//sito-esterno.com` porta comunque su `/home` (protezione dall'*open redirect*).

> ⚠️ Per ora la protezione è solo **nel browser**, perché anche il login di test vive lì. Con Supabase (Fase 2)
> il controllo andrà fatto **sul server**.

### Il pulsante Esci

In fondo al menu ☰ c'è **"⏻ Esci"**: cancella il login e riporta alla pagina **Accedi**. Da quel momento `/home`
non è più raggiungibile finché non si rientra.

---

## 7. La pagina Home

Ogni pagina riservata (Home e pagine del menu) ha tre parti, definite in `app/(riservata)/layout.tsx`:
**header** scuro, **parte centrale bianca**, **footer** scuro.

### Header (`Header.tsx`)

- Occupa **tutta la larghezza** dello schermo, sfondo `#0B0B12`, linea cremisi sotto, resta fisso in alto
  mentre si scorre.
- A **sinistra** il logo **`logo-header.svg`** (alto 56px su computer, 44px su telefono), cliccabile: riporta a
  `/home`.
- A **destra** l'icona **☰** che apre il menu (quando è aperto diventa **✕**).

### Il menu ☰

Le voci sono definite in **`config/sito.ts`** (per aggiungerne una basta aggiungere una riga) e ognuna porta
a una **pagina segnaposto** (`app/(riservata)/[sezione]/page.tsx`, che usa `components/Segnaposto.tsx`) con lo stesso header e footer, il titolo della sezione e la scritta
*"[in costruzione] Questa sezione arriverà presto."*

| Voce | Indirizzo |
| --- | --- |
| About us | `/about` |
| Lezioni | `/lezioni` |
| Eventi | `/eventi` |
| Meeting | `/meeting` |
| CTF Groups | `/ctf` |
| Bug Bounty Group | `/bug-bounty` |
| Contact us | `/contatti` |
| **Esci** | fa il logout e torna su `/accedi` |

Il menu si chiude: cliccando una voce, cliccando fuori dal menu, premendo di nuovo l'icona oppure premendo **Esc**.

### Parte centrale (`app/(riservata)/home/page.tsx`)

- Sfondo **bianco**, sezione centrata in verticale.
- Il **logo completo** (`logo-home.svg`, con "HACK THE FUTURE") dentro un riquadro scuro con angoli
  arrotondati e una leggera ombra.
- Accanto, il **paragrafo di presentazione** dell'Academy in grigio scuro `#1A1A24`.
- Su computer logo a sinistra e testo a destra; su telefono logo sopra e testo sotto.

Il testo è nella costante `DESCRIZIONE` in cima a `app/(riservata)/home/page.tsx`: è un **testo segnaposto**, da modificare
liberamente.

### Footer (`Footer.tsx`)

Compatto, tutto centrato, sfondo `#0B0B12` con una sottile linea cremisi in alto:

1. **`$ Contatti:`** (monospace grassetto) seguito sulla stessa riga da **✉ Email · Instagram**, in viola con
   piccola icona; al passaggio del mouse diventano più chiari. Su telefono "Contatti:" va sopra e i contatti sotto.
2. **`> HACK THE FUTURE_`** in verde.
3. **"© 2026 Sec4Her"** in piccolo.

I contatti sono nella lista `CONTATTI` in **`config/sito.ts`**. Sono **valori segnaposto**
(`info@sec4her.it`, `@sec4her`): sostituiscili con quelli reali prima di pubblicare il sito.

---

## 8. I loghi

Tutti i loghi sono in `public/` e sono file **SVG** (immagini vettoriali: restano nitide a ogni dimensione).

| File | Cosa contiene | Dove è usato |
| --- | --- | --- |
| `logo.svg` | Logo completo originale: quadrato scuro con "sec", linea, "4her", "HACK THE FUTURE" e decorazioni | Pagine **Accedi** e **Registrati** |
| `logo-header.svg` | Versione ritagliata: solo "sec", linea cremisi e "4her", senza sfondo e senza spazio vuoto | **Header** delle pagine riservate |
| `logo-home.svg` | Logo completo ritagliato intorno alla scritta (con "HACK THE FUTURE"), senza lo spazio vuoto | **Parte centrale della Home** |

Il logo originale ha molto spazio vuoto intorno alla scritta: da piccolo (nell'header) diventava illeggibile,
per questo esistono le versioni ritagliate.

Tutte le immagini passano dal componente `components/Logo.tsx`, che sceglie il file con la proprietà `src`
e, se l'immagine non si carica, mostra al suo posto la scritta **sec4her**:

```tsx
<Logo src="/logo-header.svg" className="block h-11 w-auto md:h-14" />
```

> Le scritte nei loghi usano il font **Courier New** installato sul dispositivo: su qualche telefono il carattere
> può risultare leggermente diverso (sempre monospace).

---

## 9. Stile e colori del brand

I colori sono definiti una sola volta in `app/globals.css` e si usano come classi Tailwind:

```css
@theme {
  --color-ink: #0b0b12;
  --color-text: #e2e8f0;
  --color-brand: #6d44e0;
  --color-crimson: #9b2c4f;
  --color-hack: #1f8a4c;
  --color-ink-text: #1a1a24;
}
```

| Colore | Codice | Classe Tailwind | Dove si usa |
| --- | --- | --- | --- |
| Nero (sfondo) | `#0B0B12` | `bg-ink` | Sfondo di Accedi/Registrati, header, footer, menu, riquadro del logo in Home |
| Bianco-grigio (testo) | `#E2E8F0` | `text-text` | Testo sulle parti scure: titoli, etichette, "Contatti", copyright |
| Bianco | `#FFFFFF` | `bg-white` | Parte centrale della Home e delle pagine del menu |
| Grigio scuro (testo) | `#1A1A24` | `text-ink-text` | Testo sulla parte bianca |
| Viola (principale) | `#6D44E0` | `bg-brand` / `text-brand` | Pulsanti, link, contatti del footer, titoli delle pagine segnaposto |
| Cremisi (accento) | `#9B2C4F` | `border-crimson` | Linea della card di login, sotto l'header, sopra il footer, sotto i titoli segnaposto; bordo dei campi con errore |
| Verde (dettagli) | `#1F8A4C` | `text-hack` | Slogan `> HACK THE FUTURE_`, simboli `$` e `>`, messaggi `[ok]` |

Altri dettagli:

- I **testi degli errori** usano un cremisi più chiaro (`#E0587F`), perché `#9B2C4F` sul nero si leggerebbe male.
- Al passaggio del mouse il viola dei pulsanti diventa leggermente più chiaro (`#7D58EA`); i contatti del footer
  si schiariscono.
- **Font:** titoli, etichette, pulsanti e menu usano un font **monospace in grassetto** (stile terminale):
  JetBrains Mono, Fira Code, Cascadia Code o Consolas, a seconda di cosa è installato. Il resto del testo usa il
  font di sistema.
- Nelle pagine Accedi/Registrati il **cursore** `_` dopo lo slogan lampeggia come in un terminale.

---

## 10. Come testare

Avvia l'app con `npm run dev` e apri http://localhost:3000.

**Registrazione** (http://localhost:3000/registrati)

- [ ] **Campi vuoti** – premi "Crea account" senza scrivere nulla → compaiono 4 errori, uno sotto ogni campo.
- [ ] **Nome troppo corto** – una sola lettera → *"Il nome deve contenere almeno 2 caratteri."*
- [ ] **Email non valida** – `prova`, `prova@` o `prova@sito` → *"Inserisci un indirizzo email valido…"*
- [ ] **Password corta** – `1234567` (7 caratteri) → *"La password deve contenere almeno 8 caratteri."*
- [ ] **Password diverse** – `password123` e `password124` → *"Le due password non coincidono."*
- [ ] **L'errore sparisce** – ricomincia a scrivere in un campo con errore → il messaggio scompare.
- [ ] **Registrazione corretta** – tutto compilato bene → *"Registrazione completata"* con il tuo nome.

**Login** (http://localhost:3000/accedi)

- [ ] **Campi vuoti** – premi "Accedi" → errori su email e password.
- [ ] **Credenziali sbagliate** – `prova@sec4her.com` / `Password1` → *"[errore] Email o password non corretti"*.
- [ ] **Credenziali di test** – `test@sec4her.com` / `Test1234!` → arrivi su `/home`.
- [ ] **Link** – "Registrati" e "Accedi" portano da una pagina all'altra.
- [ ] **Indirizzo sbagliato** – http://localhost:3000/pagina-che-non-esiste → vieni riportata su Accedi.

**Pagine protette ed Esci**

- [ ] **Senza login** – in una finestra in incognito apri http://localhost:3000/home → vieni portata su Accedi;
      dopo il login torni su `/home`.
- [ ] **Ricarica** – premi F5 su `/home` → resti dentro.
- [ ] **Esci** – dal menu premi "Esci" → torni su Accedi; riaprendo `/home` vieni rimandata ad Accedi.

**Home e menu**

- [ ] **Header** – logo `sec / 4her` ben leggibile a sinistra, ☰ tutto a destra; cliccando il logo torni su `/home`.
- [ ] **Parte centrale** – sfondo bianco, logo completo nel riquadro scuro a sinistra e testo a destra.
- [ ] **Menu** – clicca ☰ → 7 voci ed "Esci".
- [ ] **Chiusura del menu** – si chiude cliccando una voce, cliccando fuori, premendo ✕ o il tasto Esc.
- [ ] **Pagine segnaposto** – ogni voce apre una pagina con il suo titolo, lo stesso header e lo stesso footer.

**Footer**

- [ ] Una riga con **`$ Contatti:`** e **✉ info@sec4her.it · @sec4her** con le icone viola.
- [ ] Passando il mouse sui contatti diventano più chiari; l'email apre il programma di posta, Instagram si apre
      in una nuova scheda.
- [ ] Sotto: `> HACK THE FUTURE_` in verde e "© 2026 Sec4Her".

**Vista da telefono**

- [ ] Nel browser premi **F12**, poi l'icona del telefono (*Toggle device toolbar*, oppure `Ctrl + Shift + M`).
- [ ] Scegli un modello (es. iPhone o Pixel) e controlla:
  - Accedi e Registrati leggibili e centrate;
  - header con logo più piccolo (44px) ma leggibile, e menu ☰ che si apre senza uscire dallo schermo;
  - Home con logo sopra e testo sotto;
  - footer con "Contatti:" sopra e i contatti sotto, centrati;
  - nessuno scorrimento in orizzontale.

---

## 11. Come lavoriamo in due

Lavoriamo **ognuna sul proprio branch** e uniamo le modifiche su `main` solo tramite **pull request**.
Non si fanno commit direttamente su `main`.

**1. Scarica le ultime modifiche** prima di iniziare:

```powershell
git checkout main
git pull
```

**2. Crea un nuovo branch** con un nome breve che dica cosa farai:

```powershell
git checkout -b nome-del-branch     # es. landing, lezioni, database
```

**3. Lavora e salva le modifiche** con un commit (controlla prima che tutto funzioni):

```powershell
npm run build
npm run lint
git status                          # vedi quali file hai cambiato
git add .
git commit -m "Descrizione chiara in italiano di cosa hai fatto"
```

**4. Carica il branch su GitHub:**

```powershell
git push -u origin nome-del-branch  # la prima volta
git push                            # le volte successive
```

**5. Apri la pull request:** vai su
[github.com/sec4hercommunity/app-sec4her](https://github.com/sec4hercommunity/app-sec4her), clicca
**"Compare & pull request"**, scrivi cosa hai cambiato e come provarlo, poi **"Create pull request"**.

**6. Revisione e merge:** l'altra persona legge le modifiche, prova il branch e lascia commenti. Quando è tutto ok
clicca **"Merge pull request"**. Dopo il merge, entrambe tornano su `main` e fanno `git pull`.

> 🔒 Mai mettere password, chiavi o altri segreti nel codice: vanno in un file `.env.local`, che Git ignora già.

---

## 12. Cronologia modifiche

Branch `login`:

1. **App iniziale** – progetto React + Vite + Tailwind con i colori del brand; pagine **Accedi** e **Registrati**
   con controlli sui campi; `CLAUDE.md` con le regole del progetto.
2. **README** – prima versione con istruzioni di avvio e spiegazione della login.

Branch `home` (contiene anche tutto il lavoro di `login`):

3. **Home e login di test** – credenziali di test, pagina `/home` protetta, header con menu ☰ ed **Esci**,
   pagine segnaposto per le voci del menu, footer.
4. **Home semplificata** – logo vero al posto della scritta, header a tutta larghezza, parte centrale con logo
   grande e presentazione.
5. **Loghi ritagliati** – `logo-header.svg` leggibile nell'header e `logo-home.svg` senza spazio vuoto per la home.
6. **Footer compatto** – solo Email e Instagram con icone su una riga, slogan e copyright centrati.
7. **Titolo "Contatti"** – rimesso davanti ai contatti, sulla stessa riga.
8. **README aggiornato** – `prompt.txt` e `tmpapp/` aggiunti a `.gitignore`.
9. **Documentazione** – PDF spostati in `docs/` con la versione Markdown; `CLAUDE.md` con missione, stack,
   regole di sicurezza e piano a fasi.

Branch `migrazione-nextjs` (parte da `home`):

10. **Migrazione a Next.js + TypeScript** – da React + Vite + React Router a Next.js (App Router) + TypeScript,
    con aspetto e comportamento identici. Unica differenza: la pagina da cui si arriva su Accedi è nell'indirizzo
    (`?da=/eventi`) e accetta solo percorsi interni. Rimossi `index.html`, `vite.config.js` e `src/`.

---

## 13. Prossimi passi

- **Database vero per gli account**, ad esempio **Supabase** (quello previsto nel documento di architettura:
  database PostgreSQL con login già pronto) oppure **Firebase**: registrazione che salva davvero e login vero.
  Le password non vanno mai salvate a mano: ci pensa il servizio di autenticazione.
- **Eliminare le credenziali di test** (`config/credenzialiTest.ts`) appena il login vero funziona.
- **Contenuti reali delle pagine del menu**: About us, Lezioni, Eventi, Meeting, CTF Groups, Bug Bounty Group,
  Contact us (oggi sono segnaposto).
- **Contatti reali** nel footer (`config/sito.ts`) e **testo definitivo** della presentazione in Home.
- **Recupero password** ("Password dimenticata?"), oggi non presente.
- **Controlli lato server**: con un database, i controlli sui campi andranno ripetuti anche lì, perché quelli nel
  browser si possono aggirare.
- **Test automatici** per le regole di `validazione.ts` e per il login: oggi si prova tutto a mano.
- **Unire i branch su `main`** tramite pull request (prima `login`, poi `home`).
- **Protezione delle pagine sul server** (middleware di Next.js) quando arriva Supabase.
- Le altre parti previste nei PDF del progetto: **landing page pubblica**, **note e lezioni** in MDX,
  **membership** con Stripe e collegamento a **Discord**.
