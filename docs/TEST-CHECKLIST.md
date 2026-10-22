# Sec4Her — Checklist dei test manuali

Test da fare **nel browser**, in ordine, sezione per sezione. Per ogni test: fai i passi, controlla il risultato
atteso e spunta la casella (`[ ]` → `[x]`). Se qualcosa non va, scrivilo nella tabella **Bug trovati** in fondo.

**Prima di iniziare**

1. Nel terminale: `npm install` (la prima volta) e poi `npm run dev`.
2. Apri **http://localhost:3000** con Chrome (o Edge / Firefox).
3. Credenziali di test: **`test@sec4her.com`** / **`Test1234!`**
4. **Vista da telefono:** premi **F12** → icona del telefono (in alto a sinistra negli strumenti, oppure
   `Ctrl+Shift+M`) → scegli "iPhone 12 Pro" o simile (390 px). Per tornare al computer, ripremi l'icona.

> ⚠️ Oggi non c'è un database: **ricaricando la pagina** XP, lezioni completate, iscrizioni e gruppi tornano come
> all'inizio. Il login invece resta finché non chiudi la scheda. Spostati con i **link del sito**, non con F5,
> quando un test dice "resta salvato".

---

## 1. Accesso e registrazione

### 1.1 Indirizzi di partenza

- [ ] **Radice** — Apri `http://localhost:3000/`. → Vieni mandata su **`/accedi`**.
- [ ] **Indirizzo inesistente** — Apri `/pagina-che-non-esiste`. → Vieni mandata su **`/accedi`**.
- [ ] **Pagina protetta senza login** — In una finestra nuova (non loggata) apri `/eventi`. → Arrivi su
      `/accedi?da=%2Feventi` (o `?da=/eventi`).

### 1.2 Accedi — errori

- [ ] **Campi vuoti** — Su `/accedi` premi **Accedi** senza scrivere nulla. → Sotto i campi: *"Inserisci l'indirizzo
      email."* e *"Inserisci la password."*, bordi cremisi.
- [ ] **Email non valida** — Scrivi `pippo` e una password qualsiasi. → *"Inserisci un indirizzo email valido (es.
      nome@esempio.it)."*
- [ ] **Password corta** — Email valida, password `123`. → *"La password deve contenere almeno 8 caratteri."*
- [ ] **L'errore sparisce scrivendo** — Con un errore visibile, ricomincia a scrivere nel campo. → Il messaggio
      sparisce.
- [ ] **Credenziali sbagliate** — `test@sec4her.com` / `Sbagliata1!`. → Sopra il form: **"[errore] Email o password
      non corretti"**.

### 1.3 Accedi — casi normali

- [ ] **Login corretto** — `test@sec4her.com` / `Test1234!`. → Arrivi su **`/home`**.
- [ ] **Email con maiuscole e spazi** — Esci, poi accedi con ` TEST@sec4her.com ` (spazi ai lati). → Entri lo stesso.
- [ ] **Ritorno alla pagina richiesta** — Esci, apri `/ctf`, fai il login. → Torni su **`/ctf`**, non su `/home`.
- [ ] **Protezione open redirect** — Esci, apri `/accedi?da=//google.com` e fai il login. → Arrivi su **`/home`**,
      non su Google.
- [ ] **Già loggata** — Da loggata apri `/accedi`. → Vieni riportata alla home.

### 1.4 Registrati

- [ ] **Link tra le pagine** — Su Accedi clicca "Non hai un account? Registrati", poi "Hai già un account? Accedi".
      → Si passa da una pagina all'altra.
- [ ] **Campi vuoti** — Premi **Crea account** senza scrivere. → Quattro errori: nome, email, password, conferma.
- [ ] **Nome corto** — Nome `A`. → *"Il nome deve contenere almeno 2 caratteri."*
- [ ] **Password diverse** — Password `Prova1234`, conferma `Prova12345`. → *"Le due password non coincidono."*
- [ ] **Registrazione corretta** — Tutti i campi giusti. → **"[ok] Registrazione completata — Benvenuta, *Nome*!"**
      e pulsante **"Vai ad Accedi"**.
- [ ] **Non salva** — Prova ad accedere con l'account appena "registrato". → **"Email o password non corretti"**
      (atteso: non c'è ancora un database).

### 1.5 Telefono

- [ ] **Accedi e Registrati da telefono (F12)** — → Card centrata, campi larghi, nessuno scorrimento orizzontale.

---

## 2. Home, menu e footer

- [ ] **Home** — Dopo il login su `/home`. → Header scuro con logo, parte centrale **bianca** con il logo "HACK THE
      FUTURE" e il testo di presentazione, footer scuro.
- [ ] **Logo cliccabile** — Da `/eventi` clicca il logo in alto a sinistra. → Torni su `/home`.
- [ ] **Header fisso** — Scorri una pagina lunga (es. una lezione). → L'header resta in alto.
- [ ] **Apri il menu** — Clicca **☰**. → Compaiono: About us, Lezioni, Eventi, Meeting, CTF Groups, Bug Bounty Group,
      Contact us, **Esci**; l'icona diventa **✕**.
- [ ] **Chiudi il menu** — Prova: clic su ✕, clic fuori dal menu, tasto **Esc**, clic su una voce. → Si chiude ogni
      volta.
- [ ] **Pagine segnaposto** — Apri About us, Bug Bounty Group, Contact us. → Titolo della sezione e *"[in costruzione]
      Questa sezione arriverà presto."*
- [ ] **Footer** — In fondo a una pagina riservata. → **"$ Contatti:"** con ✉ Email · Instagram · Discord,
      **"> HACK THE FUTURE_"** verde, **"© 2026 Sec4Her"**.
- [ ] **Link del footer** — Clicca Instagram e Discord. → Si aprono in una **nuova scheda** (oggi indirizzi
      segnaposto). Email apre il programma di posta.
- [ ] **Telefono (F12)** — Home: logo sopra e testo sotto. Menu ☰ utilizzabile. Footer: "Contatti:" sopra e i
      contatti sotto. Nessuno scorrimento orizzontale.

---

## 3. Lezioni

> Ricorda: per non perdere i progressi spostati con i link del sito.

### 3.1 Percorso (`/lezioni`)

- [ ] **Stato iniziale** — Apri **Lezioni** dal menu. → Titolo "Il percorso", **"0/7 lezioni completate"**,
      **"⚡ 0 XP"**, 7 moduli sulla mappa.
- [ ] **Moduli chiusi** — → I moduli 3-7 sono **"🔒 prossimamente"** e non portano a lezioni.

### 3.2 Modulo 1 e sblocco lezioni

- [ ] **Elenco lezioni** — Apri il **Modulo 1**. → 2 lezioni: "Networking: le basi (quelle che servono davvero)"
      (15 min, 50 XP) e "Intercettiamo un login (simulazione)".
- [ ] **Lezione 2 bloccata** — → La lezione 2 ha il lucchetto, **"Bloccata"**, **non è cliccabile** e spiega che
      si sblocca superando il quiz della lezione 1.
- [ ] **Accesso diretto alla lezione bloccata** — Apri a mano
      `/lezioni/01-basi-rete-web/02-intercettiamo-un-login`. → **"Lezione bloccata"** con il pulsante verso la
      lezione 1.
- [ ] **Sessione live del modulo** — → Nel modulo c'è il riquadro della sessione live "Intercettiamo un login con
      Caido".

### 3.3 Lezione 1 — contenuti interattivi

- [ ] **Mappa dei concetti** — Scorri la lezione. → La barra dei 5 concetti resta in alto e si illumina il
      concetto che stai leggendo.
- [ ] **Check rapido** — Rispondi **80** alla domanda sulla porta HTTPS, poi **443**. → Prima "Non proprio", poi
      "✓ Esatto!".
- [ ] **Palazzo delle porte** — Clicca **🚪 443**. → Compare "siti web protetti".
- [ ] **Rubrica DNS** — Scrivi `google.com`. → Compare l'IP. Scrivi `pippo.it` e Invio. → "non nella rubrica di
      esempio".
- [ ] **Lettera HTTP** — Passa il mouse (o tocca) su metodo, URL, header e body. → Compare la spiegazione di ognuno.
- [ ] **Status code** — Clicca la carta **404**. → Si gira e mostra il significato.
- [ ] **Cartolina vs busta** — Attiva **Usa HTTPS**. → Il messaggio diventa "BUSTA CHIUSA (cifrata…)".
- [ ] **Viaggio completo** — Premi **▶ Play**, poi **⏸ Pausa** e "Passo successivo". → I passi si illuminano uno
      alla volta.
- [ ] **Non ti serve ora** — Clicca il riquadro. → Si apre (Modello OSI…).
- [ ] **Prossima lezione bloccata** — In fondo al testo. → "🔒 Si sblocca quando superi la prova".

### 3.4 Quiz (lezione 1)

- [ ] **Pulsante disattivato** — Rispondi solo ad alcune domande. → **"Verifica le risposte"** resta disattivato.
- [ ] **Quiz non superato** — Rispondi sempre alla 1ª opzione e verifica. → Messaggio tipo **"1/5: ne servono almeno
      4"**, le risposte sbagliate in cremisi con **"La risposta giusta era…"** e la spiegazione.
- [ ] **Riprova** — Premi **Riprova**. → Le risposte si azzerano.
- [ ] **Quiz superato** — Rispondi (in ordine) 2ª, 2ª, 2ª, 3ª, 2ª opzione. → **"✓ Quiz superato: 5/5"**,
      **"+50 XP · la lezione è completata"**, badge **"✓ Completata"** in alto, link **"🔓 Sbloccata: Intercettiamo
      un login →"**.
- [ ] **Prossima lezione sbloccata** — → Anche il riquadro "Prossima lezione" nel testo ora è un link.

### 3.5 Lezione 2 — simulatore proxy

- [ ] **Apertura** — Clicca "Sbloccata: Intercettiamo un login". → La lezione si apre; c'è la scritta
      **"Simulazione: sito finto, tutto succede nel tuo browser"** e la checklist **"MISSIONE · 0/6"**.
- [ ] **Intercept OFF + password sbagliata** — Nel sito finto: `giulia` / `sbagliata`, **Accedi**. → Errore
      **"Username o password errati"**; nel proxy la risposta **401 Unauthorized**.
- [ ] **Intercept OFF + login giusto** — `giulia` / `libri2026`. → Il sito mostra **"Ciao giulia! Ecco i tuoi
      libri."** (la richiesta non si ferma). Premi **Esci**.
- [ ] **Intercept ON** — Clicca **Intercept OFF** nel proxy. → Diventa **Intercept ON** verde; passo 1 spuntato.
- [ ] **Richiesta ferma** — Login con `giulia` / `libri2026`. → Nel sito "⏳ In attesa del server…", nel proxy
      **"✋ RICHIESTA INTERCETTATA"**; passo 2 spuntato.
- [ ] **Spiegazioni** — In modalità **👁 Spiega** clicca metodo, URL, header e body. → Compare la spiegazione di
      ognuno; dopo il quarto, passo 3 spuntato.
- [ ] **Drop** — Premi **🗑 Drop**. → **"Richiesta scartata"** nel sito e nel proxy.
- [ ] **Forward** — Rifai il login e premi **▶ Forward**. → Risposta **200 OK**, nel sito "Ciao giulia!"; passo 4
      spuntato. Premi **Esci**.
- [ ] **URL modificato** — Rifai il login, **✏️ Modifica**, cambia `/login` in `/admin`, Forward. → **"Pagina non
      trovata"**.
- [ ] **Modifica del ruolo** — Rifai il login, in **✏️ Modifica** cambia `role=user` in `role=admin`. → Passo 5
      spuntato. Premi **Forward**. → Nel sito **"Pannello ADMIN"** con la flag, nel proxy la flag evidenziata in
      verde, riquadro animato **"🏴 Flag trovata!"**, checklist **6/6**.
- [ ] **Copia la flag** — Premi **📋 Copia la flag**. → Diventa **"✓ Copiata"**.

### 3.6 Flag (lezione 2)

- [ ] **Flag vuota** — Premi **Verifica la flag** senza scrivere. → *"Incolla la flag."*
- [ ] **Flag sbagliata** — Scrivi `sec4her{sbagliata}`. → *"Flag non corretta…"* e compare il suggerimento 💡.
- [ ] **Flag giusta** — **Vai alla prova ↓**, incolla (Ctrl+V) la flag copiata e verifica. → **"✓ Flag corretta!
      Missione compiuta 🏴"** e **"+50 XP"**.

### 3.7 XP e rank

- [ ] **XP totali** — Clicca **"← Torna al percorso"**. → **"2/7 lezioni completate"**, **"⚡ 100 XP"**, modulo 1
      **"✓ Completato"**.
- [ ] **XP dopo ricarica** — Premi F5 su `/lezioni`. → Si torna a **0 XP** (atteso finché non c'è il database).
- [ ] **Rank** — Cerca un livello/rank legato agli XP. → **Non esiste ancora** (atteso: funzionalità non fatta).
      Segna come "non applicabile".

### 3.8 Modulo 2 e lezioni in preparazione

- [ ] **Modulo 2** — Apri "Vulnerabilità web". → 5 lezioni; la prima è libera, le altre bloccate.
- [ ] **Lezione senza testo** — Apri la prima lezione del modulo 2. → *"Le note di questa lezione sono in
      preparazione…"* e il pulsante **"Segna come completata"**. Premilo → la lezione risulta completata e +XP.

### 3.9 Sessioni live

- [ ] **Riquadro sessione** — In fondo alla lezione 1 o 2. → **"SESSIONE LIVE DI QUESTA LEZIONE"** con data,
      piattaforma e numero di iscritte (mai i nomi).
- [ ] **Link nascosto** — Prima di iscriverti. → *"Il link sarà visibile dopo l'iscrizione"*.
- [ ] **Iscrizione** — **"Prenota il posto"** → modale con nome e cognome già compilati → **Conferma iscrizione**. → **"Sei
      iscritta! ✓"**, il numero di iscritte sale di 1, compaiono **"Entra nella call ↗"** e **"Aggiungi al
      calendario"**.
- [ ] **Calendario** — Premi **"Aggiungi al calendario"**. → Si scarica un file `.ics` che si apre nel calendario.
- [ ] **Annulla** — **"Annulla iscrizione"**. → Torna "Prenota il posto" e il numero scende.
- [ ] **Domanda su Discord** — **"Fai una domanda su Discord ↗"**. → Si apre in una **nuova scheda** (link
      segnaposto).

### 3.10 Telefono

- [ ] **Lezioni da telefono (F12)** — Percorso, modulo 1, lezione 1 e lezione 2. → Nessuno scorrimento orizzontale;
      la mappa dei concetti resta in alto.
- [ ] **Simulatore da telefono** — Lezione 2. → Due schede **🌐 Sito / 🕵️ Proxy**; si vede un pannello alla volta.
      Con Intercept ON, dopo il login il simulatore passa da solo alla scheda Proxy. La flag si trova anche da qui.

---

## 4. Eventi (`/eventi`)

- [ ] **Evento del mese** — → Card grande "Hardware Hacking Night" (in presenza) con posti **18/30**, conto alla
      rovescia `> …g …h …m` e **"Partecipo"**.
- [ ] **Filtri per tema** — Clicca **OSINT**, poi **Tutti**. → Restano solo gli eventi OSINT, poi tutti.
- [ ] **Filtri per modalità** — Clicca **Online**, poi **In presenza**. → Badge viola "Online" / verdi "In presenza".
- [ ] **Eventi passati** — In fondo. → Card grigie con **"Concluso"** e nessun pulsante.
- [ ] **Sold out** — Trova "Phishing dal vivo" (20/20). → Badge **"Sold out"** e pulsante disattivato.
- [ ] **Iscrizione — errori** — **Partecipo** → cancella nome e cognome → **Conferma iscrizione**. → Errori sotto i campi;
      con 1 sola lettera → errore "almeno 2 caratteri".
- [ ] **Iscrizione — chiusura modale** — Apri la modale e chiudila con **✕**, con **Esc** e cliccando fuori. → Si
      chiude, nessuna iscrizione.
- [ ] **Iscrizione in presenza** — Conferma sull'evento del mese. → **"Sei iscritta! ✓"**, **"Iscritta ✓"**, posti
      **19/30**.
- [ ] **Iscrizione online** — Su un evento online. → Compare **"Entra nella call ↗"** (nuova scheda) e
      **"Aggiungi al calendario"** (file `.ics`).
- [ ] **Annulla iscrizione** — → Torna "Partecipo" e il contatore scende.
- [ ] **Privacy** — → Si vede solo il **numero** di iscritte, mai i nomi.
- [ ] **Riquadro Discord** — In fondo: **"Entra su Discord ↗"**. → Nuova scheda.
- [ ] **Telefono (F12)** — Card una sotto l'altra, filtri che vanno a capo, modale leggibile, nessuno scorrimento
      orizzontale.

---

## 5. Meeting (`/meeting`)

- [ ] **Team** — → Due card (Founder, Co-founder) con iniziali, ruolo e argomenti.
- [ ] **Call 1:1** — → Una card centrata (20 min) con **"Prenota su Cal.com ↗"**.
- [ ] **Link Cal.com** — Clicca il pulsante. → Si apre in una **nuova scheda** (oggi indirizzo segnaposto
      `SOSTITUISCI`).
- [ ] **Rimando alle Lezioni** — Clicca il link verso le sessioni live. → Arrivi su `/lezioni`.
- [ ] **Riquadro Discord** — → **"Entra su Discord ↗"** in nuova scheda.
- [ ] **Telefono (F12)** — Card una sotto l'altra, nessuno scorrimento orizzontale.

---

## 6. CTF Groups (`/ctf`)

### 6.1 Lista

- [ ] **Card e ordine** — → 4 CTF: prima quello **in corso** (CTF Hunter, badge verde con puntino), poi quelli **in
      arrivo** (il più vicino prima), infine **Byte Night** concluso (grigio).
- [ ] **Filtri** — Tutti · In arrivo · In corso · Conclusi. → Il numero accanto al filtro corrisponde alle card.
- [ ] **Conto alla rovescia** — → "inizia tra…" sui CTF in arrivo, "termina tra…" su quello in corso.
- [ ] **Vedi su CTFtime ↗** — → Nuova scheda su ctftime.org.
- [ ] **Barra gruppi** — Packet Storm CTF. → **"5/5 gruppi"**.

### 6.2 Aggiungi CTF

- [ ] **Campi vuoti** — **+ Aggiungi CTF** → **Salva CTF** senza scrivere. → Errori su nome, link, date, formato,
      livello.
- [ ] **Link sbagliato** — Link `https://google.com`. → *"Il link deve iniziare con https://ctftime.org/"*.
- [ ] **Date al contrario** — Fine prima dell'inizio. → *"La data di fine deve essere dopo la data di inizio."*
- [ ] **Descrizione troppo lunga** — Più di 200 caratteri. → *"La descrizione può avere al massimo 200 caratteri."*
- [ ] **CTF valido** — Tutto corretto. → La modale si chiude e la nuova card compare con il **bordo viola**.
- [ ] **Chiusura modale** — ✕, Esc, clic fuori. → Si chiude senza salvare.

### 6.3 Gruppi e limiti

- [ ] **Gruppo pieno** — Apri **CTF Hunter**. → "Team Root" ha 5/5 membri, badge **"Completo"** e pulsante
      disattivato.
- [ ] **Unisciti** — Unisciti a "Null Pointers". → **"Sei nel gruppo ✓"**, compare il tuo avatar **"TE"** e
      **"Esci dal gruppo"**.
- [ ] **Un solo gruppo per CTF** — → Gli altri "Unisciti" e "+ Crea gruppo" sono disattivati.
- [ ] **Esci dal gruppo** — → Il tuo avatar sparisce, gli altri pulsanti tornano attivi.
- [ ] **Crea gruppo — errori** — **+ Crea gruppo** con nome vuoto, di 1 lettera, oltre 30 caratteri, oppure
      "Byte Queens" (già esistente). → Errore ogni volta.
- [ ] **Crea gruppo — valido** — Nome nuovo + nota. → Il gruppo compare e tu ne fai parte.
- [ ] **Gruppo vuoto eliminato** — Esci dal gruppo che hai creato (sei l'unica). → Il gruppo sparisce.
- [ ] **Massimo 5 gruppi** — Apri **Packet Storm CTF** (5 gruppi). → Al posto di "+ Crea gruppo":
      **"Numero massimo di gruppi raggiunto"**.
- [ ] **CTF concluso** — Apri **Byte Night**. → I gruppi si vedono ma non si può creare, unirsi o uscire.
- [ ] **CTF inesistente** — Apri `/ctf/non-esiste`. → **"[errore] CTF non trovato"** con **"← Torna ai CTF"**.
- [ ] **Torna ai CTF** — **"← Torna ai CTF"**. → Lista; il CTF aggiunto prima c'è ancora (se non hai ricaricato).
- [ ] **Telefono (F12)** — Card una sotto l'altra, modali utilizzabili, nessuno scorrimento orizzontale.

---

## 7. Link esterni (riepilogo)

- [ ] **Tutti in nuova scheda** — Footer (Instagram, Discord), Eventi/Meeting ("Entra su Discord", "Entra nella
      call", "Prenota su Cal.com"), Lezioni ("Fai una domanda su Discord"), CTF ("Vedi su CTFtime"). → Ognuno apre
      una **nuova scheda**, il sito resta aperto nella scheda originale.
- [ ] **Segnaposto** — → I link che contengono `SOSTITUISCI` sono attesi finché non mettiamo quelli veri
      (`config/links.ts`). Segnali se uno porta a una pagina inattesa.

---

## 8. Logout e pagine protette

- [ ] **Esci** — Menu ☰ → **⏻ Esci**. → Arrivi su **`/accedi`** (senza `?da=`).
- [ ] **Pagine protette dopo il logout** — Prova ad aprire `/home`, `/lezioni`, `/eventi`, `/meeting`, `/ctf`,
      `/about`. → Vieni sempre mandata su **`/accedi`** e non vedi il contenuto (nemmeno per un attimo).
- [ ] **Indietro del browser** — Dopo Esci premi il tasto **←** del browser. → Non torni dentro l'area riservata.
- [ ] **Chiusura scheda** — Fai il login, chiudi la scheda, riapri `localhost:3000/home` in una scheda nuova. →
      Devi rifare il login.
- [ ] **Ricarica da loggata** — Da loggata premi F5 su `/home`. → Resti dentro.

---

## 9. Controlli finali (per chi sviluppa)

- [ ] `npx tsc --noEmit` → nessun errore.
- [ ] `npm run lint` → nessun avviso.
- [ ] `npm run build` → build riuscita.
- [ ] `npm audit` → nessuna vulnerabilità critica o alta.

---

## Bug trovati

Gravità: 🔴 alta (blocca o rischio di sicurezza) · 🟠 media (funziona male) · 🟢 bassa (estetica, testi).

| Data | Pagina | Descrizione | Gravità | Risolto (sì/no) |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
