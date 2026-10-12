import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Accedi from './pages/Accedi.jsx'
import Registrati from './pages/Registrati.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/accedi" replace />} />
        <Route path="/accedi" element={<Accedi />} />
        <Route path="/registrati" element={<Registrati />} />
        <Route path="*" element={<Navigate to="/accedi" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
