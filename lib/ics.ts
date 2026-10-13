// File .ics (iCalendar, RFC 5545) generato nel browser, senza servizi esterni.
// Si apre con Google Calendar, Outlook e Apple Calendar.

import { fineEvento, type Evento } from './eventi'

// 2026-10-25T18:30:00.000Z → 20261025T183000Z
function dataIcs(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

// Caratteri speciali da proteggere nei testi.
function testoIcs(testo: string): string {
  return testo.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

const encoder = new TextEncoder()

// Le righe più lunghe di 75 byte vanno spezzate e continuate con uno spazio
// (contando i byte, non le lettere: "è" occupa 2 byte e non va spezzata a metà).
function piega(riga: string): string {
  const parti: string[] = []
  let attuale = ''
  let byte = 0
  for (const carattere of riga) {
    const n = encoder.encode(carattere).length
    if (byte + n > 75) {
      parti.push(attuale)
      attuale = ' '
      byte = 1
    }
    attuale += carattere
    byte += n
  }
  parti.push(attuale)
  return parti.join('\r\n')
}

export function creaIcs(evento: Evento, linkCall?: string): string {
  const luogo = evento.modalita === 'presenza' ? evento.luogo : linkCall
  const descrizione = [
    evento.descrizione,
    evento.cosaPortare.length ? `Cosa portare: ${evento.cosaPortare.join(', ')}` : '',
    linkCall ? `Link alla call: ${linkCall}` : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  const righe = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sec4Her//Eventi//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${evento.id}@sec4her.it`,
    `DTSTAMP:${dataIcs(Date.now())}`,
    `DTSTART:${dataIcs(Date.parse(evento.inizio))}`,
    `DTEND:${dataIcs(fineEvento(evento))}`,
    `SUMMARY:${testoIcs(`Sec4Her · ${evento.titolo}`)}`,
    `DESCRIPTION:${testoIcs(descrizione)}`,
    luogo ? `LOCATION:${testoIcs(luogo)}` : '',
    linkCall ? `URL:${linkCall}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  return righe.map(piega).join('\r\n') + '\r\n'
}

// Scarica il file .ics dell'evento.
export function scaricaIcs(evento: Evento, linkCall?: string) {
  const blob = new Blob([creaIcs(evento, linkCall)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sec4her-${evento.id}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
