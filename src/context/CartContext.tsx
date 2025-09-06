import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, Purchase } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  checkout: () => void;
  purchases: Purchase[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      
      const storedPurchases = localStorage.getItem(`purchases_${user.id}`);
      if (storedPurchases) {
        setPurchases(JSON.parse(storedPurchases));
      }
    } else {
      setCartItems([]);
      setPurchases([]);
    }
  }, [user]);

  const addToCart = (product: Product) => {
    if (!user) return;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { product, quantity: 1 }];
      }
      
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    if (!user) return;
    
    setCartItems(prev => {
      const newCart = prev.filter(item => item.product.id !== productId);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!user) return;
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => {
      const newCart = prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    if (!user) return;
    
    setCartItems([]);
    localStorage.removeItem(`cart_${user.id}`);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const checkout = () => {
    if (!user || cartItems.length === 0) return;
    
    const purchase: Purchase = {
      id: Date.now().toString(),
      userId: user.id,
      products: cartItems,
      total: getCartTotal(),
      date: new Date().toISOString()
    };
    
    setPurchases(prev => {
      const newPurchases = [...prev, purchase];
      localStorage.setItem(`purchases_${user.id}`, JSON.stringify(newPurchases));
      return newPurchases;
    });
    
    clearCart();
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      checkout,
      purchases
    }}>
      {children}
    </CartContext.Provider>
  );
};