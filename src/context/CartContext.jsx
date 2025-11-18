// src/context/CartContext.jsx
import { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // --- NEW: Function to update quantity ---
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity is 0 or less, remove the item
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // --- NEW: Function to remove an item ---
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // --- NEW: Calculate subtotal ---
  // useMemo ensures this only recalculates when cartItems changes
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, // Add new functions to provider
        removeFromCart, //
        subtotal        // Add subtotal to provider
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}