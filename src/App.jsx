import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider.jsx'
import LayoutSito from './components/LayoutSito.jsx'
import RottaProtetta from './components/RottaProtetta.jsx'
import { VOCI_MENU } from './config/sito.js'
import Accedi from './pages/Accedi.jsx'
import Home from './pages/Home.jsx'
import Registrati from './pages/Registrati.jsx'
import Segnaposto from './pages/Segnaposto.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/accedi" replace />} />
          <Route path="/accedi" element={<Accedi />} />
          <Route path="/registrati" element={<Registrati />} />

          {/* Pagine riservate: servono il login */}
          <Route element={<RottaProtetta />}>
            <Route element={<LayoutSito />}>
              <Route path="/home" element={<Home />} />
              {VOCI_MENU.map((voce) => (
                <Route key={voce.percorso} path={voce.percorso} element={<Segnaposto titolo={voce.titolo} />} />
              ))}
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/accedi" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
