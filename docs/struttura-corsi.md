# sec4her — Struttura del Percorso Formativo

Il sistema di apprendimento · v1.0

> **Da zero, hands-first, mai da sole.**

_Fonte: `sec4her-struttura-corsi.pdf`_

---

## 0. Il nostro principio

> _"Hacking made simple. By women, for women."_

**"Made simple" non vuol dire "facile".** L'hacking non è facile, e non lo nascondiamo. Vuol dire reso
**accessibile**: la prima volta è difficile per tutte, ma con una guida, un sistema e uno spazio dove
condividere, tutto cambia. La difficoltà non sparisce — smetti solo di affrontarla da sola.

**"By women, for women"** perché per troppo tempo è girata una bugia: che la cybersecurity non
fosse un posto per donne. Non è vero — il cervello non ha genere. Chi è bravo lo è perché ha
praticato, non per il genere. Ma manca ancora uno spazio pensato per noi, dove entrare da zero
senza sentirsi fuori posto. **sec4her è quello spazio.** Non nasce perché l'hacking sia facile — nasce
perché nessuna debba più imparare da sola.

## 1. La filosofia (cosa ci rende diversi)

I corsi esistono ovunque, gratis. **Non competiamo sul COSA (l'informazione), ma sul COME:**
l'ordine, la semplicità, la guida, il non sentirsi persa. Non diamo soluzioni pronte dei lab —
insegniamo il **ragionamento da pentester**: quali domande farsi davanti a un target.

### I 4 principi

- **Hands first** — prima si fa, poi si capisce. Il lab è il contenitore, la teoria entra quando serve.
- **Scenari reali** — target e vulnerabilità vere, non quiz astratti.
- **Si impara insieme** — nessuna resta bloccata da sola.
- **Risultati veri** — si finisce con skill + portfolio (CTF, bug trovati), non con appunti.

## 2. Il percorso (dalle basi, step by step)

Progressione pensata per chi parte da **zero**, ma con spazio anche per chi ha esperienza e vuole
condividere.

| #   | Modulo             | Contenuto                                                              | Approccio                                                                   |
| --- | ------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | Basi di rete e web | Come funziona il web: protocolli, richieste/risposte (HTTP), infrastruttura | Schemi + esempi pratici. Obiettivo: capire, non memorizzare            |
| 2   | Vulnerabilità web  | XSS, SQL injection, IDOR, autenticazione                               | Lezioni estratte dai lab e CTF reali di founder e co-founder (non PDF generici) |
| 3   | Lab pratici        | PortSwigger Web Security Academy                                       | Fatti insieme, guidati step by step                                         |
| 4   | CTF di gruppo      | Giornate di sfide in team                                              | Si impara 1000x più che da sole                                             |
| 5   | Bug bounty         | Piccoli team che cacciano vuln reali                                   | Quando si è pronte, ci si supporta a vicenda                                |
| 6   | Lab nostro         | Ambiente controllato per attacchi simulati, 100% legale                | Costruito insieme, come team                                                |
| 7   | Eventi a tema      | OSINT, social engineering, privacy                                     | Per allargare l'orizzonte oltre il web hacking                              |

## 3. La prima sessione (il modello)

Esempio di come applichiamo l'hands-first. **Sessione 1 — networking attraverso un lab di
autenticazione, con un proxy (Caido).** Il networking NON si insegna come materia astratta: entra
dentro ciò che si vede a schermo.

| Fase             | Durata | Contenuto                                                                     |
| ---------------- | ------ | ----------------------------------------------------------------------------- |
| Apertura         | 5'     | Il filo: "il web è uno scambio di messaggi, oggi ci mettiamo in mezzo"        |
| Setup proxy      | 10'    | Caido come "chi legge le lettere che passano"                                 |
| Intercettazione  | 15'    | Login reale → si legge la richiesta: metodo, URL, header, body, response/status |
| Aggancio hacking | 15'    | "E se cambio il messaggio prima che arrivi?" → seme della vuln                |
| Chiusura         | 10'    | Bottino (cosa ho capito) + compito + anteprima prossima sessione              |

Networking coperto senza spaventare: GET/POST, richiesta/risposta, header, body, status, cookie di
sessione — visti dal vivo. OSI, TCP/UDP, subnetting: **rimandati a quando servono**. Un pezzo alla
volta.

## 4. Formato dei contenuti

- **Non solo PDF:** lezioni visive con schemi, grafici, colori — solo l'essenziale per capire un
  concetto.
- **Workflow:** note in Obsidian → MDX → pagine del sito. Le note di founder e co-founder (dai lab e
  dall'esperienza reale) sono la materia prima.
- **Riservatezza sui bug:** i bug reali trovati in bug bounty NON vengono mai divulgati — restano
  confidenziali, come impone l'etica del settore. Da quell'esperienza estraiamo la **lezione e il
  metodo** (come si ragiona, cosa cercare), mai il dettaglio del bug specifico o del target.
- **Zona condivisione:** spazio dove le socie contribuiscono con le proprie note, organizzate per
  argomento (non sparse).
- **Ragionamento, non soluzioni:** si estrae il metodo dai lab, non il write-up pronto.

## 5. Visione di lungo termine

Da community digitale → academy riconosciuta. Quando avremo un numero sufficiente di
partecipanti, affitteremo di volta in volta dei locali per incontri ed eventi in presenza, dove principianti
ed esperte si trovano e condividono. Non un corso. Non solo una community. Un movimento.
**Obiettivo finale: una stanza piena di donne che amano questo mondo.**
