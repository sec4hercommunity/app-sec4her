<p align="center">
  <img src="public/logo.svg" alt="Logo Sec4Her" width="180" />
</p>

<h1 align="center">Sec4Her</h1>

<p align="center"><strong><code>&gt; HACK THE FUTURE_</code></strong></p>

**Sec4Her** è una community sulla **cybersecurity fatta da donne, per donne**: uno spazio dove imparare l'hacking
partendo da zero, con una guida, un percorso e senza mai sentirsi sole.

Questo repository contiene la **web app** di Sec4Her. Per ora l'app ha le pagine **Accedi** e **Registrati**
(con controlli sui campi), una **Home** riservata con menu, e alcune pagine segnaposto. Il login funziona solo con
delle **credenziali di test**: il collegamento a un database per gestire davvero gli account verrà fatto più avanti.


---

## 1. Tecnologie usate

| Tecnologia | Versione | A cosa serve |
| --- | --- | --- |
| [React](https://react.dev) | 19 | Libreria per costruire l'interfaccia a "componenti" (pezzi riutilizzabili come campi e pulsanti). |
| [Vite](https://vite.dev) | 8 | Avvia l'app in locale in un attimo e la ricarica a ogni salvataggio; crea anche la versione finale da pubblicare. |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Permette di dare lo stile scrivendo classi direttamente nell'HTML (es. `bg-brand`, `font-mono`). |
| [React Router](https://reactrouter.com) | 7 | Gestisce gli indirizzi delle pagine (`/accedi`, `/registrati`) e il passaggio dall'una all'altra. |
| [oxlint](https://oxc.rs) | 1 | Controlla il codice e segnala errori comuni (comando `npm run lint`). |

Il codice è scritto in **JavaScript** (file `.jsx` per i componenti React).

---

## 2. Requisiti

Prima di iniziare installa sul computer:

- **[Git](https://git-scm.com/download/win)** – per scaricare il codice e salvare le modifiche.
- **[Node.js](https://nodejs.org)** – versione **20.19 o superiore** (oppure **22.12 o superiore**), richiesta da Vite 8.
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

👉 **http://localhost:5173**

Verrai portata automaticamente alla pagina **Accedi**. Ogni volta che salvi un file, la pagina si aggiorna da sola.

**6. Per fermare l'app** torna nel terminale e premi **`Ctrl + C`**.

### Altri comandi disponibili

Si trovano nella sezione `scripts` di `package.json`:

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Avvia l'app in modalità sviluppo su http://localhost:5173. |
| `npm run build` | Crea la versione ottimizzata da pubblicare, nella cartella `dist/`. |
| `npm run preview` | Mostra nel browser la versione creata con `build`, per controllarla prima di pubblicarla. |
| `npm run lint` | Controlla il codice con oxlint e segnala eventuali errori. |

> 💡 Vuoi provare l'app dal telefono? Avvia con `npm run dev -- --host`: nel terminale comparirà un indirizzo
> "Network" (es. `http://192.168.x.x:5173`) da aprire sul telefono collegato alla **stessa rete Wi-Fi**.

---

## 4. Struttura delle cartelle

```
app-sec4her/
├── public/                     File statici, serviti così come sono
│   ├── favicon.svg             Iconcina mostrata nella scheda del browser
│   └── logo.svg                Logo di Sec4Her (immagine vettoriale, nitida a ogni dimensione)
├── src/                        Tutto il codice dell'app
│   ├── main.jsx                Punto di partenza: carica gli stili e "monta" l'app nella pagina
│   ├── App.jsx                 Elenco delle pagine (rotte) e dei loro indirizzi
│   ├── index.css               Importa Tailwind e definisce colori e font del brand
│   ├── pages/                  Le pagine complete
│   │   ├── Accedi.jsx          Pagina di accesso (/accedi)
│   │   ├── Registrati.jsx      Pagina di registrazione (/registrati)
│   │   ├── Home.jsx            Home riservata (/home): logo grande e presentazione dell'Academy
│   │   └── Segnaposto.jsx      Pagina provvisoria usata per tutte le voci del menu
│   ├── components/             Pezzi riutilizzati dalle pagine
│   │   ├── AuthLayout.jsx      Cornice di Accedi/Registrati: logo, slogan, card centrata
│   │   ├── Campo.jsx           Campo di testo con etichetta e messaggio di errore
│   │   ├── Pulsante.jsx        Pulsante viola principale
│   │   ├── Logo.jsx            Logo (public/logo.svg) con scritta "sec4her" se l'immagine manca
│   │   ├── LayoutSito.jsx      Struttura delle pagine riservate: header + contenuto bianco + footer
│   │   ├── Header.jsx          Barra in alto: logo e menu ☰ con il pulsante "Esci"
│   │   ├── Footer.jsx          Barra in basso: contatti e copyright
│   │   └── RottaProtetta.jsx   Blocca le pagine riservate a chi non ha fatto il login
│   ├── auth/
│   │   ├── AuthProvider.jsx    Stato del login: accedi, esci, utente collegata
│   │   └── contesto.js         Hook useAuth() per leggere lo stato del login da qualsiasi pagina
│   ├── config/
│   │   ├── credenzialiTest.js  ⚠️ Email e password di TEST (solo sviluppo)
│   │   └── sito.js             Voci del menu e contatti del footer (facili da modificare)
│   └── lib/
│       └── validazione.js      Regole di controllo dei campi e testi degli errori
├── index.html                  Pagina HTML di base (lingua, titolo, favicon)
├── vite.config.js              Configurazione di Vite (plugin React e Tailwind)
├── package.json                Nome del progetto, comandi e librerie usate
├── package-lock.json           Versioni esatte delle librerie installate (non modificarlo a mano)
├── .oxlintrc.json              Regole del controllo del codice (oxlint)
├── .gitignore                  File che Git deve ignorare (node_modules, dist, ecc.)
├── CLAUDE.md                   Istruzioni per Claude Code: progetto, colori, comandi, regole
├── prompt.txt                  Istruzioni date a Claude Code per generare il progetto
├── sec4her-architettura-sito.pdf   Documento sull'architettura prevista del sito
└── sec4her-struttura-corsi.pdf     Documento sul percorso formativo
```

---

## 5. Pagine di Accesso e Registrazione

### Quali file

| File | Ruolo |
| --- | --- |
| `src/pages/Accedi.jsx` | Pagina **Accedi**: campi email e password. |
| `src/pages/Registrati.jsx` | Pagina **Registrati**: campi nome, email, password e conferma password. |
| `src/components/AuthLayout.jsx` | Cornice uguale per entrambe le pagine (logo, slogan, card). |
| `src/components/Campo.jsx` | Il singolo campo con etichetta e, se serve, il messaggio di errore in rosso. |
| `src/components/Pulsante.jsx` | Il pulsante viola ("Accedi" / "Crea account"). |
| `src/lib/validazione.js` | Le regole di controllo dei campi, usate da entrambe le pagine. |

### Come si passa da Accedi a Registrati

Gli indirizzi sono definiti in `src/App.jsx` con **React Router**:

```jsx
<Route path="/" element={<Navigate to="/accedi" replace />} />
<Route path="/accedi" element={<Accedi />} />
<Route path="/registrati" element={<Registrati />} />
<Route path="*" element={<Navigate to="/accedi" replace />} />
```

- Aprendo `/` (o un indirizzo che non esiste) si viene mandate su **`/accedi`**.
- In fondo a ogni pagina c'è un link che porta all'altra, senza ricaricare la pagina:

```jsx
Non hai un account?{' '}
<Link to="/registrati">Registrati</Link>
```

Nella pagina Registrati c'è il link opposto: **"Hai già un account? Accedi"**.

### Quali controlli vengono fatti sui campi

I controlli sono in `src/lib/validazione.js`. Ogni funzione restituisce il **testo dell'errore**, oppure una
stringa vuota se il campo è corretto:

```js
export const PASSWORD_MIN = 8

export function validaPassword(password) {
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

Come funziona per chi usa la pagina:

- I controlli partono **quando si preme il pulsante**, non mentre si scrive.
- Ogni errore compare **sotto il proprio campo**, e il bordo del campo diventa cremisi.
- Appena si ricomincia a scrivere in un campo con errore, il suo messaggio **sparisce**.
- I form hanno `noValidate`: i controlli automatici del browser sono disattivati, così i messaggi sono sempre
  quelli in italiano scritti da noi.

### Cosa succede quando si clicca il pulsante

**"Accedi"** (`Accedi.jsx`): prima vengono fatti i controlli sui campi. Se sono superati, email e password
vengono confrontate con le **credenziali di test** (vedi sezione 6):

- se coincidono → si entra e si arriva alla pagina **`/home`**;
- se non coincidono → sopra il form compare il riquadro cremisi **"[errore] Email o password non corretti"**.

```jsx
if (accedi(valori.email, valori.password)) navigate(destinazione, { replace: true })
else setErroreLogin('Email o password non corretti')
```

**"Crea account"** (`Registrati.jsx`): se tutti i campi sono corretti, il form viene sostituito da una schermata
di conferma con il nome inserito e un pulsante **"Vai ad Accedi"**:

```jsx
// Per ora nessun salvataggio: il collegamento al database arriverà dopo.
setRegistrata(valori.nome.trim())
setValori(VUOTO)
```

> **[ok] Registrazione completata**
> Benvenuta, *Nome*! Il tuo account è stato creato. (Per ora è una demo: i dati non vengono ancora salvati.)

### ⚠️ Per ora i dati NON vengono salvati

Non c'è **nessun database collegato**. I dati inseriti restano solo nella pagina e si perdono
ricaricandola: dopo esserti "registrata" non puoi accedere con quell'account. Per entrare usa le
credenziali di test.

---

## 6. Home, menu e credenziali di test

### Credenziali di test (solo per sviluppo)

| Campo | Valore |
| --- | --- |
| Email | `test@sec4her.com` |
| Password | `Test1234!` |

Si trovano in **`src/config/credenzialiTest.js`**, un file separato con un avviso ben visibile:

```js
// ⚠️  CREDENZIALI SOLO DI TEST — USARE ESCLUSIVAMENTE IN SVILUPPO  ⚠️
// ...
// Da sostituire con un vero sistema di autenticazione (es. Supabase Auth), che controlla
// email e password sul server. Quando succederà, questo file andrà eliminato.
export const CREDENZIALI_TEST = {
  email: 'test@sec4her.com',
  password: 'Test1234!',
}
```

> ⚠️ Il confronto avviene **nel browser**: chiunque apra il sito può leggere questi valori. Vanno bene solo per
> provare l'app in locale, **mai in produzione**.

Come funziona il login di test (`src/auth/AuthProvider.jsx`):

- L'email viene confrontata senza badare a maiuscole/minuscole e spazi; la password deve essere **identica**.
- Il login viene ricordato nella `sessionStorage` del browser: se ricarichi la pagina resti dentro, se chiudi la
  scheda dovrai rifare l'accesso.
- Se sei già dentro e apri `/accedi`, vieni riportata direttamente alla home.

### Pagine protette

Tutte le pagine dopo il login (`/home` e le pagine del menu) sono dentro `RottaProtetta` in `src/App.jsx`:

```jsx
<Route element={<RottaProtetta />}>
  <Route element={<LayoutSito />}>
    <Route path="/home" element={<Home />} />
    {/* ...una pagina segnaposto per ogni voce del menu */}
  </Route>
</Route>
```

Se provi ad aprire una di queste pagine **senza aver fatto il login**, vieni mandata su **Accedi**. Dopo il login
torni automaticamente alla pagina che avevi chiesto.

### La pagina Home (`/home`)

Ogni pagina riservata ha tre parti (`src/components/LayoutSito.jsx`):

1. **Header** scuro (`Header.jsx`) a tutta larghezza, con una linea cremisi sotto:
   - a sinistra l'immagine del **logo** (alta 48px), cliccabile, che riporta a `/home`;
   - a destra, a circa 24px dal bordo, l'icona **☰** che apre il menu.
2. **Parte centrale bianca** (`Home.jsx`), centrata in verticale:
   - il **logo grande** dentro un riquadro scuro (`#0B0B12`) con angoli arrotondati e una leggera ombra;
   - accanto, il **paragrafo di presentazione** dell'Academy in grigio scuro (`#1A1A24`).
   - Su computer il logo è a sinistra e il testo a destra; su telefono il logo è sopra e il testo sotto.
3. **Footer** scuro (`Footer.jsx`): logo, slogan, sezione **Contatti** (email, Instagram, LinkedIn, GitHub) e
   **"© 2026 Sec4Her – Hack the Future"**.

Il testo della presentazione è in cima a `src/pages/Home.jsx`, nella costante `DESCRIZIONE`: è un **testo
segnaposto**, da modificare liberamente.

### Il menu ☰

Le voci sono definite in **`src/config/sito.js`** (per aggiungerne una basta aggiungere una riga):

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

Il menu si chiude: cliccando una voce, cliccando fuori dal menu, premendo di nuovo l'icona (che quando il menu è
aperto diventa **✕**) oppure premendo **Esc**.

Per ora ogni voce porta a una **pagina segnaposto** (`Segnaposto.jsx`) con lo stesso header e footer, il titolo
della sezione e la scritta *"[in costruzione] Questa sezione arriverà presto."*

### Contatti del footer

Anche i contatti sono in **`src/config/sito.js`**, nella lista `CONTATTI`. Sono **valori segnaposto**
(es. `info@sec4her.it`, `@sec4her`): sostituiscili con quelli reali prima di pubblicare il sito.

---

## 7. Stile e colori del brand

I colori sono definiti una sola volta in `src/index.css` e si usano come classi Tailwind:

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
| Nero (sfondo) | `#0B0B12` | `bg-ink` | Sfondo di Accedi/Registrati, header, footer, menu |
| Bianco-grigio (testo) | `#E2E8F0` | `text-text` | Testo sulle parti scure: titoli, etichette, footer |
| Bianco | `#FFFFFF` | `bg-white` | Parte centrale della home e delle pagine del menu |
| Grigio scuro (testo) | `#1A1A24` | `text-ink-text` | Testo sulla parte bianca |
| Viola (principale) | `#6D44E0` | `bg-brand` / `text-brand` | Pulsanti, link, titoli delle pagine segnaposto, il "4" del logo testuale |
| Cremisi (accento) | `#9B2C4F` | `border-crimson` | Linea della card di login, sotto l'header, sopra il footer, sotto i titoli delle pagine segnaposto; errori |
| Verde (dettagli) | `#1F8A4C` | `text-hack` | Slogan `> HACK THE FUTURE_`, simboli `$` e `>` nei titoli e nel menu, messaggi `[ok]` |

Altri dettagli:

- I **testi degli errori** usano un cremisi più chiaro (`#E0587F`), perché `#9B2C4F` sul nero si leggerebbe male.
- Al passaggio del mouse il viola dei pulsanti diventa leggermente più chiaro (`#7D58EA`).
- **Font:** i titoli, le etichette e i pulsanti usano un font **monospace in grassetto** (stile terminale):
  JetBrains Mono, Fira Code, Cascadia Code o Consolas, a seconda di cosa è installato sul computer.
  Il resto del testo usa il font di sistema.
- Il **cursore** `_` dopo lo slogan lampeggia come in un terminale.
- Il layout è **centrato** e si adatta al telefono: nella home logo e testo sono affiancati su computer e uno
  sopra l'altro su telefono; l'header resta fisso in alto mentre si scorre.

---

## 8. Come testare la login

Avvia l'app con `npm run dev` e prova questi casi:

**Pagina Registrati** (http://localhost:5173/registrati)

- [ ] **Campi vuoti** – premi "Crea account" senza scrivere nulla → compaiono 4 errori, uno sotto ogni campo.
- [ ] **Nome troppo corto** – scrivi una sola lettera → *"Il nome deve contenere almeno 2 caratteri."*
- [ ] **Email non valida** – scrivi `prova`, `prova@` o `prova@sito` → *"Inserisci un indirizzo email valido…"*
- [ ] **Password corta** – scrivi `1234567` (7 caratteri) → *"La password deve contenere almeno 8 caratteri."*
- [ ] **Password diverse** – password `password123`, conferma `password124` → *"Le due password non coincidono."*
- [ ] **L'errore sparisce** – dopo un errore, ricomincia a scrivere in quel campo → il messaggio scompare.
- [ ] **Registrazione corretta** – compila tutto bene → compare *"Registrazione completata"* con il tuo nome.
- [ ] **Torna ad Accedi** – premi "Vai ad Accedi" → arrivi alla pagina Accedi.

**Pagina Accedi** (http://localhost:5173/accedi)

- [ ] **Campi vuoti** – premi "Accedi" → errori su email e password.
- [ ] **Credenziali sbagliate** – email `prova@sec4her.com`, password `Password1` → riquadro
      *"[errore] Email o password non corretti"*.
- [ ] **Credenziali di test** – email `test@sec4her.com`, password `Test1234!` → arrivi su `/home`.
- [ ] **Link** – "Registrati" porta alla registrazione; "Accedi" nella registrazione riporta qui.
- [ ] **Indirizzo sbagliato** – apri http://localhost:5173/pagina-che-non-esiste → vieni riportata su Accedi.

**Home e menu** (dopo il login)

- [ ] **Pagina protetta** – in una finestra in incognito apri http://localhost:5173/home → vieni portata su Accedi;
      dopo il login torni su `/home`.
- [ ] **Logo** – clicca il logo in alto a sinistra → torni su `/home`.
- [ ] **Menu** – clicca ☰ → si apre il menu con le 7 voci ed "Esci".
- [ ] **Chiusura del menu** – il menu si chiude cliccando una voce, cliccando fuori, premendo ✕ o il tasto Esc.
- [ ] **Pagine segnaposto** – ogni voce apre una pagina con il suo titolo e lo stesso header e footer.
- [ ] **Home** – su computer il logo grande (nel riquadro scuro) è a sinistra e il testo a destra.
- [ ] **Ricarica** – premi F5 su `/home` → resti dentro.
- [ ] **Esci** – dal menu premi "Esci" → torni su Accedi; riaprendo `/home` vieni rimandata ad Accedi.

**Vista da telefono**

- [ ] Nel browser premi **F12** per aprire gli strumenti per sviluppatori.
- [ ] Clicca l'icona del telefono/tablet (*Toggle device toolbar*, oppure `Ctrl + Shift + M`).
- [ ] Scegli un modello (es. iPhone o Pixel) e controlla Accedi, Registrati e Home: tutto leggibile, nella home
      logo sopra e testo sotto, menu ☰ che si apre senza uscire dallo schermo e nessuno scorrimento in orizzontale.

---

## 9. Come lavoriamo in due

Lavoriamo **ognuna sul proprio branch** e uniamo le modifiche su `main` solo tramite **pull request**.
Non si fanno commit direttamente su `main`.

**1. Scarica le ultime modifiche** prima di iniziare:

```powershell
git checkout main
git pull
```

**2. Crea un nuovo branch** con un nome breve che dica cosa farai:

```powershell
git checkout -b nome-del-branch     # es. landing, logo, database
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

## 10. Prossimi passi

- **Collegare un database per salvare davvero gli account**, ad esempio **Supabase** (quello previsto nel
  documento di architettura: database PostgreSQL con login già pronto) oppure **Firebase**. Le password non vanno
  mai salvate a mano: ci pensa il servizio di autenticazione.
- **Sostituire le credenziali di test con un login vero** (es. Supabase Auth) ed eliminare
  `src/config/credenzialiTest.js`.
- **Riempire le pagine del menu** (About us, Lezioni, Eventi, Meeting, CTF Groups, Bug Bounty Group, Contact us),
  oggi segnaposto, e sostituire i testi e i **contatti segnaposto** di home e footer con quelli reali.
- **Recupero password** ("Password dimenticata?"), oggi non presente.
- **Controlli lato server**: quando ci sarà un database, i controlli sui campi andranno ripetuti anche lì,
  perché quelli nel browser si possono aggirare.
- **Test automatici** per le regole di `validazione.js`: oggi i controlli si provano solo a mano.
- Le altre parti previste nei PDF del progetto: **landing page**, **note e lezioni** in MDX,
  **membership** con Stripe e collegamento a **Discord**.
