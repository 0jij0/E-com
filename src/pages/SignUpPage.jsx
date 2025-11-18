// src/pages/SignUpPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoogleButton from '../components/ui/GoogleButton'; // Import the new button

export default function SignUpPage() {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome to Aura
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to manage your orders and profile
          </p>
        </div>

        {/* Google Button handles everything */}
        <div className="mt-8 space-y-6">
          <GoogleButton text="Continue with Google" />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue as guest
              </span>
            </div>
          </div>
           
           <div className="text-center">
              <Link to="/" className="text-sm font-medium text-black hover:underline">
                  Return to Store
              </Link>
           </div>
        </div>
      </div>
    </motion.div>
  );
}