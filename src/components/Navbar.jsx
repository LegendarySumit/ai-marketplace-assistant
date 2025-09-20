import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import logoUrl from '../assets/logo.svg'

export default function Navbar() {
  const { auth, logout } = useAuth()
  const isBuyer = auth?.role === 'buyer'
  const isSeller = auth?.role === 'seller'

  return (
    <header className="sticky top-0 z-40 backdrop-blur-soft border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="logo" className="h-7 w-7" />
            <span className="text-lg sm:text-xl font-semibold gradient-text">ArtisanAI</span>
          </NavLink>
          <nav className="flex items-center gap-1 sm:gap-3 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300 border-b-2 border-teal-400' : 'text-gray-200 border-b-2 border-transparent'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300 border-b-2 border-teal-400' : 'text-gray-200 border-b-2 border-transparent'}`
              }
            >
              Marketplace
            </NavLink>
            {isSeller && (
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300 border-b-2 border-teal-400' : 'text-gray-200 border-b-2 border-transparent'}`
                }
              >
                Upload Product
              </NavLink>
            )}

            {!auth && (
              <>
                <NavLink to="/login-buyer" className={({ isActive }) => `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300' : 'text-gray-200'}`}>Buyer Login</NavLink>
                <NavLink to="/login-seller" className={({ isActive }) => `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300' : 'text-gray-200'}`}>Seller Login</NavLink>
              </>
            )}

            {isBuyer && (
              <NavLink to="/buyer" className={({ isActive }) => `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300' : 'text-gray-200'}`}>My Orders</NavLink>
            )}
            {isSeller && (
              <NavLink to="/seller" className={({ isActive }) => `px-3 py-2 rounded-lg transition hover:bg-white/5 ${isActive ? 'text-teal-300' : 'text-gray-200'}`}>Seller</NavLink>
            )}
            {auth && (
              <button className="px-3 py-2 rounded-lg hover:bg-white/5 text-gray-200" onClick={logout}>Logout</button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
