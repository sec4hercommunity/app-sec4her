import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import AuthProvider from '@/auth/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sec4Her · Hack the Future',
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
}

export const viewport: Viewport = {
  themeColor: '#0B0B12',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
