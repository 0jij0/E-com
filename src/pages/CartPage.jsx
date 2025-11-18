// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <motion.div
      className="container mx-auto px-6 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link 
            to="/products"
            className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <motion.ul 
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
          >
            {cartItems.map((item) => (
              <motion.li 
                key={item.id}
                className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm border"
                variants={itemVariants}
                layout // Animate layout changes (e.g., when item is removed)
              >
                <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-32">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between mb-6 text-gray-600">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="mt-6 w-full bg-black text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}