// src/components/layout/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, LogOut, User } from 'lucide-react'; // Added LogOut and User icons
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // 1. Import Auth Context

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, signOut } = useAuth(); // 2. Get user and signOut function
  const location = useLocation();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (location.pathname === '/signup' || location.pathname === '/signin') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
          Aura
        </Link>

        <ul className="hidden md:flex items-center space-x-8 font-medium text-sm text-gray-600">
          <li><Link to="/products" className="hover:text-black transition-colors">Products</Link></li>
          <li><Link to="#" className="hover:text-black transition-colors">About</Link></li>
        </ul>

        <div className="flex items-center space-x-6">
          
          {/* 3. Conditional Rendering based on Auth State */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* User Avatar / Name */}
              <div className="flex items-center gap-2">
                {user.user_metadata.avatar_url ? (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} className="text-gray-500"/>
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.user_metadata.full_name?.split(' ')[0]} {/* Shows first name */}
                </span>
              </div>

              {/* Sign Out Button */}
              <button 
                onClick={signOut}
                className="text-gray-500 hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            // Show Sign In button if NOT logged in
            <Link 
              to="/signin"
              className="hidden md:block bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-transform transform hover:scale-105"
            >
              Sign In
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <ShoppingBag size={24} className="text-gray-700 group-hover:text-black transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}