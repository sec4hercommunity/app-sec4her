# sec4her — Architettura della Piattaforma

Documento tecnico per il team · v1.0

> **Hacking made simple. By women, for women.**

_Fonte: `sec4her-architettura-sito.pdf`_

---

## 1. Principio guida

**Non costruiamo ciò che esiste già meglio altrove. Costruiamo solo ciò che deve essere nostro.**
Con tempo limitato e un full-time ciascuna, ricostruire una chat real-time (una delle cose più
complesse in assoluto) sarebbe un suicidio di tempo. Quindi dividiamo nettamente ciò che
sviluppiamo da ciò che integriamo.

| Funzione                | Soluzione                     | Note                                                       |
| ----------------------- | ----------------------------- | ---------------------------------------------------------- |
| Community / chat / call | Discord                       | Canali per topic, vocali, gruppi CTF. Non si sviluppa.     |
| Note / lezioni          | **SITO (noi)**                | Il nostro sistema, la nostra identità. Core del prodotto.  |
| Membership / pagamenti  | Stripe                        | Subscription ricorrenti, PCI-compliant. Non si sviluppa.   |
| Auth / account          | Supabase Auth                 | Login email + OAuth. Non si reinventa.                     |
| Brand / landing         | **SITO (noi)**                | La porta d'ingresso, la storia, la conversione.            |
| Eventi                  | Sito (annuncio) + Discord/Zoom | Nessuno sviluppo custom.                                  |

**In sintesi:** Discord è la casa, il sito è la porta e la scuola. Il sito si riduce a ciò che conta:
note + membership + brand.

## 2. Diagramma di sistema (flusso utente)

| Step         | Dove                                  | Cosa succede                                              |
| ------------ | ------------------------------------- | --------------------------------------------------------- |
| 1. Scoperta  | Instagram / eventi                    | La ragazza arriva al sito                                 |
| 2. Landing   | Sito                                  | Brand, storia, alcune note gratuite (lead magnet)         |
| 3. Sign up   | Sito (Supabase Auth)                  | Crea account                                              |
| 4. Checkout  | Stripe                                | Paga la membership (20-25€/mese)                          |
| 5. Accesso   | Sito + Discord                        | Webhook Stripe → attiva membership → auto-invite Discord  |
| 6. Uso       | Sito: note complete · Discord: community | Impara col sistema + non resta sola                    |

Il collegamento critico è lo **step 5**: un webhook Stripe aggiorna lo stato membership su Supabase e
sblocca sia i contenuti riservati sul sito sia l'accesso al server Discord (via bot/ruolo). Flusso
automatico, zero gestione manuale.

## 3. Stack tecnologico

Scelto per essere **scalabile e professionale** (non un prototipo usa-e-getta) e insieme **ottimale per
lo sviluppo assistito con Claude Code** (ecosistema enorme, pattern consolidati).

| Layer                 | Tecnologia                  | Ruolo                                                                        |
| --------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| Framework             | Next.js (App Router)        | SSR/SSG, routing, API routes. React-based.                                   |
| Linguaggio            | TypeScript                  | Type safety, manutenibilità, meno bug runtime.                               |
| Styling               | Tailwind CSS                | UI veloce e coerente col brand.                                              |
| DB + Auth + Storage   | Supabase (PostgreSQL)       | Utenti, sessioni, stato membership, file. Row Level Security.               |
| Pagamenti             | Stripe (Checkout + Webhooks) | Subscription, billing portal.                                               |
| Contenuti lezioni     | MDX                         | Markdown + componenti React. Grafici, callout, schemi. Import diretto da Obsidian. |
| Hosting / CI          | Vercel                      | Deploy git-based, edge, HTTPS automatico.                                    |
| Community             | Discord (+ bot)             | Chat, vocali, ruoli membership via bot.                                      |

**Nota sul workflow contenuti:** le note si scrivono in Markdown su Obsidian e si portano in MDX
quasi 1:1 — niente doppio lavoro. Le note di oggi diventano le lezioni del sito domani.

## 4. Data model (minimale di proposito)

```
users   { id, name, email, created_at,
          membership_status, stripe_customer_id,
          discord_id }

lessons { id, title, topic, level,
          content_mdx, is_free, published_at }

events  { id, title, date, type,
          link, description }
```

Più avanti (non al lancio): `contributions` per le note condivise dalle socie, organizzate per topic.
Ogni tabella in più è tempo in più: si aggiunge solo quando serve.

## 5. Sicurezza — priorità assoluta

Siamo un brand di **cybersecurity**: un breach sarebbe fatale per la credibilità. Lo stack ci copre se
rispettiamo le regole base — da hacker, questo è il nostro terreno.

- **Mai gestire password a mano** → Supabase Auth (hashing, sessioni gestite).
- **Mai toccare dati carta** → Stripe Checkout (i dati carta non passano dal nostro backend).
- **HTTPS ovunque** (Vercel default). **Secrets** in env vars, mai in repo.
- **Row Level Security** su Supabase: ogni utente vede solo i propri dati.
- **Input validation** server-side su ogni endpoint (il nostro pane quotidiano).
- **Webhook Stripe firmati** e verificati (no spoofing dello stato membership).
- **Pentest interno** prima del lancio: lo testiamo noi. Ottimo anche come contenuto IG.

## 6. Piano di sviluppo per fasi

| Fase       | Obiettivo       | Deliverable                                                         |
| ---------- | --------------- | ------------------------------------------------------------------- |
| 0 · subito | Community viva  | Server Discord strutturato (canali, ruoli, onboarding)              |
| 1          | Fondamenta sito | Landing + brand + 2-3 note pubbliche (MDX) online su Vercel         |
| 2          | Account         | Supabase Auth + note gated per utenti registrati                    |
| 3          | Monetizzazione  | Stripe subscription + webhook → membership + auto-ruolo Discord     |
| 4          | Rifinitura      | Pagina eventi, polish UI, note che crescono, pentest finale         |

La community parte da **Fase 0 su Discord subito**, in parallelo allo sviluppo. Target realistico entro
fine anno: Fase 3 = sito con note + membership + Discord integrato. Si costruisce con Claude Code,
un modulo alla volta, testando prima di proseguire. Tutto versionato su GitHub.

## 7. Costi

Vercel, Supabase, Discord: free tier per iniziare. Stripe: ~1,5% + 0,25€/transazione, nessun fisso.
Dominio sec4her.it già nostro. Claude Code incluso. **Lancio quasi a costo zero**, i costi salgono solo
con la crescita.
