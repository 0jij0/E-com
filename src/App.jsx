// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CArtPage';
import SignUpPage from './pages/SignUpPage'; // 1. Import the new page

function App() {
  const location = useLocation();

  return (
    <>
      {/* Navbar is now rendered conditionally by code in Navbar.jsx */}
      <Navbar /> 
      
      {/* 2. Conditionally change padding. Auth pages are full screen. */}
      <main className={
        location.pathname === '/signup' || location.pathname === '/signin' 
        ? 'pt-0' 
        : 'pt-16'
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignUpPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;