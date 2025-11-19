// src/pages/SuccessPage.jsx
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-xl text-gray-600 mb-8">
        Thank you for your purchase. Your order has been saved to your dashboard.
      </p>
      <Link 
        to="/products" 
        className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}