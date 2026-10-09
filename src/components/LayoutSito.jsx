import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

// Struttura delle pagine riservate: header scuro, contenuto su sfondo bianco, footer scuro.
export default function LayoutSito() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1 bg-white text-ink-text">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
