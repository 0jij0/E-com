// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart(); // We'll need to update Context to clear cart later
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) throw new Error("You must be logged in to place an order.");

      // 1. Create the Order Record in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            shipping_address: formData,
            items_price: subtotal, // In a real app, add tax/shipping here
            shipping_price: 0,
            status: 'pending' // You might need to add this column to your table or ignore it
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create the Order Items Records
      // We map over the cart items to prepare them for the database
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image_url: item.image_url
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

       
      // Clear the cart now that the order is created
      if (typeof clearCart === 'function') clearCart();

      // Navigate to success page
      navigate('/success');

    } catch (error) {
      console.error("Checkout Error:", error.message);
      alert("Failed to place order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-12"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* LEFT: Shipping Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  required name="address" type="text" value={formData.address} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    required name="city" type="text" value={formData.city} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input 
                    required name="postalCode" type="text" value={formData.postalCode} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || cartItems.length === 0}
            className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
          </button>
        </form>

        {/* RIGHT: Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded overflow-hidden border">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span>{item.name} (x{item.quantity})</span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}