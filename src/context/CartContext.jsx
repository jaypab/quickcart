import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const addToCart = (product) => {
    setCartItems(currentItems => {
      // Check if item already in cart
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}