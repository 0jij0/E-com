// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Get the addToCart function

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-40">Loading product...</p>;
  if (!product) return <p className="text-center py-40">Product not found.</p>;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container mx-auto px-6 py-12"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* --- Image Section --- */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
            <motion.img
              key={product.image_url}
              src={product.image_url}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* --- Product Details Section --- */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">{product.name}</h1>
            <p className="text-3xl text-gray-700 mt-4">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <button 
            onClick={() => addToCart(product)}
            className="bg-black text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300"
          >
            Add to Cart
          </button>

          {/* Extra Details */}
          <div className="flex flex-wrap gap-4 pt-4 text-sm text-gray-500">
            <span>⭐ 4.8/5 Rating</span>
            <span>•</span>
            <span>Free Shipping</span>
            <span>•</span>
            <span>In Stock</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}