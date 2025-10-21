// src/components/layout/Navbar.jsx
import { ShoppingBag } from 'lucide-react'; // A popular icon library, let's install it!

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          Aura
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li><a href="#" className="text-gray-600 hover:text-gray-900">New</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900">Men</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900">Women</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900">Sale</a></li>
        </ul>

        {/* Action Icons/Buttons */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-black text-white px-4 py-2 rounded-md text-sm font-medium">
            Sign In
          </button>
          <button className="relative">
            <ShoppingBag size={24} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}