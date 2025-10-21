// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // 1. Import AnimatePresence
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage'; // 2. Import the new page

function App() {
  const location = useLocation(); // 3. Get location for AnimatePresence

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* 4. Wrap Routes with AnimatePresence for page transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            {/* 5. Add the dynamic route for a single product */}
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;