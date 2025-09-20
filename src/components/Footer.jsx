import { NavLink } from 'react-router-dom'
import logoUrl from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-sm">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logoUrl} alt="logo" className="h-6 w-6" />
              <div className="text-lg font-semibold gradient-text">ArtisanAI</div>
            </div>
            <p className="mt-2 text-gray-400">
              Empowering local artisans with AI-powered tools for better product listings, fair pricing, and customer engagement.
            </p>
          </div>
          <div>
            <div className="font-semibold text-gray-200">Quick Links</div>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/marketplace">Marketplace</NavLink></li>
              <li><NavLink to="/upload">Upload Product</NavLink></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-200">Support</div>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Community</a></li>
            </ul>
            <div className="mt-3 flex gap-3 text-gray-400">
              <a href="#" aria-label="Twitter" className="hover:text-teal-300">Twitter</a>
              <a href="#" aria-label="Instagram" className="hover:text-teal-300">Instagram</a>
              <a href="#" aria-label="GitHub" className="hover:text-teal-300">GitHub</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          © 2024 ArtisanAI. Built with ❤️ for local artisans worldwide.
        </div>
      </div>
    </footer>
  )
}
