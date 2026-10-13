'use client'

import { useEffect, useState } from 'react'

// Ora attuale (in millisecondi) che si aggiorna da sola: serve a stati e conti alla rovescia.
export function useOra(intervalloMs = 30_000): number {
  const [ora, setOra] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setOra(Date.now()), intervalloMs)
    return () => clearInterval(timer)
  }, [intervalloMs])

  return ora
}
