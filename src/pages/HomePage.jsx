// src/pages/HomePage.jsx
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Modern Essentials
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Discover curated collections of timeless apparel and accessories, crafted for the modern individual.
        </motion.p>
        <motion.button
          className="bg-black text-white font-bold py-3 px-8 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}