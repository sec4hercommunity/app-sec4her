<p align="center">
  <img src="public/logo.png" alt="Logo Sec4Her" width="180" />
</p>

<h1 align="center">Sec4Her</h1>

<p align="center"><strong><code>&gt; HACK THE FUTURE_</code></strong></p>

**Sec4Her** è una community sulla **cybersecurity fatta da donne, per donne**: uno spazio dove imparare l'hacking
partendo da zero, con una guida, un percorso e senza mai sentirsi sole.

Questo repository contiene la **web app** di Sec4Her. Per ora l'app ha due pagine: **Accedi** e **Registrati**,
con controlli sui campi. Il collegamento a un database per salvare davvero gli account verrà fatto più avanti.

> ℹ️ Il file `public/logo.png` non è ancora presente nel repository: finché non viene aggiunto, l'immagine qui
> sopra non si vede e nell'app compare al suo posto la scritta **sec4her**.

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
│   └── favicon.svg             Iconcina mostrata nella scheda del browser
│                               (qui andrà anche logo.png, ancora da aggiungere)
├── src/                        Tutto il codice dell'app
│   ├── main.jsx                Punto di partenza: carica gli stili e "monta" l'app nella pagina
│   ├── App.jsx                 Elenco delle pagine (rotte) e dei loro indirizzi
│   ├── index.css               Importa Tailwind e definisce colori e font del brand
│   ├── pages/                  Le pagine complete
│   │   ├── Accedi.jsx          Pagina di accesso (/accedi)
│   │   └── Registrati.jsx      Pagina di registrazione (/registrati)
│   ├── components/             Pezzi riutilizzati dalle pagine
│   │   ├── AuthLayout.jsx      Cornice comune: logo, slogan, card centrata con il titolo
│   │   ├── Campo.jsx           Campo di testo con etichetta e messaggio di errore
│   │   └── Pulsante.jsx        Pulsante viola principale
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

**"Accedi"** (`Accedi.jsx`): se email e password sono corrette, sopra il form compare un riquadro verde:

> **[ok]** Dati validi. L'accesso sarà attivo appena collegheremo il database.

Non viene fatto nessun accesso vero: non esiste ancora un elenco di utenti con cui confrontare i dati.

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
ricaricandola: dopo esserti "registrata" non puoi davvero accedere con quell'account.

---

## 6. Stile e colori del brand

I colori sono definiti una sola volta in `src/index.css` e si usano come classi Tailwind:

```css
@theme {
  --color-ink: #0b0b12;
  --color-text: #e2e8f0;
  --color-brand: #6d44e0;
  --color-crimson: #9b2c4f;
  --color-hack: #1f8a4c;
}
```

| Colore | Codice | Classe Tailwind | Dove si usa |
| --- | --- | --- | --- |
| Nero (sfondo) | `#0B0B12` | `bg-ink` | Sfondo della pagina e dei campi di testo |
| Bianco-grigio (testo) | `#E2E8F0` | `text-text` | Testo principale, titoli, etichette |
| Viola (principale) | `#6D44E0` | `bg-brand` / `text-brand` | Pulsanti, link, bordo dei campi selezionati, il "4" del logo testuale |
| Cremisi (accento) | `#9B2C4F` | `border-crimson` | Linea in cima alla card, bordo dei campi con errore |
| Verde (dettagli) | `#1F8A4C` | `text-hack` | Slogan `> HACK THE FUTURE_`, simbolo `$` nei titoli, messaggi di conferma `[ok]` |

Altri dettagli:

- I **testi degli errori** usano un cremisi più chiaro (`#E0587F`), perché `#9B2C4F` sul nero si leggerebbe male.
- Al passaggio del mouse il viola dei pulsanti diventa leggermente più chiaro (`#7D58EA`).
- **Font:** i titoli, le etichette e i pulsanti usano un font **monospace in grassetto** (stile terminale):
  JetBrains Mono, Fira Code, Cascadia Code o Consolas, a seconda di cosa è installato sul computer.
  Il resto del testo usa il font di sistema.
- Il **cursore** `_` dopo lo slogan lampeggia come in un terminale.
- Il layout è **centrato** e si adatta al telefono (larghezza massima della card circa 450px).

---

## 7. Come testare la login

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
- [ ] **Dati corretti** – email valida e password di almeno 8 caratteri → riquadro verde *"[ok] Dati validi…"*.
- [ ] **Link** – "Registrati" porta alla registrazione; "Accedi" nella registrazione riporta qui.
- [ ] **Indirizzo sbagliato** – apri http://localhost:5173/pagina-che-non-esiste → vieni riportata su Accedi.

**Vista da telefono**

- [ ] Nel browser premi **F12** per aprire gli strumenti per sviluppatori.
- [ ] Clicca l'icona del telefono/tablet (*Toggle device toolbar*, oppure `Ctrl + Shift + M`).
- [ ] Scegli un modello (es. iPhone o Pixel) e controlla che la card sia centrata, leggibile e che non serva
      scorrere in orizzontale.

---

## 8. Come lavoriamo in due

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

## 9. Prossimi passi

- **Collegare un database per salvare davvero gli account**, ad esempio **Supabase** (quello previsto nel
  documento di architettura: database PostgreSQL con login già pronto) oppure **Firebase**. Le password non vanno
  mai salvate a mano: ci pensa il servizio di autenticazione.
- **Far funzionare davvero "Accedi"**: oggi mostra solo il messaggio "Dati validi"; andrà collegato al login del
  database, con errori come *"Email o password non corrette"*.
- **Aggiungere `public/logo.png`**: il codice lo cerca già, ma il file non è ancora nel repository.
- **Pagina dopo l'accesso** (es. area personale) e pulsante per uscire (logout): oggi non esistono.
- **Recupero password** ("Password dimenticata?"), oggi non presente.
- **Controlli lato server**: quando ci sarà un database, i controlli sui campi andranno ripetuti anche lì,
  perché quelli nel browser si possono aggirare.
- **Test automatici** per le regole di `validazione.js`: oggi i controlli si provano solo a mano.
- Le altre parti previste nei PDF del progetto: **landing page**, **note e lezioni** in MDX,
  **membership** con Stripe e collegamento a **Discord**.
