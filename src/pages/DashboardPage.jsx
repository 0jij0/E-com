// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // To get the current user ID
import { supabase } from '../lib/supabaseClient';
import { Package, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Fetch orders AND their related items in one go
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }); // Newest first

        if (error) throw error;
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p className="text-center py-20">Loading your dashboard...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Account
      </motion.h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar / Profile Info */}
        <motion.div 
          className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border h-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col items-center text-center">
             {/* Use the user's Google Avatar if available */}
            <img 
              src={user?.user_metadata?.avatar_url || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-2 border-gray-100 mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900">{user?.user_metadata?.full_name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </motion.div>

        {/* Main Content: Order History */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>

          {orders.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Placed</p>
                    <p className="font-medium text-gray-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium text-gray-900">${order.items_price}</p>
                  </div>
                   <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Order #{order.id}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <ul className="divide-y divide-gray-100">
                    {order.order_items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">${item.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}