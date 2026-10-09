import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/contesto.js'

// Lascia passare solo chi ha fatto il login; gli altri vanno ad Accedi.
export default function RottaProtetta() {
  const { utente } = useAuth()
  const location = useLocation()

  if (!utente) return <Navigate to="/accedi" replace state={{ da: location.pathname }} />
  return <Outlet />
}
