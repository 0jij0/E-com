// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext'; // Corrected path

export default function Navbar() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Aura
        </Link>

        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li><Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-black text-white px-4 py-2 rounded-md text-sm font-medium">
            Sign In
          </button>
          
          <button className="relative">
            <ShoppingBag size={24} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}